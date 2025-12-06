// scripts/storage.js
// LocalStorage helpers for persisting user preferences

const KEY = 'resourceHubPrefs';

// Default preferences structure
const DEFAULTS = {
  view: 'grid',       // could be 'grid' or 'list'
  favorites: [],      // array of resource IDs
  theme: 'light',     // optional future setting
  language: 'en'      // optional future setting
};

/**
 * Save preferences to localStorage
 * @param {Object} prefs - preferences object
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
 * Ensures defaults are merged in case of missing or corrupted data
 * @returns {Object} preferences object
 */
export function loadPrefs() {
  try {
    const stored = localStorage.getItem(KEY);
    if (!stored) return { ...DEFAULTS };

    const parsed = JSON.parse(stored);

    // Validate parsed data
    if (typeof parsed !== 'object' || parsed === null) {
      return { ...DEFAULTS };
    }

    // Merge with defaults to ensure all keys exist
    return { ...DEFAULTS, ...parsed };
  } catch (err) {
    console.error('Failed to load preferences:', err);
    return { ...DEFAULTS };
  }
}

/**
 * Clear preferences (reset to defaults)
 */
export function clearPrefs() {
  try {
    localStorage.removeItem(KEY);
  } catch (err) {
    console.error('Failed to clear preferences:', err);
  }
  return { ...DEFAULTS };
}

/**
 * Update a single preference key
 * @param {string} key - preference property name
 * @param {any} value - new value
 * @returns {Object} updated preferences
 */
export function updatePref(key, value) {
  if (!(key in DEFAULTS)) {
    console.warn(`Unknown preference key: ${key}`);
    return loadPrefs();
  }
  const prefs = loadPrefs();
  prefs[key] = value;
  savePrefs(prefs);
  return prefs;
}

/**
 * Get current preferences (validated)
 * @returns {Object} preferences object
 */
export function getPrefs() {
  return loadPrefs();
}

/**
 * Toggle a resource ID in favorites
 * @param {number|string} id - resource ID
 * @returns {Object} updated preferences
 */
export function toggleFavorite(id) {
  const prefs = loadPrefs();
  const set = new Set(prefs.favorites.map(String)); // normalize IDs to strings
  const strId = String(id);

  if (set.has(strId)) {
    set.delete(strId);
  } else {
    set.add(strId);
  }

  prefs.favorites = [...set];
  savePrefs(prefs);
  return prefs;
}
