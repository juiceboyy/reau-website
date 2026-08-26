/**
 * Reau Website - Wall of Fame Component
 * Speelse, oneindige marquee met bedrijven, organisaties en podia waar Reau / Ro heeft gespeeld.
 * Voeg hier eenvoudig nieuwe organisaties aan toe (inclusief optionele logo-url).
 */

export const wallOfFameItems = [
  { name: 'Louwman Museum', category: 'Bedrijfsevent', logo: 'assets/images/logos/louwman-museum.svg' },
  { name: 'BOVAG', category: 'Netwerkborrel', logo: 'assets/images/logos/bovag.png' },
  { name: 'Landgoedhotel De Wilmersberg', category: 'Paasdiner', logo: 'assets/images/logos/wilmersberg.svg' }
];

function getRepeatedItems(items, minCount = 8) {
  if (!items.length) return [];
  let result = [];
  while (result.length < minCount) {
    result = result.concat(items);
  }
  return result;
}

function renderCard(item) {
  const initials = item.name.split(' ').map(w => w[0]).slice(0, 2).join('');
  const logoContent = item.logo
    ? `<img src="${item.logo}" alt="${item.name}" class="max-h-7 max-w-[110px] object-contain">`
    : `<div class="w-8 h-8 rounded-lg bg-terracotta/10 text-terracotta flex items-center justify-center font-semibold text-xs tracking-wider">${initials}</div>`;

  return `
    <div class="flex items-center gap-3.5 px-5 py-3.5 rounded-2xl bg-white border border-espresso/10 shadow-sm shrink-0 hover:border-terracotta/40 hover:shadow-md transition-all">
      ${logoContent}
      <div>
        <p class="font-serif text-sm text-espresso font-medium whitespace-nowrap">${item.name}</p>
        <p class="text-[11px] text-espresso-muted whitespace-nowrap">${item.category}</p>
      </div>
    </div>
  `;
}

export function renderWallOfFame(container) {
  if (!container) return;

  const row1Data = getRepeatedItems(wallOfFameItems, 8);
  const row2Data = getRepeatedItems([...wallOfFameItems].reverse(), 8);

  const row1Html = row1Data.map(renderCard).join('');
  const row2Html = row2Data.map(renderCard).join('');

  container.innerHTML = `
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-terracotta/10 border border-terracotta/20 text-terracotta text-xs font-semibold tracking-wide mb-2.5">
        <span class="w-2 h-2 rounded-full bg-terracotta"></span>
        Referenties & Podia
      </div>
      <h3 class="font-serif text-2xl sm:text-3xl text-espresso">Wall of Fame</h3>
      <p class="text-xs sm:text-sm text-espresso-muted mt-1.5 max-w-xl mx-auto">
        Gespeeld voor toonaangevende bedrijven, culturele podia en particuliere opdrachtgevers — solo en met professionele akoestische coveracts.
      </p>
    </div>

    <!-- Marquee Row 1 (Links) -->
    <div class="marquee-container py-2" title="Pauzeer door eroverheen te bewegen">
      <div class="marquee-track">
        ${row1Html}
      </div>
      <div class="marquee-track" aria-hidden="true">
        ${row1Html}
      </div>
    </div>

    <!-- Marquee Row 2 (Rechts) -->
    <div class="marquee-container py-2 mt-1" title="Pauzeer door eroverheen te bewegen">
      <div class="marquee-track marquee-track-reverse">
        ${row2Html}
      </div>
      <div class="marquee-track marquee-track-reverse" aria-hidden="true">
        ${row2Html}
      </div>
    </div>
  `;
}

