// scripts/main.js
import { getResources } from './data.js';
import { loadPrefs, savePrefs } from './storage.js';
import { renderCards } from './render.js';

// DOM references
const menuBtn = document.getElementById('menuBtn');
const navList = document.getElementById('primaryNav');
const grid = document.getElementById('resourceGrid');
const modal = document.getElementById('resourceModal');
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
function openModal(content) {
  modalBody.innerHTML = content;
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

  // Details button
  if (e.target.classList.contains('detailsBtn') && item) {
    openModal(`
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <p><strong>Category:</strong> ${item.category}</p>
      <p><strong>Location:</strong> ${item.location}</p>
      <a href="${item.url}" target="_blank" rel="noopener">Visit resource</a>
    `);
  }

  // Favorite button
  if (e.target.classList.contains('favBtn')) {
    const set = new Set(prefs.favorites);
    set.has(id) ? set.delete(id) : set.add(id);
    prefs.favorites = [...set];
    savePrefs(prefs);

    // Re-render featured grid with updated favorites
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
      grid.innerHTML = `<p>No resources available at the moment. Please try again later.</p>`;
      return;
    }

    // Show first 6 items as "featured"
    const featured = items.slice(0, 6);
    renderCards(grid, featured, prefs);
  } catch (err) {
    console.error('Initialization failed:', err);
    grid.innerHTML = `<p>Error loading resources. Please refresh the page.</p>`;
  }
})();
