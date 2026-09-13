/**
 * Reau Website - Video Modal Component
 * Displays a focused, accessible video popup with backdrop blur and keyboard support.
 */

let modalElement = null;
let currentVideoElement = null;
let escapeKeyHandler = null;

export function openVideoModal(videoSrc, title = 'Reau Live Video', onOpenCallback = null) {
  if (onOpenCallback && typeof onOpenCallback === 'function') {
    onOpenCallback();
  }

  if (!modalElement) {
    createModalStructure();
  }

  if (currentVideoElement) {
    currentVideoElement.src = videoSrc;
    currentVideoElement.setAttribute('aria-label', title);
  }

  const modalTitle = modalElement.querySelector('#video-modal-title');
  if (modalTitle) {
    modalTitle.textContent = title;
  }

  modalElement.classList.remove('hidden');
  modalElement.classList.add('flex');
  document.body.classList.add('overflow-hidden');

  // Autoplay video with sound once modal opens
  if (currentVideoElement) {
    currentVideoElement.currentTime = 0;
    currentVideoElement.play().catch((err) => {
      console.warn('Autoplay prevented or interrupted:', err);
    });
  }

  escapeKeyHandler = (e) => {
    if (e.key === 'Escape') {
      closeVideoModal();
    }
  };
  document.addEventListener('keydown', escapeKeyHandler);
}

export function closeVideoModal() {
  if (!modalElement) return;

  if (currentVideoElement) {
    currentVideoElement.pause();
    currentVideoElement.currentTime = 0;
  }

  modalElement.classList.add('hidden');
  modalElement.classList.remove('flex');
  document.body.classList.remove('overflow-hidden');

  if (escapeKeyHandler) {
    document.removeEventListener('keydown', escapeKeyHandler);
    escapeKeyHandler = null;
  }
}

function createModalStructure() {
  modalElement = document.createElement('div');
  modalElement.id = 'video-modal-container';
  modalElement.className =
    'fixed inset-0 z-50 hidden items-center justify-center bg-espresso/90 backdrop-blur-md p-4 sm:p-6 transition-opacity';
  modalElement.setAttribute('role', 'dialog');
  modalElement.setAttribute('aria-modal', 'true');
  modalElement.setAttribute('aria-labelledby', 'video-modal-title');

  modalElement.innerHTML = `
    <div class="relative w-full max-w-sm sm:max-w-md mx-auto flex flex-col items-center">
      <!-- Top Bar with Title and Close Button -->
      <div class="w-full flex items-center justify-between text-white/90 mb-3 px-1">
        <h3 id="video-modal-title" class="font-serif text-lg tracking-wide text-white truncate"></h3>
        <button id="video-modal-close-btn" type="button" aria-label="Sluit video" class="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors focus:outline-none">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Video Player Frame -->
      <div class="relative w-full rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/10 aspect-[3/4] max-h-[75vh]">
        <video id="video-modal-player" controls playsinline class="w-full h-full object-contain bg-black"></video>
      </div>
    </div>
  `;

  document.body.appendChild(modalElement);

  currentVideoElement = modalElement.querySelector('#video-modal-player');
  const closeBtn = modalElement.querySelector('#video-modal-close-btn');
  closeBtn?.addEventListener('click', closeVideoModal);

  // Close when clicking on backdrop outside the content box
  modalElement.addEventListener('click', (e) => {
    if (e.target === modalElement) {
      closeVideoModal();
    }
  });
}
