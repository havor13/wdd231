// scripts/app.mjs

import { initNav } from './nav.mjs';
import { renderWeather } from './weather.mjs';
import { renderSpotlights } from './spotlight.mjs';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize responsive navigation
  try {
    initNav();
  } catch (err) {
    console.error('Navigation init failed:', err);
  }

  // Footer year + last modified
  const yearEl = document.getElementById('year');
  const modEl = document.getElementById('lastModified');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  if (modEl) modEl.textContent = document.lastModified;

  // Render weather for Kumasi, Ghana
  try {
    renderWeather({
      city: 'Kumasi',
      countryCode: 'GH',
      units: 'metric'
    });
  } catch (err) {
    console.error('Weather init failed:', err);
    const currentEl = document.getElementById('weather-current');
    if (currentEl) currentEl.textContent = 'Unable to load weather data';
  }

  // Render random gold/silver member spotlights
  try {
    renderSpotlights();
  } catch (err) {
    console.error('Spotlights init failed:', err);
    const grid = document.getElementById('spotlight-grid');
    if (grid) grid.textContent = 'Unable to load spotlights';
  }
});
