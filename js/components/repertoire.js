/**
 * Reau Website - Repertoire Component
 */

export function renderRepertoire(container) {
  if (!container) return;
  container.innerHTML = `
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto mb-12">
        <span class="text-xs uppercase tracking-widest text-terracotta font-semibold">Wat kun je verwachten</span>
        <h2 class="font-serif text-3xl sm:text-4xl text-espresso mt-2">Repertoire & Setlists</h2>
        <p class="text-espresso-muted mt-3 text-sm sm:text-base">Een uitgebalanceerde mix van herkenbare parels en bezield eigen werk.</p>
        
        <!-- Tabs Switcher -->
        <div class="mt-8 inline-flex p-1.5 rounded-full bg-canvas-alt border border-espresso/10 shadow-inner">
          <button id="tab-covers" type="button" class="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all bg-terracotta text-white shadow-md">
            Reimagined Covers
          </button>
          <button id="tab-originals" type="button" class="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all text-espresso hover:text-terracotta">
            Origineel Werk
          </button>
        </div>
      </div>

      <!-- Dynamic Repertoire Grid -->
      <div id="repertoire-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Populated by js/repertoire-tabs.js -->
      </div>
    </div>
  `;
}
