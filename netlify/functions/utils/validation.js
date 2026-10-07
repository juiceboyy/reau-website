/**
 * Netlify Function Utilities - Security & Input Validation
 * Protects booking submissions against automated bot spam, honeypots,
 * gibberish string generators, past dates, spam URLs, and invalid emails.
 */

const DISPOSABLE_EMAIL_DOMAINS = new Set([
  'mailinator.com', 'guerrillamail.com', 'sharklasers.com',
  'tempmail.com', 'temp-mail.org', 'yopmail.com',
  '10minutemail.com', 'trashmail.com', 'dispostable.com', 'getairmail.com'
]);

function isHoneypotTriggered(data) {
  if (!data || typeof data !== 'object') return false;
  const candidates = [
    data['bot-field'], data.bot_field, data.botField,
    data.website, data.website_url, data.url,
    data.company_url, data.comment_extra
  ];
  return candidates.some((val) => typeof val === 'string' && val.trim().length > 0);
}

function isGibberishOrBotString(str, maxSingleWordLength = 22) {
  if (!str || typeof str !== 'string') return false;
  const trimmed = str.trim();
  if (!trimmed) return false;

  const tokens = trimmed.split(/[\s-]+/).filter(Boolean);
  for (const token of tokens) {
    if (token.length > maxSingleWordLength) return true;
    const mixed = token.match(/[a-z][A-Z]/g);
    if (mixed && mixed.length >= 2) return true;
    if (/[bcdfghjklmnpqrstvwxz]{5,}/i.test(token)) return true;
    if (token.length >= 6 && !/[aeiouy]/i.test(token)) return true;
  }

  if (trimmed.length > 18 && !trimmed.includes(' ') && !trimmed.includes('-') && !trimmed.includes('.')) {
    return true;
  }
  return false;
}

