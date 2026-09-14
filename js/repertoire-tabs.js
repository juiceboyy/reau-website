/**
 * Reau Website - Repertoire & Live Snippets Explorer
 * Unified grid showing Reimagined Covers & Originals with subtle badges and audio preview buttons.
 */

import { openVideoModal } from './components/video-modal.js';
import { setupVideoPreviewObserver, cancelVideoPreview } from './video-preview-observer.js';

import { repertoireList } from './repertoire-data.js';
export { repertoireList };

let globalAudio = null;
let currentPlayingId = null;

export function initRepertoireTabs() {
  const repertoireGrid = document.getElementById('repertoire-grid');
  if (!repertoireGrid) return;

  if (!globalAudio) {
    globalAudio = new Audio();
    globalAudio.preload = 'metadata';

    globalAudio.addEventListener('ended', () => {
      resetAllPlayButtons();
      currentPlayingId = null;
    });

    globalAudio.addEventListener('pause', () => {
      if (globalAudio.currentTime < globalAudio.duration) {
        updateButtonState(currentPlayingId, false);
      }
    });

    globalAudio.addEventListener('play', () => {
      updateButtonState(currentPlayingId, true);
    });
  }

  renderRepertoireItems(repertoireGrid);
}

function renderRepertoireItems(container) {
  container.innerHTML = '';

  repertoireList.forEach((item) => {
    const isOriginal = item.type === 'original';
    const hasAudio = Boolean(item.audioSrc);
    const hasVideo = Boolean(item.videoPreviewSrc && item.videoSrc);

    const card = document.createElement('div');
    card.id = `track-card-${item.id}`;
    card.className = `bg-warm-card rounded-2xl p-5 sm:p-6 border transition-all flex flex-col justify-between hover-lift ${
      isOriginal ? 'border-terracotta/25' : 'border-espresso/10'
    }`;

    card.innerHTML = `
      <div>
        ${
          hasVideo
            ? `
          <div class="video-preview-trigger relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-4 cursor-pointer group bg-espresso/5 border border-espresso/10 shadow-sm" role="button" tabindex="0" aria-label="Bekijk live video van ${item.title}">
            <video src="${item.videoPreviewSrc}" poster="${item.videoPoster}" muted loop playsinline preload="metadata" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"></video>
            <div class="absolute inset-0 bg-espresso/25 group-hover:bg-espresso/15 transition-colors flex items-center justify-center">
              <span class="w-11 h-11 rounded-full bg-white/95 text-terracotta flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <svg class="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </span>
            </div>
            <span class="absolute bottom-2 right-2 px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase bg-black/60 text-white backdrop-blur-sm">Video</span>
          </div>
        `
            : ''
        }
        <div class="flex items-center justify-between gap-2 mb-3">
          <span class="px-2.5 py-1 text-xs font-semibold rounded-full ${
            isOriginal ? 'bg-terracotta/10 text-terracotta' : 'bg-espresso/5 text-espresso-muted'
          }">
            ${item.tag}
          </span>
          <span class="text-xs text-espresso-muted font-medium">${item.subtitle}</span>
        </div>
        <h4 class="font-serif text-xl sm:text-2xl text-espresso mb-2">${item.title}</h4>
        <p class="text-sm text-espresso-muted leading-relaxed mb-6">${item.style}</p>
      </div>

      <div class="pt-4 border-t border-espresso/10 flex items-center justify-between mt-auto">
        ${
          hasAudio
            ? `
          <button type="button" data-track-id="${item.id}" data-audio-src="${item.audioSrc}" aria-label="Fragment afspelen van ${item.title}" class="card-play-btn inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all bg-espresso/5 hover:bg-terracotta hover:text-white text-espresso group">
            <span class="btn-icon flex items-center justify-center w-5 h-5 rounded-full bg-terracotta text-white group-hover:bg-white group-hover:text-terracotta transition-colors">
              <svg class="icon-play w-2.5 h-2.5 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              <svg class="icon-pause w-2.5 h-2.5 hidden" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            </span>
            <span class="btn-label">Luister fragment</span>
          </button>
          <span class="text-xs font-mono text-espresso-muted">${item.duration}</span>
        `
            : hasVideo
            ? `
          <div class="flex items-center gap-2 text-xs text-espresso-muted">
            <svg class="w-3.5 h-3.5 text-terracotta shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
            </svg>
            <span class="font-medium text-espresso">Live video fragment</span>
          </div>
          <span class="text-xs font-mono text-espresso-muted">${item.duration}</span>
        `
            : `
          <div class="flex items-center gap-2 text-xs text-espresso-muted/70 italic">
            <svg class="w-3.5 h-3.5 text-terracotta/70 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z"></path>
            </svg>
            <span>Akoestisch live fragment binnenkort</span>
          </div>
        `
        }
      </div>
    `;

    if (hasAudio) {
      const playBtn = card.querySelector('.card-play-btn');
      playBtn?.addEventListener('click', () => toggleTrackPlayback(item.id, item.audioSrc));
    }

    if (hasVideo) {
      const videoTrigger = card.querySelector('.video-preview-trigger');
      const previewVideo = card.querySelector('video');

      // Play video preview when hovering over the card on desktop
      card.addEventListener('mouseenter', () => {
        card._isMouseHovered = true;
        if (previewVideo) {
          cancelVideoPreview(previewVideo);
          try {
            previewVideo.playbackRate = 1.0;
          } catch (_) {}
          previewVideo.play().catch(() => {});
        }
      });

      card.addEventListener('mouseleave', () => {
        card._isMouseHovered = false;
        if (previewVideo) {
          cancelVideoPreview(previewVideo);
        }
      });

      const triggerModal = () => {
        if (previewVideo) {
          cancelVideoPreview(previewVideo);
        }
        const modalHeading = item.tag ? `${item.title} (${item.tag})` : `${item.title} (Live video)`;
        openVideoModal(item.videoSrc, modalHeading, () => {
          if (globalAudio && !globalAudio.paused) {
            globalAudio.pause();
          }
        });
      };
      videoTrigger?.addEventListener('click', triggerModal);
      videoTrigger?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          triggerModal();
        }
      });
    }

    container.appendChild(card);
  });

  // Enable viewport scroll previews with gentle deceleration for touchscreens & mobile
  setupVideoPreviewObserver(container);
}

