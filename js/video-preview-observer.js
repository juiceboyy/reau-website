/**
 * Reau Website - Video Preview Viewport & Touch Controller
 * Controls video previews on touchscreens / scroll:
 * - Plays preview for ~2.5 seconds when scrolled into viewport (teasing live energy)
 * - Decelerates smoothly (playbackRate ramp-down) until coming to a gentle halt
 * - Coordinates cleanly with mouse hover on desktop devices
 */

const PREVIEW_ACTIVE_DURATION = 2400; // ms to play at full speed
const DECELERATION_DURATION = 1000;   // ms to gradually brake to stop

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
      if (!previewVideo) return;

      if (entry.isIntersecting) {
        // If card is currently hovered with mouse, don't interfere
        if (card._isMouseHovered) return;

        playAndDeceleratePreview(previewVideo);
      } else {
        // Left viewport: immediately stop and reset
        cancelVideoPreview(previewVideo);
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
 * Plays the preview video at full speed, then gracefully decelerates to a stop.
 * @param {HTMLVideoElement} video 
 */
export function playAndDeceleratePreview(video) {
  if (!video) return;

  // Clear any existing preview timers or animations
  cancelVideoPreview(video);

  try {
    video.muted = true;
    video.defaultMuted = true;
    video.playbackRate = 1.0;
  } catch (_) {}

  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {});
  }

  // Play actively for PREVIEW_ACTIVE_DURATION, then decelerate
  video._previewTimer = setTimeout(() => {
    smoothDecelerateVideo(video);
  }, PREVIEW_ACTIVE_DURATION);
}

/**
 * Smoothly reduces playbackRate using requestAnimationFrame down to a pause.
 * @param {HTMLVideoElement} video 
 */
function smoothDecelerateVideo(video) {
  if (!video || video.paused) return;

  const startTime = performance.now();
  const initialRate = video.playbackRate || 1.0;

  function step(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / DECELERATION_DURATION, 1);

    // Ease-out quadratic deceleration curve: (1 - progress)^2
    const easeOut = (1 - progress) * (1 - progress);
    const targetRate = Math.max(0.08, initialRate * easeOut);

    try {
      video.playbackRate = targetRate;
    } catch (_) {}

    if (progress < 1 && !video.paused) {
      video._decelAnimFrame = requestAnimationFrame(step);
    } else {
      video.pause();
      try {
        video.playbackRate = 1.0;
      } catch (_) {}
      video._decelAnimFrame = null;
    }
  }

  video._decelAnimFrame = requestAnimationFrame(step);
}

/**
 * Cancels all timers, resets playback speed, and pauses the video.
 * @param {HTMLVideoElement} video 
 */
export function cancelVideoPreview(video) {
  if (!video) return;

  if (video._previewTimer) {
    clearTimeout(video._previewTimer);
    video._previewTimer = null;
  }

  if (video._decelAnimFrame) {
    cancelAnimationFrame(video._decelAnimFrame);
    video._decelAnimFrame = null;
  }

  video.pause();
  try {
    video.playbackRate = 1.0;
  } catch (_) {}
}
