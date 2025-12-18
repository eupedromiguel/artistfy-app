import { usePagination } from './usePagination';
import { getArtistTracks } from '../services/tracksService';

/**
 * Hook para buscar faixas de um artista com paginação
 * @returns {object} Estado e funções de tracks
 */
export function useTracks() {
  return usePagination(getArtistTracks, 'tracks');
}

export default useTracks;
