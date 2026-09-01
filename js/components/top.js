/**
 * Reau Website - Top Section Component
 * Full-bleed high-end editorial hero design
 */

export function renderTop(container) {
  if (!container) return;
  container.innerHTML = `
    <div class="relative w-full min-h-[85vh] sm:min-h-[90vh] lg:min-h-[calc(100vh-4.5rem)] flex flex-col justify-between p-6 sm:p-10 lg:p-14 bg-[#140F0D] text-[#FDFBF7] overflow-hidden">
      
      <!-- Dedicated Right-Side Photography Canvas (Ensures Ro's face is never behind text & full brightness) -->
      <div class="absolute inset-y-0 right-0 w-full sm:w-3/5 lg:w-[54%] xl:w-[50%] pointer-events-none select-none overflow-hidden">
        <picture>
          <source srcset="assets/images/reau-hires.jpg" media="(min-width: 768px)">
          <img 
            src="assets/images/reau-lowres.jpg" 
            alt="Reau (Ro Halfhide) zanger en gitarist" 
            class="w-full h-full object-cover object-[center_12%] sm:object-[center_10%] lg:object-center"
          >
        </picture>
        
        <!-- Seamless Left Edge Feather (Desktop only, leaves face completely untouched) -->
        <div class="hidden sm:block absolute inset-y-0 left-0 w-24 sm:w-36 lg:w-48 bg-gradient-to-r from-[#140F0D] to-transparent"></div>
        
        <!-- Bottom Edge Feather (Blends into bottom bar) -->
        <div class="absolute inset-x-0 bottom-0 h-16 sm:h-24 bg-gradient-to-t from-[#140F0D] to-transparent"></div>
        
        <!-- Mobile-only subtle gradient for bottom text contrast -->
        <div class="sm:hidden absolute inset-0 bg-gradient-to-t from-[#140F0D] via-[#140F0D]/60 via-45% to-transparent"></div>
      </div>

      <!-- Top Micro-bar: Metadata & Quick Access -->
      <div class="relative z-10 flex items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div class="flex items-center gap-3">
          <span class="w-2 h-2 rounded-full bg-terracotta animate-pulse"></span>
          <span class="text-xs font-mono uppercase tracking-[0.2em] text-white/70">Zanger / Gitarist • Live Akoestisch</span>
        </div>
        
        <a 
          href="pers.html" 
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-terracotta text-white text-[11px] font-mono uppercase tracking-wider backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.15)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-terracotta"
          title="Bekijk & download officiële hires persfoto"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
          <span class="hidden sm:inline">Hires persfoto</span>
          <span class="sm:hidden">Pers</span>
        </a>
      </div>

      <!-- Middle: Editorial Statement (Constrained width so it NEVER overlaps with Ro on the right) -->
      <div class="relative z-10 my-auto py-8 sm:py-12 max-w-lg lg:max-w-xl xl:max-w-2xl space-y-6">
        <h1 class="font-serif text-4xl sm:text-6xl lg:text-7xl font-semibold text-white tracking-[-0.035em] leading-[1.05]">
          Acoustic soul, herkenbare covers &amp; <span class="italic font-normal text-terracotta">eigen werk.</span>
        </h1>
        
        <p class="text-white/85 text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-xl">
          Warme interpretaties van tijdloze pop- en soulklassiekers, naadloos verweven met eigen singer-songwriter werk.
        </p>

        <!-- Action Triggers -->
        <div class="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <a 
            href="#contact" 
            class="btn-terracotta px-8 py-4 rounded-full font-semibold text-center text-sm shadow-[0_0_0_1px_rgba(200,109,81,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-terracotta transition-all"
          >
            Boek Reau
          </a>
          <a 
            href="#muziek" 
            class="px-8 py-4 rounded-full font-medium text-center text-sm text-white bg-white/10 hover:bg-white/20 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.18)] flex items-center justify-center gap-2.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-terracotta"
          >
            <span class="w-2 h-2 rounded-full bg-terracotta"></span>
            Luister Muziek
          </a>
        </div>
      </div>

      <!-- Bottom Bar: Asymmetric USP Strip & Live Quote -->
      <div class="relative z-10 pt-6 border-t border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center">
        <!-- Live USPs -->
        <div class="lg:col-span-7 flex flex-wrap gap-2.5 text-xs font-mono text-white/80">
          <span class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 backdrop-blur-sm shadow-[0_0_0_1px_rgba(255,255,255,0.1)]">
            <svg class="w-3.5 h-3.5 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            Geen stroom nodig (100% mobiel)
          </span>
          <span class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 backdrop-blur-sm shadow-[0_0_0_1px_rgba(255,255,255,0.1)]">
            <svg class="w-3.5 h-3.5 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            Huiskamers &amp; Tuinen
          </span>
          <span class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 backdrop-blur-sm shadow-[0_0_0_1px_rgba(255,255,255,0.1)]">
            <svg class="w-3.5 h-3.5 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
            Bedrijven &amp; Braderieën
          </span>
        </div>

        <!-- Artist Quote -->
        <div class="lg:col-span-5 lg:text-right">
          <p class="text-xs text-white/70 italic font-light">
            "Mobiel &amp; akoestisch: muziek midden tussen de mensen, overal waar geluisterd wordt."
          </p>
        </div>
      </div>

    </div>
  `;
}
