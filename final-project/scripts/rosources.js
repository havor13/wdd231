// scripts/resources.js
// Handles loading, rendering, and filtering of resources

// Elements
const resourceList = document.getElementById("resourceList");
const categoryFilter = document.getElementById("categoryFilter");

// Load resources from JSON
async function loadResources() {
  try {
    const response = await fetch("data/resources.json");
    const resources = await response.json();
    renderResources(resources);

    // Attach filter event
    categoryFilter.addEventListener("change", () => {
      const selected = categoryFilter.value.toLowerCase();
      if (selected === "all") {
        renderResources(resources);
      } else {
        const filtered = resources.filter(
          (r) => r.category.toLowerCase() === selected
        );
        renderResources(filtered);
      }
    });
  } catch (err) {
    console.error("Failed to load resources:", err);
    resourceList.innerHTML = "<p>Error loading resources.</p>";
  }
}

// Render resource cards
function renderResources(resources) {
  resourceList.innerHTML = ""; // clear existing
  if (!resources.length) {
    resourceList.innerHTML = "<p>No resources found.</p>";
    return;
  }

  resources.forEach((res) => {
    const card = document.createElement("div");
    card.className = "resource-card";

    card.innerHTML = `
      <h3>${res.name}</h3>
      <p><strong>Category:</strong> ${res.category}</p>
      <p><strong>Location:</strong> ${res.location}</p>
      <p>${res.description}</p>
      <p><strong>Tags:</strong> ${res.tags.join(", ")}</p>
      <a href="${res.url}" target="_blank" rel="noopener">Visit Site</a>
      <button class="detailsBtn" data-id="${res.id}">Details</button>
    `;

    resourceList.appendChild(card);
  });

  // Attach modal details
  attachDetails(resources);
}

// Show details in modal
function attachDetails(resources) {
  const detailButtons = document.querySelectorAll(".detailsBtn");
  const modal = document.getElementById("resourceModal");
  const modalContent = document.getElementById("modalContent");
  const closeModal = document.getElementById("closeModal");

  detailButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id, 10);
      const res = resources.find((r) => r.id === id);
      if (res) {
        modalContent.innerHTML = `
          <h2>${res.name}</h2>
          <p><strong>Category:</strong> ${res.category}</p>
          <p><strong>Location:</strong> ${res.location}</p>
          <p>${res.description}</p>
          <p><strong>Tags:</strong> ${res.tags.join(", ")}</p>
          <a href="${res.url}" target="_blank" rel="noopener">Visit Site</a>
        `;
        modal.showModal();
      }
    });
  });

  closeModal.addEventListener("click", () => {
    modal.close();
  });
}

// Initialize
loadResources();
