/**
 * Reau Website - Contact & Booking Form Module
 * Validates inputs, triggers toast notifications, and provides direct mailto/WhatsApp integration.
 */

import { calculateRate, rateConfig } from './booking-calculator.js';

export function initContactForm() {
  const form = document.getElementById('booking-form');
  const toast = document.getElementById('form-toast');
  const toastTitle = document.getElementById('toast-title');
  const toastMessage = document.getElementById('toast-message');
  const toastClose = document.getElementById('toast-close');
  const directMailBtn = document.getElementById('direct-mail-btn');
  const directWhatsappBtn = document.getElementById('direct-whatsapp-btn');

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

    setTimeout(() => {
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

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name')?.value.trim();
      const email = document.getElementById('form-email')?.value.trim();
      const phone = document.getElementById('form-phone')?.value.trim() || 'Niet opgegeven';
      const date = document.getElementById('form-date')?.value || 'Nader te bepalen';
      const eventType = document.getElementById('form-event-type')?.value || 'Particulier';
      const format = document.getElementById('form-format')?.value || 'duo';
      const sets = document.getElementById('form-sets')?.value || '3';
      const location = document.getElementById('form-location')?.value.trim() || 'Niet opgegeven';
      const message = document.getElementById('form-message')?.value.trim();

      if (!name || !email) {
        showToast('Ontbrekende gegevens', 'Vul alstublieft minimaal je naam en e-mailadres in.', false);
        return;
      }

      const formatName = rateConfig[format]?.name || format;
      const numSets = sets === '5+' ? 5 : parseInt(sets, 10);
      const price = calculateRate(format, numSets);
      const isParticulier = eventType.includes('Particulier');
      const conditionNote = isParticulier ? '(inclusief reiskosten)' : '(excl. 9% BTW • inclusief reiskosten)';

      // Format clean email subject and body
      const subject = encodeURIComponent(`Boekingsaanvraag Reau: ${name} (${formatName}, ${eventType})`);
      const body = encodeURIComponent(
        `Beste Ro / Reau,\n\n` +
        `Hierbij wil ik graag een optreden aanvragen:\n\n` +
        `• Naam: ${name}\n` +
        `• E-mail: ${email}\n` +
        `• Telefoon / WhatsApp: ${phone}\n` +
        `• Datum evenement: ${date}\n` +
        `• Type gelegenheid: ${eventType}\n` +
        `• Gewenste bezetting: ${formatName} (${sets} set(s) ± ${numSets * 45} min)\n` +
        `• Indicatietarief: Vanaf € ${price},- ${conditionNote}\n` +
        `• Locatie / Plaats: ${location}\n\n` +
        `Toelichting / Vraag:\n${message || 'Geen extra toelichting'}\n\n` +
        `Met vriendelijke groet,\n${name}`
      );

      const mailtoLink = `mailto:halfhide@gmail.com?subject=${subject}&body=${body}`;

      showToast(
        'Aanvraag voorbereid!',
        'Je e-mailprogramma wordt geopend met alle ingevulde gegevens. Verstuur deze om je aanvraag direct bij Ro te bezorgen.'
      );

      // Open mail client after brief delay
      setTimeout(() => {
        window.location.href = mailtoLink;
      }, 750);
    });
  }

  // Direct WhatsApp Button Generator
  if (directWhatsappBtn) {
    directWhatsappBtn.addEventListener('click', () => {
      const whatsappText = encodeURIComponent(
        'Hallo Ro! Ik heb interesse in een optreden van Reau en wil graag meer informatie over de beschikbaarheid.'
      );
      window.open(`https://wa.me/31600000000?text=${whatsappText}`, '_blank', 'noopener,noreferrer');
    });
  }
}
