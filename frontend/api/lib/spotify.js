import { getToken, setToken } from './tokenCache.js';

const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';
const SPOTIFY_API_BASE = 'https://api.spotify.com/v1';

/**
 * Obtém um token válido do Spotify (usa cache ou solicita novo)
 * @returns {Promise<string>} Access token
 */
async function getValidToken() {
  // Tenta buscar do cache
  const cachedToken = getToken();
  if (cachedToken) {
    return cachedToken;
  }

  // Solicita novo token
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('Credenciais do Spotify não configuradas');
  }

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const response = await fetch(SPOTIFY_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  });

  if (!response.ok) {
    throw new Error(`Erro ao obter token: ${response.status}`);
  }

  const data = await response.json();

  // Armazena no cache
  setToken(data.access_token, data.expires_in);

  return data.access_token;
}

/**
 * Faz uma requisição autenticada para a API do Spotify
 * @param {string} endpoint - Endpoint da API (sem o base URL)
 * @param {object} options - Opções adicionais do fetch
 * @returns {Promise<object>} Resposta da API
 */
async function spotifyRequest(endpoint, options = {}) {
  const token = await getValidToken();

  const response = await fetch(`${SPOTIFY_API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${token}`,
      ...options.headers
    }
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Spotify API error ${response.status}: ${errorText}`);
  }

  return response.json();
}

export {
  getValidToken,
  spotifyRequest
};
