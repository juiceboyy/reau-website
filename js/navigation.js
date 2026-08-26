/**
 * Reau Website - Navigation Module
 * Handles mobile drawer, active section highlighting & scroll behaviors.
 */

export function initNavigation() {
  const navbar = document.getElementById('main-navbar');
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Scroll appearance for sticky navbar
  const handleScroll = () => {
    if (window.scrollY > 20) {
      navbar?.classList.add('glass-nav-scrolled');
    } else {
      navbar?.classList.remove('glass-nav-scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mobile menu toggle
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      const newState = !isExpanded;
      mobileToggle.setAttribute('aria-expanded', String(newState));
      
      if (newState) {
        mobileMenu.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      } else {
        mobileMenu.classList.add('hidden');
        document.body.style.overflow = '';
      }
    });

    // Close mobile menu on clicking any mobile link
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.add('hidden');
        document.body.style.overflow = '';
      });
    });
  }

  // Active section indicator with IntersectionObserver
  if ('IntersectionObserver' in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          updateActiveLinks(currentId);
        }
      });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
  }

  function updateActiveLinks(activeId) {
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${activeId}`) {
        link.classList.add('text-terracotta', 'font-semibold');
        link.classList.remove('text-espresso-muted');
      } else {
        link.classList.remove('text-terracotta', 'font-semibold');
        link.classList.add('text-espresso-muted');
      }
    });
  }
}
