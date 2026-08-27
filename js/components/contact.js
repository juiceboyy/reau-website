/**
 * Reau Website - Contact Section Component
 */

export function renderContact(container) {
  if (!container) return;
  container.innerHTML = `
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto mb-12">
        <span class="text-xs uppercase tracking-widest text-terracotta font-semibold">Boeking & Informatie</span>
        <h2 class="font-serif text-3xl sm:text-4xl text-espresso mt-2">Neem Contact Op</h2>
        <p class="text-espresso-muted mt-3 text-sm sm:text-base">
          Vul het formulier in voor een vrijblijvende beschikbaarheidscheck en offerte op maat.
        </p>
      </div>

      <div class="bg-white rounded-3xl p-6 sm:p-10 border border-espresso/10 shadow-xl">
        
        <!-- Live Calculator Preset Banner -->
        <div id="form-calculator-summary" class="hidden mb-6 p-4 rounded-2xl bg-terracotta/10 border border-terracotta/25 text-xs text-espresso flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
            <span><strong>Gekozen configuratie:</strong> Duo (+ Bassist) • 3 sets (± 135 min) • Particulier</span>
          </div>
          <span class="font-serif font-bold text-terracotta text-sm">Indicatie: € 750,-</span>
        </div>

        <form id="booking-form" class="space-y-6">
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label for="form-name" class="block text-xs uppercase tracking-wider font-semibold text-espresso mb-2">Naam *</label>
              <input type="text" id="form-name" name="name" required placeholder="Je volledige naam" autocomplete="name" class="w-full px-4 py-3 rounded-xl border border-espresso/15 bg-canvas focus:bg-white text-espresso placeholder:text-espresso-muted/50 text-sm transition-all">
            </div>
            <div>
              <label for="form-email" class="block text-xs uppercase tracking-wider font-semibold text-espresso mb-2">E-mailadres *</label>
              <input type="email" id="form-email" name="email" required placeholder="jouw@email.nl" autocomplete="email" class="w-full px-4 py-3 rounded-xl border border-espresso/15 bg-canvas focus:bg-white text-espresso placeholder:text-espresso-muted/50 text-sm transition-all">
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label for="form-phone" class="block text-xs uppercase tracking-wider font-semibold text-espresso mb-2">Telefoon / WhatsApp</label>
              <input type="tel" id="form-phone" name="phone" placeholder="06 - 12345678" autocomplete="tel" class="w-full px-4 py-3 rounded-xl border border-espresso/15 bg-canvas focus:bg-white text-espresso placeholder:text-espresso-muted/50 text-sm transition-all">
            </div>
            <div>
              <label for="form-date" class="block text-xs uppercase tracking-wider font-semibold text-espresso mb-2">Datum Evenement</label>
              <input type="date" id="form-date" name="event_date" class="w-full px-4 py-3 rounded-xl border border-espresso/15 bg-canvas focus:bg-white text-espresso text-sm transition-all">
            </div>
            <div>
              <label for="form-location" class="block text-xs uppercase tracking-wider font-semibold text-espresso mb-2">Plaats / Locatie</label>
              <input type="text" id="form-location" name="location" placeholder="Bijv. Amsterdam, huiskamer" class="w-full px-4 py-3 rounded-xl border border-espresso/15 bg-canvas focus:bg-white text-espresso placeholder:text-espresso-muted/50 text-sm transition-all">
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label for="form-event-type" class="block text-xs uppercase tracking-wider font-semibold text-espresso mb-2">Gelegenheid</label>
              <select id="form-event-type" name="event_type" class="w-full px-4 py-3 rounded-xl border border-espresso/15 bg-canvas focus:bg-white text-espresso text-sm transition-all">
                <option value="Particulier">Particulier (Huiskamer, Tuinfeest, etc.)</option>
                <option value="Zakelijk / Event">Zakelijk / Event (Borrel, Diner, Congres)</option>
                <option value="Bruiloft / Ceremonie">Bruiloft / Ceremonie</option>
              </select>
            </div>
            <div>
              <label for="form-format" class="block text-xs uppercase tracking-wider font-semibold text-espresso mb-2">Gewenste Bezetting</label>
              <select id="form-format" name="format" class="w-full px-4 py-3 rounded-xl border border-espresso/15 bg-canvas focus:bg-white text-espresso text-sm transition-all">
                <option value="solo">Solo (Reau)</option>
                <option value="duo" selected>Duo (+ Bassist)</option>
                <option value="trio">Trio (+ Percussie)</option>
              </select>
            </div>
            <div>
              <label for="form-sets" class="block text-xs uppercase tracking-wider font-semibold text-espresso mb-2">Aantal Sets</label>
              <select id="form-sets" name="sets" class="w-full px-4 py-3 rounded-xl border border-espresso/15 bg-canvas focus:bg-white text-espresso text-sm transition-all">
                <option value="1">1 Set (± 45 min)</option>
                <option value="2">2 Sets (± 90 min)</option>
                <option value="3" selected>3 Sets (± 135 min)</option>
                <option value="4">4 Sets (± 180 min)</option>
                <option value="5+">5+ Sets (Maatwerk)</option>
              </select>
            </div>
          </div>

          <div>
            <label for="form-message" class="block text-xs uppercase tracking-wider font-semibold text-espresso mb-2">Aanvullende Wensen of Vragen</label>
            <textarea id="form-message" name="message" rows="4" placeholder="Vertel kort over de sfeer, het aantal gasten of eventuele verzoeknummers..." class="w-full px-4 py-3 rounded-xl border border-espresso/15 bg-canvas focus:bg-white text-espresso placeholder:text-espresso-muted/50 text-sm transition-all"></textarea>
          </div>

          <div class="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button type="submit" class="btn-terracotta w-full sm:w-auto px-10 py-4 rounded-full font-semibold text-sm uppercase tracking-wider shadow-lg">
              Verstuur Aanvraag
            </button>
            
            <div class="flex items-center gap-3 text-xs text-espresso-muted">
              <span>Of direct per e-mail:</span>
              <a href="mailto:halfhide@gmail.com" class="font-medium text-terracotta hover:underline">halfhide@gmail.com</a>
            </div>
          </div>

        </form>
      </div>

      <div class="mt-8 text-center text-xs text-espresso-muted">
        Ontdek ook de overige projecten en releases op <a href="https://rohalfhide.com" target="_blank" rel="noopener noreferrer" class="text-terracotta underline font-medium">rohalfhide.com</a>
      </div>

    </div>
  `;
}
