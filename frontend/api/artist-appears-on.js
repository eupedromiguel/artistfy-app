import { spotifyRequest } from './lib/spotify.js';
import { fetchAlbumsBatch } from './lib/batchProcessor.js';
import { handleError, validateParams } from './lib/errorHandler.js';

/**
 * GET /api/artist-appears-on
 * Retorna álbuns onde o artista aparece (features, colaborações)
 * Query params: id (ID do artista), offset (padrão: 0), limit (padrão: 20)
 */
export default async (req, res) => {
  // Configura CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id, offset = '0', limit = '20' } = req.query;

    validateParams({ id }, ['id']);

    const offsetNum = parseInt(offset);
    const limitNum = parseInt(limit);

    // Busca TODOS os álbuns "appears_on" do artista com paginação
    let allAlbums = [];
    let albumOffset = 0;
    const albumLimit = 50; // Máximo permitido pela API do Spotify
    let hasMoreAlbums = true;

    while (hasMoreAlbums) {
      const albums = await spotifyRequest(
        `/artists/${id}/albums?limit=${albumLimit}&offset=${albumOffset}&include_groups=appears_on`
      );

      if (!albums.items || albums.items.length === 0) {
        break;
      }

      allAlbums = allAlbums.concat(albums.items);
      albumOffset += albumLimit;
      hasMoreAlbums = albums.next !== null;
    }

    if (allAlbums.length === 0) {
      return res.status(200).json({
        appearsOn: [],
        total: 0,
        offset: offsetNum,
        limit: limitNum,
        hasMore: false
      });
    }

    // Extrai IDs dos álbuns
    const albumIds = allAlbums.map(album => album.id);

    // Busca detalhes completos dos álbuns em batch
    const albumMap = await fetchAlbumsBatch(albumIds);

    // Formata resposta
    const formattedAlbums = allAlbums
      .map(album => {
        const details = albumMap.get(album.id);

        return {
          id: album.id,
          name: album.name,
          releaseDate: details?.releaseDate || album.release_date,
          label: details?.label || 'N/A',
          totalTracks: details?.totalTracks || album.total_tracks,
          image: album.images[0]?.url || null,
          external_url: album.external_urls.spotify,
          artists: album.artists.map(a => a.name).join(', ')
        };
      });

    // Aplica paginação
    const paginatedAlbums = formattedAlbums.slice(offsetNum, offsetNum + limitNum);

    return res.status(200).json({
      appearsOn: paginatedAlbums,
      total: formattedAlbums.length,
      offset: offsetNum,
      limit: limitNum,
      hasMore: offsetNum + limitNum < formattedAlbums.length
    });

  } catch (error) {
    return handleError(error, res);
  }
};
