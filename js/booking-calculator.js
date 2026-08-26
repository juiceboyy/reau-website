/**
 * Reau Website - Booking Rate Calculator
 * Calculates indicative performance fees and synchronizes with contact form.
 */

export const rates = {
  solo: {
    name: 'Solo (Reau)',
    subtitle: 'Akoestische gitaar & zang (optioneel looper / iPad)',
    1: 300,
    2: 450,
    3: 600
  },
  duo: {
    name: 'Duo (Reau + Bassist)',
    subtitle: 'Akoestische gitaar, zang + bassist (basgitaar & backing vocals)',
    1: 450,
    2: 675,
    3: 900
  },
  trio: {
    name: 'Trio (Reau + Bassist + Percussie)',
    subtitle: 'Akoestische gitaar, zang + bassist + percussie',
    1: 600,
    2: 900,
    3: 1200
  }
};

export function initBookingCalculator() {
  const formatButtons = document.querySelectorAll('.calc-format-btn');
  const setButtons = document.querySelectorAll('.calc-set-btn');
  const calculatedPriceEl = document.getElementById('calc-total-price');
  const formatSummaryEl = document.getElementById('calc-format-summary');
  const setSummaryEl = document.getElementById('calc-set-summary');
  const bookDirectBtn = document.getElementById('calc-book-btn');

  // Contact form input bindings
  const formFormatSelect = document.getElementById('form-format');
  const formSetsSelect = document.getElementById('form-sets');

  let currentFormat = 'solo';
  let currentSets = 2;

  function updateCalculation() {
    const formatData = rates[currentFormat];
    const price = formatData[currentSets];

    if (calculatedPriceEl) {
      calculatedPriceEl.textContent = `€ ${price},-`;
    }
    if (formatSummaryEl) {
      formatSummaryEl.textContent = formatData.name;
    }
    if (setSummaryEl) {
      setSummaryEl.textContent = `${currentSets} set${currentSets > 1 ? 's' : ''} (± ${currentSets * 45} min)`;
    }

    // Update active button states for formats
    formatButtons.forEach(btn => {
      const format = btn.dataset.format;
      if (format === currentFormat) {
        btn.classList.add('border-terracotta', 'bg-terracotta/10', 'text-espresso', 'font-semibold', 'ring-2', 'ring-terracotta/30');
        btn.classList.remove('border-espresso/10', 'bg-white', 'hover:bg-espresso/5');
      } else {
        btn.classList.remove('border-terracotta', 'bg-terracotta/10', 'ring-2', 'ring-terracotta/30');
        btn.classList.add('border-espresso/10', 'bg-white', 'text-espresso', 'font-semibold', 'hover:bg-espresso/5');
      }
    });

    // Update active button states for sets
    setButtons.forEach(btn => {
      const sets = parseInt(btn.dataset.sets, 10);
      if (sets === currentSets) {
        btn.classList.add('border-terracotta', 'bg-terracotta', 'text-white', 'font-semibold');
        btn.classList.remove('border-espresso/10', 'bg-white', 'text-espresso', 'hover:bg-espresso/5');
      } else {
        btn.classList.remove('border-terracotta', 'bg-terracotta', 'text-white', 'font-semibold');
        btn.classList.add('border-espresso/10', 'bg-white', 'text-espresso', 'hover:bg-espresso/5');
      }
    });

    // Synchronize with form selects if present
    if (formFormatSelect && formFormatSelect.value !== currentFormat) {
      formFormatSelect.value = currentFormat;
    }
    if (formSetsSelect && parseInt(formSetsSelect.value, 10) !== currentSets) {
      formSetsSelect.value = String(currentSets);
    }
  }

  formatButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      currentFormat = btn.dataset.format;
      updateCalculation();
    });
  });

  setButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      currentSets = parseInt(btn.dataset.sets, 10);
      updateCalculation();
    });
  });

  // Listen to changes in the contact form dropdowns to keep calculator in sync
  formFormatSelect?.addEventListener('change', (e) => {
    currentFormat = e.target.value;
    updateCalculation();
  });

  formSetsSelect?.addEventListener('change', (e) => {
    currentSets = parseInt(e.target.value, 10);
    updateCalculation();
  });

  // Smooth scroll and prefill on "Kies deze optie"
  bookDirectBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  });

  // Initialize display
  updateCalculation();
}
