/**
 * Reau Website - Booking Rate Calculator Engine
 * Calculates dynamic fees and seamlessly pre-fills the inquiry form.
 */

export const rateConfig = {
  solo: {
    name: 'Solo (Reau)',
    subtitle: 'Akoestische gitaar & zang',
    base: { 1: 300, 2: 400, 3: 500, 4: 600 },
    extraPerSet: 100
  },
  duo: {
    name: 'Duo (+ Bassist)',
    subtitle: 'Reau + akoestische bas & zang',
    base: { 1: 450, 2: 600, 3: 750, 4: 900 },
    extraPerSet: 150
  },
  trio: {
    name: 'Trio (+ Percussie)',
    subtitle: 'Reau + bassist + percussie',
    base: { 1: 600, 2: 800, 3: 1000, 4: 1200 },
    extraPerSet: 200
  }
};

export const occasionConfig = {
  particulier: {
    name: 'Particulier',
    formValue: 'Particulier'
  },
  zakelijk: {
    name: 'Zakelijk / Event',
    formValue: 'Zakelijk / Event'
  }
};

export function calculateRate(format, sets) {
  const config = rateConfig[format] || rateConfig.solo;
  const numSets = Math.max(1, sets);
  if (numSets <= 4) {
    return config.base[numSets] || config.base[1];
  }
  return config.base[4] + (numSets - 4) * config.extraPerSet;
}

