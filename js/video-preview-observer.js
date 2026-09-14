/**
 * Reau Website - Video Preview Viewport & Touch Controller
 * Optimized for iOS Safari, Android & Desktop:
 * - Eliminates gray loading flashes by keeping poster image visible until 'playing' event fires
 * - Plays preview for ~2.8 seconds at crisp 1.0x speed when scrolled into view
 * - Gracefully crossfades (300ms) back to the high-res poster image, avoiding stuttery hardware decoders
 * - Seamlessly coordinates with desktop mouse hover
 */

const PREVIEW_ACTIVE_DURATION = 2800; // ms to play before crossfading to poster
const FADE_OUT_DURATION = 300;        // ms for crossfade transition

/**
 * Initializes IntersectionObserver on all video preview cards.
 * @param {HTMLElement} container 
 */
export function setupVideoPreviewObserver(container) {
  if (!container || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const card = entry.target;
      const previewVideo = card.querySelector('video');
      const posterImg = card.querySelector('.video-poster-img');
      if (!previewVideo) return;

      if (entry.isIntersecting) {
        // If card is currently hovered with mouse on desktop, don't override
        if (card._isMouseHovered) return;

        playAndCrossfadePreview(previewVideo, posterImg);
      } else {
        // Left viewport: immediately stop and restore poster
        cancelVideoPreview(previewVideo, posterImg);
      }
    });
  }, {
    threshold: 0.45 // Trigger when card is substantially visible
  });

  const videoCards = container.querySelectorAll('[id^="track-card-"]');
  videoCards.forEach((card) => {
    if (card.querySelector('video')) {
      observer.observe(card);
    }
  });
}

/**
 * Plays preview video and crossfades from/to poster without gray flashes.
 * @param {HTMLVideoElement} video 
 * @param {HTMLImageElement} posterImg 
 */
export function playAndCrossfadePreview(video, posterImg) {
  if (!video) return;

  // Clear any existing preview timers
  cancelVideoPreview(video, posterImg);

  try {
    video.muted = true;
    video.defaultMuted = true;
    video.playbackRate = 1.0;
  } catch (_) {}

  // Only hide poster image once the video is genuinely emitting frames (prevents iOS gray flash)
  const onPlaying = () => {
    if (posterImg) {
      posterImg.classList.add('opacity-0');
    }
  };

  video._onPlayingHandler = onPlaying;
  video.addEventListener('playing', onPlaying, { once: true });

  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      // Autoplay prevented: keep poster visible
      if (posterImg) posterImg.classList.remove('opacity-0');
    });
  }

  // Play actively for PREVIEW_ACTIVE_DURATION, then smoothly crossfade back to poster
  video._previewTimer = setTimeout(() => {
    // 1. Crossfade back to crisp poster
    if (posterImg) {
      posterImg.classList.remove('opacity-0');
    }

    // 2. Pause video once covered by poster
    video._pauseTimer = setTimeout(() => {
      video.pause();
    }, FADE_OUT_DURATION);
  }, PREVIEW_ACTIVE_DURATION);
}

/**
 * Handles desktop mouseenter hover preview.
 * @param {HTMLVideoElement} video 
 * @param {HTMLImageElement} posterImg 
 */
export function startHoverPreview(video, posterImg) {
  if (!video) return;
  cancelVideoPreview(video, posterImg);

  try {
    video.muted = true;
    video.defaultMuted = true;
    video.playbackRate = 1.0;
  } catch (_) {}

  if (posterImg) {
    posterImg.classList.add('opacity-0');
  }

  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      if (posterImg) posterImg.classList.remove('opacity-0');
    });
  }
}

/**
 * Handles desktop mouseleave or leaving viewport.
 * @param {HTMLVideoElement} video 
 * @param {HTMLImageElement} posterImg 
 */
export function stopHoverPreview(video, posterImg) {
  cancelVideoPreview(video, posterImg);
}

/**
 * Cancels all timers, restores poster, and pauses video.
 * @param {HTMLVideoElement} video 
 * @param {HTMLImageElement} posterImg 
 */
export function cancelVideoPreview(video, posterImg) {
  if (!video) return;

  if (video._previewTimer) {
    clearTimeout(video._previewTimer);
    video._previewTimer = null;
  }

  if (video._pauseTimer) {
    clearTimeout(video._pauseTimer);
    video._pauseTimer = null;
  }

  if (video._onPlayingHandler) {
    video.removeEventListener('playing', video._onPlayingHandler);
    video._onPlayingHandler = null;
  }

  if (posterImg) {
    posterImg.classList.remove('opacity-0');
  }

  video.pause();
  try {
    video.playbackRate = 1.0;
  } catch (_) {}
}
