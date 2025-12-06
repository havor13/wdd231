// scripts/data.js

// Fetch resources from the JSON file
export async function getResources() {
  try {
    // Explicitly relative path so it works from index.html in final-project/
    const response = await fetch('./data/resources.json');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Resources loaded:', data); // Debug log
    return data;
  } catch (error) {
    console.error('Failed to load resources:', error);
    return [];
  }
}
