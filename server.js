const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Aumenta o limite de headers
app.use((req, res, next) => {
  req.setMaxListeners(20);
  next();
});

// Importa as funções serverless
const searchArtist = require('./frontend/api/search-artist.cjs');
const artist = require('./frontend/api/artist.cjs');
const artistTracks = require('./frontend/api/artist-tracks.cjs');
const artistAlbums = require('./frontend/api/artist-albums.cjs');

// Adapta as funções serverless para Express
const adaptVercelFunction = (handler) => async (req, res) => {
  try {
    await handler(req, res);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Rotas da API
app.get('/api/search-artist', adaptVercelFunction(searchArtist));
app.get('/api/artist', adaptVercelFunction(artist));
app.get('/api/artist-tracks', adaptVercelFunction(artistTracks));
app.get('/api/artist-albums', adaptVercelFunction(artistAlbums));

// Rota de health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`API Server running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
