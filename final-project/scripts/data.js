//scripts/data.js
// Fetch resources from local JSON file with robust error handling

export async function getResources() {
  try {
    // Adjust path if your JSON file is in a different folder
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
