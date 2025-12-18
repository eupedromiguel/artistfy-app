import { usePagination } from './usePagination';
import { getArtistAlbums } from '../services/albumsService';

/**
 * Hook para buscar álbuns de um artista com paginação
 * @returns {object} Estado e funções de albums
 */
export function useAlbums() {
  return usePagination(getArtistAlbums, 'albums');
}

export default useAlbums;
