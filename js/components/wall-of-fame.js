/**
 * Reau Website - Wall of Fame Component
 * Twee interactieve, oneindig doordraaibare rijen met logo's en referenties.
 * Inclusief uitnodigende 'viewport-nudge' bij het in beeld komen en vloeiende momentum drag.
 */

import { wallOfFameRow1, wallOfFameRow2 } from '../wall-of-fame-data.js';

export { wallOfFameRow1, wallOfFameRow2 };

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
  let hasInitialized = false;

  const getSingleWidth = () => slider.scrollWidth / 3;

  const initPosition = () => {
    if (hasInitialized) return;
    const singleWidth = getSingleWidth();
    if (singleWidth > 100) {
      isWrapping = true;
      slider.scrollLeft = singleWidth + initialOffset;
      isWrapping = false;
      hasInitialized = true;
    }
  };

  requestAnimationFrame(initPosition);
  setTimeout(initPosition, 100);

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

function setupViewportNudge(container, row1, row2) {
  let isAnimating = false;
  let lastTriggerTime = 0;
  let hasScrolledAway = true;

  const performNudge = (slider, distance, duration = 1700) => {
    if (!slider) return;
    let animId = null;
    let startTime = null;
    const startScroll = slider.scrollLeft;

    const cancel = () => {
      if (animId) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    };

    slider.addEventListener('mousedown', cancel, { once: true });
    slider.addEventListener('touchstart', cancel, { once: true, passive: true });

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Vloeiende kubische vertraging (ease-out): duidelijke en uitnodigende draai
      const ease = 1 - Math.pow(1 - progress, 3);
      slider.scrollLeft = startScroll + distance * ease;

      if (progress < 1) {
        animId = requestAnimationFrame(step);
      }
    }

    animId = requestAnimationFrame(step);
  };

  const triggerNudge = () => {
    const now = Date.now();
    if (isAnimating || !hasScrolledAway || now - lastTriggerTime < 3500) return;

    // Voorkom vroege trigger wanneer de bezoeker nog bovenin de pagina (hero) staat
    if (window.scrollY < 180) return;

    const rect = container.getBoundingClientRect();
    const isInView = rect.top < window.innerHeight * 0.85 && rect.bottom > window.innerHeight * 0.15;
    if (!isInView) return;

    isAnimating = true;
    hasScrolledAway = false;
    lastTriggerTime = now;

    // Duidelijke, opvallende draai van ~1.5 kaart aan beide kanten
    performNudge(row1, 380, 1700);
    performNudge(row2, -380, 1700);

    setTimeout(() => {
      isAnimating = false;
    }, 1800);
  };

  let scrollTimeout = null;
  const onScroll = () => {
    const rect = container.getBoundingClientRect();
    // Als de bezoeker ruim voorbij of boven de sectie scrolt, reset status voor volgende passage
    if (rect.bottom < -150 || rect.top > window.innerHeight + 150) {
      hasScrolledAway = true;
    }

    if (!scrollTimeout) {
      scrollTimeout = setTimeout(() => {
        scrollTimeout = null;
        triggerNudge();
      }, 60);
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        triggerNudge();
      } else {
        hasScrolledAway = true;
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  observer.observe(container);
}

export function renderWallOfFame(container) {
  if (!container) return;

  const row1Html = wallOfFameRow1.map(renderCard).join('');
  const row2Html = wallOfFameRow2.map(renderCard).join('');
  const row1All = row1Html + row1Html + row1Html;
  const row2All = row2Html + row2Html + row2Html;

  container.innerHTML = `
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
      <span class="text-xs uppercase tracking-widest text-terracotta font-semibold">Waar heb ik gespeeld?</span>
      <h3 class="font-serif text-2xl sm:text-3xl text-espresso mt-2">Wall of Fame</h3>
      <p class="text-xs sm:text-sm text-espresso-muted mt-1.5 max-w-xl mx-auto">
        Gespeeld voor toonaangevende bedrijven, culturele podia en particuliere opdrachtgevers — solo en met professionele akoestische coveracts.
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
