// scripts/nav.js
// Handles responsive navigation toggle and accessibility

const menuBtn = document.getElementById('menuBtn');
const navList = document.getElementById('primaryNav');

/**
 * Toggle navigation open/closed
 */
function toggleNav() {
  const isOpen = navList.dataset.state === 'open';
  navList.dataset.state = isOpen ? 'closed' : 'open';
  menuBtn.setAttribute('aria-expanded', String(!isOpen));
}

/**
 * Close navigation (used for escape key or outside clicks)
 */
function closeNav() {
  navList.dataset.state = 'closed';
  menuBtn.setAttribute('aria-expanded', 'false');
}

/* -----------------------
   Event Listeners
------------------------ */

// Toggle on button click
menuBtn?.addEventListener('click', toggleNav);

// Close nav when pressing Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeNav();
  }
});

// Optional: close nav when clicking outside
document.addEventListener('click', (e) => {
  if (
    navList.dataset.state === 'open' &&
    !navList.contains(e.target) &&
    e.target !== menuBtn
  ) {
    closeNav();
  }
});

// Ensure nav resets correctly on resize (desktop vs mobile)
window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) {
    // Always show nav in desktop view
    navList.dataset.state = 'open';
    menuBtn.setAttribute('aria-expanded', 'true');
  } else {
    // Default to closed in mobile view
    navList.dataset.state = 'closed';
    menuBtn.setAttribute('aria-expanded', 'false');
  }
});
