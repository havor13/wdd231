// scripts/resources.js

import { getResources } from './data.js';
import { renderCard } from './render.js';

// Preferences object for favorites
let prefs = { favorites: [] };
let items = [];

const grid = document.querySelector('#resourceGrid');
const filterSelect = document.querySelector('#categoryFilter');
const modal = document.querySelector('#resourceModal');
const modalBody = document.querySelector('#modalBody');
const closeModalBtn = document.querySelector('#closeModal');

// ===== Local Storage Helpers =====
function saveFavorites() {
  localStorage.setItem('favorites', JSON.stringify(prefs.favorites));
}

function loadFavorites() {
  const stored = localStorage.getItem('favorites');
  if (stored) {
    prefs.favorites = JSON.parse(stored);
  } else {
    prefs.favorites = [];
  }
}

// ===== Initialization =====
async function init() {
  loadFavorites(); // restore favorites from Local Storage
  items = await getResources();
  renderCards(grid, items, prefs);
}

// ===== Render Cards =====
function renderCards(container, resources, prefs) {
  container.innerHTML = resources.map(item => renderCard(item, prefs)).join('');
  attachCardEvents(container);
}

// ===== Attach Events =====
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

// ===== Modal =====
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

closeModalBtn.addEventListener('click', () => modal.close());

// ===== Favorites =====
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
  saveFavorites(); // persist changes
}

// ===== Filtering =====
filterSelect.addEventListener('change', () => {
  const category = filterSelect.value.toLowerCase();
  const filtered = category === 'all'
    ? items
    : items.filter(r => r.category.toLowerCase() === category);
  renderCards(grid, filtered, prefs);
});

// ===== Start =====
init();
