/**
 * Reau Website - Wall of Fame Component
 * Speelse, oneindige marquee met bedrijven, organisaties en podia waar Reau / Ro heeft gespeeld.
 * Voeg hier eenvoudig nieuwe organisaties aan toe (inclusief optionele logo-url).
 */

export const wallOfFameRow1 = [
  { name: 'Louwman Museum', category: 'Bedrijfsevent', logo: 'assets/images/logos/louwman-museum.svg' },
  { name: 'BOVAG', category: 'Netwerkborrel', logo: 'assets/images/logos/bovag.png' },
  { name: 'Landgoedhotel De Wilmersberg', category: 'Paasdiner', logo: 'assets/images/logos/wilmersberg.svg' },
  { name: 'Leroy Seafood', category: 'Nieuwjaarsfeest', logo: 'assets/images/logos/leroy-seafood.svg' },
  { name: 'Woonbron', category: 'Nieuwjaarsreceptie', logo: 'assets/images/logos/woonbron.svg' },
  { name: 'Provincie Overijssel', category: 'Nieuwjaarsreceptie', logo: 'assets/images/logos/provincie-overijssel.svg' },
  { name: 'Gemeente Meppel', category: 'Straat optreden', logo: 'assets/images/logos/gemeente-meppel.svg' },
  { name: 'Mercedes-Benz Benelux', category: 'Kerstdiner', logo: 'assets/images/logos/mercedes-benz.svg' },
  { name: 'Robin Radar', category: 'Personeelsfeest', logo: 'assets/images/logos/robin-radar.svg' },
  { name: 'ESA', category: 'Congres', logo: 'assets/images/logos/esa.svg' },
  { name: 'Prodentfabriek', category: 'Diverse congressen', logo: 'assets/images/logos/prodentfabriek.svg' },
  { name: 'Ministerie van IenW', category: 'Diverse congressen', logo: 'assets/images/logos/ministerie-ienw.svg' }
];

export const wallOfFameRow2 = [
  { name: 'Bram Ladage', category: 'Verjaardag', logo: 'assets/images/logos/bram-ladage.png' },
  { name: 'researchED Nederland', category: 'Onderwijscongres', logo: 'assets/images/logos/researched-nederland.png' },
  { name: 'Beatrix Theater', category: 'Diverse congressen', logo: 'assets/images/logos/beatrix-theater.svg' },
  { name: 'Stichting New Energy Coalition', category: 'Nieuwjaarsreceptie', logo: 'assets/images/logos/new-energy-coalition.svg' },
  { name: 'Theater Rotterdam', category: 'Nieuwjaarsreceptie', logo: 'assets/images/logos/theater-rotterdam.svg' },
  { name: 'Landhuishotel De Bloemenbeek', category: 'Oud & Nieuw feest', logo: 'assets/images/logos/bloemenbeek.png' },
  { name: 'Urenco', category: 'Kerstdiner', logo: 'assets/images/logos/urenco.svg' },
  { name: 'Stichting Duurzaam Repareren', category: 'Kerstdiner', logo: 'assets/images/logos/duurzaam-repareren.png' },
  { name: 'Het Wapen van Beckum', category: 'Diverse feesten', logo: 'assets/images/logos/wapen-van-beckum.png' },
  { name: 'Industrieele Groote Club', category: 'Verjaardag', logo: 'assets/images/logos/industrieele-groote-club.svg' },
  { name: 'Bodembeheer NL', category: 'Congres', logo: 'assets/images/logos/bodembeheer-nl.png' }
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
    ? `<div class="h-9 min-w-[36px] max-w-[120px] flex items-center justify-center shrink-0">
         <img src="${item.logo}" alt="${item.name}" class="max-h-8 max-w-[120px] w-auto h-auto object-contain shrink-0">
       </div>`
    : `<div class="w-9 h-9 rounded-xl bg-terracotta/10 text-terracotta flex items-center justify-center font-semibold text-xs tracking-wider shrink-0">${initials}</div>`;

  return `
    <div class="inline-flex items-center gap-4 px-6 py-4 rounded-2xl bg-white border border-espresso/10 shadow-sm shrink-0 whitespace-nowrap hover:border-terracotta/40 hover:shadow-md transition-all select-none" style="min-width: max-content;">
      ${logoContent}
      <div class="flex flex-col justify-center min-w-0 pr-1">
        <span class="font-serif text-sm sm:text-base text-espresso font-medium whitespace-nowrap leading-snug">${item.name}</span>
        <span class="text-xs text-espresso-muted whitespace-nowrap leading-tight mt-0.5">${item.category}</span>
      </div>
    </div>
  `;
}

export function renderWallOfFame(container) {
  if (!container) return;

  const row1Data = getRepeatedItems(wallOfFameRow1, 8);
  const row2Data = getRepeatedItems(wallOfFameRow2, 8);

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

