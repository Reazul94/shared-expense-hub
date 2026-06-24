/**
 * Database utility for JSONBin.io cloud sync.
 * If credentials are not provided, it falls back gracefully to localStorage.
 */

const BASE_URL = 'https://api.jsonbin.io/v3/b';

/**
 * Fetch data from JSONBin.io cloud.
 */
export async function fetchCloudData(apiKey, binId) {
  if (!apiKey || !binId) {
    throw new Error('API Key or Bin ID is missing');
  }

  const response = await fetch(`${BASE_URL}/${binId}`, {
    method: 'GET',
    headers: {
      'X-Master-Key': apiKey,
      'X-Bin-Meta': 'false', // Excludes metadata, returns only the saved record directly
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed to fetch database: ${response.statusText}`);
  }

  return await response.json();
}

/**
 * Save data to JSONBin.io cloud.
 */
export async function updateCloudData(apiKey, binId, data) {
  if (!apiKey || !binId) {
    throw new Error('API Key or Bin ID is missing');
  }

  const response = await fetch(`${BASE_URL}/${binId}`, {
    method: 'PUT',
    headers: {
      'X-Master-Key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed to save to database: ${response.statusText}`);
  }

  return await response.json();
}
