import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Aumenta o limite de headers
app.use((req, _res, next) => {
  req.setMaxListeners(20);
  next();
});

// Adapta as funções serverless para Express com import dinâmico
const adaptVercelFunction = (modulePath) => async (req, res) => {
  try {
    console.log(`\n[${new Date().toISOString()}] ${req.method} ${req.url}`);
    // Import dinâmico com cache bust
    const module = await import(`${modulePath}?update=${Date.now()}`);
    const handler = module.default;
    await handler(req, res);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Rotas da API com import dinâmico
app.get('/api/search-artist', adaptVercelFunction('./frontend/api/search-artist.js'));
app.get('/api/artist', adaptVercelFunction('./frontend/api/artist.js'));
app.get('/api/artist-tracks', adaptVercelFunction('./frontend/api/artist-tracks.js'));
app.get('/api/artist-albums', adaptVercelFunction('./frontend/api/artist-albums.js'));

// Rota de health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`API Server running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
