// scripts/discover.mjs
import { items } from "../data/items.mjs";

// Find the container in discover.html
const container = document.querySelector(".cards");

// Loop through items and build cards
items.forEach((item, index) => {
  const { name, address, description, img } = item;

  const card = document.createElement("article");
  card.className = "card";

  // Assign grid area name dynamically (card1, card2, …)
  card.style.gridArea = `card${index + 1}`;

  card.innerHTML = `
    <h2>${name}</h2>
    <figure>
      <img src="${img}" alt="${name}" width="300" height="200" loading="lazy">
    </figure>
    <address>${address}</address>
    <p>${description}</p>
    <button type="button" class="learn-more">Learn More</button>
  `;

  container.appendChild(card);
});

// Optional: add basic button behavior
container.addEventListener("click", (e) => {
  if (e.target.classList.contains("learn-more")) {
    alert("More details coming soon!");
  }
});
