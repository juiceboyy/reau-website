/**
 * Reau Website - About Component
 */

export function renderAbout(container) {
  if (!container) return;
  container.innerHTML = `
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto mb-16">
        <span class="text-xs uppercase tracking-widest text-terracotta font-semibold">Over Reau</span>
        <h2 class="font-serif text-3xl sm:text-4xl text-espresso mt-2">Biografie</h2>
        <div class="w-12 h-0.5 bg-terracotta mx-auto mt-4 rounded-full"></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div class="space-y-5 text-espresso-muted leading-relaxed">
          <p class="text-lg text-espresso font-serif">
            Reau is het intieme akoestische soloproject van Ro Halfhide — singer-songwriter en producer met een warm, herkenbaar stemgeluid.
          </p>
          <p>
            Als oprichter van het <strong>Amsterdam Songwriters Guild (ASG)</strong>, organisator van de <strong>Haagse Open Mic</strong> en producer voor gerenommeerde artiesten (waaronder Lucky Fonz III en Robin Block), staat Ro bekend om zijn muzikale vakmanschap, jazzy touch en ontwapenende podiumaanwezigheid.
          </p>
          <p>
            Dankzij zijn ruime ervaring in professionele akoestische coverbands brengt hij het publiek dichtbij: verfijnde gitaarharmonieën, soulvolle dynamiek en een repertoire dat generaties en genres moeiteloos verbindt. ➔ Bekijk de <a href="#wall-of-fame" class="text-terracotta underline font-semibold hover:text-terracotta-dark transition-colors">Wall of Fame</a> met eerdere podia &amp; opdrachtgevers.
          </p>
        </div>

        <div class="grid grid-cols-1 gap-4">
          <div class="p-6 rounded-2xl bg-white border border-espresso/10 hover-lift flex items-start gap-4">
            <div class="w-10 h-10 rounded-xl bg-terracotta/10 text-terracotta flex items-center justify-center font-serif text-xl shrink-0 mt-0.5">1</div>
            <div>
              <h4 class="font-serif text-xl text-espresso mb-1">Intieme Connectie</h4>
              <p class="text-sm text-espresso-muted leading-relaxed">Geen afstand tussen artiest en publiek. Pure akoestische beleving die raakt en verbindt.</p>
            </div>
          </div>
          <div class="p-6 rounded-2xl bg-white border border-espresso/10 hover-lift flex items-start gap-4">
            <div class="w-10 h-10 rounded-xl bg-terracotta/10 text-terracotta flex items-center justify-center font-serif text-xl shrink-0 mt-0.5">2</div>
            <div>
              <h4 class="font-serif text-xl text-espresso mb-1">Soul & Singalongs</h4>
              <p class="text-sm text-espresso-muted leading-relaxed">Van intieme akoestische klassiekers tot aanstekelijke singalongs en eigen nummers.</p>
            </div>
          </div>
          <div class="p-6 rounded-2xl bg-white border border-espresso/10 hover-lift flex items-start gap-4">
            <div class="w-10 h-10 rounded-xl bg-terracotta/10 text-terracotta flex items-center justify-center font-serif text-xl shrink-0 mt-0.5">3</div>
            <div>
              <h4 class="font-serif text-xl text-espresso mb-1">100% Vrij & Mobiel</h4>
              <p class="text-sm text-espresso-muted leading-relaxed">Eigen compacte apparatuur zonder stopcontacten of kabels. Speelt overal — in de tuin, salon of tussen de gasten.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
