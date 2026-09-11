/**
 * Reau Website - Live Formats Component
 * Presentation of Solo, Duo and Trio live formations (without public pricing).
 */

export function renderLiveFormats(container) {
  if (!container) return;
  container.innerHTML = `
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header -->
      <div class="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <span class="text-xs uppercase tracking-widest text-terracotta font-semibold">Mogelijkheden & Bezetting</span>
        <h2 class="font-serif text-3xl sm:text-4xl text-espresso mt-2">Live Formats</h2>
        <p class="text-espresso-muted mt-3 text-sm sm:text-base">
          Van intieme huiskamerconcerten tot energieke feesten en evenementen. Kies de bezetting die perfect past bij jouw gelegenheid.
        </p>
      </div>

      <!-- Formats Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        
        <!-- Solo Card -->
        <div class="bg-white rounded-3xl p-7 sm:p-8 border-2 border-espresso/10 hover:border-terracotta/40 hover-lift transition-all flex flex-col justify-between">
          <div>
            <div class="flex justify-between items-start">
              <span class="px-3 py-1 rounded-full text-xs font-semibold bg-terracotta/10 text-terracotta">Intiem & Puur</span>
            </div>
            <h3 class="font-serif text-3xl text-espresso mt-4">Solo (Reau)</h3>
            <p class="text-xs font-semibold uppercase tracking-wider text-terracotta mt-1">Akoestische gitaar & zang</p>
            <p class="text-sm text-espresso-muted mt-4 leading-relaxed">
              Optioneel met backingtracks voor beats. Intiem, direct en 100% mobiel zonder benodigde stroom. Ideaal voor huiskamers, borrels en ceremonies.
            </p>
          </div>
          <div class="mt-8 pt-6 border-t border-espresso/10">
            <button type="button" data-format-select="solo" class="format-select-btn w-full py-3.5 rounded-xl border border-espresso/15 hover:border-terracotta hover:bg-terracotta hover:text-white text-espresso text-xs font-semibold uppercase tracking-wider transition-all text-center">
              Kies Solo
            </button>
          </div>
        </div>

        <!-- Duo Card -->
        <div class="bg-white rounded-3xl p-7 sm:p-8 border-2 border-terracotta/50 shadow-lg relative hover-lift transition-all flex flex-col justify-between">
          <div class="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-terracotta text-white text-[10px] uppercase font-bold tracking-widest px-4 py-1 rounded-full shadow-sm">
            Warme Groove • Aanrader
          </div>
          <div>
            <div class="flex justify-between items-start pt-1">
              <span class="px-3 py-1 rounded-full text-xs font-semibold bg-amber-600/10 text-amber-700">Meest Gekozen</span>
            </div>
            <h3 class="font-serif text-3xl text-espresso mt-4">Duo (+ Bassist)</h3>
            <p class="text-xs font-semibold uppercase tracking-wider text-terracotta mt-1">Reau + akoestische bas & zang</p>
            <p class="text-sm text-espresso-muted mt-4 leading-relaxed">
              Extra soulvolle dynamiek, diepere groove en warme meerstemmige zang. Brengt extra body voor borrels, tuinfeesten en recepties.
            </p>
          </div>
          <div class="mt-8 pt-6 border-t border-espresso/10">
            <button type="button" data-format-select="duo" class="format-select-btn w-full py-3.5 rounded-xl bg-terracotta text-white hover:bg-terracotta-dark text-xs font-semibold uppercase tracking-wider transition-all text-center shadow-md shadow-terracotta/20">
              Kies Duo
            </button>
          </div>
        </div>

        <!-- Trio Card -->
        <div class="bg-white rounded-3xl p-7 sm:p-8 border-2 border-espresso/10 hover:border-terracotta/40 hover-lift transition-all flex flex-col justify-between">
          <div>
            <div class="flex justify-between items-start">
              <span class="px-3 py-1 rounded-full text-xs font-semibold bg-olive/10 text-olive">Dansbaar & Dynamisch</span>
            </div>
            <h3 class="font-serif text-3xl text-espresso mt-4">Trio (+ Percussie)</h3>
            <p class="text-xs font-semibold uppercase tracking-wider text-terracotta mt-1">Reau + bassist + percussie</p>
            <p class="text-sm text-espresso-muted mt-4 leading-relaxed">
              Nodigt het publiek uit om te dansen met aanstekelijke akoestische beats. Een complete bandbeleving voor grotere feesten en festivals.
            </p>
          </div>
          <div class="mt-8 pt-6 border-t border-espresso/10">
            <button type="button" data-format-select="trio" class="format-select-btn w-full py-3.5 rounded-xl border border-espresso/15 hover:border-terracotta hover:bg-terracotta hover:text-white text-espresso text-xs font-semibold uppercase tracking-wider transition-all text-center">
              Kies Trio
            </button>
          </div>
        </div>

      </div>

      <!-- Technical Rider & USP Note -->
      <div class="p-6 sm:p-8 rounded-3xl bg-terracotta/5 border border-terracotta/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div class="flex items-start sm:items-center gap-4">
          <div class="w-12 h-12 rounded-2xl bg-terracotta text-white flex items-center justify-center shrink-0 shadow-sm">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          </div>
          <div>
            <h4 class="font-serif text-lg text-espresso">100% Mobiel & Geen stroom nodig op locatie</h4>
            <p class="text-xs sm:text-sm text-espresso-muted mt-0.5 max-w-2xl leading-relaxed">
              De artiest neemt zijn eigen compacte accu-apparatuur mee en kan vrij rondlopen tussen het publiek. Inclusief voorbereiding en eigen mobiele apparatuur. Bij meer dan 200 personen publiek stemmen we vooraf passende zaalversterking af.
            </p>
          </div>
        </div>
        <a href="#contact" class="btn-terracotta shrink-0 px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider text-center w-full sm:w-auto">
          Offerte Aanvragen
        </a>
      </div>

    </div>
  `;
}

