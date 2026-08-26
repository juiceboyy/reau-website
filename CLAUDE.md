# Reau Website Project Guidelines

## Overview
Solo music artist website for **Reau** (Ro Halfhide).
- Musical style: Soulful acoustic pop, reimagined covers (Bill Withers, Nina Simone, Smokey Robinson, Bob Marley) & original stories.
- Warm, earthy acoustic aesthetic (linen `#FDFBF7`, sand `#F5EFE6`, terracotta `#C86D51`, amber `#D97706`, espresso `#251D1A`).
- Tech Rider / USP: 100% mobile battery-powered equipment, no power/electricity required on location; walking around among audience is possible. Custom PA coordination for audiences > 200 people.

## Live Formats & Pricing:
- **Solo (Reau)**: 1 set €300 | 2 sets €450 | 3 sets €600
- **Duo (Reau + Bassist)**: 1 set €450 | 2 sets €675 | 3 sets €900
- **Trio (Reau + Bassist + Percussion)**: 1 set €600 | 2 sets €900 | 3 sets €1200

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

