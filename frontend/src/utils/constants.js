// API base URL - ajustar conforme ambiente
// Em dev, o Vite proxy redireciona /api para http://localhost:5000/api
export const API_BASE_URL = import.meta.env.PROD
  ? 'https://artistfy.vercel.app/api'
  : '/api';

// Configurações de paginação
export const ITEMS_PER_PAGE = 20;

// Mensagens
export const MESSAGES = {
  SEARCH_PLACEHOLDER: 'Buscar artista...',
  NO_RESULTS: 'Nenhum resultado encontrado',
  LOADING: 'Carregando...',
  ERROR_GENERIC: 'Ocorreu um erro. Tente novamente.',
  PUBLIC_DATA_NOTE: 'Pesquisas baseadas em dados públicos do Spotify'
};

// Endpoints
export const ENDPOINTS = {
  SEARCH_ARTIST: '/search-artist',
  ARTIST: '/artist',
  ARTIST_TRACKS: '/artist-tracks',
  ARTIST_ALBUMS: '/artist-albums',
  ARTIST_APPEARS_ON: '/artist-appears-on'
};