function validateName(name) {
  if (!name || typeof name !== 'string') {
    return { valid: false, error: 'Naam is verplicht.' };
  }
  const trimmed = name.trim();
  if (trimmed.length < 2) return { valid: false, error: 'Naam moet minimaal 2 tekens bevatten.' };
  if (trimmed.length > 70) return { valid: false, error: 'Naam is te lang (maximaal 70 tekens).' };
  if (/[0-9]/.test(trimmed)) return { valid: false, error: 'Een geldige naam bevat geen cijfers.' };
  if (/[@#$%^*_=~<>/\\{}[\]|+]/.test(trimmed)) {
    return { valid: false, error: 'Een geldige naam bevat geen speciale symbolen.' };
  }
  const nameRegex = /^[\p{L}][\p{L}\s.'-]*[\p{L}.]$/u;
  if (!nameRegex.test(trimmed)) return { valid: false, error: 'Vul een geldige voor- en achternaam in.' };
  if (isGibberishOrBotString(trimmed, 22)) {
    return { valid: false, error: 'Vul een geldige naam in zonder willekeurige tekenreeksen.' };
  }
  return { valid: true };
}

function validateEmail(email) {
  if (!email || typeof email !== 'string') {
    return { valid: false, error: 'E-mailadres is verplicht.' };
  }
  const trimmed = email.trim();
  if (trimmed.length < 5 || trimmed.length > 254) {
    return { valid: false, error: 'Ongeldige lengte voor e-mailadres.' };
  }
  if (trimmed.includes('..') || /\s/.test(trimmed)) {
    return { valid: false, error: 'E-mailadres bevat ongeldige spaties of herhaalde punten.' };
  }
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(trimmed)) {
    return { valid: false, error: 'Vul een geldig e-mailadres in (bijv. naam@domein.nl).' };
  }
  const [localPart, domain] = trimmed.split('@');
  if (domain && DISPOSABLE_EMAIL_DOMAINS.has(domain.toLowerCase())) {
    return { valid: false, error: 'Tijdelijke wegwerp e-mailadressen worden niet geaccepteerd.' };
  }
  if (localPart && isGibberishOrBotString(localPart, 22)) {
    return { valid: false, error: 'Vul een geldig e-mailadres in zonder willekeurige tekenreeksen.' };
  }
  return { valid: true };
}

function validateEventDate(dateStr) {
  if (!dateStr || typeof dateStr !== 'string') return { valid: true };
  const trimmed = dateStr.trim();
  if (trimmed === '' || trimmed === 'Nader te bepalen' || trimmed === 'Niet opgegeven') {
    return { valid: true };
  }

  const isoMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(trimmed);
  if (isoMatch) {
    const year = parseInt(isoMatch[1], 10);
    const month = parseInt(isoMatch[2], 10) - 1;
    const day = parseInt(isoMatch[3], 10);
    const eventDate = new Date(year, month, day);

    if (eventDate.getFullYear() !== year || eventDate.getMonth() !== month || eventDate.getDate() !== day) {
      return { valid: false, error: 'De opgegeven datum is ongeldig.' };
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (eventDate < today) {
      return { valid: false, error: 'De datum van het evenement kan niet in het verleden liggen.' };
    }
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 5);
    if (eventDate > maxDate) {
      return { valid: false, error: 'De datum van het evenement ligt te ver in de toekomst.' };
    }
    return { valid: true };
  }

  const parsed = new Date(trimmed);
  if (isNaN(parsed.getTime())) {
    return { valid: false, error: 'De opgegeven datum is ongeldig.' };
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (parsed < today) {
    return { valid: false, error: 'De datum van het evenement kan niet in het verleden liggen.' };
  }
  return { valid: true };
}

function validateLocation(location) {
  if (!location || typeof location !== 'string') return { valid: true };
  const trimmed = location.trim();
  if (trimmed === '' || trimmed === 'Niet opgegeven') return { valid: true };
  if (trimmed.length > 120) return { valid: false, error: 'Locatie is te lang (maximaal 120 tekens).' };
  if (/https?:\/\/|www\.|\.ru\b|\.cn\b|\.xyz\b/i.test(trimmed)) {
    return { valid: false, error: 'Vul een geldige plaats of locatie in zonder links.' };
  }
  if (/[<>]/.test(trimmed)) return { valid: false, error: 'Locatie bevat ongeldige tekens.' };
  if (isGibberishOrBotString(trimmed, 26)) {
    return { valid: false, error: 'Vul een geldige plaats of locatie in.' };
  }
  return { valid: true };
}

function validatePhone(phone) {
  if (!phone || typeof phone !== 'string') return { valid: true };
  const trimmed = phone.trim();
  if (trimmed === '' || trimmed === 'Niet opgegeven') return { valid: true };
  if (!/^[0-9+\-().\s]{6,25}$/.test(trimmed)) {
    return { valid: false, error: 'Vul een geldig telefoonnummer in.' };
  }
  const digitsOnly = trimmed.replace(/\D/g, '');
  if (digitsOnly.length < 6) return { valid: false, error: 'Vul een geldig telefoonnummer in.' };
  return { valid: true };
}

function validateMessage(message) {
  if (!message || typeof message !== 'string') return { valid: true };
  const trimmed = message.trim();
  if (trimmed.length > 2500) return { valid: false, error: 'Bericht is te lang (maximaal 2500 tekens).' };
  const urlMatches = trimmed.match(/https?:\/\/|www\./gi);
  if (urlMatches && urlMatches.length > 1) return { valid: false, error: 'Bericht bevat te veel links.' };
  if (/<script/i.test(trimmed)) return { valid: false, error: 'Bericht bevat niet-toegestane code.' };
  return { valid: true };
}

function isSubmissionTooFast(fillTimeMs) {
  return typeof fillTimeMs === 'number' && fillTimeMs > 0 && fillTimeMs < 1500;
}

async function verifyTurnstileToken(token, remoteIp) {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  const activeSecret = secretKey || '1x0000000000000000000000000000000AA';

  if (!token) {
    if (secretKey) {
      return { success: false, error: 'Turnstile beveiligingstoken ontbreekt.' };
    }
    return { success: true, bypassed: true };
  }

  try {
    const body = new URLSearchParams();
    body.append('secret', activeSecret);
    body.append('response', token);
    if (remoteIp) body.append('remoteip', remoteIp);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body,
      signal: controller.signal
    });
    clearTimeout(timeout);
    return await res.json();
  } catch (err) {
    console.error('Fout bij verifiëren van Turnstile token:', err);
    return { success: false, error: 'Beveiligingscontrole kon niet worden voltooid.' };
  }
}

module.exports = {
  isHoneypotTriggered,
  isGibberishOrBotString,
  validateName,
  validateEmail,
  validateEventDate,
  validateLocation,
  validatePhone,
  validateMessage,
  isSubmissionTooFast,
  verifyTurnstileToken
};
