/**
 * Reau Website - Live Formats & Interactive Calculator Component
 * Step-by-step configurator: 1) Format, 2) Duration & Sets, 3) Occasion Type
 */

export function renderLiveFormats(container) {
  if (!container) return;
  container.innerHTML = `
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header -->
      <div class="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <span class="text-xs uppercase tracking-widest text-terracotta font-semibold">Transparant & Vrijblijvend</span>
        <h2 class="font-serif text-3xl sm:text-4xl text-espresso mt-2">Stel Jouw Live Optreden Samen</h2>
        <p class="text-espresso-muted mt-3 text-sm sm:text-base">
          Kies in 3 eenvoudige stappen de ideale bezetting, speelduur en gelegenheid voor een directe prijsindicatie.
        </p>
      </div>

      <!-- Step 1: Kies de bezetting -->
      <div class="mb-12">
        <div class="flex items-center gap-3 mb-6">
          <span class="w-7 h-7 rounded-full bg-terracotta text-white text-xs font-bold flex items-center justify-center shrink-0">1</span>
          <h3 class="font-serif text-xl sm:text-2xl text-espresso">Kies de bezetting</h3>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <!-- Solo Card -->
          <div data-format-card="solo" class="calc-format-card cursor-pointer bg-white rounded-3xl p-6 sm:p-7 border-2 border-espresso/10 hover:border-terracotta/40 transition-all flex flex-col justify-between relative group">
            <div>
              <div class="flex justify-between items-start">
                <span class="px-3 py-1 rounded-full text-xs font-semibold bg-terracotta/10 text-terracotta">Intiem & Puur</span>
                <div class="calc-format-indicator w-5 h-5 rounded-full border-2 border-espresso/20 group-hover:border-terracotta flex items-center justify-center transition-colors">
                  <div class="indicator-dot w-2.5 h-2.5 rounded-full bg-terracotta hidden"></div>
                </div>
              </div>
              <h4 class="font-serif text-2xl text-espresso mt-4">Solo (Reau)</h4>
              <p class="text-xs font-medium text-terracotta mt-0.5">Akoestische gitaar & zang</p>
              <p class="text-sm text-espresso-muted mt-3">
                Optioneel met backingtracks voor beats. Intiem, direct en 100% mobiel zonder benodigde stroom.
              </p>
            </div>
            <div class="mt-6 pt-4 border-t border-espresso/10 text-xs text-espresso-muted flex items-center justify-between">
              <span>Basistarief (1 set)</span>
              <strong class="text-sm font-serif text-espresso">Vanaf € 300,-</strong>
            </div>
          </div>

          <!-- Duo Card -->
          <div data-format-card="duo" class="calc-format-card cursor-pointer bg-white rounded-3xl p-6 sm:p-7 border-2 border-espresso/10 hover:border-terracotta/40 transition-all flex flex-col justify-between relative group">
            <div>
              <div class="flex justify-between items-start">
                <span class="px-3 py-1 rounded-full text-xs font-semibold bg-amber-600/10 text-amber-700">Aanrader • Warme Groove</span>
                <div class="calc-format-indicator w-5 h-5 rounded-full border-2 border-espresso/20 group-hover:border-terracotta flex items-center justify-center transition-colors">
                  <div class="indicator-dot w-2.5 h-2.5 rounded-full bg-terracotta hidden"></div>
                </div>
              </div>
              <h4 class="font-serif text-2xl text-espresso mt-4">Duo (+ Bassist)</h4>
              <p class="text-xs font-medium text-terracotta mt-0.5">Reau + akoestische bas & zang</p>
              <p class="text-sm text-espresso-muted mt-3">
                Extra soulvolle dynamiek, diepere groove en warme meerstemmige zang.
              </p>
            </div>
            <div class="mt-6 pt-4 border-t border-espresso/10 text-xs text-espresso-muted flex items-center justify-between">
              <span>Basistarief (1 set)</span>
              <strong class="text-sm font-serif text-espresso">Vanaf € 450,-</strong>
            </div>
          </div>

          <!-- Trio Card -->
          <div data-format-card="trio" class="calc-format-card cursor-pointer bg-white rounded-3xl p-6 sm:p-7 border-2 border-espresso/10 hover:border-terracotta/40 transition-all flex flex-col justify-between relative group">
            <div>
              <div class="flex justify-between items-start">
                <span class="px-3 py-1 rounded-full text-xs font-semibold bg-olive/10 text-olive">Dansbaar & Dynamisch</span>
                <div class="calc-format-indicator w-5 h-5 rounded-full border-2 border-espresso/20 group-hover:border-terracotta flex items-center justify-center transition-colors">
                  <div class="indicator-dot w-2.5 h-2.5 rounded-full bg-terracotta hidden"></div>
                </div>
              </div>
              <h4 class="font-serif text-2xl text-espresso mt-4">Trio (+ Percussie)</h4>
              <p class="text-xs font-medium text-terracotta mt-0.5">Reau + bassist + percussie</p>
              <p class="text-sm text-espresso-muted mt-3">
                Nodigt het publiek uit om te dansen met aanstekelijke akoestische beats.
              </p>
            </div>
            <div class="mt-6 pt-4 border-t border-espresso/10 text-xs text-espresso-muted flex items-center justify-between">
              <span>Basistarief (1 set)</span>
              <strong class="text-sm font-serif text-espresso">Vanaf € 600,-</strong>
            </div>
          </div>

        </div>
      </div>

      <!-- Step 2: Kies de speelduur -->
      <div class="mb-12">
        <div class="flex items-center gap-3 mb-6">
          <span class="w-7 h-7 rounded-full bg-terracotta text-white text-xs font-bold flex items-center justify-center shrink-0">2</span>
          <h3 class="font-serif text-xl sm:text-2xl text-espresso">Kies de speelduur</h3>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          
          <!-- 1 Set -->
          <button type="button" data-sets-btn="1" class="calc-sets-card text-left p-5 rounded-2xl border-2 border-espresso/10 bg-white hover:border-terracotta/40 transition-all flex flex-col justify-between">
            <div>
              <span class="text-xs font-semibold uppercase tracking-wider text-espresso-muted">Kort & Krachtig</span>
              <h4 class="font-serif text-xl text-espresso mt-1">1 Set (± 45 min)</h4>
              <p class="text-xs text-espresso-muted mt-2">Openingsact, ceremonie of muzikaal intermezzo.</p>
            </div>
          </button>

          <!-- 2 Sets -->
          <button type="button" data-sets-btn="2" class="calc-sets-card text-left p-5 rounded-2xl border-2 border-espresso/10 bg-white hover:border-terracotta/40 transition-all flex flex-col justify-between">
            <div>
              <span class="text-xs font-semibold uppercase tracking-wider text-espresso-muted">Sfeervol</span>
              <h4 class="font-serif text-xl text-espresso mt-1">2 Sets (± 90 min)</h4>
              <p class="text-xs text-espresso-muted mt-2">Ideaal voor een sfeervolle borrel of diner.</p>
            </div>
          </button>

          <!-- 3 Sets (Populairst) -->
          <button type="button" data-sets-btn="3" class="calc-sets-card text-left p-5 rounded-2xl border-2 border-espresso/10 bg-white hover:border-terracotta/40 transition-all flex flex-col justify-between relative">
            <div>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-terracotta text-white inline-block mb-1">Populairst</span>
              <h4 class="font-serif text-xl text-espresso mt-0.5">3 Sets (± 135 min)</h4>
              <p class="text-xs text-espresso-muted mt-2">Complete muzikale avond of feestelijke borrel.</p>
            </div>
          </button>

          <!-- 4 Sets -->
          <button type="button" data-sets-btn="4" class="calc-sets-card text-left p-5 rounded-2xl border-2 border-espresso/10 bg-white hover:border-terracotta/40 transition-all flex flex-col justify-between">
            <div>
              <span class="text-xs font-semibold uppercase tracking-wider text-espresso-muted">Avondvullend</span>
              <h4 class="font-serif text-xl text-espresso mt-1">4 Sets (± 180 min)</h4>
              <p class="text-xs text-espresso-muted mt-2">Uitgebreid feest of langdurig evenement.</p>
            </div>
          </button>

        </div>

        <!-- Custom / 5+ Sets Stepper Bar -->
        <div class="bg-sand-light/60 rounded-2xl p-4 sm:p-5 border border-espresso/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <button type="button" id="calc-custom-toggle" class="px-4 py-2 rounded-xl border text-xs font-semibold uppercase tracking-wider transition-all bg-white border-espresso/15 hover:border-terracotta text-espresso">
              Meer dan 4 sets? (Maatwerk)
            </button>
            <span class="text-xs text-espresso-muted">Kies exact het gewenste aantal sets.</span>
          </div>

          <div id="calc-stepper-container" class="hidden items-center gap-3 bg-white px-3 py-1.5 rounded-xl border border-espresso/15">
            <button type="button" id="calc-stepper-minus" aria-label="Eén set minder" class="w-8 h-8 rounded-lg bg-espresso/5 hover:bg-terracotta hover:text-white font-bold text-base transition-colors flex items-center justify-center">−</button>
            <span id="calc-stepper-value" class="font-mono font-bold text-sm text-espresso px-2">5 sets (± 225 min)</span>
            <button type="button" id="calc-stepper-plus" aria-label="Eén set extra" class="w-8 h-8 rounded-lg bg-espresso/5 hover:bg-terracotta hover:text-white font-bold text-base transition-colors flex items-center justify-center">+</button>
          </div>
        </div>

        <!-- Pauzes toelichting -->
        <p class="text-xs text-espresso-muted mt-3 flex items-center gap-1.5">
          <svg class="w-4 h-4 text-terracotta shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span>Tussen de sets door neemt de artiest pauzes van ca. 15 min (achtergrondmuziek loopt soepel door).</span>
        </p>
      </div>

      <!-- Step 3: Type gelegenheid -->
      <div class="mb-12">
        <div class="flex items-center gap-3 mb-6">
          <span class="w-7 h-7 rounded-full bg-terracotta text-white text-xs font-bold flex items-center justify-center shrink-0">3</span>
          <h3 class="font-serif text-xl sm:text-2xl text-espresso">Type gelegenheid</h3>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          <!-- Particulier -->
          <div data-occasion-card="particulier" class="calc-occasion-card cursor-pointer bg-white rounded-3xl p-6 border-2 border-espresso/10 hover:border-terracotta/40 transition-all flex items-start gap-4 relative group">
            <div class="w-12 h-12 rounded-2xl bg-terracotta/10 text-terracotta flex items-center justify-center text-2xl shrink-0">
              🏡
            </div>
            <div class="flex-grow">
              <div class="flex items-center justify-between">
                <h4 class="font-serif text-xl text-espresso">Particulier</h4>
                <div class="calc-occasion-indicator w-5 h-5 rounded-full border-2 border-espresso/20 group-hover:border-terracotta flex items-center justify-center transition-colors">
                  <div class="indicator-dot w-2.5 h-2.5 rounded-full bg-terracotta hidden"></div>
                </div>
              </div>
              <p class="text-xs text-espresso-muted mt-1">
                Huiskamerconcert, tuinfeest, verjaardag, jubileum of bruiloft / ceremonie.
              </p>
            </div>
          </div>

          <!-- Zakelijk / Event -->
          <div data-occasion-card="zakelijk" class="calc-occasion-card cursor-pointer bg-white rounded-3xl p-6 border-2 border-espresso/10 hover:border-terracotta/40 transition-all flex items-start gap-4 relative group">
            <div class="w-12 h-12 rounded-2xl bg-amber-600/10 text-amber-700 flex items-center justify-center text-2xl shrink-0">
              🏢
            </div>
            <div class="flex-grow">
              <div class="flex items-center justify-between">
                <h4 class="font-serif text-xl text-espresso">Zakelijk / Event</h4>
                <div class="calc-occasion-indicator w-5 h-5 rounded-full border-2 border-espresso/20 group-hover:border-terracotta flex items-center justify-center transition-colors">
                  <div class="indicator-dot w-2.5 h-2.5 rounded-full bg-terracotta hidden"></div>
                </div>
              </div>
              <p class="text-xs text-espresso-muted mt-1">
                Bedrijfsborrel, receptie, netwerkevent, congres of feestelijk diner.
              </p>
            </div>
          </div>

        </div>
      </div>

      <!-- Leadgenerator Result Card & CTA -->
      <div class="bg-white rounded-3xl p-6 sm:p-10 border-2 border-terracotta/40 shadow-xl">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div class="lg:col-span-7">
            <div class="flex items-center gap-2">
              <span class="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span class="text-xs uppercase tracking-wider text-terracotta font-semibold">Jouw Samengestelde Selectie</span>
            </div>
            
            <p id="calc-summary-text" class="font-serif text-2xl sm:text-3xl text-espresso mt-2">
              Duo (+ Bassist) • 3 sets (± 135 min) • Particulier
            </p>

            <div class="mt-4 flex flex-wrap items-baseline gap-3">
              <span class="text-xs text-espresso-muted uppercase tracking-wider">Indicatietarief:</span>
              <span id="calc-price-display" class="font-serif text-3xl sm:text-4xl text-terracotta font-bold">€ 750,-</span>
              <span class="text-xs text-espresso-muted">(excl. reiskosten & 9% BTW)</span>
            </div>
            <p class="text-xs text-espresso-muted mt-1">Inclusief voorbereiding, eigen geluid & accu-apparatuur.</p>
          </div>

          <div class="lg:col-span-5 flex flex-col items-stretch lg:items-end">
            <button id="calc-submit-btn" type="button" class="btn-terracotta w-full py-4 px-6 rounded-2xl text-xs sm:text-sm font-semibold uppercase tracking-wider text-center shadow-lg shadow-terracotta/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
              <span>Controleer Beschikbaarheid & Offerte</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </button>
            <span class="text-[11px] text-espresso-muted text-center mt-2.5">
              ✓ Vrijblijvend advies • Vult direct het aanvraagformulier in
            </span>
          </div>

        </div>
      </div>

      <!-- Technical Rider USP Note -->
      <div class="mt-8 p-6 rounded-2xl bg-terracotta/5 border border-terracotta/20 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div class="w-12 h-12 rounded-xl bg-terracotta text-white flex items-center justify-center shrink-0">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
        </div>
        <div class="text-sm text-espresso">
          <h5 class="font-semibold text-espresso">Geen stroom nodig op locatie & 100% Mobiel</h5>
          <p class="text-espresso-muted text-xs sm:text-sm mt-0.5">
            De artiest neemt zijn eigen compacte accu-apparatuur mee waar hij vrij mee kan rondlopen tussen het publiek. Bij meer dan 200 personen publiek stemmen we vooraf even af over passende zaalversterking.
          </p>
        </div>
      </div>

    </div>
  `;
}

