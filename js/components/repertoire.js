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
        <p class="text-espresso-muted mt-3 text-sm sm:text-base">Een warme samensmelting van herkenbare akoestische klassiekers en zorgvuldig geselecteerde eigen songs. Perfect afgestemd op de sfeer van een borrel, receptie of intiem diner.</p>
      </div>

      <!-- Dynamic Repertoire Grid -->
      <div id="repertoire-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Populated by js/repertoire-tabs.js -->
      </div>
    </div>
  `;
}
