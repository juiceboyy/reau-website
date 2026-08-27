/**
 * Reau Website - Contact & Booking Form Module
 * Handles direct background submission via Netlify Forms (AJAX),
 * input validation, loading states, calculations, and UI feedback.
 */

import { calculateRate, rateConfig } from './booking-calculator.js';

export function initContactForm() {
  const form = document.getElementById('booking-form');
  const successCard = document.getElementById('form-success-card');
  const resetBtn = document.getElementById('form-reset-btn');
  const submitBtn = document.getElementById('form-submit-btn');
  const submitBtnText = document.getElementById('submit-btn-text');
  const submitBtnSpinner = document.getElementById('submit-btn-spinner');
  
  const toast = document.getElementById('form-toast');
  const toastTitle = document.getElementById('toast-title');
  const toastMessage = document.getElementById('toast-message');
  const toastClose = document.getElementById('toast-close');
  const directWhatsappBtn = document.getElementById('direct-whatsapp-btn');
  const directWhatsappBtnSuccess = document.getElementById('direct-whatsapp-btn-success');

  let toastTimer = null;

  function showToast(title, message, isSuccess = true) {
    if (!toast) return;
    if (toastTitle) toastTitle.textContent = title;
    if (toastMessage) toastMessage.textContent = message;

    const iconContainer = toast.querySelector('.toast-icon');
    if (iconContainer) {
      iconContainer.className = `toast-icon w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0 ${isSuccess ? 'bg-emerald-500' : 'bg-red-500'}`;
      iconContainer.textContent = isSuccess ? '✓' : '!';
    }

    toast.classList.remove('hidden', 'opacity-0', 'translate-y-4');
    toast.classList.add('opacity-100', 'translate-y-0');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      hideToast();
    }, 6000);
  }

  function hideToast() {
    if (!toast) return;
    toast.classList.remove('opacity-100', 'translate-y-0');
    toast.classList.add('opacity-0', 'translate-y-4');
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 300);
  }

  toastClose?.addEventListener('click', hideToast);

  function setSubmittingState(isSubmitting) {
    if (!submitBtn) return;
    submitBtn.disabled = isSubmitting;
    if (isSubmitting) {
      submitBtn.classList.add('opacity-80', 'cursor-not-allowed');
      submitBtnSpinner?.classList.remove('hidden');
      if (submitBtnText) submitBtnText.textContent = 'Versturen...';
    } else {
      submitBtn.classList.remove('opacity-80', 'cursor-not-allowed');
      submitBtnSpinner?.classList.add('hidden');
      if (submitBtnText) submitBtnText.textContent = 'Verstuur Aanvraag';
    }
  }

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('form-name');
      const emailInput = document.getElementById('form-email');
      const name = nameInput?.value.trim();
      const email = emailInput?.value.trim();

      if (!name || !email) {
        showToast('Ontbrekende gegevens', 'Vul alstublieft minimaal je naam en e-mailadres in.', false);
        return;
      }

      const format = document.getElementById('form-format')?.value || 'duo';
      const sets = document.getElementById('form-sets')?.value || '3';
      const eventType = document.getElementById('form-event-type')?.value || 'Particulier';

      const formatName = rateConfig[format]?.name || format;
      const numSets = sets === '5+' ? 5 : parseInt(sets, 10);
      const price = calculateRate(format, numSets);
      const isParticulier = eventType.includes('Particulier');
      const conditionNote = isParticulier ? '(inclusief reiskosten)' : '(excl. 9% BTW • inclusief reiskosten)';

      // Populate hidden inputs for Netlify Form Submission
      const calculatedRateEl = document.getElementById('form-calculated-rate');
      const calculatedConfigEl = document.getElementById('form-calculated-config');
      
      if (calculatedRateEl) {
        calculatedRateEl.value = `€ ${price},- ${conditionNote}`;
      }
      if (calculatedConfigEl) {
        calculatedConfigEl.value = `${formatName} • ${sets} set(s) (± ${numSets * 45} min) • ${eventType}`;
      }

      setSubmittingState(true);

      const payload = {
        name,
        email,
        phone: document.getElementById('form-phone')?.value.trim() || 'Niet opgegeven',
        event_date: document.getElementById('form-date')?.value || 'Nader te bepalen',
        location: document.getElementById('form-location')?.value.trim() || 'Niet opgegeven',
        event_type: eventType,
        format: formatName,
        sets: `${sets} set(s) (± ${numSets * 45} min)`,
        indicatie_tarief: `€ ${price},- ${conditionNote}`,
        gekozen_configuratie: `${formatName} • ${sets} set(s) (± ${numSets * 45} min) • ${eventType}`,
        message: document.getElementById('form-message')?.value.trim() || ''
      };

      try {
        const funcResponse = await fetch('/.netlify/functions/send-booking', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const result = await funcResponse.json().catch(() => ({}));

        if (funcResponse.ok && result.success) {
          showToast(
            'Aanvraag Verzonden!',
            'Bedankt! Ro heeft je aanvraag ontvangen en er is een bevestiging naar je e-mailadres gestuurd.'
          );
          
          form.reset();
          form.classList.add('hidden');
          successCard?.classList.remove('hidden');

          // Scroll smoothly to success card
          successCard?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          throw new Error(result.error || `Status ${funcResponse.status}`);
        }
      } catch (error) {
        console.error('Fout bij versturen formulier:', error);
        showToast(
          'Verzending mislukt',
          'Er is een tijdelijk verbindingsprobleem. Probeer het opnieuw of mail direct naar boekingen@reaumusic.nl.',
          false
        );
      } finally {
        setSubmittingState(false);
      }
    });
  }

  // Reset button to allow submitting another inquiry
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      successCard?.classList.add('hidden');
      form?.classList.remove('hidden');
      form?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  // Direct WhatsApp Button Handlers
  function openWhatsApp() {
    const whatsappText = encodeURIComponent(
      'Hallo Ro! Ik heb interesse in een optreden van Reau en wil graag meer informatie over de beschikbaarheid.'
    );
    window.open(`https://wa.me/31600000000?text=${whatsappText}`, '_blank', 'noopener,noreferrer');
  }

  directWhatsappBtn?.addEventListener('click', openWhatsApp);
  directWhatsappBtnSuccess?.addEventListener('click', (e) => {
    e.preventDefault();
    openWhatsApp();
  });
}
