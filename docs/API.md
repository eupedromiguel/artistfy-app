# Documentação da API

## Base URL

**Desenvolvimento:** `http://localhost:5000/api`
**Produção:** `https://seu-dominio.vercel.app/api`

## Endpoints

### 1. Buscar Artistas

**Endpoint:** `GET /search-artist`

**Query Parameters:**
- `q` (obrigatório): Nome do artista a buscar

**Resposta:**
```json
{
  "total": 100,
  "artists": [
    {
      "id": "spotify_artist_id",
      "name": "Nome do Artista",
      "image": "https://...",
      "genres": ["pop", "rock"],
      "followers": 1000000,
      "popularity": 85,
      "external_url": "https://open.spotify.com/artist/..."
    }
  ]
}
```

### 2. Obter Artista

**Endpoint:** `GET /artist`

**Query Parameters:**
- `id` (obrigatório): ID do artista no Spotify

**Resposta:**
```json
{
  "id": "spotify_artist_id",
  "name": "Nome do Artista",
  "image": "https://...",
  "genres": ["pop", "rock"],
  "followers": 1000000,
  "popularity": 85,
  "external_url": "https://open.spotify.com/artist/..."
}
```

### 3. Obter Faixas do Artista

**Endpoint:** `GET /artist-tracks`

**Query Parameters:**
- `id` (obrigatório): ID do artista
- `offset` (opcional): Offset para paginação (padrão: 0)
- `limit` (opcional): Limite de resultados (padrão: 20)
- `market` (opcional): Código do país (padrão: BR)

**Resposta:**
```json
{
  "tracks": [
    {
      "id": "track_id",
      "name": "Nome da Faixa",
      "artists": "Artista 1, Artista 2",
      "album": "Nome do Álbum",
      "releaseDate": "2024-01-01",
      "duration": 180000,
      "label": "Nome da Gravadora",
      "preview_url": "https://...",
      "external_url": "https://open.spotify.com/track/..."
    }
  ],
  "total": 50,
  "offset": 0,
  "limit": 20,
  "hasMore": true
}
```

### 4. Obter Álbuns do Artista

**Endpoint:** `GET /artist-albums`

**Query Parameters:**
- `id` (obrigatório): ID do artista
- `offset` (opcional): Offset para paginação (padrão: 0)
- `limit` (opcional): Limite de resultados (padrão: 20)

**Resposta:**
```json
{
  "albums": [
    {
      "id": "album_id",
      "name": "Nome do Álbum",
      "releaseDate": "2024-01-01",
      "label": "Nome da Gravadora",
      "totalTracks": 12,
      "image": "https://...",
      "external_url": "https://open.spotify.com/album/...",
      "artists": "Artista 1, Artista 2"
    }
  ],
  "total": 30,
  "offset": 0,
  "limit": 20,
  "hasMore": true
}
```

## Códigos de Status

- `200` - Sucesso
- `400` - Bad Request (parâmetros inválidos)
- `404` - Not Found
- `405` - Method Not Allowed
- `500` - Internal Server Error

## Tratamento de Erros

Todas as respostas de erro seguem o formato:

```json
{
  "error": "Tipo do erro",
  "message": "Descrição detalhada do erro"
}
```

## Rate Limiting

A API respeita os limites da Spotify Web API. Em caso de muitas requisições, a API pode retornar erro 429 (Too Many Requests).

## CORS

A API está configurada para aceitar requisições de qualquer origem (`Access-Control-Allow-Origin: *`).