function toggleTrackPlayback(trackId, audioSrc) {
  if (!globalAudio) return;

  if (currentPlayingId === trackId && !globalAudio.paused) {
    globalAudio.pause();
    return;
  }

  if (currentPlayingId === trackId && globalAudio.paused) {
    globalAudio.play().catch(console.warn);
    return;
  }

  // Switch to new track
  resetAllPlayButtons();
  currentPlayingId = trackId;
  globalAudio.src = audioSrc;
  globalAudio.play().catch(console.warn);
}

function updateButtonState(trackId, isPlaying) {
  if (!trackId) return;
  const card = document.getElementById(`track-card-${trackId}`);
  if (!card) return;

  const btn = card.querySelector('.card-play-btn');
  const iconPlay = card.querySelector('.icon-play');
  const iconPause = card.querySelector('.icon-pause');
  const btnLabel = card.querySelector('.btn-label');

  if (isPlaying) {
    card.classList.add('ring-2', 'ring-terracotta/50');
    btn?.classList.add('bg-terracotta', 'text-white');
    btn?.classList.remove('bg-espresso/5', 'text-espresso');
    iconPlay?.classList.add('hidden');
    iconPause?.classList.remove('hidden');
    if (btnLabel) btnLabel.textContent = 'Pauzeer';
  } else {
    card.classList.remove('ring-2', 'ring-terracotta/50');
    btn?.classList.remove('bg-terracotta', 'text-white');
    btn?.classList.add('bg-espresso/5', 'text-espresso');
    iconPlay?.classList.remove('hidden');
    iconPause?.classList.add('hidden');
    if (btnLabel) btnLabel.textContent = 'Luister fragment';
  }
}

function resetAllPlayButtons() {
  document.querySelectorAll('.card-play-btn').forEach((btn) => {
    btn.classList.remove('bg-terracotta', 'text-white');
    btn.classList.add('bg-espresso/5', 'text-espresso');
    const playIcon = btn.querySelector('.icon-play');
    const pauseIcon = btn.querySelector('.icon-pause');
    const label = btn.querySelector('.btn-label');
    playIcon?.classList.remove('hidden');
    pauseIcon?.classList.add('hidden');
    if (label) label.textContent = 'Luister fragment';
  });

  document.querySelectorAll('[id^="track-card-"]').forEach((card) => {
    card.classList.remove('ring-2', 'ring-terracotta/50');
  });
}
