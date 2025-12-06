// scripts/main.js
import { getResources } from './data.js';
import { loadPrefs, savePrefs, toggleFavorite } from './storage.js';
import { renderCards, renderMessage, renderCard } from './render.js';

// DOM references
const menuBtn = document.getElementById('menuBtn');
const navList = document.getElementById('primaryNav');
const grid = document.getElementById('resourceGrid');
const modal = document.getElementById('resourceModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const closeModal = document.getElementById('closeModal');

let prefs = loadPrefs();
let items = [];

/* -----------------------
   Responsive Navigation
------------------------ */
menuBtn?.addEventListener('click', () => {
  const isOpen = navList.dataset.state === 'open';
  navList.dataset.state = isOpen ? 'closed' : 'open';
  menuBtn.setAttribute('aria-expanded', String(!isOpen));
});

/* -----------------------
   Modal Helpers
------------------------ */
function openModal(item) {
  modalTitle.textContent = item.name;
  // Reuse renderCard for consistent markup
  modalBody.innerHTML = renderCard(item, prefs);
  modal.showModal();
}

closeModal?.addEventListener('click', () => modal.close());

/* -----------------------
   Event Delegation
------------------------ */
document.addEventListener('click', (e) => {
  const card = e.target.closest('.card');
  if (!card) return;

  const id = Number(card.dataset.id);
  const item = items.find(x => x.id === id);
  if (!item) return;

  // Details button
  if (e.target.classList.contains('detailsBtn')) {
    openModal(item);
  }

  // Favorite button
  if (e.target.classList.contains('favBtn')) {
    prefs = toggleFavorite(id); // ✅ use helper from storage.js
    const featured = items.slice(0, 6);
    renderCards(grid, featured, prefs);
  }
});

/* -----------------------
   Initialization
------------------------ */
(async function init() {
  try {
    items = await getResources();

    if (!items.length) {
      renderMessage(grid, "No resources available at the moment. Please try again later.");
      return;
    }

    // Show first 6 items as "featured"
    const featured = items.slice(0, 6);
    renderCards(grid, featured, prefs);
  } catch (err) {
    console.error('Initialization failed:', err);
    renderMessage(grid, "Error loading resources. Please refresh the page.");
  }
})();