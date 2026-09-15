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

      <!-- Formats Cards Grid (2 Cards: Solo Core Act & Reau XL) -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 items-stretch max-w-5xl mx-auto">
        
        <!-- 1. Solo Card (De Kernact) -->
        <div class="bg-white rounded-3xl p-7 sm:p-8 border-2 border-espresso/10 hover:border-terracotta/40 hover-lift transition-all flex flex-col justify-between">
          <div>
            <div class="flex justify-between items-start">
              <span class="px-3 py-1 rounded-full text-xs font-semibold bg-terracotta/10 text-terracotta">Intiem & Puur</span>
            </div>
            <h3 class="font-serif text-3xl text-espresso mt-4">Solo (Reau)</h3>
            <p class="text-xs font-semibold uppercase tracking-wider text-terracotta mt-1">Akoestische gitaar & zang</p>
            <p class="text-sm text-espresso-muted mt-3 leading-relaxed">
              Optioneel met subtiele backingtracks voor ritme. Intiem, direct en flexibel inzetbaar met eigen compacte apparatuur. Ideaal voor huiskamers, borrels en ceremonies.
            </p>

            <!-- Feature Highlight Blocks -->
            <div class="space-y-3 mt-6">
              <div class="p-3.5 rounded-2xl bg-canvas/60 border border-espresso/10">
                <div class="flex items-center justify-between">
                  <h4 class="font-serif font-bold text-espresso text-sm">Akoestisch & Puur</h4>
                  <span class="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-terracotta/10 text-terracotta">Standaard</span>
                </div>
                <p class="text-xs text-espresso-muted mt-1 leading-relaxed">
                  Zang en akoestische gitaar. Intiem, warm en direct in contact met het publiek.
                </p>
              </div>

              <div class="p-3.5 rounded-2xl bg-canvas/60 border border-espresso/10">
                <div class="flex items-center justify-between">
                  <h4 class="font-serif font-bold text-espresso text-sm">Optioneel met Beats</h4>
                  <span class="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-terracotta/10 text-terracotta">Subtiele Groove</span>
                </div>
                <p class="text-xs text-espresso-muted mt-1 leading-relaxed">
                  Subtiele backingtracks voor extra swing en ritme, zonder in te boeten op akoestisch gevoel.
                </p>
              </div>
            </div>
          </div>

          <div class="mt-8 pt-6 border-t border-espresso/10">
            <button type="button" data-format-select="solo" class="format-select-btn w-full py-3.5 rounded-xl border border-espresso/15 hover:border-terracotta hover:bg-terracotta hover:text-white text-espresso text-xs font-semibold uppercase tracking-wider transition-all text-center">
              Kies Solo
            </button>
          </div>
        </div>

        <!-- 2. Reau XL Card (Duo & Trio samengevoegd) -->
        <div class="bg-white rounded-3xl p-7 sm:p-8 border-2 border-espresso/10 hover:border-terracotta/40 hover-lift transition-all flex flex-col justify-between">
          <div>
            <div class="flex justify-between items-start">
              <span class="px-3 py-1 rounded-full text-xs font-semibold bg-terracotta/10 text-terracotta">Bandbeleving</span>
            </div>
            <h3 class="font-serif text-3xl text-espresso mt-4">Reau XL</h3>
            <p class="text-xs font-semibold uppercase tracking-wider text-terracotta mt-1">Reau met extra muzikanten</p>
            <p class="text-sm text-espresso-muted mt-3 leading-relaxed">
              Voor gelegenheden waar meer groove of feestelijke energie gewenst is. Kies uit twee dynamische live bezettingen:
            </p>

            <!-- Duo & Trio Option Blocks -->
            <div class="space-y-3 mt-6">
              <div class="p-3.5 rounded-2xl bg-canvas/60 border border-espresso/10">
                <div class="flex items-center justify-between">
                  <h4 class="font-serif font-bold text-espresso text-sm">Duo (+ Bassist)</h4>
                  <span class="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-terracotta/10 text-terracotta">Warme Groove</span>
                </div>
                <p class="text-xs text-espresso-muted mt-1 leading-relaxed">
                  Reau + akoestische bas & meerstemmige zang. Diepere groove en extra body voor borrels en recepties.
                </p>
              </div>

              <div class="p-3.5 rounded-2xl bg-canvas/60 border border-espresso/10">
                <div class="flex items-center justify-between">
                  <h4 class="font-serif font-bold text-espresso text-sm">Trio (+ Percussie)</h4>
                  <span class="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-terracotta/10 text-terracotta">Dansbaar</span>
                </div>
                <p class="text-xs text-espresso-muted mt-1 leading-relaxed">
                  Reau + bassist + percussie. Aanstekelijke akoestische beats voor een complete bandbeleving op feesten.
                </p>
              </div>
            </div>
          </div>

          <div class="mt-8 pt-6 border-t border-espresso/10 grid grid-cols-2 gap-3">
            <button type="button" data-format-select="duo" class="format-select-btn py-3.5 rounded-xl border border-espresso/15 hover:border-terracotta hover:bg-terracotta hover:text-white text-espresso text-xs font-semibold uppercase tracking-wider transition-all text-center">
              Kies Duo
            </button>
            <button type="button" data-format-select="trio" class="format-select-btn py-3.5 rounded-xl border border-espresso/15 hover:border-terracotta hover:bg-terracotta hover:text-white text-espresso text-xs font-semibold uppercase tracking-wider transition-all text-center">
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
            <h4 class="font-serif text-lg text-espresso">Volledig zelfvoorzienend & flexibel in te passen</h4>
            <p class="text-xs sm:text-sm text-espresso-muted mt-0.5 max-w-2xl leading-relaxed">
              Reau brengt zijn eigen compacte, hoogwaardige geluidstechniek mee en heeft minimale ruimte nodig (ook mogelijk op accu/buitenlocaties). Een vaste speelplek of specifieke wensen stemmen we vooraf samen af in het contactgesprek. Bij meer dan 200 personen publiek verzorgen we passende zaalversterking.
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

