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

  // ✅ Timestamp for forms
  const ts = document.getElementById('timestamp');
  if (ts) ts.value = new Date().toISOString();

  // ✅ localStorage visit message (Criterion #8)
  const msgEl = document.getElementById("visit-message");
  if (msgEl) {
    const LAST_KEY = "lastVisitMs";
    const now = Date.now();
    const last = localStorage.getItem(LAST_KEY);

    let msg = "Welcome! Let us know if you have any questions.";
    if (last) {
      const days = Math.floor((now - Number(last)) / (1000 * 60 * 60 * 24));
      if (days < 1) {
        msg = "Back so soon! Awesome!";
      } else if (days === 1) {
        msg = "You last visited 1 day ago.";
      } else {
        msg = `You last visited ${days} days ago.`;
      }
    }
    msgEl.textContent = msg;
    localStorage.setItem(LAST_KEY, String(now));
  }
});