export function initBookingCalculator() {
  const formatCards = document.querySelectorAll('[data-format-card]');
  const setButtons = document.querySelectorAll('[data-sets-btn]');
  const customToggleBtn = document.getElementById('calc-custom-toggle');
  const stepperContainer = document.getElementById('calc-stepper-container');
  const stepperMinus = document.getElementById('calc-stepper-minus');
  const stepperPlus = document.getElementById('calc-stepper-plus');
  const stepperValue = document.getElementById('calc-stepper-value');
  const occasionCards = document.querySelectorAll('[data-occasion-card]');

  const priceDisplayEl = document.getElementById('calc-price-display');
  const summaryTextEl = document.getElementById('calc-summary-text');
  const vatNoteEl = document.getElementById('calc-vat-note');
  const subNoteEl = document.getElementById('calc-sub-note');
  const submitBtn = document.getElementById('calc-submit-btn');

  // Contact form elements
  const formFormatSelect = document.getElementById('form-format');
  const formSetsSelect = document.getElementById('form-sets');
  const formEventTypeSelect = document.getElementById('form-event-type');

  let currentFormat = 'duo';
  let currentSets = 3;
  let currentOccasion = 'particulier';

  function updateCalculation() {
    const formatData = rateConfig[currentFormat] || rateConfig.solo;
    const occasionData = occasionConfig[currentOccasion] || occasionConfig.particulier;
    const price = calculateRate(currentFormat, currentSets);

    // 1. Update text displays
    if (priceDisplayEl) {
      priceDisplayEl.textContent = `€ ${price},-`;
    }
    if (summaryTextEl) {
      summaryTextEl.textContent = `${formatData.name} • ${currentSets} set${currentSets > 1 ? 's' : ''} (± ${currentSets * 45} min) • ${occasionData.name}`;
    }
    if (vatNoteEl) {
      vatNoteEl.textContent = currentOccasion === 'particulier' ? '(inclusief reiskosten)' : '(excl. 9% BTW • incl. reiskosten)';
    }
    if (subNoteEl) {
      subNoteEl.textContent = currentOccasion === 'particulier'
        ? 'Inclusief reiskosten, voorbereiding, eigen geluid & accu-apparatuur.'
        : 'Inclusief reiskosten, voorbereiding, eigen geluid & accu-apparatuur (excl. 9% BTW).';
    }

    // 2. Update format cards UI
    formatCards.forEach(card => {
      const isSelected = card.dataset.formatCard === currentFormat;
      const dot = card.querySelector('.indicator-dot');
      const indicator = card.querySelector('.calc-format-indicator');

      if (isSelected) {
        card.classList.add('border-terracotta', 'bg-terracotta/5', 'ring-2', 'ring-terracotta/20', 'shadow-md');
        card.classList.remove('border-espresso/10', 'bg-white');
        dot?.classList.remove('hidden');
        indicator?.classList.add('border-terracotta');
        indicator?.classList.remove('border-espresso/20');
      } else {
        card.classList.remove('border-terracotta', 'bg-terracotta/5', 'ring-2', 'ring-terracotta/20', 'shadow-md');
        card.classList.add('border-espresso/10', 'bg-white');
        dot?.classList.add('hidden');
        indicator?.classList.remove('border-terracotta');
        indicator?.classList.add('border-espresso/20');
      }
    });

    // 3. Update sets buttons UI
    if (currentSets <= 4) {
      setButtons.forEach(btn => {
        const isSelected = parseInt(btn.dataset.setsBtn, 10) === currentSets;
        if (isSelected) {
          btn.classList.add('border-terracotta', 'bg-terracotta/10', 'ring-2', 'ring-terracotta/20', 'shadow-sm');
          btn.classList.remove('border-espresso/10', 'bg-white');
        } else {
          btn.classList.remove('border-terracotta', 'bg-terracotta/10', 'ring-2', 'ring-terracotta/20', 'shadow-sm');
          btn.classList.add('border-espresso/10', 'bg-white');
        }
      });
      if (customToggleBtn) {
        customToggleBtn.classList.remove('bg-terracotta', 'text-white', 'border-terracotta');
        customToggleBtn.classList.add('bg-white', 'text-espresso', 'border-espresso/15');
      }
      if (stepperContainer) {
        stepperContainer.classList.add('hidden');
        stepperContainer.classList.remove('flex');
      }
    } else {
      // 5+ sets active
      setButtons.forEach(btn => {
        btn.classList.remove('border-terracotta', 'bg-terracotta/10', 'ring-2', 'ring-terracotta/20', 'shadow-sm');
        btn.classList.add('border-espresso/10', 'bg-white');
      });
      if (customToggleBtn) {
        customToggleBtn.classList.add('bg-terracotta', 'text-white', 'border-terracotta');
        customToggleBtn.classList.remove('bg-white', 'text-espresso', 'border-espresso/15');
      }
      if (stepperContainer) {
        stepperContainer.classList.remove('hidden');
        stepperContainer.classList.add('flex');
      }
      if (stepperValue) {
        stepperValue.textContent = `${currentSets} sets (± ${currentSets * 45} min)`;
      }
    }

    // 4. Update occasion cards UI
    occasionCards.forEach(card => {
      const isSelected = card.dataset.occasionCard === currentOccasion;
      const dot = card.querySelector('.indicator-dot');
      const indicator = card.querySelector('.calc-occasion-indicator');

      if (isSelected) {
        card.classList.add('border-terracotta', 'bg-terracotta/5', 'ring-2', 'ring-terracotta/20', 'shadow-md');
        card.classList.remove('border-espresso/10', 'bg-white');
        dot?.classList.remove('hidden');
        indicator?.classList.add('border-terracotta');
        indicator?.classList.remove('border-espresso/20');
      } else {
        card.classList.remove('border-terracotta', 'bg-terracotta/5', 'ring-2', 'ring-terracotta/20', 'shadow-md');
        card.classList.add('border-espresso/10', 'bg-white');
        dot?.classList.add('hidden');
        indicator?.classList.remove('border-terracotta');
        indicator?.classList.add('border-espresso/20');
      }
    });

    // 5. Keep form fields in sync
    syncWithForm(formatData.name, currentSets, occasionData.formValue, price);
  }

  function syncWithForm(formatName, sets, occasionValue, price) {
    if (formFormatSelect && formFormatSelect.value !== currentFormat) {
      formFormatSelect.value = currentFormat;
    }
    if (formSetsSelect) {
      const setsVal = sets <= 4 ? String(sets) : '5+';
      if (formSetsSelect.value !== setsVal) {
        formSetsSelect.value = setsVal;
      }
    }
    if (formEventTypeSelect && formEventTypeSelect.value !== occasionValue) {
      formEventTypeSelect.value = occasionValue;
    }

    const formSummaryEl = document.getElementById('form-calculator-summary');
    if (formSummaryEl) {
      const conditionNote = currentOccasion === 'particulier' ? 'inclusief reiskosten' : 'excl. 9% BTW • incl. reiskosten';
      formSummaryEl.innerHTML = `
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span><strong>Gekozen configuratie:</strong> ${formatName} • ${sets} set(s) • ${occasionValue}</span>
        </div>
        <span class="font-serif font-bold text-terracotta text-sm">Indicatie: € ${price},- (${conditionNote})</span>
      `;
      formSummaryEl.classList.remove('hidden');
    }
  }

  // Format cards event listeners
  formatCards.forEach(card => {
    card.addEventListener('click', () => {
      currentFormat = card.dataset.formatCard;
      updateCalculation();
    });
  });

  // Sets buttons event listeners
  setButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      currentSets = parseInt(btn.dataset.setsBtn, 10);
      updateCalculation();
    });
  });

  // Custom 5+ sets toggle
  customToggleBtn?.addEventListener('click', () => {
    if (currentSets <= 4) {
      currentSets = 5;
    }
    updateCalculation();
  });

  // Stepper controls
  stepperMinus?.addEventListener('click', () => {
    if (currentSets > 5) {
      currentSets -= 1;
    } else if (currentSets === 5) {
      currentSets = 4;
    }
    updateCalculation();
  });

  stepperPlus?.addEventListener('click', () => {
    if (currentSets < 10) {
      currentSets += 1;
      updateCalculation();
    }
  });

  // Occasion cards event listeners
  occasionCards.forEach(card => {
    card.addEventListener('click', () => {
      currentOccasion = card.dataset.occasionCard;
      updateCalculation();
    });
  });

  // Contact form listeners to keep calculator updated if user changes form directly
  formFormatSelect?.addEventListener('change', (e) => {
    currentFormat = e.target.value;
    updateCalculation();
  });

  formSetsSelect?.addEventListener('change', (e) => {
    const val = e.target.value;
    currentSets = val === '5+' ? 5 : parseInt(val, 10);
    updateCalculation();
  });

  formEventTypeSelect?.addEventListener('change', (e) => {
    const val = e.target.value;
    if (val.includes('Zakelijk')) {
      currentOccasion = 'zakelijk';
    } else {
      currentOccasion = 'particulier';
    }
    updateCalculation();
  });

  // CTA button: smooth scroll to form, update summary, and focus name
  submitBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const nameInput = document.getElementById('form-name');
        nameInput?.focus();
      }, 600);
    }
  });

  // Initialize
  updateCalculation();
}

