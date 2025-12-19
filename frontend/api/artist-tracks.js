import { spotifyRequest } from './lib/spotify.js';
import { enrichTracksWithLabels, fetchAlbumsBatch } from './lib/batchProcessor.js';
import { handleError, validateParams } from './lib/errorHandler.js';

/**
 * GET /api/artist-tracks
 * Retorna faixas do artista com gravadora (batch otimizado)
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

    // Busca álbuns do artista
    const albums = await spotifyRequest(
      `/artists/${id}/albums?limit=50&offset=0&include_groups=album,single`
    );

    if (!albums.items || albums.items.length === 0) {
      return res.status(200).json({
        tracks: [],
        total: 0,
        offset: offsetNum,
        limit: limitNum,
        hasMore: false
      });
    }

    // Extrai IDs dos álbuns
    const albumIds = albums.items.map(album => album.id);

    // Busca informações completas dos álbuns em batch (inclui tracks.items)
    const albumMap = await fetchAlbumsBatch(albumIds);

    // Extrai TODAS as tracks de TODOS os álbuns
    const allTracks = [];
    albums.items.forEach(album => {
      const albumDetails = albumMap.get(album.id);
      const tracks = albumDetails?.tracks || [];

      tracks.forEach(track => {
        allTracks.push({
          ...track,
          album: {
            id: album.id,
            name: album.name,
            release_date: albumDetails?.releaseDate || album.release_date,
            images: album.images
          }
        });
      });
    });

    // Remove duplicatas (mesma track em diferentes álbuns/compilações)
    const uniqueTracks = [];
    const seenIds = new Set();

    allTracks.forEach(track => {
      if (!seenIds.has(track.id)) {
        seenIds.add(track.id);
        uniqueTracks.push(track);
      }
    });

    // Aplica paginação
    const paginatedTracks = uniqueTracks.slice(offsetNum, offsetNum + limitNum);

    // Enriquece com gravadoras
    const enrichedTracks = await enrichTracksWithLabels(paginatedTracks);

    return res.status(200).json({
      tracks: enrichedTracks,
      total: uniqueTracks.length,
      offset: offsetNum,
      limit: limitNum,
      hasMore: offsetNum + limitNum < uniqueTracks.length
    });

  } catch (error) {
    return handleError(error, res);
  }
};
