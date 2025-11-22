// scripts/main.js

import { renderWeather } from './weather.js';
import { renderSpotlights } from './spotlight.js';

document.addEventListener("DOMContentLoaded", () => {
  // ✅ Footer year and last modified
  const yearEl = document.getElementById("year");
  const lastModEl = document.getElementById("lastModified");

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  if (lastModEl) {
    const raw = document.lastModified;
    const parsed = new Date(raw);
    const isValid = !isNaN(parsed.valueOf());

    const formatter = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });

    lastModEl.textContent = isValid ? formatter.format(parsed) : raw;
  }

  // ✅ Mobile menu toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isExpanded = navLinks.classList.toggle("show");
      menuToggle.setAttribute("aria-expanded", isExpanded ? "true" : "false");
    });
  }

  // ✅ Weather API integration (Criterion #11)
  renderWeather({ city: "Kumasi", countryCode: "GH", units: "metric" });

  // ✅ Company Spotlight integration (Criterion #12)
  renderSpotlights();
});

    // Set timestamp on load
    document.addEventListener('DOMContentLoaded', () => {
      const ts = document.getElementById('timestamp');
      if (ts) ts.value = new Date().toISOString();
    });
