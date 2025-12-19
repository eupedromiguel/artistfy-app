// Token cache com renovação proativa
let cachedToken = null;
let tokenExpiresAt = null;

/**
 * Define o token em cache
 * @param {string} token - Access token
 * @param {number} expiresIn - Tempo de expiração em segundos
 */
function setToken(token, expiresIn) {
  cachedToken = token;
  // Converte expiresIn (segundos) para timestamp
  tokenExpiresAt = Date.now() + expiresIn * 1000;
}

/**
 * Obtém o token em cache se ainda válido
 * @returns {string|null} Token ou null se expirado/não existe
 */
function getToken() {
  const bufferTime = 5 * 60 * 1000; // 5 minutos antes de expirar

  if (cachedToken && tokenExpiresAt && (tokenExpiresAt - Date.now() > bufferTime)) {
    return cachedToken;
  }

  return null;
}

/**
 * Limpa o cache de token
 */
function clearToken() {
  cachedToken = null;
  tokenExpiresAt = null;
}

export {
  setToken,
  getToken,
  clearToken
};
