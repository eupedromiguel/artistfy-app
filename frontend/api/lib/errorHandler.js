/**
 * Middleware de tratamento de erros para as APIs
 * @param {Error} error - Erro capturado
 * @param {object} res - Response object do Express/Vercel
 */
function handleError(error, res) {
  console.error('API Error:', error);

  // Erro de credenciais
  if (error.message.includes('Credenciais')) {
    return res.status(500).json({
      error: 'Configuração inválida',
      message: 'Credenciais do Spotify não configuradas corretamente'
    });
  }

  // Erro da Spotify API
  if (error.message.includes('Spotify API error')) {
    const statusMatch = error.message.match(/error (\d+)/);
    const status = statusMatch ? parseInt(statusMatch[1]) : 500;

    return res.status(status).json({
      error: 'Erro na API do Spotify',
      message: error.message
    });
  }

  // Erro genérico
  return res.status(500).json({
    error: 'Erro interno',
    message: error.message || 'Ocorreu um erro inesperado'
  });
}

/**
 * Valida parâmetros obrigatórios
 * @param {object} params - Objeto com parâmetros
 * @param {string[]} required - Array com nomes dos parâmetros obrigatórios
 * @throws {Error} Se algum parâmetro obrigatório estiver faltando
 */
function validateParams(params, required) {
  const missing = required.filter(key => !params[key]);

  if (missing.length > 0) {
    throw new Error(`Parâmetros obrigatórios faltando: ${missing.join(', ')}`);
  }
}

export {
  handleError,
  validateParams
};
