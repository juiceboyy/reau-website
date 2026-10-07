/**
 * Security and Bot Mitigation Test Suite for Reau Website
 * Validates honeypots, gibberish detection, input sanitization, rate limiting, and handler integration.
 */

const assert = require('assert');
const {
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
} = require('../netlify/functions/utils/validation');

const { checkRateLimit, resetRateLimits } = require('../netlify/functions/utils/rate-limiter');
const { handler } = require('../netlify/functions/send-booking');

let totalTests = 0;
let passedTests = 0;

function runTest(description, fn) {
  totalTests++;
  try {
    fn();
    passedTests++;
    console.log(`  ✓ ${description}`);
  } catch (err) {
    console.error(`  ✗ ${description}`);
    console.error(`    ${err.message}`);
    process.exitCode = 1;
  }
}

async function runAsyncTest(description, fn) {
  totalTests++;
  try {
    await fn();
    passedTests++;
    console.log(`  ✓ ${description}`);
  } catch (err) {
    console.error(`  ✗ ${description}`);
    console.error(`    ${err.message}`);
    process.exitCode = 1;
  }
}

console.log('--- 1. Testing Honeypot Traps ---');
runTest('Traps bot when bot-field is filled', () => {
  assert.strictEqual(isHoneypotTriggered({ 'bot-field': 'spam' }), true);
});
runTest('Traps bot when website field is filled', () => {
  assert.strictEqual(isHoneypotTriggered({ website: 'https://spam.com' }), true);
  assert.strictEqual(isHoneypotTriggered({ website_url: 'spam' }), true);
});
runTest('Allows legitimate submission with empty honeypots', () => {
  assert.strictEqual(isHoneypotTriggered({ name: 'Ro Halfhide', email: 'halfhide@gmail.com' }), false);
});

console.log('\n--- 2. Testing Gibberish Bot String Detection ---');
runTest('Detects the exact attack string "RKuQcpyCXNCryQkuqDjoqaG"', () => {
  assert.strictEqual(isGibberishOrBotString('RKuQcpyCXNCryQkuqDjoqaG'), true);
});
runTest('Detects random mixed-case tokens and consonant clusters', () => {
  assert.strictEqual(isGibberishOrBotString('qWkLsPzxTr'), true);
  assert.strictEqual(isGibberishOrBotString('cxncryqku'), true);
});
runTest('Detects long unbroken single token > 18 chars', () => {
  assert.strictEqual(isGibberishOrBotString('superlongrandomtokenwithoutspaces'), true);
});
runTest('Accepts legitimate single and compound Dutch/international names', () => {
  assert.strictEqual(isGibberishOrBotString('Ro Halfhide'), false);
  assert.strictEqual(isGibberishOrBotString('Ronald van Holst'), false);
  assert.strictEqual(isGibberishOrBotString('Lucky Fonz III'), false);
  assert.strictEqual(isGibberishOrBotString("O'Connor"), false);
  assert.strictEqual(isGibberishOrBotString('Renée Müller'), false);
});

console.log('\n--- 3. Testing Name Validation ---');
runTest('Rejects bot string "RKuQcpyCXNCryQkuqDjoqaG"', () => {
  assert.strictEqual(validateName('RKuQcpyCXNCryQkuqDjoqaG').valid, false);
});
runTest('Rejects names containing numbers or special symbols', () => {
  assert.strictEqual(validateName('John123').valid, false);
  assert.strictEqual(validateName('<script>alert()</script>').valid, false);
});
runTest('Accepts valid full names', () => {
  assert.strictEqual(validateName('Ro Halfhide').valid, true);
  assert.strictEqual(validateName('Jan-Willem van den Berg').valid, true);
});

console.log('\n--- 4. Testing Date Validation ---');
runTest('Rejects the exact attack date "1970-05-31"', () => {
  const res = validateEventDate('1970-05-31');
  assert.strictEqual(res.valid, false);
  assert.match(res.error, /verleden/);
});
runTest('Rejects unparseable and garbage date strings', () => {
  assert.strictEqual(validateEventDate('garbage12345').valid, false);
  assert.strictEqual(validateEventDate('1970').valid, false);
});
runTest('Accepts today, future dates, and empty strings', () => {
  const today = new Date().toISOString().split('T')[0];
  assert.strictEqual(validateEventDate(today).valid, true);
  assert.strictEqual(validateEventDate('Nader te bepalen').valid, true);
});

console.log('\n--- 5. Testing Email Validation ---');
runTest('Accepts valid email formats', () => {
  assert.strictEqual(validateEmail('boekingen@reaumusic.nl').valid, true);
});
runTest('Rejects attack email with gibberish username', () => {
  assert.strictEqual(validateEmail('RKuQcpyCXNCryQkuqDjoqaG@gmail.com').valid, false);
});
runTest('Rejects disposable burner email domains', () => {
  assert.strictEqual(validateEmail('spammer@sharklasers.com').valid, false);
  assert.strictEqual(validateEmail('spammer@mailinator.com').valid, false);
});

console.log('\n--- 6. Testing Location, Phone & Message Validation ---');
runTest('Rejects spam URLs in location', () => {
  assert.strictEqual(validateLocation('https://spam-viagra.ru/buy').valid, false);
});
runTest('Accepts valid physical locations and phone numbers', () => {
  assert.strictEqual(validateLocation('Amsterdam').valid, true);
  assert.strictEqual(validatePhone('06-12345678').valid, true);
  assert.strictEqual(validatePhone('RKuQcpyCXNCryQkuqDjoqaG').valid, false);
});
runTest('Validates message length and filters excessive links', () => {
  assert.strictEqual(validateMessage('Heel veel zin in het optreden!').valid, true);
  assert.strictEqual(validateMessage('Check http://a.com and http://b.com').valid, false);
});

