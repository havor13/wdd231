// scripts/main.js

// ✅ Footer year and last modified
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// ✅ Mobile menu toggle
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  const isExpanded = navLinks.classList.toggle("show");
  menuToggle.setAttribute("aria-expanded", isExpanded);
});
