/**
 * Netlify Serverless Function: send-booking
 * Dispatches booking notifications to Ro Halfhide (halfhide@gmail.com)
 * and confirmation emails to the applicant using Brevo API (no Netlify Pro plan required).
 */

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const SENDER_EMAIL = process.env.SENDER_EMAIL || 'info@haagseopenmic.nl';
const ARTIST_EMAIL = process.env.ARTIST_EMAIL || 'halfhide@gmail.com';

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

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

  if (!BREVO_API_KEY) {
    console.error('BREVO_API_KEY is niet ingesteld in environment variables.');
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'E-mailservice configuratie ontbreekt (BREVO_API_KEY).' })
    };
  }

  try {
    const data = JSON.parse(event.body || '{}');
    const {
      name,
      email,
      phone = 'Niet opgegeven',
      event_date = 'Nader te bepalen',
      location = 'Niet opgegeven',
      event_type = 'Particulier',
      format = 'Duo',
      sets = '3 sets',
      message = '',
      indicatie_tarief = 'Op aanvraag',
      gekozen_configuratie = ''
    } = data;

    if (!name || !email) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Naam en e-mailadres zijn verplicht.' })
      };
    }

    const configLabel = gekozen_configuratie || `${format} • ${sets} • ${event_type}`;

    // 1. Email naar Ro Halfhide
    const artistEmailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #FDFBF7; padding: 24px; border-radius: 12px; color: #251D1A; border: 1px solid #EAE1D2;">
        <div style="border-bottom: 2px solid #C86D51; padding-bottom: 16px; margin-bottom: 20px;">
          <h2 style="color: #C86D51; margin: 0; font-size: 22px;">Nieuwe Boekingsaanvraag via reau.netlify.app</h2>
          <p style="margin: 4px 0 0 0; color: #6B6059; font-size: 13px;">Ontvangen op ${new Date().toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
          <tr style="border-bottom: 1px solid #EAE1D2;">
            <td style="padding: 10px 0; font-weight: bold; width: 160px; color: #6B6059;">Aanvrager:</td>
            <td style="padding: 10px 0; color: #251D1A; font-weight: 600;">${escapeHtml(name)}</td>
          </tr>
          <tr style="border-bottom: 1px solid #EAE1D2;">
            <td style="padding: 10px 0; font-weight: bold; color: #6B6059;">E-mail:</td>
            <td style="padding: 10px 0;"><a href="mailto:${escapeHtml(email)}" style="color: #C86D51; text-decoration: none;">${escapeHtml(email)}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #EAE1D2;">
            <td style="padding: 10px 0; font-weight: bold; color: #6B6059;">Telefoon / WhatsApp:</td>
            <td style="padding: 10px 0; color: #251D1A;">${escapeHtml(phone)}</td>
          </tr>
          <tr style="border-bottom: 1px solid #EAE1D2;">
            <td style="padding: 10px 0; font-weight: bold; color: #6B6059;">Datum Evenement:</td>
            <td style="padding: 10px 0; color: #251D1A; font-weight: 600;">${escapeHtml(event_date)}</td>
          </tr>
          <tr style="border-bottom: 1px solid #EAE1D2;">
            <td style="padding: 10px 0; font-weight: bold; color: #6B6059;">Plaats / Locatie:</td>
            <td style="padding: 10px 0; color: #251D1A;">${escapeHtml(location)}</td>
          </tr>
          <tr style="border-bottom: 1px solid #EAE1D2;">
            <td style="padding: 10px 0; font-weight: bold; color: #6B6059;">Configuratie:</td>
            <td style="padding: 10px 0; color: #251D1A;">${escapeHtml(configLabel)}</td>
          </tr>
          <tr style="border-bottom: 1px solid #EAE1D2;">
            <td style="padding: 10px 0; font-weight: bold; color: #6B6059;">Tariefindicatie:</td>
            <td style="padding: 10px 0; color: #C86D51; font-weight: bold; font-size: 15px;">${escapeHtml(indicatie_tarief)}</td>
          </tr>
        </table>

        <div style="background-color: #FFFFFF; padding: 16px; border-radius: 8px; border: 1px solid #EAE1D2; margin-bottom: 20px;">
          <h4 style="margin: 0 0 8px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; color: #6B6059;">Aanvullende wensen / toelichting:</h4>
          <p style="margin: 0; font-size: 14px; line-height: 1.6; white-space: pre-line; color: #251D1A;">${message ? escapeHtml(message) : '<i>Geen aanvullende toelichting ingevuld.</i>'}</p>
        </div>

        <div style="text-align: center; margin-top: 24px; padding-top: 16px; border-top: 1px solid #EAE1D2; font-size: 12px; color: #6B6059;">
          Klik op 'Beantwoorden' om direct te reageren naar <strong>${escapeHtml(email)}</strong>.
        </div>
      </div>
    `;

    // 2. Bevestigingsmail naar de klant
    const clientEmailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #FDFBF7; padding: 28px; border-radius: 12px; color: #251D1A; border: 1px solid #EAE1D2;">
        <div style="text-align: center; border-bottom: 2px solid #C86D51; padding-bottom: 20px; margin-bottom: 24px;">
          <h1 style="color: #251D1A; margin: 0; font-family: Georgia, serif; font-size: 26px;">Reau</h1>
          <p style="color: #C86D51; margin: 4px 0 0 0; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; font-weight: bold;">Acoustic Soul & Stories</p>
        </div>

        <p style="font-size: 15px; line-height: 1.6; margin-bottom: 16px;">Beste ${escapeHtml(name)},</p>
        <p style="font-size: 14px; line-height: 1.6; color: #403833; margin-bottom: 20px;">
          Bedankt voor je aanvraag voor een optreden van <strong>Reau</strong>! Ik heb je gegevens in goede orde ontvangen en kijk er naar uit om van je gelegenheid een bijzondere muzikale ervaring te maken.
        </p>

        <div style="background-color: #FFFFFF; padding: 20px; border-radius: 10px; border: 1px solid #EAE1D2; margin-bottom: 24px;">
          <h3 style="margin: 0 0 12px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #C86D51;">Overzicht van je aanvraag:</h3>
          <ul style="margin: 0; padding-left: 18px; font-size: 13px; line-height: 1.8; color: #251D1A;">
            <li><strong>Datum:</strong> ${escapeHtml(event_date)}</li>
            <li><strong>Locatie:</strong> ${escapeHtml(location)}</li>
            <li><strong>Configuratie:</strong> ${escapeHtml(configLabel)}</li>
            <li><strong>Indicatie:</strong> ${escapeHtml(indicatie_tarief)}</li>
          </ul>
        </div>

        <p style="font-size: 14px; line-height: 1.6; color: #403833; margin-bottom: 20px;">
          Ik neem zo snel mogelijk (meestal binnen 24 tot 48 uur) persoonlijk contact met je op voor de beschikbaarheid en een passend voorstel op maat.
        </p>

        <p style="font-size: 14px; line-height: 1.6; margin-bottom: 28px;">
          Met muzikale groet,<br>
          <strong>Ro Halfhide</strong><br>
          <span style="font-size: 12px; color: #6B6059;">Reau | Acoustic Soul</span>
        </p>

        <div style="border-top: 1px solid #EAE1D2; padding-top: 16px; text-align: center; font-size: 12px; color: #6B6059;">
          E-mail: <a href="mailto:${ARTIST_EMAIL}" style="color: #C86D51;">${ARTIST_EMAIL}</a> • Website: <a href="https://reau.netlify.app" style="color: #C86D51;">reau.netlify.app</a>
        </div>
      </div>
    `;

    const brevoPayload = {
      sender: { name: 'Reau Boekingen', email: SENDER_EMAIL },
      subject: `Boekingsaanvraag Reau: ${name} (${format})`,
      htmlContent: artistEmailHtml,
      messageVersions: [
        {
          to: [{ email: ARTIST_EMAIL, name: 'Ro Halfhide' }],
          replyTo: { email: email, name: name },
          subject: `Boekingsaanvraag Reau: ${name} (${format}, ${event_date})`,
          htmlContent: artistEmailHtml
        },
        {
          to: [{ email: email, name: name }],
          replyTo: { email: ARTIST_EMAIL, name: 'Ro Halfhide' },
          subject: `Ontvangstbevestiging boekingsaanvraag Reau`,
          htmlContent: clientEmailHtml
        }
      ]
    };

    const brevoResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'api-key': BREVO_API_KEY,
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
