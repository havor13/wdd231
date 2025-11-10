const menuBtn = document.getElementById('menuBtn');
const mainNav = document.getElementById('mainNav');

// Toggle navigation menu visibility
menuBtn.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');

  // Update ARIA attributes for accessibility
  menuBtn.setAttribute('aria-expanded', isOpen);
  mainNav.setAttribute('aria-hidden', !isOpen);
});
