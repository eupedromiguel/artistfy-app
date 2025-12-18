import { get } from './api';
import { ENDPOINTS, ITEMS_PER_PAGE } from '../utils/constants';

/**
 * Busca faixas de um artista (paginado)
 * @param {string} artistId - ID do artista
 * @param {number} offset - Offset para paginação
 * @param {number} limit - Limite de itens
 * @returns {Promise<object>} Faixas do artista
 */
export async function getArtistTracks(artistId, offset = 0, limit = ITEMS_PER_PAGE) {
  return get(ENDPOINTS.ARTIST_TRACKS, {
    id: artistId,
    offset,
    limit
  });
}

export default {
  getArtistTracks
};
