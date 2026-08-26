/**
 * Reau Website - Top Section Component
 */

export function renderTop(container) {
  if (!container) return;
  container.innerHTML = `
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        <div class="lg:col-span-7 space-y-6 text-left">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-terracotta/10 border border-terracotta/20 text-terracotta text-xs font-semibold tracking-wide">
            <span class="w-2 h-2 rounded-full bg-terracotta animate-pulse"></span>
            Solo project van Ro Halfhide
          </div>
          
          <h1 class="font-serif text-4xl sm:text-5xl lg:text-6xl text-espresso leading-[1.12] tracking-tight">
            Acoustic soul, herkenbare covers & <span class="italic text-terracotta">eigen werk.</span>
          </h1>
          
          <p class="text-espresso-muted text-base sm:text-lg lg:text-xl leading-relaxed max-w-xl">
            Warme, soulvolle interpretaties van pop- en soulklassiekers, naadloos verweven met eigen singer-songwriter werk.
          </p>

          <div class="flex flex-wrap gap-2.5 pt-2 text-xs font-medium text-espresso-muted">
            <span class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-canvas-alt border border-espresso/10">
              <svg class="w-4 h-4 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              100% Mobiel (Geen stroom nodig)
            </span>
            <span class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-canvas-alt border border-espresso/10">
              <svg class="w-4 h-4 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
              Huiskamers & Tuinen
            </span>
            <span class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-canvas-alt border border-espresso/10">
              <svg class="w-4 h-4 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path></svg>
              Intieme Podia & Events
            </span>
          </div>

          <div class="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a href="#contact" class="btn-terracotta px-8 py-4 rounded-full font-semibold text-center text-sm shadow-lg">Boek Reau</a>
            <a href="#muziek" class="btn-secondary px-8 py-4 rounded-full font-medium text-center text-sm flex items-center justify-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-terracotta"></span>
              Luister Muziek
            </a>
          </div>
        </div>

        <div class="lg:col-span-5 relative">
          <a href="pers.html" class="group block relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] bg-sand focus:outline-none focus:ring-4 focus:ring-terracotta/30" title="Bekijk & download hires persfoto">
            <img src="assets/images/reau-lowres.jpg" alt="Ro Halfhide - Reau" class="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700">
            <div class="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/20 to-transparent"></div>
            
            <div class="absolute top-4 right-4 bg-espresso/70 backdrop-blur-sm text-white text-[11px] font-medium px-3 py-1.5 rounded-full border border-white/20 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 group-hover:bg-terracotta transition-all shadow-md">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
              <span>Hires persfoto</span>
            </div>

            <div class="absolute bottom-6 left-6 right-6 text-white">
              <p class="text-xs uppercase tracking-widest text-terracotta font-semibold mb-1">Singer-Songwriter & Producer</p>
              <h3 class="font-serif text-2xl">Ro Halfhide</h3>
              <p class="text-xs text-white/80 mt-1 font-light italic">"Muziek als ontmoetingsplek — een warme uitnodiging tot verbinding."</p>
            </div>
          </a>
        </div>

      </div>
    </div>
  `;
}
