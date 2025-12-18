const { spotifyRequest } = require('./lib/spotify');
const { handleError, validateParams } = require('./lib/errorHandler');

/**
 * GET /api/search-artist
 * Busca artistas pelo nome
 * Query params: q (nome do artista)
 */
module.exports = async (req, res) => {
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
    const { q } = req.query;

    validateParams({ q }, ['q']);

    // Busca artistas no Spotify (máximo 20 resultados)
    const data = await spotifyRequest(
      `/search?q=${encodeURIComponent(q)}&type=artist&limit=20`
    );

    // Formata resposta
    const artists = data.artists.items.map(artist => ({
      id: artist.id,
      name: artist.name,
      image: artist.images[0]?.url || null,
      genres: artist.genres,
      followers: artist.followers.total,
      popularity: artist.popularity,
      external_url: artist.external_urls.spotify
    }));

    return res.status(200).json({
      total: data.artists.total,
      artists
    });

  } catch (error) {
    return handleError(error, res);
  }
};
