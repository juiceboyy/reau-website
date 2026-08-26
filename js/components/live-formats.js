/**
 * Reau Website - Live Formats & Pricing Component
 */

export function renderLiveFormats(container) {
  if (!container) return;
  container.innerHTML = `
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto mb-16">
        <span class="text-xs uppercase tracking-widest text-terracotta font-semibold">Transparante Mogelijkheden</span>
        <h2 class="font-serif text-3xl sm:text-4xl text-espresso mt-2">Live Formats & Tarieven</h2>
        <p class="text-espresso-muted mt-3 text-sm sm:text-base">Kies de ideale bezetting en bereken direct de prijsindicatie voor jouw evenement.</p>
      </div>

      <!-- Format Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        
        <!-- Solo Card -->
        <div class="bg-white rounded-3xl p-8 border-2 border-espresso/10 hover-lift flex flex-col justify-between">
          <div>
            <span class="px-3 py-1 rounded-full text-xs font-semibold bg-terracotta/10 text-terracotta">Meest Gekozen</span>
            <h3 class="font-serif text-3xl text-espresso mt-4">Solo (Reau)</h3>
            <p class="text-sm text-espresso-muted mt-2">Akoestische gitaar & zang (optioneel looper / iPad). Intiem, direct en sfeervol.</p>
            
            <div class="mt-6 pt-6 border-t border-espresso/10 space-y-2 text-sm">
              <div class="flex justify-between"><span>1 set (± 45 min):</span> <strong class="font-mono text-espresso">€ 300,-</strong></div>
              <div class="flex justify-between"><span>2 sets (± 90 min):</span> <strong class="font-mono text-espresso">€ 450,-</strong></div>
              <div class="flex justify-between"><span>3 sets (± 135 min):</span> <strong class="font-mono text-espresso">€ 600,-</strong></div>
            </div>
          </div>
          <button type="button" class="calc-format-btn mt-8 w-full py-3 rounded-xl border border-espresso/10 text-center text-xs font-semibold uppercase tracking-wider hover:bg-espresso/5 transition-all" data-format="solo">
            Selecteer Solo
          </button>
        </div>

        <!-- Duo Card -->
        <div class="bg-white rounded-3xl p-8 border-2 border-terracotta shadow-xl relative hover-lift flex flex-col justify-between">
          <div class="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-terracotta text-white text-[10px] uppercase font-bold tracking-widest px-4 py-1 rounded-full">
            Warme Groove
          </div>
          <div>
            <span class="px-3 py-1 rounded-full text-xs font-semibold bg-amber-600/10 text-amber-700">Aanrader</span>
            <h3 class="font-serif text-3xl text-espresso mt-4">Duo (+ Bassist)</h3>
            <p class="text-sm text-espresso-muted mt-2">Reau + bassist (basgitaar & backing vocals). Extra soulvolle dynamiek en body.</p>
            
            <div class="mt-6 pt-6 border-t border-espresso/10 space-y-2 text-sm">
              <div class="flex justify-between"><span>1 set (± 45 min):</span> <strong class="font-mono text-espresso">€ 450,-</strong></div>
              <div class="flex justify-between"><span>2 sets (± 90 min):</span> <strong class="font-mono text-espresso">€ 675,-</strong></div>
              <div class="flex justify-between"><span>3 sets (± 135 min):</span> <strong class="font-mono text-espresso">€ 900,-</strong></div>
            </div>
          </div>
          <button type="button" class="calc-format-btn mt-8 w-full py-3 rounded-xl border border-espresso/10 text-center text-xs font-semibold uppercase tracking-wider hover:bg-espresso/5 transition-all" data-format="duo">
            Selecteer Duo
          </button>
        </div>

        <!-- Trio Card -->
        <div class="bg-white rounded-3xl p-8 border-2 border-espresso/10 hover-lift flex flex-col justify-between">
          <div>
            <span class="px-3 py-1 rounded-full text-xs font-semibold bg-olive/10 text-olive">Volledig Akoestisch</span>
            <h3 class="font-serif text-3xl text-espresso mt-4">Trio (+ Percussie)</h3>
            <p class="text-sm text-espresso-muted mt-2">Reau + bassist + percussie. Rijkere percussieve beleving voor grotere gelegenheden.</p>
            
            <div class="mt-6 pt-6 border-t border-espresso/10 space-y-2 text-sm">
              <div class="flex justify-between"><span>1 set (± 45 min):</span> <strong class="font-mono text-espresso">€ 600,-</strong></div>
              <div class="flex justify-between"><span>2 sets (± 90 min):</span> <strong class="font-mono text-espresso">€ 900,-</strong></div>
              <div class="flex justify-between"><span>3 sets (± 135 min):</span> <strong class="font-mono text-espresso">€ 1200,-</strong></div>
            </div>
          </div>
          <button type="button" class="calc-format-btn mt-8 w-full py-3 rounded-xl border border-espresso/10 text-center text-xs font-semibold uppercase tracking-wider hover:bg-espresso/5 transition-all" data-format="trio">
            Selecteer Trio
          </button>
        </div>

      </div>

      <!-- Interactive Calculator Bar -->
      <div class="bg-sand-light rounded-3xl p-6 sm:p-8 border border-espresso/10">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          <div class="lg:col-span-4">
            <span class="text-xs uppercase tracking-wider text-terracotta font-semibold">Directe Prijscalculator</span>
            <h4 class="font-serif text-2xl text-espresso">Kies aantal sets</h4>
            <p class="text-xs text-espresso-muted mt-1">Exclusief eventuele reiskosten buiten de regio.</p>
          </div>

          <!-- Set Selectors -->
          <div class="lg:col-span-4 flex gap-3">
            <button type="button" class="calc-set-btn flex-1 py-3 rounded-xl border text-xs uppercase font-semibold tracking-wider transition-all" data-sets="1">1 Set</button>
            <button type="button" class="calc-set-btn flex-1 py-3 rounded-xl border text-xs uppercase font-semibold tracking-wider transition-all" data-sets="2">2 Sets</button>
            <button type="button" class="calc-set-btn flex-1 py-3 rounded-xl border text-xs uppercase font-semibold tracking-wider transition-all" data-sets="3">3 Sets</button>
          </div>

          <!-- Summary & Book Action -->
          <div class="lg:col-span-4 bg-white p-5 rounded-2xl border border-espresso/10 flex items-center justify-between">
            <div>
              <p id="calc-format-summary" class="text-xs font-semibold text-espresso">Solo (Reau)</p>
              <p id="calc-set-summary" class="text-xs text-espresso-muted">2 sets (± 90 min)</p>
              <p id="calc-total-price" class="text-2xl font-serif text-terracotta font-bold mt-1">€ 450,-</p>
            </div>
            <a id="calc-book-btn" href="#contact" class="btn-terracotta px-5 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider">
              Aanvragen
            </a>
          </div>

        </div>
      </div>

      <!-- Rider & Equipment USP Note -->
      <div class="mt-8 p-6 rounded-2xl bg-terracotta/5 border border-terracotta/20 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div class="w-12 h-12 rounded-xl bg-terracotta text-white flex items-center justify-center shrink-0">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
        </div>
        <div class="text-sm text-espresso">
          <h5 class="font-semibold text-espresso">Geen stroom nodig op locatie & 100% Mobiel</h5>
          <p class="text-espresso-muted text-xs sm:text-sm mt-0.5">
            De artiest neemt zijn eigen compacte apparatuur mee waar hij vrij mee kan rondlopen tussen het publiek. Bij meer dan 200 personen publiek stemmen we vooraf even af over passende zaalversterking.
          </p>
        </div>
      </div>

    </div>
  `;
}
