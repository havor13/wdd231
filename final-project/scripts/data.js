// scripts/data.js
// Utility functions for fetching and working with resource data

// Fetch resources from local JSON file with robust error handling
export async function getResources() {
  try {
    const response = await fetch('data/resources.json');

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch resources:', error);
    // Return empty array so app continues gracefully
    return [];
  }
}

/**
 * Filter resources by category
 * @param {Array} resources - full resource array
 * @param {string} category - category string (e.g., "Community", "Course", "Mentorship")
 * @returns {Array} filtered resources
 */
export function filterByCategory(resources, category) {
  if (!resources || resources.length === 0) return [];
  if (category === 'all') return resources;
  return resources.filter(res => res.category === category);
}

/**
 * Search resources by keyword in name or description
 * @param {Array} resources - full resource array
 * @param {string} keyword - search term
 * @returns {Array} matching resources
 */
export function searchResources(resources, keyword) {
  if (!resources || resources.length === 0) return [];
  if (!keyword) return resources;

  const lower = keyword.toLowerCase();
  return resources.filter(res =>
    res.name.toLowerCase().includes(lower) ||
    res.description.toLowerCase().includes(lower)
  );
}

/**
 * Get a single resource by ID
 * @param {Array} resources - full resource array
 * @param {number|string} id - resource id
 * @returns {Object|null} resource object or null
 */
export function getResourceById(resources, id) {
  if (!resources || resources.length === 0) return null;
  return resources.find(res => String(res.id) === String(id)) || null;
}
