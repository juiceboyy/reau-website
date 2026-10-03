/**
 * Reau Website - QR Kaart Landing Page Companion Script
 * Handles native web share, clipboard fallback, and launching the vertical video modal with sound.
 */

import { openVideoModal } from '/js/components/video-modal.js';

function initKaart() {
  // Initialize Lucide icons if available (with fallback guard)
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  } else {
    const iconInterval = setInterval(() => {
      if (typeof lucide !== 'undefined' && lucide.createIcons) {
        clearInterval(iconInterval);
        lucide.createIcons();
      }
    }, 100);
    setTimeout(() => clearInterval(iconInterval), 10000);
  }

  // Toast notification element
  const toast = document.getElementById('toast-feedback');
  let toastTimer = null;

  function showToast(message = 'Link gekopieerd naar klembord') {
    if (!toast) return;

    const toastText = document.getElementById('toast-message-text');
    if (toastText) {
      toastText.textContent = message;
    }

    if (toastTimer) {
      clearTimeout(toastTimer);
    }

    toast.classList.remove('opacity-0', 'translate-y-2', 'pointer-events-none');
    toast.classList.add('opacity-100', 'translate-y-0');

    toastTimer = setTimeout(() => {
      toast.classList.remove('opacity-100', 'translate-y-0');
      toast.classList.add('opacity-0', 'translate-y-2', 'pointer-events-none');
    }, 2800);
  }

  // Share button handling
  const shareBtn = document.getElementById('share-btn');
  if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
      const shareData = {
        title: 'Reau - Ro Halfhide',
        text: 'Live akoestische pop & soul - Ro Halfhide',
        url: window.location.href,
      };

      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        try {
          await navigator.share(shareData);
        } catch (err) {
          if (err.name !== 'AbortError') {
            copyToClipboard();
          }
        }
      } else {
        copyToClipboard();
      }
    });
  }

  function copyToClipboard() {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(window.location.href)
        .then(() => {
          showToast('Link gekopieerd naar klembord');
        })
        .catch(() => {
          fallbackCopyText(window.location.href);
        });
    } else {
      fallbackCopyText(window.location.href);
    }
  }

  function fallbackCopyText(text) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    tempInput.setAttribute('readonly', '');
    tempInput.style.position = 'absolute';
    tempInput.style.left = '-9999px';
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand('copy');
      showToast('Link gekopieerd naar klembord');
    } catch {
      showToast('Kopiëren niet gelukt');
    }
    document.body.removeChild(tempInput);
  }

  // Looping silent video preview and fullscreen vertical modal trigger
  const video = document.getElementById('card-video');
  const videoTrigger = document.getElementById('video-preview-trigger');

  if (video) {
    // Ensure autoplay starts muted
    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay policy prevented playback until first touch
        const startOnTouch = () => {
          video.play().catch(() => {});
          document.removeEventListener('touchstart', startOnTouch);
          document.removeEventListener('click', startOnTouch);
        };
        document.addEventListener('touchstart', startOnTouch, { once: true });
        document.addEventListener('click', startOnTouch, { once: true });
      });
    }
  }

  if (videoTrigger) {
    const triggerFullscreenModal = () => {
      const currentPos = video ? video.currentTime : 0;
      if (video) {
        video.pause();
      }

      openVideoModal(
        '/assets/video/reau-nina-simone.mp4',
        'My Baby Just Cares for Me • Nina Simone',
        () => {
          if (video && !video.paused) {
            video.pause();
          }
        },
        () => {
          if (video) {
            video.play().catch(() => {});
          }
        },
        currentPos
      );
    };

    videoTrigger.addEventListener('click', triggerFullscreenModal);
    videoTrigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        triggerFullscreenModal();
      }
    });
  }
}

// DOMContentLoaded state guard according to user global guidelines
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initKaart);
} else {
  initKaart();
}
