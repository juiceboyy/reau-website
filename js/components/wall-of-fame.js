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

function setupInfiniteDragToScroll(slider, initialOffset = 0) {
  if (!slider) return;

  let isDown = false;
  let lastX = 0;
  let lastTime = 0;
  let velocity = 0;
  let momentumId = null;
  let hasMoved = false;
  let isWrapping = false;

  const getSingleWidth = () => slider.scrollWidth / 3;

  const initPosition = () => {
    const singleWidth = getSingleWidth();
    if (singleWidth > 100) {
      isWrapping = true;
      slider.scrollLeft = singleWidth + initialOffset;
      isWrapping = false;
    }
  };

  requestAnimationFrame(initPosition);
  setTimeout(initPosition, 100);
  setTimeout(initPosition, 300);

  // Oneindig naadloos doorlopen bij elke scroll (touch, trackpad, drag, muiswiel)
  slider.addEventListener('scroll', () => {
    if (isWrapping) return;
    const singleWidth = getSingleWidth();
    if (singleWidth <= 100) return;

    if (slider.scrollLeft >= singleWidth * 2) {
      isWrapping = true;
      slider.scrollLeft -= singleWidth;
      isWrapping = false;
    } else if (slider.scrollLeft <= 50) {
      isWrapping = true;
      slider.scrollLeft += singleWidth;
      isWrapping = false;
    }
  });

  // Vloeiende inertie / momentum uitloop (ease-out) bij loslaten
  const applyMomentum = () => {
    if (momentumId) cancelAnimationFrame(momentumId);

    // Als de gebruiker al even stilstond voor het loslaten, rustig stoppen
    if (performance.now() - lastTime > 80) {
      velocity = 0;
      return;
    }

    const friction = 0.94;

    const step = () => {
      if (Math.abs(velocity) < 0.04 || isDown) {
        velocity = 0;
        return;
      }
      slider.scrollLeft -= velocity * 16;
      velocity *= friction;
      momentumId = requestAnimationFrame(step);
    };

    momentumId = requestAnimationFrame(step);
  };

  // Desktop Muis-drag interactie
  slider.addEventListener('mousedown', (e) => {
    if (momentumId) cancelAnimationFrame(momentumId);
    isDown = true;
    hasMoved = false;
    velocity = 0;
    slider.classList.add('is-dragging');
    lastX = e.pageX;
    lastTime = performance.now();
  });

  const stopDrag = () => {
    if (!isDown) return;
    isDown = false;
    slider.classList.remove('is-dragging');
    if (hasMoved) {
      applyMomentum();
    }
  };

  slider.addEventListener('mouseleave', stopDrag);
  slider.addEventListener('mouseup', stopDrag);

  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const now = performance.now();
    const dt = Math.max(now - lastTime, 1);
    const delta = e.pageX - lastX;

    if (Math.abs(delta) > 0) {
      slider.scrollLeft -= delta * 1.3;
      // Vloeiende snelheidsmeting voor een natuurlijke uitloop
      velocity = (delta / dt) * 0.75 + velocity * 0.25;
      lastX = e.pageX;
      lastTime = now;
      hasMoved = true;
    }
  });

  // Voorkom onbedoelde kliks tijdens slepen
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
  const row1All = row1Html + row1Html + row1Html;
  const row2All = row2Html + row2Html + row2Html;

  container.innerHTML = `
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
      <span class="text-xs uppercase tracking-widest text-terracotta font-semibold">Waar heb ik gespeeld?</span>
      <h3 class="font-serif text-2xl sm:text-3xl text-espresso mt-2">Wall of Fame</h3>
      <p class="text-xs sm:text-sm text-espresso-muted mt-1.5 max-w-xl mx-auto">
        Gespeeld voor toonaangevende bedrijven, culturele podia en particuliere opdrachtgevers — solo en met professionele akoestische coveracts.
      </p>
      <p class="text-xs text-terracotta font-medium tracking-wide mt-2.5 flex items-center justify-center gap-1.5 opacity-85">
        <span>&larr;</span> Sleep met de muis of swipe oneindig door alle referenties <span>&rarr;</span>
      </p>
    </div>

    <!-- Rij 1 -->
    <div class="wof-slider-container py-2" id="wof-row-1" title="Sleep met de muis of swipe om te bladeren">
      <div class="wof-slider-track">
        ${row1All}
      </div>
    </div>

    <!-- Rij 2 -->
    <div class="wof-slider-container py-2 mt-1" id="wof-row-2" title="Sleep met de muis of swipe om te bladeren">
      <div class="wof-slider-track">
        ${row2All}
      </div>
    </div>
  `;

  const row1 = container.querySelector('#wof-row-1');
  const row2 = container.querySelector('#wof-row-2');

  setupInfiniteDragToScroll(row1, 0);
  setupInfiniteDragToScroll(row2, 120);

  // Korte, uitnodigende draai aan beide rijen zodra de sectie in beeld komt
  setupViewportNudge(container, row1, row2);
}

function setupViewportNudge(container, row1, row2) {
  let hasTriggered = false;

  const performNudge = (slider, distance, duration = 1500) => {
    if (!slider) return;
    let animId = null;
    let startTime = null;
    const startScroll = slider.scrollLeft;

    const cancel = () => {
      if (animId) cancelAnimationFrame(animId);
    };

    slider.addEventListener('mousedown', cancel, { once: true });
    slider.addEventListener('touchstart', cancel, { once: true, passive: true });

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Vloeiende quartische vertraging (ease-out)
      const ease = 1 - Math.pow(1 - progress, 4);
      slider.scrollLeft = startScroll + distance * ease;

      if (progress < 1) {
        animId = requestAnimationFrame(step);
      }
    }

    animId = requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasTriggered) {
        hasTriggered = true;
        observer.disconnect();

        // Korte, subtiele vertraging nadat de sectie in beeld scrolt
        setTimeout(() => {
          performNudge(row1, 180, 1600);
          performNudge(row2, -180, 1600);
        }, 200);
      }
    });
  }, { threshold: 0.25 });

  observer.observe(container);
}

