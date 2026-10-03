/**
 * Reau Website - QR Kaart Landing Page Companion Script
 * Handles native web share / clipboard fallback, video player overlay, and icons.
 */

function initKaart() {
  // Initialize Lucide icons if available
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
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

  // Direct video play/pause overlay
  const video = document.getElementById('card-video');
  const playOverlay = document.getElementById('video-play-overlay');

  if (video && playOverlay) {
    const updatePlayState = () => {
      if (video.paused || video.ended) {
        playOverlay.classList.remove('opacity-0', 'pointer-events-none');
        playOverlay.classList.add('opacity-100');
      } else {
        playOverlay.classList.remove('opacity-100');
        playOverlay.classList.add('opacity-0', 'pointer-events-none');
      }
    };

    playOverlay.addEventListener('click', () => {
      if (video.paused) {
        video.play().catch((err) => {
          console.warn('Video play was prevented:', err);
        });
      } else {
        video.pause();
      }
    });

    video.addEventListener('play', updatePlayState);
    video.addEventListener('pause', updatePlayState);
    video.addEventListener('ended', () => {
      video.currentTime = 0;
      updatePlayState();
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initKaart);
} else {
  initKaart();
}
