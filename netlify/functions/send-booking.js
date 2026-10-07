/**
 * Netlify Serverless Function: send-booking
 * Dispatches booking notifications to Ro Halfhide (halfhide@gmail.com)
 * and confirmation emails to the applicant using Brevo API.
 * Hardened with honeypot traps, Cloudflare Turnstile verification, and strict input sanitization.
 */

const {
  isHoneypotTriggered,
  validateName,
  validateEmail,
  validateEventDate,
  validateLocation,
  validatePhone,
  verifyTurnstileToken
} = require('./utils/validation');

const {
  getArtistEmailHtml,
  getClientEmailHtml
} = require('./utils/email-templates');

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const data = JSON.parse(event.body || '{}');

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

    const {
      name,
      email,
      phone = 'Niet opgegeven',
      event_date = 'Nader te bepalen',
      location = 'Niet opgegeven',
      event_type = 'Particulier',
      format = 'Solo',
      sets = '3 sets',
      message = '',
      gekozen_configuratie = '',
      cf_turnstile_response,
      turnstile_token
    } = data;

    // 2. Strict input validation
    const nameCheck = validateName(name);
    if (!nameCheck.valid) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: nameCheck.error })
      };
    }

    const emailCheck = validateEmail(email);
    if (!emailCheck.valid) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: emailCheck.error })
      };
    }

    const dateCheck = validateEventDate(event_date);
    if (!dateCheck.valid) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: dateCheck.error })
      };
    }

    const locationCheck = validateLocation(location);
    if (!locationCheck.valid) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: locationCheck.error })
      };
    }

    const phoneCheck = validatePhone(phone);
    if (!phoneCheck.valid) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: phoneCheck.error })
      };
    }

    // 3. Cloudflare Turnstile verification
    const token = cf_turnstile_response || turnstile_token || data['cf-turnstile-response'];
    const clientIp = (event.headers && (
      event.headers['x-nf-client-connection-ip'] ||
      event.headers['client-ip'] ||
      (event.headers['x-forwarded-for'] ? event.headers['x-forwarded-for'].split(',')[0].trim() : undefined)
    )) || undefined;

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

    // 4. Validate Brevo credentials before sending
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

    // 5. Construct emails
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

    // 6. Send via Brevo API
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