console.log('\n--- 7. Testing Velocity and Rate Limiting ---');
runTest('Detects bot submission velocity (< 1500ms)', () => {
  assert.strictEqual(isSubmissionTooFast(250), true);
  assert.strictEqual(isSubmissionTooFast(3500), false);
});
runTest('Enforces rate limiting on repeated requests', () => {
  resetRateLimits();
  assert.strictEqual(checkRateLimit('192.168.1.1', 'user@test.nl').allowed, true);
  // Burst interval guard (< 3s)
  const burst = checkRateLimit('192.168.1.1', 'user@test.nl');
  assert.strictEqual(burst.allowed, false);
  assert.strictEqual(burst.status, 429);
  resetRateLimits();
});

console.log('\n--- 8. Testing Handler Integration ---');
(async () => {
  resetRateLimits();

  await runAsyncTest('GET request returns Turnstile configuration', async () => {
    const res = await handler({ httpMethod: 'GET' });
    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(typeof JSON.parse(res.body).turnstileSiteKey, 'string');
  });

  await runAsyncTest('Honeypot interception drops request silently with HTTP 200', async () => {
    const event = {
      httpMethod: 'POST',
      headers: { 'content-type': 'application/json', 'client-ip': '10.0.0.1' },
      body: JSON.stringify({ name: 'Bot', email: 'bot@spam.com', 'bot-field': 'I am bot' })
    };
    const res = await handler(event);
    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(JSON.parse(res.body).success, true);
  });

  await runAsyncTest('Velocity guard drops sub-1.5s submission silently with HTTP 200', async () => {
    resetRateLimits();
    const event = {
      httpMethod: 'POST',
      headers: { 'content-type': 'application/json', 'client-ip': '10.0.0.2' },
      body: JSON.stringify({ name: 'Bot', email: 'bot@spam.com', fill_time_ms: 120 })
    };
    const res = await handler(event);
    assert.strictEqual(res.statusCode, 200);
  });

  await runAsyncTest('Rejects bot payload with gibberish name "RKuQcpyCXNCryQkuqDjoqaG" (HTTP 400)', async () => {
    resetRateLimits();
    const event = {
      httpMethod: 'POST',
      headers: { 'content-type': 'application/json', 'client-ip': '10.0.0.3' },
      body: JSON.stringify({ name: 'RKuQcpyCXNCryQkuqDjoqaG', email: 'klant@domain.com', event_date: '2027-01-01', fill_time_ms: 5000 })
    };
    const res = await handler(event);
    assert.strictEqual(res.statusCode, 400);
    assert.match(JSON.parse(res.body).error, /naam/);
  });

  await runAsyncTest('Rejects bot payload with past date "1970-05-31" (HTTP 400)', async () => {
    resetRateLimits();
    const event = {
      httpMethod: 'POST',
      headers: { 'content-type': 'application/json', 'client-ip': '10.0.0.4' },
      body: JSON.stringify({ name: 'Echte Klant', email: 'klant@domain.com', event_date: '1970-05-31', fill_time_ms: 5000 })
    };
    const res = await handler(event);
    assert.strictEqual(res.statusCode, 400);
    assert.match(JSON.parse(res.body).error, /verleden/);
  });

  await runAsyncTest('Rejects bot payload with gibberish email (HTTP 400)', async () => {
    resetRateLimits();
    const event = {
      httpMethod: 'POST',
      headers: { 'content-type': 'application/json', 'client-ip': '10.0.0.5' },
      body: JSON.stringify({ name: 'Echte Klant', email: 'RKuQcpyCXNCryQkuqDjoqaG@gmail.com', event_date: '2027-01-01', fill_time_ms: 5000 })
    };
    const res = await handler(event);
    assert.strictEqual(res.statusCode, 400);
    assert.match(JSON.parse(res.body).error, /e-mail/);
  });

  await runAsyncTest('Rejects bot payload with spam URL in location (HTTP 400)', async () => {
    resetRateLimits();
    const event = {
      httpMethod: 'POST',
      headers: { 'content-type': 'application/json', 'client-ip': '10.0.0.6' },
      body: JSON.stringify({ name: 'Echte Klant', email: 'klant@domain.com', location: 'https://spam.ru', event_date: '2027-01-01', fill_time_ms: 5000 })
    };
    const res = await handler(event);
    assert.strictEqual(res.statusCode, 400);
    assert.match(JSON.parse(res.body).error, /locatie/);
  });

  await runAsyncTest('Enforces Turnstile token when TURNSTILE_SECRET_KEY is configured (HTTP 400)', async () => {
    resetRateLimits();
    process.env.TURNSTILE_SECRET_KEY = 'real_secret_key';
    const event = {
      httpMethod: 'POST',
      headers: { 'content-type': 'application/json', 'client-ip': '10.0.0.7' },
      body: JSON.stringify({ name: 'Echte Klant', email: 'klant@domain.com', event_date: '2027-01-01', location: 'Amsterdam', fill_time_ms: 5000 })
    };
    const res = await handler(event);
    assert.strictEqual(res.statusCode, 400);
    assert.match(JSON.parse(res.body).error, /Beveiligingscontrole/);
    delete process.env.TURNSTILE_SECRET_KEY;
  });

  console.log(`\nResults: ${passedTests}/${totalTests} tests passed.\n`);
  if (passedTests === totalTests) {
    console.log('ALL SECURITY AND VALIDATION TESTS PASSED SUCCESSFULLY!\n');
  } else {
    process.exit(1);
  }
})();
