/**
 * Reau Website - Media Showcase Component
 */

export function renderMedia(container) {
  if (!container) return;
  container.innerHTML = `
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto mb-16">
        <span class="text-xs uppercase tracking-widest text-terracotta font-semibold">Sfeer & Beeld</span>
        <h2 class="font-serif text-3xl sm:text-4xl text-espresso mt-2">Media Showcase</h2>
        <p class="text-espresso-muted mt-3 text-sm sm:text-base">Krijg een impressie van de intieme akoestische sfeer en optredens.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <!-- Media Card 1 -->
        <div class="bg-white rounded-3xl overflow-hidden border border-espresso/10 shadow-lg hover-lift">
          <div class="aspect-video bg-sand relative group flex items-center justify-center">
            <img src="assets/images/ro-halfhide-portrait.jpg" alt="Ro Halfhide Live" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-espresso/40 group-hover:bg-espresso/20 transition-colors flex items-center justify-center">
              <a href="https://youtube.com/rohalfhide" target="_blank" rel="noopener noreferrer" class="w-16 h-16 rounded-full bg-white/90 text-terracotta flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                <svg class="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </a>
            </div>
          </div>
          <div class="p-6">
            <span class="text-xs uppercase tracking-widest text-terracotta font-semibold">Live Sessie</span>
            <h4 class="font-serif text-2xl text-espresso mt-1">Acoustic Soul Sessions</h4>
            <p class="text-sm text-espresso-muted mt-2">Puur gitaarspel en zang in een intieme setting. Bekijk live opnames op het YouTube-kanaal van Ro Halfhide.</p>
          </div>
        </div>

        <!-- Media Card 2 -->
        <div class="bg-white rounded-3xl overflow-hidden border border-espresso/10 shadow-lg hover-lift">
          <div class="aspect-video bg-sand relative group flex items-center justify-center">
            <img src="assets/images/album-evening-sun.jpg" alt="Evening Sun Session" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-espresso/40 group-hover:bg-espresso/20 transition-colors flex items-center justify-center">
              <a href="https://youtube.com/rohalfhide" target="_blank" rel="noopener noreferrer" class="w-16 h-16 rounded-full bg-white/90 text-terracotta flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                <svg class="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </a>
            </div>
          </div>
          <div class="p-6">
            <span class="text-xs uppercase tracking-widest text-terracotta font-semibold">Studio & Release</span>
            <h4 class="font-serif text-2xl text-espresso mt-1">Songwriting & Verhalen</h4>
            <p class="text-sm text-espresso-muted mt-2">Van intieme living room optredens tot studio opnames en interviews over connectie in muziek.</p>
          </div>
        </div>

      </div>
    </div>
  `;
}
