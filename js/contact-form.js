/**
 * Reau Website - Contact & Booking Form Module
 * Handles background submission via Netlify Functions, input validation,
 * bot mitigation (Honeypots & Cloudflare Turnstile), loading states, and feedback.
 */

import { formatConfig } from './live-formats-selector.js';

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
  let turnstileWidgetId = null;
  let currentTurnstileToken = '';
  const formMountTime = Date.now();

  const dateInput = document.getElementById('form-date');
  if (dateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    dateInput.min = `${yyyy}-${mm}-${dd}`;
  }

  function initTurnstileWidget(siteKey) {
    if (!siteKey) return;
    function render() {
      const container = document.getElementById('turnstile-container');
      if (!container || !window.turnstile || container.dataset.rendered === 'true') return;
      try {
        turnstileWidgetId = window.turnstile.render(container, {
          sitekey: siteKey,
          theme: 'light',
          callback: (t) => { currentTurnstileToken = t; },
          'expired-callback': () => { currentTurnstileToken = ''; }
        });
        container.dataset.rendered = 'true';
      } catch (err) {
        console.warn('Turnstile render melding:', err);
      }
    }

    if (typeof turnstile !== 'undefined') {
      render();
    } else {
      const interval = setInterval(() => {
        if (typeof turnstile !== 'undefined') {
          clearInterval(interval);
          render();
        }
      }, 100);
      setTimeout(() => clearInterval(interval), 10000);
    }
  }

  async function checkTurnstileConfig() {
    const manualKey = window.TURNSTILE_SITE_KEY || document.getElementById('turnstile-container')?.dataset.sitekey;
    if (manualKey) {
      initTurnstileWidget(manualKey);
      return;
    }
    try {
      const res = await fetch('/.netlify/functions/send-booking');
      if (res.ok) {
        const config = await res.json();
        if (config.turnstileSiteKey) initTurnstileWidget(config.turnstileSiteKey);
      }
    } catch (e) {}
  }

  checkTurnstileConfig();

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
    toastTimer = setTimeout(hideToast, 6000);
  }

  function hideToast() {
    if (!toast) return;
    toast.classList.remove('opacity-100', 'translate-y-0');
    toast.classList.add('opacity-0', 'translate-y-4');
    setTimeout(() => { toast.classList.add('hidden'); }, 300);
  }

  toastClose?.addEventListener('click', hideToast);

  function setSubmittingState(isSubmitting) {
    if (!submitBtn) return;
    submitBtn.disabled = isSubmitting;
    submitBtn.classList.toggle('opacity-80', isSubmitting);
    submitBtn.classList.toggle('cursor-not-allowed', isSubmitting);
    submitBtnSpinner?.classList.toggle('hidden', !isSubmitting);
    if (submitBtnText) submitBtnText.textContent = isSubmitting ? 'Versturen...' : 'Verstuur Aanvraag';
  }

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Honeypot traps: drop silently on client
      const botFieldVal = form.querySelector('input[name="bot-field"]')?.value?.trim() || '';
      const websiteVal = form.querySelector('input[name="website"]')?.value?.trim() || '';
      if (botFieldVal || websiteVal) {
        form.reset();
        form.classList.add('hidden');
        successCard?.classList.remove('hidden');
        return;
      }

      const name = document.getElementById('form-name')?.value.trim();
      const email = document.getElementById('form-email')?.value.trim();
      const eventDate = document.getElementById('form-date')?.value || '';
      const location = document.getElementById('form-location')?.value.trim() || '';

      if (!name || !email) {
        showToast('Ontbrekende gegevens', 'Vul alstublieft minimaal je naam en e-mailadres in.', false);
        return;
      }

      const hasMixedCaseTransitions = (name.match(/[a-z][A-Z]/g) || []).length >= 2;
      const isUnbrokenLongName = name.length > 18 && !name.includes(' ') && !name.includes('-');
      if (/[0-9]/.test(name) || hasMixedCaseTransitions || isUnbrokenLongName) {
        showToast('Ongeldige naam', 'Vul een geldige voor- en achternaam in.', false);
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      const emailLocalPart = email.split('@')[0] || '';
      const emailLocalBotTransitions = (emailLocalPart.match(/[a-z][A-Z]/g) || []).length >= 2;
      if (!emailRegex.test(email) || emailLocalBotTransitions) {
        showToast('Ongeldig e-mailadres', 'Controleer het opgegeven e-mailadres.', false);
        return;
      }

      if (eventDate) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (new Date(eventDate) < today) {
          showToast('Ongeldige datum', 'De datum van het evenement kan niet in het verleden liggen.', false);
          return;
        }
      }

      if (location && (/https?:\/\/|www\./i.test(location) || (location.length > 25 && !location.includes(' ') && !location.includes(',')))) {
        showToast('Ongeldige locatie', 'Controleer de opgegeven plaats of locatie.', false);
        return;
      }

      if (turnstileWidgetId !== null && !currentTurnstileToken) {
        showToast('Beveiligingscontrole', 'Even geduld, de beveiligingscontrole wordt uitgevoerd.', false);
        return;
      }

      const format = document.getElementById('form-format')?.value || 'solo';
      const sets = document.getElementById('form-sets')?.value || '3';
      const eventType = document.getElementById('form-event-type')?.value || 'Particulier';
      const formatName = formatConfig[format]?.name || format;
      const durationText = sets === '5+' ? '5+ uur (Maatwerk)' : `${sets} uur`;
      const configSummary = `${formatName} • ${durationText} • ${eventType}`;

      const calculatedConfigEl = document.getElementById('form-calculated-config');
      if (calculatedConfigEl) calculatedConfigEl.value = configSummary;

      setSubmittingState(true);

      const payload = {
        name,
        email,
        phone: document.getElementById('form-phone')?.value.trim() || 'Niet opgegeven',
        event_date: eventDate || 'Nader te bepalen',
        location: location || 'Niet opgegeven',
        event_type: eventType,
        format: formatName,
        sets: durationText,
        gekozen_configuratie: configSummary,
        message: document.getElementById('form-message')?.value.trim() || '',
        bot_field: botFieldVal,
        website: websiteVal,
        turnstile_token: currentTurnstileToken,
        cf_turnstile_response: currentTurnstileToken,
        fill_time_ms: Date.now() - formMountTime
      };

      try {
        const funcResponse = await fetch('/.netlify/functions/send-booking', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const result = await funcResponse.json().catch(() => ({}));
        if (funcResponse.ok && result.success) {
          showToast('Aanvraag Verzonden!', 'Bedankt! Ro heeft je aanvraag ontvangen en er is een bevestiging gemaild.');
          form.reset();
          if (turnstileWidgetId !== null && window.turnstile) {
            try {
              window.turnstile.reset(turnstileWidgetId);
              currentTurnstileToken = '';
            } catch (e) {}
          }
          form.classList.add('hidden');
          successCard?.classList.remove('hidden');
          successCard?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          throw new Error(result.error || `Status ${funcResponse.status}`);
        }
      } catch (error) {
        showToast('Verzending mislukt', error.message || 'Verbindingsprobleem. Mail gerust naar boekingen@reaumusic.nl.', false);
      } finally {
        setSubmittingState(false);
      }
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      successCard?.classList.add('hidden');
      form?.classList.remove('hidden');
      if (turnstileWidgetId !== null && window.turnstile) {
        try {
          window.turnstile.reset(turnstileWidgetId);
          currentTurnstileToken = '';
        } catch (e) {}
      }
      form?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  function openWhatsApp() {
    const text = encodeURIComponent('Hallo Ro! Ik heb interesse in een optreden van Reau en wil graag meer informatie over de beschikbaarheid.');
    window.open(`https://wa.me/31600000000?text=${text}`, '_blank', 'noopener,noreferrer');
  }

  directWhatsappBtn?.addEventListener('click', openWhatsApp);
  directWhatsappBtnSuccess?.addEventListener('click', (e) => {
    e.preventDefault();
    openWhatsApp();
  });
}
