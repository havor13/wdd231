// scripts/render.js

// Render a single resource card
export function renderCard(item, prefs) {
  const isFavorite = prefs.favorites.includes(String(item.id));

  return `
    <article class="card" data-id="${item.id}">
      <!-- Placeholder image if none -->
      ${item.image 
        ? `<img src="${item.image}" alt="${item.name}" class="card-img">` 
        : `<div class="placeholder-img"></div>`}

      <h3>${item.name}</h3>
      <p><strong>Category:</strong> ${item.category}</p>
      <p><strong>Location:</strong> ${item.location}</p>
      <p>${item.description}</p>
      <p><strong>Tags:</strong> ${item.tags.join(', ')}</p>

      <a href="${item.url}" target="_blank" rel="noopener">Visit Resource</a>

      <button class="detailsBtn">Details</button>
      <button class="favBtn ${isFavorite ? 'is-favorite' : ''}">
        ${isFavorite ? 'Unfavorite' : 'Favorite'}
      </button>
    </article>
  `;
}
