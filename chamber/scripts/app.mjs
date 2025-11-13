
import { initNav } from './nav.mjs';
import { renderWeather } from './weather.mjs';
import { renderSpotlights } from './spotlight.mjs';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize responsive navigation
  initNav();

  // Footer year + last modified
  document.getElementById('year').textContent = new Date().getFullYear();
  document.getElementById('lastModified').textContent = document.lastModified;

  // Render weather for Kumasi, Ghana
  renderWeather({
    city: 'Kumasi',
    countryCode: 'GH',
    units: 'metric'
  });

  // Render random gold/silver member spotlights
  renderSpotlights();
});
