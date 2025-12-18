import { get } from './api';
import { ENDPOINTS } from '../utils/constants';

/**
 * Busca artistas pelo nome
 * @param {string} query - Nome do artista
 * @returns {Promise<object>} Lista de artistas
 */
export async function searchArtists(query) {
  return get(ENDPOINTS.SEARCH_ARTIST, { q: query });
}

/**
 * Busca dados de um artista específico
 * @param {string} artistId - ID do artista
 * @returns {Promise<object>} Dados do artista
 */
export async function getArtist(artistId) {
  return get(ENDPOINTS.ARTIST, { id: artistId });
}

export default {
  searchArtists,
  getArtist
};
