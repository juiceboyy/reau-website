# Reau Website Project Guidelines

## Overview
Solo music artist website for **Reau** (Ro Halfhide).
- Musical style: Soulful acoustic pop, reimagined covers (Bill Withers, Nina Simone, Smokey Robinson, Bob Marley) & original stories.
- Warm, earthy acoustic aesthetic (linen `#FDFBF7`, sand `#F5EFE6`, terracotta `#C86D51`, amber `#D97706`, espresso `#251D1A`).
- Tech Rider / USP: 100% mobile battery-powered equipment, no power/electricity required on location; walking around among audience is possible. Custom PA coordination for audiences > 200 people.

## Live Formats:
- **Formats**: Solo (Reau), Duo (+ Bassist), Trio (+ Percussie).
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

