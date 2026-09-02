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
  { name: 'Ministerie van IenW', category: 'Diverse congressen', logo: 'assets/images/logos/ministerie-ienw.svg' },
  { name: 'Koninklijke Saan', category: 'Opening Laadplein', logo: 'assets/images/logos/koninklijke-saan.svg' },
  { name: 'Kasteel Doornenburg', category: 'Bruiloft', logo: 'assets/images/logos/kasteel-doornenburg.png' },
  { name: 'Paradiso', category: 'Eigen werk optreden', logo: 'assets/images/logos/paradiso.svg' },
  { name: "Studio's Aalsmeer", category: 'Diverse feesten', logo: 'assets/images/logos/studios-aalsmeer.png' },
  { name: 'OPCW', category: 'Zomerfeest', logo: 'assets/images/logos/opcw.png' },
  { name: 'Extinction Rebellion (XR)', category: 'Symposium', logo: 'assets/images/logos/extinction-rebellion.svg' }
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
  { name: 'Bodembeheer NL', category: 'Congres', logo: 'assets/images/logos/bodembeheer-nl.png' },
  { name: 'AFAS Software', category: 'Diverse congressen', logo: 'assets/images/logos/afas-software.png' },
  { name: 'Trekpleister', category: 'Jubileum feest', logo: 'assets/images/logos/trekpleister.svg' },
  { name: 'Noorderslag', category: 'Eigen werk optreden', logo: 'assets/images/logos/noorderslag.png' },
  { name: 'Carré', category: 'Knoopgala', logo: 'assets/images/logos/carre.png' },
  { name: 'Shell', category: 'Diverse feesten', logo: 'assets/images/logos/shell.png' },
  { name: 'Nationale Politie', category: 'Netwerkborrel', logo: 'assets/images/logos/politie.svg' }
];

function renderCard(item) {
  const initials = item.name.split(' ').map(w => w[0]).slice(0, 2).join('');
  const logoContent = item.logo
    ? `<div class="h-9 min-w-[36px] max-w-[120px] flex items-center justify-center shrink-0">
         <img src="${item.logo}" alt="${item.name}" class="max-h-8 max-w-[120px] w-auto h-auto object-contain shrink-0 pointer-events-none select-none" draggable="false">
       </div>`
    : `<div class="w-9 h-9 rounded-xl bg-terracotta/10 text-terracotta flex items-center justify-center font-semibold text-xs tracking-wider shrink-0 select-none">${initials}</div>`;

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

function setupDragToScroll(slider) {
  if (!slider) return;

  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;
  let hasMoved = false;

  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    hasMoved = false;
    slider.classList.add('is-dragging');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('is-dragging');
  });

  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('is-dragging');
  });

  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.5;
    slider.scrollLeft = scrollLeft - walk;
    hasMoved = true;
  });

  // Voorkom onbedoelde interacties tijdens slepen
  slider.addEventListener('click', (e) => {
    if (hasMoved) {
      e.preventDefault();
      e.stopPropagation();
    }
  });
}

export function renderWallOfFame(container) {
  if (!container) return;

  const row1Html = wallOfFameRow1.map(renderCard).join('');
  const row2Html = wallOfFameRow2.map(renderCard).join('');

  container.innerHTML = `
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
      <span class="text-xs uppercase tracking-widest text-terracotta font-semibold">Waar heb ik gespeeld?</span>
      <h3 class="font-serif text-2xl sm:text-3xl text-espresso mt-2">Wall of Fame</h3>
      <p class="text-xs sm:text-sm text-espresso-muted mt-1.5 max-w-xl mx-auto">
        Gespeeld voor toonaangevende bedrijven, culturele podia en particuliere opdrachtgevers — solo en met professionele akoestische coveracts.
      </p>
      <p class="text-xs text-terracotta font-medium tracking-wide mt-2.5 flex items-center justify-center gap-1.5 opacity-85">
        <span>&larr;</span> Sleep met de muis of swipe horizontaal om alle referenties te zien <span>&rarr;</span>
      </p>
    </div>

    <!-- Rij 1 -->
    <div class="wof-slider-container py-2" id="wof-row-1" title="Sleep met de muis of swipe om te bladeren">
      <div class="wof-slider-track">
        ${row1Html}
      </div>
    </div>

    <!-- Rij 2 -->
    <div class="wof-slider-container py-2 mt-1" id="wof-row-2" title="Sleep met de muis of swipe om te bladeren">
      <div class="wof-slider-track">
        ${row2Html}
      </div>
    </div>
  `;

  const row1 = container.querySelector('#wof-row-1');
  const row2 = container.querySelector('#wof-row-2');

  setupDragToScroll(row1);
  setupDragToScroll(row2);

  // Verspring rij 2 subtiel bij start voor een speels, uitnodigend effect
  if (row2) {
    row2.scrollLeft = 80;
  }
}

