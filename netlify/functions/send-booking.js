/**
 * Netlify Serverless Function: send-booking
 * Dispatches booking notifications to Ro Halfhide (halfhide@gmail.com)
 * and confirmation emails to the applicant using Brevo API.
 * Hardened with honeypot traps, Cloudflare Turnstile verification, rate limiting, and strict input validation.
 */

const querystring = require('querystring');
const {
  isHoneypotTriggered,
  validateName,
  validateEmail,
  validateEventDate,
  validateLocation,
  validatePhone,
  validateMessage,
  isSubmissionTooFast,
  verifyTurnstileToken
} = require('./utils/validation');

const { checkRateLimit } = require('./utils/rate-limiter');
const { getArtistEmailHtml, getClientEmailHtml } = require('./utils/email-templates');

function parseRequestBody(event) {
  let rawBody = event.body || '';
  if (event.isBase64Encoded && rawBody) {
    rawBody = Buffer.from(rawBody, 'base64').toString('utf8');
  }

  const contentType = (event.headers && (event.headers['content-type'] || event.headers['Content-Type'])) || '';
  if (contentType.includes('application/x-www-form-urlencoded')) {
    return querystring.parse(rawBody);
  }

  try {
    return JSON.parse(rawBody || '{}');
  } catch (e) {
    return querystring.parse(rawBody);
  }
}

function getClientIp(event) {
  if (!event || !event.headers) return undefined;
  return (
    event.headers['x-nf-client-connection-ip'] ||
    event.headers['client-ip'] ||
    (event.headers['x-forwarded-for'] ? event.headers['x-forwarded-for'].split(',')[0].trim() : undefined)
  );
}

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
  }

  // Provide public configuration (Turnstile site key) to client dynamically
  if (event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        turnstileSiteKey: process.env.TURNSTILE_SITE_KEY || '',
        isTurnstileActive: Boolean(process.env.TURNSTILE_SITE_KEY && process.env.TURNSTILE_SECRET_KEY)
      })
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const data = parseRequestBody(event);
    const clientIp = getClientIp(event);

    // 1. Honeypot check - Trap bots silently without sending emails
    if (isHoneypotTriggered(data)) {
      console.warn('[SECURITY] Bot submission trapped by honeypot. Request dropped.');
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Aanvraag succesvol ontvangen.'
        })
      };
    }

    // 2. Velocity check - Bot fill speed anomaly (< 1500ms)
    if (isSubmissionTooFast(data.fill_time_ms)) {
      console.warn('[SECURITY] Bot submission trapped by velocity guard. Request dropped.');
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Aanvraag succesvol ontvangen.'
        })
      };
    }

    const {
      name,
      email,
      phone = 'Niet opgegeven',
      event_date = 'Nader te bepalen',
      location = 'Niet opgegeven',
      event_type = 'Particulier',
      format = 'Solo',
      sets = '3 uur',
      message = '',
      gekozen_configuratie = '',
      cf_turnstile_response,
      turnstile_token
    } = data;

    // 3. Rate limiting check
    const rateCheck = checkRateLimit(clientIp, email);
    if (!rateCheck.allowed) {
      return {
        statusCode: rateCheck.status || 429,
        headers,
        body: JSON.stringify({ error: rateCheck.error })
      };
    }

    // 4. Strict input validations
    const nameCheck = validateName(name);
    if (!nameCheck.valid) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: nameCheck.error }) };
    }

    const emailCheck = validateEmail(email);
    if (!emailCheck.valid) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: emailCheck.error }) };
    }

    const dateCheck = validateEventDate(event_date);
    if (!dateCheck.valid) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: dateCheck.error }) };
    }

    const locationCheck = validateLocation(location);
    if (!locationCheck.valid) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: locationCheck.error }) };
    }

    const phoneCheck = validatePhone(phone);
    if (!phoneCheck.valid) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: phoneCheck.error }) };
    }

    const messageCheck = validateMessage(message);
    if (!messageCheck.valid) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: messageCheck.error }) };
    }

    // 5. Cloudflare Turnstile verification
    const token = cf_turnstile_response || turnstile_token || data['cf-turnstile-response'];
    const turnstileResult = await verifyTurnstileToken(token, clientIp);
    if (!turnstileResult.success) {
      console.warn('[SECURITY] Turnstile verification failed:', turnstileResult['error-codes'] || turnstileResult.error);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: 'Beveiligingscontrole mislukt. Vernieuw de pagina en probeer het opnieuw.'
        })
      };
    }

    // 6. Validate Brevo credentials before sending
    const brevoApiKey = process.env.BREVO_API_KEY;
    const senderEmail = process.env.SENDER_EMAIL || 'info@haagseopenmic.nl';
    const artistEmail = process.env.ARTIST_EMAIL || 'boekingen@reaumusic.nl';

    if (!brevoApiKey) {
      console.error('BREVO_API_KEY is niet ingesteld in environment variables.');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'E-mailservice configuratie ontbreekt (BREVO_API_KEY).' })
      };
    }

    // 7. Construct email payload
    const configLabel = gekozen_configuratie || `${format} • ${sets} • ${event_type}`;
    const emailPayloadData = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      event_date,
      location: location.trim(),
      event_type,
      format,
      sets,
      message: message.trim(),
      configLabel
    };

    const artistHtml = getArtistEmailHtml(emailPayloadData, artistEmail);
    const clientHtml = getClientEmailHtml(emailPayloadData, artistEmail);

    const brevoPayload = {
      sender: { name: 'Reau Boekingen', email: senderEmail },
      subject: `Boekingsaanvraag Reau: ${name} (${format})`,
      htmlContent: artistHtml,
      messageVersions: [
        {
          to: [{ email: artistEmail, name: 'Ro Halfhide' }],
          replyTo: { email: email.trim(), name: name.trim() },
          subject: `Boekingsaanvraag Reau: ${name} (${format}, ${event_date})`,
          htmlContent: artistHtml
        },
        {
          to: [{ email: email.trim(), name: name.trim() }],
          replyTo: { email: artistEmail, name: 'Ro Halfhide' },
          subject: 'Ontvangstbevestiging boekingsaanvraag Reau',
          htmlContent: clientHtml
        }
      ]
    };

    // 8. Send transactional emails via Brevo
    const brevoResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'api-key': brevoApiKey,
        'content-type': 'application/json'
      },
      body: JSON.stringify(brevoPayload)
    });

    const resText = await brevoResponse.text();
    let resJson;
    try {
      resJson = JSON.parse(resText);
    } catch (e) {
      resJson = { raw: resText };
    }

    if (!brevoResponse.ok) {
      console.error('Brevo API Error:', resJson);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: 'Fout bij verzenden via e-mailservice.',
          details: resJson
        })
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Aanvraag succesvol verstuurd en bevestiging gemaild.'
      })
    };
  } catch (err) {
    console.error('Server error in send-booking:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message || 'Onbekende fout' })
    };
  }
};
