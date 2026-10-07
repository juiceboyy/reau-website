/**
 * Comprehensive Automated Test Suite for Booking Form Anti-Spam Security
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
  verifyTurnstileToken
} = require('../netlify/functions/utils/validation');

const { handler } = require('../netlify/functions/send-booking');

let passedTests = 0;
let totalTests = 0;

function runTest(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ FAIL: ${name}\n    ${err.message}`);
    process.exitCode = 1;
  }
}

async function runAsyncTest(name, fn) {
  totalTests++;
  try {
    await fn();
    console.log(`  ✓ ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ FAIL: ${name}\n    ${err.message}`);
    process.exitCode = 1;
  }
}

console.log('\n--- 1. Testing Honeypot Traps ---');
runTest('Traps bot when bot-field is filled', () => {
  assert.strictEqual(isHoneypotTriggered({ 'bot-field': 'spam_bot_val' }), true);
});
runTest('Traps bot when bot_field is filled', () => {
  assert.strictEqual(isHoneypotTriggered({ bot_field: 'http://spam.ru' }), true);
});
runTest('Traps bot when website field is filled', () => {
  assert.strictEqual(isHoneypotTriggered({ website: 'http://example.com' }), true);
});
runTest('Traps bot when url field is filled', () => {
  assert.strictEqual(isHoneypotTriggered({ url: 'promo-link' }), true);
});
runTest('Allows legitimate submission with empty honeypots', () => {
  assert.strictEqual(isHoneypotTriggered({ 'bot-field': '', bot_field: '', website: '', name: 'Jan Jansen' }), false);
});

console.log('\n--- 2. Testing Gibberish Bot String Detection ---');
runTest('Detects the exact attack string "RKuQcpyCXNCryQkuqDjoqaG" as bot', () => {
  assert.strictEqual(isGibberishOrBotString('RKuQcpyCXNCryQkuqDjoqaG'), true);
});
runTest('Detects random mixed-case tokens', () => {
  assert.strictEqual(isGibberishOrBotString('aBcDeFgHiJkLmN'), true);
  assert.strictEqual(isGibberishOrBotString('mYnAmEiSbOt'), true);
});
runTest('Detects single unbroken token > 22 characters', () => {
  assert.strictEqual(isGibberishOrBotString('abcdefghijklmnopqrstuvwxy'), true);
});
runTest('Detects excessive consecutive consonants', () => {
  assert.strictEqual(isGibberishOrBotString('bcdfghjklm'), true);
});
runTest('Accepts legitimate single and compound names', () => {
  assert.strictEqual(isGibberishOrBotString('Ro Halfhide'), false);
  assert.strictEqual(isGibberishOrBotString('Ronald van Holst'), false);
  assert.strictEqual(isGibberishOrBotString('Lucky Fonz III'), false);
  assert.strictEqual(isGibberishOrBotString('Jean-Paul Sartre'), false);
  assert.strictEqual(isGibberishOrBotString('McDonald'), false);
  assert.strictEqual(isGibberishOrBotString("O'Connor"), false);
  assert.strictEqual(isGibberishOrBotString('Renée Müller'), false);
});

console.log('\n--- 3. Testing Name Validation ---');
runTest('Rejects bot string "RKuQcpyCXNCryQkuqDjoqaG"', () => {
  assert.strictEqual(validateName('RKuQcpyCXNCryQkuqDjoqaG').valid, false);
});
runTest('Rejects names containing numbers', () => {
  assert.strictEqual(validateName('John123').valid, false);
  assert.strictEqual(validateName('Bot99').valid, false);
});
runTest('Rejects names containing special symbols', () => {
  assert.strictEqual(validateName('Test@Name').valid, false);
  assert.strictEqual(validateName('<script>').valid, false);
});
runTest('Rejects empty or too short names', () => {
  assert.strictEqual(validateName('').valid, false);
  assert.strictEqual(validateName('A').valid, false);
});
runTest('Accepts valid full names', () => {
  assert.strictEqual(validateName('Ro Halfhide').valid, true);
  assert.strictEqual(validateName('Marcus Bruystens').valid, true);
  assert.strictEqual(validateName('Jan-Willem van den Berg').valid, true);
});

console.log('\n--- 4. Testing Date Validation ---');
runTest('Rejects the exact attack date "1970-05-31"', () => {
  const res = validateEventDate('1970-05-31');
  assert.strictEqual(res.valid, false);
  assert.match(res.error, /verleden/);
});
runTest('Rejects yesterday as an event date', () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yStr = yesterday.toISOString().split('T')[0];
  assert.strictEqual(validateEventDate(yStr).valid, false);
});
runTest('Accepts today and future dates', () => {
  const today = new Date().toISOString().split('T')[0];
  assert.strictEqual(validateEventDate(today).valid, true);
  const future = new Date();
  future.setFullYear(future.getFullYear() + 1);
  assert.strictEqual(validateEventDate(future.toISOString().split('T')[0]).valid, true);
});
runTest('Accepts "Nader te bepalen" and empty strings', () => {
  assert.strictEqual(validateEventDate('Nader te bepalen').valid, true);
  assert.strictEqual(validateEventDate('').valid, true);
});

console.log('\n--- 5. Testing Email Validation ---');
runTest('Accepts valid email formats', () => {
  assert.strictEqual(validateEmail('boekingen@reaumusic.nl').valid, true);
  assert.strictEqual(validateEmail('user.name+tag@sub.domain.com').valid, true);
  assert.strictEqual(validateEmail('contact@bedrijf.nl').valid, true);
});
runTest('Rejects invalid email structures', () => {
  assert.strictEqual(validateEmail('not-an-email').valid, false);
  assert.strictEqual(validateEmail('user@domain').valid, false);
  assert.strictEqual(validateEmail('user@domain.c').valid, false);
  assert.strictEqual(validateEmail('user..test@domain.com').valid, false);
  assert.strictEqual(validateEmail('user@ domain.com').valid, false);
});

console.log('\n--- 6. Testing Location and Phone Validation ---');
runTest('Rejects bot string in location', () => {
  assert.strictEqual(validateLocation('RKuQcpyCXNCryQkuqDjoqaG').valid, false);
});
runTest('Accepts valid Dutch venues and addresses', () => {
  assert.strictEqual(validateLocation('Amsterdam').valid, true);
  assert.strictEqual(validateLocation('Huiskamerconcert Utrecht').valid, true);
  assert.strictEqual(validateLocation('Keizersgracht 101, Amsterdam').valid, true);
  assert.strictEqual(validateLocation('Niet opgegeven').valid, true);
});
runTest('Rejects bot strings in phone', () => {
  assert.strictEqual(validatePhone('RKuQcpyCXNCryQkuqDjoqaG').valid, false);
});
runTest('Accepts valid phone formats', () => {
  assert.strictEqual(validatePhone('06-12345678').valid, true);
  assert.strictEqual(validatePhone('+31 6 12345678').valid, true);
  assert.strictEqual(validatePhone('Niet opgegeven').valid, true);
});

console.log('\n--- 7. Testing Turnstile Verification Function ---');
(async () => {
  await runAsyncTest('Rejects missing token when TURNSTILE_SECRET_KEY is configured', async () => {
    process.env.TURNSTILE_SECRET_KEY = 'test_secret_key';
    const res = await verifyTurnstileToken('', '127.0.0.1');
    assert.strictEqual(res.success, false);
    delete process.env.TURNSTILE_SECRET_KEY;
  });

  console.log('\n--- 8. Testing Full Handler Integration & Security Interception ---');
  await runAsyncTest('Honeypot interception drops request silently with HTTP 200 without Brevo call', async () => {
    const event = {
      httpMethod: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        name: 'Spam Bot',
        email: 'bot@spam.com',
        'bot-field': 'I am a bot',
        event_date: '2027-01-01'
      })
    };
    const res = await handler(event);
    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(JSON.parse(res.body).success, true);
  });

  await runAsyncTest('Rejects bot payload with gibberish name "RKuQcpyCXNCryQkuqDjoqaG" (HTTP 400)', async () => {
    const event = {
      httpMethod: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        name: 'RKuQcpyCXNCryQkuqDjoqaG',
        email: 'random@botmail.com',
        event_date: '2027-01-01'
      })
    };
    const res = await handler(event);
    assert.strictEqual(res.statusCode, 400);
    assert.match(JSON.parse(res.body).error, /naam/);
  });

  await runAsyncTest('Rejects bot payload with past date "1970-05-31" (HTTP 400)', async () => {
    const event = {
      httpMethod: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        name: 'Echte Klant',
        email: 'klant@example.com',
        event_date: '1970-05-31'
      })
    };
    const res = await handler(event);
    assert.strictEqual(res.statusCode, 400);
    assert.match(JSON.parse(res.body).error, /verleden/);
  });

  await runAsyncTest('Rejects bot payload with invalid email (HTTP 400)', async () => {
    const event = {
      httpMethod: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        name: 'Echte Klant',
        email: 'invalid-email-address',
        event_date: '2027-01-01'
      })
    };
    const res = await handler(event);
    assert.strictEqual(res.statusCode, 400);
    assert.match(JSON.parse(res.body).error, /e-mail/);
  });

  await runAsyncTest('Rejects submission without Turnstile token when TURNSTILE_SECRET_KEY is enforced (HTTP 400)', async () => {
    process.env.TURNSTILE_SECRET_KEY = 'real_turnstile_secret';
    const event = {
      httpMethod: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        name: 'Echte Klant',
        email: 'klant@example.com',
        event_date: '2027-01-01',
        location: 'Amsterdam'
      })
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
