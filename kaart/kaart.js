/**
 * Reau Website - QR Kaart Landing Page Companion Script
 * Handles native web share, clipboard fallback, and launching direct native fullscreen with audio.
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

  // Looping silent video preview and direct native fullscreen trigger
  const video = document.getElementById('card-video');
  const videoTrigger = document.getElementById('video-preview-trigger');
  let isInlinePreviewMode = true;

  if (video) {
    // Ensure autoplay starts muted
    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay policy prevented playback until first touch
        const startOnTouch = () => {
          if (isInlinePreviewMode) {
            video.muted = true;
            video.play().catch(() => {});
          }
          document.removeEventListener('touchstart', startOnTouch);
          document.removeEventListener('click', startOnTouch);
        };
        document.addEventListener('touchstart', startOnTouch, { once: true });
        document.addEventListener('click', startOnTouch, { once: true });
      });
    }

    // Helper to safely resume the silent inline loop
    const resumeInlinePreview = () => {
      isInlinePreviewMode = true;
      video.controls = false;
      video.muted = true;
      if (video.paused) {
        video.play().catch(() => {});
      }
    };

    // Staggered resumption when exiting fullscreen (handles iOS dismiss animation)
    const handleExitFullscreen = () => {
      isInlinePreviewMode = true;
      resumeInlinePreview();
      setTimeout(resumeInlinePreview, 80);
      setTimeout(resumeInlinePreview, 250);
      setTimeout(resumeInlinePreview, 450);
    };

    video.addEventListener('webkitendfullscreen', handleExitFullscreen);

    document.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement) {
        handleExitFullscreen();
      }
    });

    document.addEventListener('webkitfullscreenchange', () => {
      if (!document.webkitFullscreenElement) {
        handleExitFullscreen();
      }
    });

    if ('webkitPresentationMode' in video) {
      video.addEventListener('webkitpresentationmodechanged', () => {
        if (video.webkitPresentationMode === 'inline') {
          handleExitFullscreen();
        }
      });
    }

    // Anti-freeze guard: if browser pauses video after dismiss while in inline mode, resume
    video.addEventListener('pause', () => {
      if (isInlinePreviewMode) {
        setTimeout(() => {
          if (isInlinePreviewMode && video.paused) {
            video.controls = false;
            video.muted = true;
            video.play().catch(() => {});
          }
        }, 50);
      }
    });
  }

  if (videoTrigger && video) {
    const triggerDirectFullscreen = async () => {
      isInlinePreviewMode = false;
      video.muted = false;
      video.controls = true;

      let enteredNative = false;

      // 1. iOS Safari (iPhone / iPad native video player)
      if (typeof video.webkitEnterFullscreen === 'function') {
        try {
          video.webkitEnterFullscreen();
          enteredNative = true;
        } catch (err) {
          console.warn('webkitEnterFullscreen error:', err);
        }
      }

      // 2. Standard Fullscreen API (Android, Chrome, Firefox, Safari desktop)
      if (!enteredNative && typeof video.requestFullscreen === 'function') {
        try {
          await video.requestFullscreen();
          enteredNative = true;
        } catch (err) {
          console.warn('requestFullscreen error:', err);
        }
      }

      // 3. WebKit Fullscreen API
      if (!enteredNative && typeof video.webkitRequestFullscreen === 'function') {
        try {
          video.webkitRequestFullscreen();
          enteredNative = true;
        } catch (err) {
          console.warn('webkitRequestFullscreen error:', err);
        }
      }

      // Ensure audio playback continues
      video.play().catch((err) => {
        console.warn('Playback error:', err);
      });

      // 4. Fallback: if native fullscreen was rejected or unsupported, open in-page modal
      if (!enteredNative) {
        openVideoModal(
          video.src || '/assets/video/reau-nina-simone.mp4',
          'My Baby Just Cares for Me • Nina Simone',
          () => {
            if (!video.paused) {
              video.pause();
            }
          },
          () => {
            isInlinePreviewMode = true;
            video.controls = false;
            video.muted = true;
            video.play().catch(() => {});
          },
          video.currentTime || 0
        );
      }
    };

    videoTrigger.addEventListener('click', triggerDirectFullscreen);
    videoTrigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        triggerDirectFullscreen();
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
