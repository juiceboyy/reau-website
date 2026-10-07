/**
 * Netlify Function Utilities - Email HTML Templates
 * Generates transactional email HTML for artist notifications and client confirmations.
 */

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getArtistEmailHtml(data, artistEmail) {
  const {
    name,
    email,
    phone = 'Niet opgegeven',
    event_date = 'Nader te bepalen',
    location = 'Niet opgegeven',
    configLabel,
    message = ''
  } = data;

  const formattedDate = new Date().toLocaleDateString('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #FDFBF7; padding: 24px; border-radius: 12px; color: #251D1A; border: 1px solid #EAE1D2;">
      <div style="border-bottom: 2px solid #C86D51; padding-bottom: 16px; margin-bottom: 20px;">
        <h2 style="color: #C86D51; margin: 0; font-size: 22px;">Nieuwe Boekingsaanvraag via reau.netlify.app</h2>
        <p style="margin: 4px 0 0 0; color: #6B6059; font-size: 13px;">Ontvangen op ${formattedDate}</p>
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
}

function getClientEmailHtml(data, publicEmail = 'boekingen@reaumusic.nl') {
  const {
    name,
    email,
    phone = 'Niet opgegeven',
    event_date = 'Nader te bepalen',
    location = 'Niet opgegeven',
    configLabel,
    message = ''
  } = data;

  return `
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
          <li><strong>Aanvrager:</strong> ${escapeHtml(name)}</li>
          <li><strong>E-mail:</strong> ${escapeHtml(email)}</li>
          <li><strong>Telefoon:</strong> ${escapeHtml(phone)}</li>
          <li><strong>Datum:</strong> ${escapeHtml(event_date)}</li>
          <li><strong>Locatie:</strong> ${escapeHtml(location)}</li>
          <li><strong>Configuratie:</strong> ${escapeHtml(configLabel)}</li>
          ${message ? `<li><strong>Aanvullende wensen:</strong> ${escapeHtml(message)}</li>` : ''}
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
        E-mail: <a href="mailto:${publicEmail}" style="color: #C86D51;">${publicEmail}</a> • Website: <a href="https://reaumusic.nl" style="color: #C86D51;">reaumusic.nl</a>
      </div>
    </div>
  `;
}

module.exports = {
  escapeHtml,
  getArtistEmailHtml,
  getClientEmailHtml
};
