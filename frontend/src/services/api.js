import { API_BASE_URL } from '../utils/constants';

/**
 * Cliente HTTP genérico
 * @param {string} endpoint - Endpoint da API
 * @param {object} options - Opções do fetch
 * @returns {Promise<object>} Resposta da API
 */
async function apiClient(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

/**
 * GET request
 * @param {string} endpoint - Endpoint da API
 * @param {object} params - Query parameters
 * @returns {Promise<object>} Resposta da API
 */
export async function get(endpoint, params = {}) {
  const queryString = new URLSearchParams(params).toString();
  const url = queryString ? `${endpoint}?${queryString}` : endpoint;

  return apiClient(url, { method: 'GET' });
}

/**
 * POST request
 * @param {string} endpoint - Endpoint da API
 * @param {object} data - Body data
 * @returns {Promise<object>} Resposta da API
 */
export async function post(endpoint, data = {}) {
  return apiClient(endpoint, {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

export default {
  get,
  post
};
