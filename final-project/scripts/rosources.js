// scripts/resources.js

import { getResources } from './data.js';
import { renderCard } from './render.js';

// Simple preferences object for favorites
let prefs = { favorites: [] };
let items = [];

const grid = document.querySelector('#resourceGrid');
const filterSelect = document.querySelector('#categoryFilter');
const modal = document.querySelector('#resourceModal');
const modalBody = document.querySelector('#modalBody');
const closeModalBtn = document.querySelector('#closeModal');

// Fetch and render resources on page load
async function init() {
  items = await getResources();
  renderCards(grid, items, prefs);
}

// Render all cards
function renderCards(container, resources, prefs) {
  container.innerHTML = resources.map(item => renderCard(item, prefs)).join('');
  attachCardEvents(container);
}

// Attach events for details and favorites
function attachCardEvents(container) {
  container.querySelectorAll('.detailsBtn').forEach(btn => {
    btn.addEventListener('click', e => {
      const card = e.target.closest('.card');
      const id = card.dataset.id;
      const resource = items.find(r => r.id == id);
      showModal(resource);
    });
  });

  container.querySelectorAll('.favBtn').forEach(btn => {
    btn.addEventListener('click', e => {
      const card = e.target.closest('.card');
      const id = card.dataset.id;
      toggleFavorite(id, btn);
    });
  });
}

// Show modal with resource details
function showModal(resource) {
  modalBody.innerHTML = `
    <p><strong>${resource.name}</strong></p>
    <p>${resource.description}</p>
    <p><strong>Location:</strong> ${resource.location}</p>
    <p><strong>Tags:</strong> ${resource.tags.join(', ')}</p>
    <a href="${resource.url}" target="_blank">Visit Resource</a>
  `;
  modal.showModal();
}

// Close modal
closeModalBtn.addEventListener('click', () => modal.close());

// Toggle favorite
function toggleFavorite(id, btn) {
  if (prefs.favorites.includes(id)) {
    prefs.favorites = prefs.favorites.filter(f => f !== id);
    btn.classList.remove('is-favorite');
    btn.textContent = 'Favorite';
  } else {
    prefs.favorites.push(id);
    btn.classList.add('is-favorite');
    btn.textContent = 'Unfavorite';
  }
}

// Filter resources
filterSelect.addEventListener('change', () => {
  const category = filterSelect.value.toLowerCase();
  const filtered = category === 'all'
    ? items
    : items.filter(r => r.category.toLowerCase() === category);
  renderCards(grid, filtered, prefs);
});

// Initialize
init();
