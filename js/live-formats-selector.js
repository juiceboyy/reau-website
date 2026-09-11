/**
 * Reau Website - Live Formats Selection Controller
 * Synchronizes format selections with the booking inquiry form (without pricing).
 */

export const formatConfig = {
  solo: {
    name: 'Solo (Reau)',
    subtitle: 'Akoestische gitaar & zang'
  },
  duo: {
    name: 'Duo (+ Bassist)',
    subtitle: 'Reau + akoestische bas & zang'
  },
  trio: {
    name: 'Trio (+ Percussie)',
    subtitle: 'Reau + bassist + percussie'
  }
};

export function initLiveFormatsSelector() {
  const formatButtons = document.querySelectorAll('.format-select-btn');
  const formFormatSelect = document.getElementById('form-format');

  formatButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const format = btn.dataset.formatSelect;

      if (formFormatSelect && format) {
        formFormatSelect.value = format;
      }

      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          const nameInput = document.getElementById('form-name');
          nameInput?.focus();
        }, 600);
      }
    });
  });
}

