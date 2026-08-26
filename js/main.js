/**
 * Reau Website - Main Bootstrap Entry Point
 * Orchestrates modular components with the required DOMContentLoaded state guard.
 */

import { renderTop } from './components/top.js';
import { renderAbout } from './components/about.js';
import { renderWallOfFame } from './components/wall-of-fame.js';
import { renderRepertoire } from './components/repertoire.js';
import { renderPlayerView } from './components/player-view.js';
import { renderLiveFormats } from './components/live-formats.js';
import { renderMedia } from './components/media.js';
import { renderContact } from './components/contact.js';

import { initNavigation } from './navigation.js';
import { initAudioPlayer } from './audio-player.js';
import { initRepertoireTabs } from './repertoire-tabs.js';
import { initBookingCalculator } from './booking-calculator.js';
import { initContactForm } from './contact-form.js';

function init() {
  // 1. Render all modular section views
  renderTop(document.getElementById('top'));
  renderAbout(document.getElementById('about'));
  renderWallOfFame(document.getElementById('wall-of-fame'));
  renderRepertoire(document.getElementById('repertoire'));
  renderPlayerView(document.getElementById('muziek'));
  renderLiveFormats(document.getElementById('live'));
  renderMedia(document.getElementById('media'));
  renderContact(document.getElementById('contact'));

  // 2. Initialize interactive controllers
  initNavigation();
  initAudioPlayer();
  initRepertoireTabs();
  initBookingCalculator();
  initContactForm();

  // 3. Dynamic current year in footer
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 4. Back to top action
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  console.log('Reau website successfully mounted and initialized.');
}

// DOMContentLoaded state guard according to user global guidelines
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
