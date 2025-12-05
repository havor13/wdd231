// scripts/render.js
export function renderCards(container, items, prefs) {
  container.innerHTML = items.map(item => `
    <article class="card" data-id="${item.id}">
      <h3>${item.name}</h3>
      <p><strong>Category:</strong> ${item.category}</p>
      <p><strong>Location:</strong> ${item.location}</p>
      <p><strong>Tags:</strong> ${item.tags.join(', ')}</p>
      <button class="detailsBtn">Details</button>
      <button class="favBtn">${prefs.favorites.includes(item.id) ? 'Unfavorite' : 'Favorite'}</button>
    </article>
  `).join('');
}
