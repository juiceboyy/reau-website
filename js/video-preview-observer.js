/**
 * Reau Website - Video Preview Viewport & Touch Controller
 * Optimized for iOS Safari, Android & Desktop:
 * - Eliminates gray loading flashes by keeping poster image visible until 'playing' event fires
 * - Countdown only starts ONCE the video is actively playing (guarantees full preview duration)
 * - Cinematic 750ms crossfade between poster and moving video
 * - Seamlessly coordinates with desktop mouse hover
 */

const PREVIEW_ACTIVE_DURATION = 3200; // ms to play actively once video starts moving
const CROSSFADE_DURATION = 750;       // ms for smooth crossfade transition

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
 * Plays preview video and crossfades from/to poster once actually playing.
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

  // Reveal video only once frames are actively rendering (prevents iOS gray flash)
  const onPlaying = () => {
    if (posterImg) {
      posterImg.style.opacity = '0';
    }

    // Start timer ONLY after video has buffered and is genuinely playing
    video._previewTimer = setTimeout(() => {
      // 1. Crossfade back to crisp poster
      if (posterImg) {
        posterImg.style.opacity = '1';
      }

      // 2. Pause video once covered by poster crossfade
      video._pauseTimer = setTimeout(() => {
        video.pause();
      }, CROSSFADE_DURATION);
    }, PREVIEW_ACTIVE_DURATION);
  };

  video._onPlayingHandler = onPlaying;
  video.addEventListener('playing', onPlaying, { once: true });

  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      // Autoplay prevented: keep poster visible
      if (posterImg) posterImg.style.opacity = '1';
    });
  }
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

  const onPlaying = () => {
    if (posterImg) {
      posterImg.style.opacity = '0';
    }
  };
  video._onPlayingHandler = onPlaying;
  video.addEventListener('playing', onPlaying, { once: true });

  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      if (posterImg) posterImg.style.opacity = '1';
    });
  }
}

/**
 * Handles desktop mouseleave or leaving viewport.
 * @param {HTMLVideoElement} video 
 * @param {HTMLImageElement} posterImg 
 */
export function stopHoverPreview(video, posterImg) {
  if (!video) return;

  if (video._previewTimer) {
    clearTimeout(video._previewTimer);
    video._previewTimer = null;
  }
  if (video._onPlayingHandler) {
    video.removeEventListener('playing', video._onPlayingHandler);
    video._onPlayingHandler = null;
  }

  // Crossfade back to poster
  if (posterImg) {
    posterImg.style.opacity = '1';
  }

  video._pauseTimer = setTimeout(() => {
    video.pause();
  }, CROSSFADE_DURATION);
}

/**
 * Cancels all timers, restores poster, and pauses video immediately.
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
    posterImg.style.opacity = '1';
  }

  video.pause();
  try {
    video.playbackRate = 1.0;
  } catch (_) {}
}
