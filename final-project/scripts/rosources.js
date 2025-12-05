//scripts/resources.js
import { getResources } from './data.js';
import { loadPrefs, savePrefs } from './storage.js';
import { renderCards } from './render.js';

const listContainer = document.getElementById('resourceList');
const categoryFilter = document.getElementById('categoryFilter');
const modal = document.getElementById('resourceModal');
const modalBody = document.getElementById('modalBody');
const closeModal = document.getElementById('closeModal');

let prefs = loadPrefs();
let items = [];

// Modal helpers
function openModal(content) {
  modalBody.innerHTML = content;
  modal.showModal();
}
closeModal?.addEventListener('click', () => modal.close());

// Event delegation for card buttons
document.addEventListener('click', (e) => {
  const card = e.target.closest('.card');
  if (!card) return;
  const id = Number(card.dataset.id);

  if (e.target.classList.contains('detailsBtn')) {
    const item = items.find(x => x.id === id);
    openModal(`
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <p><strong>Category:</strong> ${item.category}</p>
      <p><strong>Location:</strong> ${item.location}</p>
      <a href="${item.url}" target="_blank" rel="noopener">Visit resource</a>
    `);
  }

  if (e.target.classList.contains('favBtn')) {
    const set = new Set(prefs.favorites);
    set.has(id) ? set.delete(id) : set.add(id);
    prefs.favorites = [...set];
    savePrefs(prefs);
    renderCards(listContainer, items, prefs);
  }
});

// Filter dropdown
categoryFilter?.addEventListener('change', () => {
  const value = categoryFilter.value;
  let filtered = items;
  if (value !== 'all') {
    filtered = items.filter(x => x.category === value);
  }
  renderCards(listContainer, filtered, prefs);
});

// Init
(async function init() {
  items = await getResources();
  renderCards(listContainer, items, prefs);
})();
