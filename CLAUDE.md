# Reau Website Project Guidelines

## Overview
Solo music artist website for **Reau** (Ro Halfhide).
- Musical style: Soulful acoustic pop, reimagined covers (Bill Withers, Nina Simone, Smokey Robinson, Bob Marley) & original stories.
- Warm, earthy acoustic aesthetic (linen `#FDFBF7`, sand `#F5EFE6`, terracotta `#C86D51`, amber `#D97706`, espresso `#251D1A`).
- Tech Rider / USP: 100% mobile battery-powered equipment, no power/electricity required on location; walking around among audience is possible. Custom PA coordination for audiences > 200 people.

## Live Formats:
- **Solo (Reau)**: De standaard kernact (akoestische gitaar & zang, optioneel met beats/backingtracks).
- **Reau XL**: Uitbreiding met extra muzikanten: Duo (+ Bassist) en Trio (+ Percussie).
- **Geen openbare tarieven of calculators**: In verband met samenwerking met externe boekers worden er GEEN tarieven, prijzen of calculatietools op de publieke website getoond. Tarieven en beschikbaarheid worden uitsluitend via de vrijblijvende offerteaanvraag of per direct contact gecommuniceerd.

## Code Quality & Architecture Rules:
- Keep all files under 300 lines by splitting into focused ES modules.
- Ensure the `DOMContentLoaded` guard is implemented in bootstrap:
  ```javascript
  if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
  } else {
      init();
  }
  ```
- **Geen 'hero' voor above-the-fold secties**: Gebruik nooit de term 'hero' voor UI-elementen, URLs, anchor links (`#top`), CSS-classes (`.bg-warm-top`), componenten (`top.js`) of functies (`renderTop`). Gebruik hiervoor altijd 'top' om verwarring bij eindgebruikers te voorkomen. De term 'hero' / 'held' is uitsluitend toegestaan in redactionele copy/teksten wanneer het de letterlijke betekenis betreft.
- Always push commits to GitHub (`origin/main` / `dev` / `test`).

## E-mail & Boekingen Architectuur (Brevo & Netlify Functions)
- **Verzending via achtergrondfunctie**: Boekingsaanvragen vanuit het formulier (`js/contact-form.js`) worden via AJAX gepost naar `/.netlify/functions/send-booking` (`netlify/functions/send-booking.js`).
- **Brevo API koppeling**: De serverless functie stuurt transactionele e-mails aan via de Brevo API (`https://api.brevo.com/v3/smtp/email`) met behulp van de Netlify environment variable `BREVO_API_KEY`.
- **Dual-delivery per aanvraag**:
  1. **Notificatie naar artiest**: Volledige aanvraaggegevens (naam, e-mail, telefoon, datum, locatie, gelegenheid, bezetting, speelduur en toelichting) naar `ARTIST_EMAIL` (`boekingen@reaumusic.nl`).
  2. **Klantbevestiging**: Een automatische ontvangstbevestiging namens Reau naar het e-mailadres van de aanvrager.
- **Domein, DNS & Forwarding**:
  - Domein: `reaumusic.nl` (geregistreerd bij `mijn.host`).
  - Domeinauthenticatie: DKIM, DMARC en SPF records zijn geconfigureerd in DNS voor Brevo.
  - Inkomende e-mail forwarding: via ImprovMX MX-records worden alle mails naar `@reaumusic.nl` doorgestuurd naar `halfhide@gmail.com`.

