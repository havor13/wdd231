// scripts/data.js

// Fetch resources from the JSON file
export async function getResources() {
  try {
    const response = await fetch('data/resources.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to load resources:', error);
    return [];
  }
}
