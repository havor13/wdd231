// scripts/render.js

/**
 * Render a single resource card
 * @param {Object} item - Resource object with id, name, description, category, location, tags, url
 * @param {Object} prefs - Preferences object containing favorites array
 * @returns {string} HTML string for the card
 */
export function renderCard(item, prefs) {
  const isFavorite = prefs.favorites.includes(item.id);

  return `
    <div class="card" data-id="${item.id}">
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <p><strong>Category:</strong> ${item.category}</p>
      <p><strong>Location:</strong> ${item.location}</p>
      <p><strong>Tags:</strong> ${item.tags.join(', ')}</p>
      <div class="card-actions">
        <button class="detailsBtn" aria-label="View details for ${item.name}">
          Details
        </button>
        <button class="favBtn ${isFavorite ? 'is-favorite' : ''}" aria-label="Toggle favorite for ${item.name}">
          ${isFavorite ? 'Unfavorite' : 'Favorite'}
        </button>
      </div>
    </div>
  `;
}

/**
 * Render multiple resource cards
 * @param {HTMLElement} container - The grid container element
 * @param {Array} resources - Array of resource objects
 * @param {Object} prefs - Preferences object containing favorites array
 */
export function renderCards(container, resources, prefs) {
  container.innerHTML = resources.map(item => renderCard(item, prefs)).join('');
}

export function renderMessage(container, message) {
  container.innerHTML = `<p class="message">${message}</p>`;
}
