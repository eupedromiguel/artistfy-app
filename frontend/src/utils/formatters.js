/**
 * Formata número de seguidores (1.234.567 -> 1,2M)
 * @param {number} num - Número de seguidores
 * @returns {string} Número formatado
 */
export function formatFollowers(num) {
  if (!num) return '0';

  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }

  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }

  return num.toString();
}

/**
 * Formata duração em milissegundos para mm:ss
 * @param {number} ms - Duração em milissegundos
 * @returns {string} Duração formatada
 */
export function formatDuration(ms) {
  if (!ms) return '0:00';

  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Formata data (YYYY-MM-DD -> DD/MM/YYYY)
 * @param {string} dateString - Data no formato ISO
 * @returns {string} Data formatada
 */
export function formatDate(dateString) {
  if (!dateString) return 'N/A';

  const date = new Date(dateString);

  if (isNaN(date.getTime())) return 'N/A';

  return date.toLocaleDateString('pt-BR');
}

/**
 * Formata data para export (mantém formato original ou converte)
 * @param {string} dateString - Data no formato ISO
 * @returns {string} Data formatada para export
 */
export function formatDateForExport(dateString) {
  if (!dateString) return '';
  return dateString;
}
