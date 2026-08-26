/**
 * Reau Website - Audio Player View Component
 */

export function renderPlayerView(container) {
  if (!container) return;
  container.innerHTML = `
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto mb-12">
        <span class="text-xs uppercase tracking-widest text-terracotta font-semibold">Luister Nu</span>
        <h2 class="font-serif text-3xl sm:text-4xl text-espresso mt-2">Originele Opnames van Ro Halfhide</h2>
        <p class="text-espresso-muted mt-3 text-sm sm:text-base">Beluister hieronder een selectie van uitgebrachte tracks.</p>
      </div>

      <div class="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-espresso/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        <!-- Album Art & Track Info -->
        <div class="lg:col-span-5 flex flex-col items-center text-center">
          <div class="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden shadow-lg border-2 border-espresso/10 mb-4 bg-sand">
            <img id="player-artwork" src="assets/images/album-its-been-good.jpg" alt="Track artwork" class="w-full h-full object-cover">
            
            <div id="player-waveform" class="waveform-paused absolute bottom-3 left-1/2 -translate-x-1/2 flex items-end gap-1.5 h-8 px-3 py-1 rounded-full bg-espresso/80 backdrop-blur-sm">
              <span class="waveform-bar w-1 h-3 bg-terracotta rounded-full"></span>
              <span class="waveform-bar w-1 h-6 bg-terracotta rounded-full"></span>
              <span class="waveform-bar w-1 h-4 bg-terracotta rounded-full"></span>
              <span class="waveform-bar w-1 h-7 bg-terracotta rounded-full"></span>
              <span class="waveform-bar w-1 h-5 bg-terracotta rounded-full"></span>
              <span class="waveform-bar w-1 h-3 bg-terracotta rounded-full"></span>
            </div>
          </div>
          
          <h3 id="player-title" class="font-serif text-2xl text-espresso">It's Been Good</h3>
          <p id="player-subtitle" class="text-xs text-espresso-muted mt-1">Acoustic Pop / Soul</p>
        </div>

        <!-- Controls & Tracklist -->
        <div class="lg:col-span-7 flex flex-col justify-between space-y-6">
          
          <!-- Progress Bar -->
          <div>
            <div id="player-progress-container" class="w-full bg-espresso/10 h-2 rounded-full cursor-pointer overflow-hidden relative" role="progressbar" aria-label="Audio voortgang">
              <div id="player-progress-bar" class="bg-terracotta h-full w-0 transition-all duration-100 rounded-full"></div>
            </div>
            <div class="flex justify-between text-xs text-espresso-muted font-mono mt-2">
              <span id="player-current-time">0:00</span>
              <span id="player-duration">1:50</span>
            </div>
          </div>

          <!-- Playback Buttons -->
          <div class="flex items-center justify-center gap-6">
            <button id="player-prev-btn" type="button" aria-label="Vorig nummer" class="p-3 rounded-full hover:bg-espresso/5 text-espresso transition-colors">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
            </button>
            
            <button id="player-play-btn" type="button" aria-label="Afspelen of pauzeren" class="w-16 h-16 rounded-full btn-terracotta flex items-center justify-center shadow-lg transition-transform active:scale-95">
              <svg class="icon-play w-7 h-7 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              <svg class="icon-pause w-7 h-7 hidden" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            </button>

            <button id="player-next-btn" type="button" aria-label="Volgend nummer" class="p-3 rounded-full hover:bg-espresso/5 text-espresso transition-colors">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
            </button>
          </div>

          <!-- Playlist Select -->
          <div class="space-y-2">
            <p class="text-xs uppercase tracking-wider text-espresso-muted font-semibold">Nummers in de speler:</p>
            <div id="player-tracklist" class="space-y-2">
              <!-- Injected by js/audio-player.js -->
            </div>
          </div>

          <!-- Streaming External Links -->
          <div class="pt-3 border-t border-espresso/10 flex flex-wrap items-center justify-center gap-4 text-xs text-espresso-muted">
            <span>Luister ook op:</span>
            <a href="https://open.spotify.com/artist/0F2t706hY2eDqfO7Q7x1d4" target="_blank" rel="noopener noreferrer" class="hover:text-terracotta font-medium underline">Spotify</a>
            <span>•</span>
            <a href="https://soundcloud.com/rohalfhide" target="_blank" rel="noopener noreferrer" class="hover:text-terracotta font-medium underline">SoundCloud</a>
            <span>•</span>
            <a href="https://rohalfhide.bandcamp.com" target="_blank" rel="noopener noreferrer" class="hover:text-terracotta font-medium underline">Bandcamp</a>
            <span>•</span>
            <a href="https://youtube.com/rohalfhide" target="_blank" rel="noopener noreferrer" class="hover:text-terracotta font-medium underline">YouTube</a>
          </div>

        </div>
      </div>
    </div>
  `;
}
