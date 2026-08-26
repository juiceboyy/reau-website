/**
 * Reau Website - Audio Player Module
 * HTML5 Audio player powering real tracks by Ro Halfhide / Reau.
 */

export const playlist = [
  {
    id: 'its-been-good',
    title: "It's Been Good",
    subtitle: "Acoustic Pop / Soul • Single",
    duration: "1:50",
    src: "assets/audio/its-been-good.mp3",
    artwork: "assets/images/album-its-been-good.jpg",
    spotify: "https://open.spotify.com/artist/0F2t706hY2eDqfO7Q7x1d4",
    soundcloud: "https://soundcloud.com/rohalfhide",
    description: "Een warme reflectie op het leven, genomen keuzes en de schoonheid van het pad tot nu toe."
  },
  {
    id: 'evening-sun',
    title: "Evening Sun",
    subtitle: "Soulful Singer-Songwriter",
    duration: "3:06",
    src: "assets/audio/evening-sun.mp3",
    artwork: "assets/images/album-evening-sun.jpg",
    spotify: "https://open.spotify.com/artist/0F2t706hY2eDqfO7Q7x1d4",
    soundcloud: "https://soundcloud.com/rohalfhide",
    description: "Intieme melodielijnen en sfeervolle akoestische gitaardynamiek voor een zwoele avond."
  },
  {
    id: 'think-that-i-must-be-in-love',
    title: "Think That I Must Be In Love",
    subtitle: "Acoustic Storytelling",
    duration: "2:27",
    src: "assets/audio/think-that-i-must-be-in-love.mp3",
    artwork: "assets/images/ro-halfhide-portrait.jpg",
    spotify: "https://open.spotify.com/artist/0F2t706hY2eDqfO7Q7x1d4",
    soundcloud: "https://soundcloud.com/rohalfhide",
    description: "Puur liedjesmakerschap geïnspireerd door klassieke soul en jazzy akkoorden."
  },
  {
    id: 'get-into-your-car-and-drive',
    title: "Get Into Your Car And Drive",
    subtitle: "Folk & Soul Ballad",
    duration: "5:40",
    src: "assets/audio/get-into-your-car-and-drive.mp3",
    artwork: "assets/images/ro-halfhide-portrait.jpg",
    spotify: "https://open.spotify.com/artist/0F2t706hY2eDqfO7Q7x1d4",
    soundcloud: "https://soundcloud.com/rohalfhide",
    description: "Een meeslepend muzikaal verhaal over vrijheid, loslaten en vooruitkijken."
  }
];

let currentIndex = 0;
let audioElement = null;
let isPlaying = false;

