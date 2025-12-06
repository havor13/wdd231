// scripts/render.js
// Responsible for rendering resource cards into the DOM

/**
 * Render a list of resource cards into a container
 * @param {HTMLElement} container - DOM element to inject cards into
 * @param {Array} items - array of resource objects
 * @param {Object} prefs - user preferences (favorites array)
 */
export function renderCards(container, items, prefs) {
  if (!items || items.length === 0) {
    container.innerHTML = `<p>No resources available.</p>`;
    return;
  }

  container.innerHTML = items.map(item => `
    <article class="card" data-id="${item.id}">
      ${item.image ? `<img src="${item.image}" alt="${item.name}" loading="lazy">` : ""}
      <h3>${item.name}</h3>
      <p><strong>Category:</strong> ${item.category}</p>
      <p><strong>Location:</strong> ${item.location}</p>
      <p><strong>Tags:</strong> ${item.tags?.join(', ') || 'None'}</p>
      <button class="detailsBtn" aria-label="View details for ${item.name}">Details</button>
      <button class="favBtn" aria-label="Toggle favorite for ${item.name}">
        ${prefs.favorites.includes(item.id) ? 'Unfavorite' : 'Favorite'}
      </button>
    </article>
  `).join('');
}

/**
 * Render a single resource card (useful for modals or previews)
 * @param {Object} item - resource object
 * @param {Object} prefs - user preferences
 * @returns {string} HTML string for one card
 */
export function renderCard(item, prefs) {
  return `
    <article class="card" data-id="${item.id}">
      ${item.image ? `<img src="${item.image}" alt="${item.name}" loading="lazy">` : ""}
      <h3>${item.name}</h3>
      <p><strong>Category:</strong> ${item.category}</p>
      <p><strong>Location:</strong> ${item.location}</p>
      <p><strong>Tags:</strong> ${item.tags?.join(', ') || 'None'}</p>
      <button class="detailsBtn" aria-label="View details for ${item.name}">Details</button>
      <button class="favBtn" aria-label="Toggle favorite for ${item.name}">
        ${prefs.favorites.includes(item.id) ? 'Unfavorite' : 'Favorite'}
      </button>
    </article>
  `;
}

/**
 * Render a message into the container (for errors or empty states)
 * @param {HTMLElement} container - DOM element
 * @param {string} message - message to display
 */
export function renderMessage(container, message) {
  container.innerHTML = `<p>${message}</p>`;
}
