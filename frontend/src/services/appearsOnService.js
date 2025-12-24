import { get } from './api';
import { ENDPOINTS, ITEMS_PER_PAGE } from '../utils/constants';

/**
 * Busca álbuns onde o artista aparece (features, colaborações)
 * @param {string} artistId - ID do artista
 * @param {number} offset - Offset para paginação
 * @param {number} limit - Limite de itens
 * @returns {Promise<object>} Álbuns onde o artista aparece
 */
export async function getArtistAppearsOn(artistId, offset = 0, limit = ITEMS_PER_PAGE) {
  return get(ENDPOINTS.ARTIST_APPEARS_ON, {
    id: artistId,
    offset,
    limit
  });
}

export default {
  getArtistAppearsOn
};
