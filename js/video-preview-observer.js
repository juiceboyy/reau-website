/**
 * Reau Website - Single Active Video Preview Controller
 * - Plays video preview when centered in viewport on mobile/touchscreens
 * - Guarantees STRICTLY ONE active moving preview at any given time
 * - Stops and restores poster when scrolled almost out of view
 * - Seamlessly handles desktop mouse hover
 */

let activeCard = null;
let isHovering = false;
let rafId = null;
const visibleCardsSet = new Set();

/**
 * Sets up viewport scroll tracking and single-active preview logic.
 * @param {HTMLElement} container 
 */
export function setupVideoPreviewObserver(container) {
  if (!container) return;

  const videoCards = Array.from(container.querySelectorAll('[id^="track-card-"]')).filter(
    (card) => card.querySelector('video')
  );

  if (videoCards.length === 0) return;

  // Track visibility with IntersectionObserver
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleCardsSet.add(entry.target);
          } else {
            visibleCardsSet.delete(entry.target);
          }
        });
        scheduleEvaluation();
      },
      {
        // Triggers as soon as a card is at least 15% in/out of view
        threshold: [0.15, 0.4, 0.7]
      }
    );

    videoCards.forEach((card) => observer.observe(card));
  }

  // Also listen to window scroll & resize for continuous tracking
  window.addEventListener('scroll', scheduleEvaluation, { passive: true });
  window.addEventListener('resize', scheduleEvaluation, { passive: true });

  // Pause preview when tab is hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && activeCard) {
      stopCardPreview(activeCard);
      activeCard = null;
    } else if (!document.hidden) {
      scheduleEvaluation();
    }
  });

  // Initial evaluation once mounted
  scheduleEvaluation();
}

/**
 * Throttles viewport evaluation using requestAnimationFrame.
 */
function scheduleEvaluation() {
  if (isHovering) return; // Desktop mouse hover takes precedence
  if (rafId) cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(evaluateBestVisibleCard);
}

/**
 * Finds the card closest to the vertical center of the viewport (with >= 20% visibility)
 * and ensures ONLY that single card plays.
 */
function evaluateBestVisibleCard() {
  rafId = null;
  if (isHovering) return;

  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const viewportCenter = viewportHeight / 2;

  let bestCard = null;
  let minDistance = Infinity;

  visibleCardsSet.forEach((card) => {
    const rect = card.getBoundingClientRect();
    const visibleTop = Math.max(0, rect.top);
    const visibleBottom = Math.min(viewportHeight, rect.bottom);
    const visibleHeight = Math.max(0, visibleBottom - visibleTop);
    const visibleRatio = visibleHeight / rect.height;

    // Card must be at least 20% in view (stops when almost out of view)
    if (visibleRatio >= 0.2) {
      const cardCenter = rect.top + rect.height / 2;
      const distance = Math.abs(cardCenter - viewportCenter);

      if (distance < minDistance) {
        minDistance = distance;
        bestCard = card;
      }
    }
  });

  if (bestCard !== activeCard) {
    if (activeCard) {
      stopCardPreview(activeCard);
    }
    if (bestCard) {
      startCardPreview(bestCard);
    }
    activeCard = bestCard;
  }
}

/**
 * Starts video preview and smoothly reveals it once frames are rendering.
 * @param {HTMLElement} card 
 */
function startCardPreview(card) {
  if (!card) return;
  const video = card.querySelector('video');
  const posterImg = card.querySelector('.video-poster-img');
  if (!video) return;

  clearCardTimers(video);

  try {
    video.muted = true;
    video.defaultMuted = true;
    video.playbackRate = 1.0;
  } catch (_) {}

  // Reveal video only once actual frames are playing (prevents gray flash)
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
 * Stops video preview and crossfades back to poster image.
 * @param {HTMLElement} card 
 */
function stopCardPreview(card) {
  if (!card) return;
  const video = card.querySelector('video');
  const posterImg = card.querySelector('.video-poster-img');
  if (!video) return;

  clearCardTimers(video);

  if (posterImg) {
    posterImg.style.opacity = '1';
  }

  // Pause video once poster has smoothly faded back over it (400ms)
  video._pauseTimer = setTimeout(() => {
    video.pause();
  }, 400);
}

/**
 * Clears any pending pause or event handlers on a video.
 * @param {HTMLVideoElement} video 
 */
function clearCardTimers(video) {
  if (!video) return;
  if (video._pauseTimer) {
    clearTimeout(video._pauseTimer);
    video._pauseTimer = null;
  }
  if (video._onPlayingHandler) {
    video.removeEventListener('playing', video._onPlayingHandler);
    video._onPlayingHandler = null;
  }
}

/**
 * Desktop hover entry: immediately plays hovered card and pauses any other.
 * @param {HTMLElement} card 
 */
export function startHoverPreview(card) {
  isHovering = true;
  if (activeCard && activeCard !== card) {
    stopCardPreview(activeCard);
  }
  activeCard = card;
  startCardPreview(card);
}

/**
 * Desktop hover leave: stops preview and resumes viewport tracking.
 * @param {HTMLElement} card 
 */
export function stopHoverPreview(card) {
  isHovering = false;
  if (activeCard === card) {
    stopCardPreview(card);
    activeCard = null;
  }
  scheduleEvaluation();
}

/**
 * Emergency stop for all previews (e.g. when opening a video modal).
 */
export function stopAllPreviews() {
  if (activeCard) {
    stopCardPreview(activeCard);
    activeCard = null;
  }
  isHovering = false;
}