export function initAudioPlayer() {
  audioElement = new Audio();
  audioElement.preload = 'metadata';

  const playBtn = document.getElementById('player-play-btn');
  const prevBtn = document.getElementById('player-prev-btn');
  const nextBtn = document.getElementById('player-next-btn');
  const progressContainer = document.getElementById('player-progress-container');
  const progressBar = document.getElementById('player-progress-bar');
  const currentTimeEl = document.getElementById('player-current-time');
  const durationEl = document.getElementById('player-duration');
  const titleEl = document.getElementById('player-title');
  const subtitleEl = document.getElementById('player-subtitle');
  const artworkEl = document.getElementById('player-artwork');
  const trackListContainer = document.getElementById('player-tracklist');
  const waveformEl = document.getElementById('player-waveform');

  // Load initial track
  loadTrack(0, false);

  function loadTrack(index, autoPlay = false) {
    currentIndex = (index + playlist.length) % playlist.length;
    const track = playlist[currentIndex];

    audioElement.src = track.src;
    if (titleEl) titleEl.textContent = track.title;
    if (subtitleEl) subtitleEl.textContent = track.subtitle;
    if (artworkEl) {
      artworkEl.src = track.artwork;
      artworkEl.alt = track.title;
    }
    if (durationEl) durationEl.textContent = track.duration;
    if (currentTimeEl) currentTimeEl.textContent = '0:00';
    if (progressBar) progressBar.style.width = '0%';

    updateTracklistUI();

    if (autoPlay) {
      playTrack();
    }
  }

  function playTrack() {
    audioElement.play().then(() => {
      isPlaying = true;
      updatePlayButtonUI();
      waveformEl?.classList.remove('waveform-paused');
    }).catch(err => {
      console.warn('Audio playback waiting for interaction:', err);
    });
  }

  function pauseTrack() {
    audioElement.pause();
    isPlaying = false;
    updatePlayButtonUI();
    waveformEl?.classList.add('waveform-paused');
  }

  function togglePlay() {
    if (isPlaying) {
      pauseTrack();
    } else {
      playTrack();
    }
  }

  function updatePlayButtonUI() {
    if (!playBtn) return;
    const playIcon = playBtn.querySelector('.icon-play');
    const pauseIcon = playBtn.querySelector('.icon-pause');
    if (isPlaying) {
      playIcon?.classList.add('hidden');
      pauseIcon?.classList.remove('hidden');
    } else {
      playIcon?.classList.remove('hidden');
      pauseIcon?.classList.add('hidden');
    }
  }

  function updateTracklistUI() {
    const items = trackListContainer?.querySelectorAll('.track-item');
    items?.forEach((item, idx) => {
      const isCurrent = idx === currentIndex;
      const playStateIcon = item.querySelector('.track-play-state');
      if (isCurrent) {
        item.classList.add('bg-terracotta/10', 'border-terracotta/30', 'font-medium');
        if (playStateIcon) playStateIcon.textContent = isPlaying ? '❚❚' : '▶';
      } else {
        item.classList.remove('bg-terracotta/10', 'border-terracotta/30', 'font-medium');
        if (playStateIcon) playStateIcon.textContent = '▶';
      }
    });
  }

  // Audio Event Listeners
  audioElement.addEventListener('timeupdate', () => {
    if (audioElement.duration) {
      const progressPercent = (audioElement.currentTime / audioElement.duration) * 100;
      if (progressBar) progressBar.style.width = `${progressPercent}%`;
      if (currentTimeEl) currentTimeEl.textContent = formatTime(audioElement.currentTime);
    }
  });

  audioElement.addEventListener('ended', () => {
    loadTrack(currentIndex + 1, true);
  });

  // UI Event Listeners
  playBtn?.addEventListener('click', togglePlay);
  prevBtn?.addEventListener('click', () => loadTrack(currentIndex - 1, isPlaying));
  nextBtn?.addEventListener('click', () => loadTrack(currentIndex + 1, isPlaying));

  if (progressContainer) {
    progressContainer.addEventListener('click', (e) => {
      const rect = progressContainer.getBoundingClientRect();
      const clickPosition = (e.clientX - rect.left) / rect.width;
      if (audioElement.duration) {
        audioElement.currentTime = clickPosition * audioElement.duration;
      }
    });
  }

  // Render Tracklist Items
  if (trackListContainer) {
    trackListContainer.innerHTML = '';
    playlist.forEach((track, index) => {
      const trackBtn = document.createElement('button');
      trackBtn.type = 'button';
      trackBtn.className = `track-item w-full flex items-center justify-between p-3.5 rounded-xl border border-espresso/10 transition-all hover:bg-espresso/5 text-left ${index === 0 ? 'bg-terracotta/10 border-terracotta/30' : ''}`;
      trackBtn.innerHTML = `
        <div class="flex items-center gap-3 min-w-0">
          <span class="track-play-state flex items-center justify-center w-8 h-8 rounded-full bg-espresso/5 text-xs text-terracotta shrink-0">▶</span>
          <div class="truncate">
            <p class="font-medium text-espresso truncate text-sm sm:text-base">${track.title}</p>
            <p class="text-xs text-espresso-muted truncate">${track.subtitle}</p>
          </div>
        </div>
        <span class="text-xs text-espresso-muted shrink-0 ml-3 font-mono">${track.duration}</span>
      `;
      trackBtn.addEventListener('click', () => {
        if (currentIndex === index && isPlaying) {
          pauseTrack();
        } else {
          loadTrack(index, true);
        }
      });
      trackListContainer.appendChild(trackBtn);
    });
  }

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }
}
