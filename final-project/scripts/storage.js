//scripts/storage.js
// LocalStorage helpers for persisting user preferences

const KEY = 'resourceHubPrefs';

/**
 * Save preferences to localStorage
 * @param {Object} prefs - preferences object (e.g., { view: 'grid', favorites: [] })
 */
export function savePrefs(prefs) {
  try {
    localStorage.setItem(KEY, JSON.stringify(prefs));
  } catch (err) {
    console.error('Failed to save preferences:', err);
  }
}

/**
 * Load preferences from localStorage
 * @returns {Object} preferences object
 */
export function loadPrefs() {
  try {
    const stored = localStorage.getItem(KEY);
    return stored ? JSON.parse(stored) : { view: 'grid', favorites: [] };
  } catch (err) {
    console.error('Failed to load preferences:', err);
    return { view: 'grid', favorites: [] };
  }
}

/**
 * Clear preferences (optional helper)
 */
export function clearPrefs() {
  try {
    localStorage.removeItem(KEY);
  } catch (err) {
    console.error('Failed to clear preferences:', err);
  }
}
