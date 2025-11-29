
import { items } from "../data/items.mjs";

const container = document.querySelector(".cards");

items.forEach(({ name, address, description, img }) => {
  const card = document.createElement("article");
  card.className = "card";
  card.innerHTML = `
    <h2>${name}</h2>
    <figure>
      <img src="${img}" alt="${name}" width="300" height="200" loading="lazy">
    </figure>
    <address>${address}</address>
    <p>${description}</p>
    <button type="button">Learn More</button>
  `;
  container.appendChild(card);
});
