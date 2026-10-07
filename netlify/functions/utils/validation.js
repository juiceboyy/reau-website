/**
 * Netlify Function Utilities - Security & Input Validation
 * Protects booking submissions against automated bot spam, honeypots,
 * gibberish string generators, past dates, and invalid emails.
 */

/**
 * Checks whether any honeypot field has been filled in.
 */
function isHoneypotTriggered(data) {
  if (!data || typeof data !== 'object') return false;
  const candidates = [
    data['bot-field'],
    data.bot_field,
    data.botField,
    data.website,
    data.url
  ];
  return candidates.some((val) => typeof val === 'string' && val.trim().length > 0);
}

/**
 * Detects whether a string is a machine-generated random alphanumeric sequence
 * (such as "RKuQcpyCXNCryQkuqDjoqaG" or Base64 / high-entropy bot strings).
 */
function isGibberishOrBotString(str, maxSingleWordLength = 22) {
  if (!str || typeof str !== 'string') return false;
  const trimmed = str.trim();
  if (!trimmed) return false;

  const tokens = trimmed.split(/[\s-]+/).filter(Boolean);
  for (const token of tokens) {
    // 1. Single contiguous word exceeding allowable maximum length
    if (token.length > maxSingleWordLength) return true;

    // 2. Random mixed-case transitions: [a-z][A-Z] occurring 2 or more times
    const mixedCaseTransitions = token.match(/[a-z][A-Z]/g);
    if (mixedCaseTransitions && mixedCaseTransitions.length >= 2) return true;

    // 3. Excessive consecutive consonants (6 or more)
    if (/[bcdfghjklmnpqrstvwxz]{6,}/i.test(token)) return true;
  }

  // 4. Overall string length without spaces or hyphens
  if (trimmed.length > 18 && !trimmed.includes(' ') && !trimmed.includes('-')) {
    return true;
  }

  return false;
}

/**
 * Validates applicant name.
 */
function validateName(name) {
  if (!name || typeof name !== 'string') {
    return { valid: false, error: 'Naam is verplicht.' };
  }
  const trimmed = name.trim();
  if (trimmed.length < 2) {
    return { valid: false, error: 'Naam moet minimaal 2 tekens bevatten.' };
  }
  if (trimmed.length > 70) {
    return { valid: false, error: 'Naam is te lang (maximaal 70 tekens).' };
  }
  if (/[0-9]/.test(trimmed)) {
    return { valid: false, error: 'Een geldige naam bevat geen cijfers.' };
  }
  if (/[@#$%^*_=~<>/\\{}[\]|+]/.test(trimmed)) {
    return { valid: false, error: 'Een geldige naam bevat geen speciale symbolen.' };
  }
  const nameRegex = /^[\p{L}][\p{L}\s.'-]*[\p{L}.]$/u;
  if (!nameRegex.test(trimmed)) {
    return { valid: false, error: 'Vul een geldige voor- en achternaam in.' };
  }
  if (isGibberishOrBotString(trimmed, 22)) {
    return { valid: false, error: 'Vul een geldige naam in zonder willekeurige tekenreeksen.' };
  }
  return { valid: true };
}

/**
 * Validates email address format strictly.
 */
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
  return { valid: true };
}

/**
 * Validates event date (must not be in the past).
 */
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

    if (
      eventDate.getFullYear() !== year ||
      eventDate.getMonth() !== month ||
      eventDate.getDate() !== day
    ) {
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
  if (!isNaN(parsed.getTime())) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (parsed < today) {
      return { valid: false, error: 'De datum van het evenement kan niet in het verleden liggen.' };
    }
  }

  return { valid: true };
}

/**
 * Validates location / venue.
 */
function validateLocation(location) {
  if (!location || typeof location !== 'string') return { valid: true };
  const trimmed = location.trim();
  if (trimmed === '' || trimmed === 'Niet opgegeven') return { valid: true };
  if (trimmed.length > 120) {
    return { valid: false, error: 'Locatie is te lang (maximaal 120 tekens).' };
  }
  if (isGibberishOrBotString(trimmed, 26)) {
    return { valid: false, error: 'Vul een geldige plaats of locatie in.' };
  }
  return { valid: true };
}

/**
 * Validates optional phone number.
 */
function validatePhone(phone) {
  if (!phone || typeof phone !== 'string') return { valid: true };
  const trimmed = phone.trim();
  if (trimmed === '' || trimmed === 'Niet opgegeven') return { valid: true };
  if (!/^[0-9+\-().\s]{6,25}$/.test(trimmed)) {
    return { valid: false, error: 'Vul een geldig telefoonnummer in.' };
  }
  return { valid: true };
}

/**
 * Verifies Cloudflare Turnstile token via Cloudflare siteverify endpoint.
 */
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
    const data = await res.json();
    return data;
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
  verifyTurnstileToken
};
