/**
 * Netlify Function Utility - Rate Limiting & Abuse Prevention
 * Protects Brevo transactional email quota from denial-of-wallet and bot flooding.
 */

const ipRequests = new Map();
const emailRequests = new Map();

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_IP = 5;
const MAX_REQUESTS_PER_EMAIL = 3;
const MIN_INTERVAL_PER_IP_MS = 3000; // 3 seconds burst guard

function cleanupExpired(map) {
  const now = Date.now();
  for (const [key, entry] of map.entries()) {
    if (now - entry.firstRequestTime > WINDOW_MS) {
      map.delete(key);
    }
  }
}

function checkRateLimit(clientIp, email) {
  const now = Date.now();

  // Periodic cleanup
  if (ipRequests.size > 500) cleanupExpired(ipRequests);
  if (emailRequests.size > 500) cleanupExpired(emailRequests);

  // 1. IP check
  if (clientIp) {
    const ipRecord = ipRequests.get(clientIp);
    if (ipRecord) {
      if (now - ipRecord.lastRequestTime < MIN_INTERVAL_PER_IP_MS) {
        return {
          allowed: false,
          error: 'Verzoeken worden te snel achter elkaar verstuurd. Wacht enkele seconden.',
          status: 429
        };
      }
      if (now - ipRecord.firstRequestTime < WINDOW_MS) {
        if (ipRecord.count >= MAX_REQUESTS_PER_IP) {
          return {
            allowed: false,
            error: 'Te veel aanvragen vanaf dit IP-adres. Probeer het later opnieuw of mail naar boekingen@reaumusic.nl.',
            status: 429
          };
        }
        ipRecord.count += 1;
        ipRecord.lastRequestTime = now;
      } else {
        ipRequests.set(clientIp, { count: 1, firstRequestTime: now, lastRequestTime: now });
      }
    } else {
      ipRequests.set(clientIp, { count: 1, firstRequestTime: now, lastRequestTime: now });
    }
  }

  // 2. Email check
  if (email && typeof email === 'string') {
    const normalizedEmail = email.trim().toLowerCase();
    const emailRecord = emailRequests.get(normalizedEmail);
    if (emailRecord) {
      if (now - emailRecord.firstRequestTime < WINDOW_MS) {
        if (emailRecord.count >= MAX_REQUESTS_PER_EMAIL) {
          return {
            allowed: false,
            error: 'Er zijn al meerdere aanvragen verzonden voor dit e-mailadres. We nemen spoedig contact op.',
            status: 429
          };
        }
        emailRecord.count += 1;
      } else {
        emailRequests.set(normalizedEmail, { count: 1, firstRequestTime: now });
      }
    } else {
      emailRequests.set(normalizedEmail, { count: 1, firstRequestTime: now });
    }
  }

  return { allowed: true };
}

function resetRateLimits() {
  ipRequests.clear();
  emailRequests.clear();
}

module.exports = {
  checkRateLimit,
  resetRateLimits
};
