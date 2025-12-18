import { useState, useCallback } from 'react';

/**
 * Hook para gerenciar paginação
 * @param {Function} fetchFunction - Função que busca os dados
 * @param {string} dataKey - Chave dos dados no response (ex: 'tracks', 'albums')
 * @returns {object} Estado e funções de paginação
 */
export function usePagination(fetchFunction, dataKey) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [offset, setOffset] = useState(0);

  /**
   * Carrega primeira página
   */
  const loadInitial = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    setItems([]);
    setOffset(0);

    try {
      const response = await fetchFunction(...args, 0);
      setItems(response[dataKey] || []);
      setHasMore(response.hasMore || false);
      setOffset(response.limit || 20);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [fetchFunction, dataKey]);

  /**
   * Carrega mais itens
   */
  const loadMore = useCallback(async (...args) => {
    if (loading || !hasMore) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetchFunction(...args, offset);
      setItems(prev => [...prev, ...(response[dataKey] || [])]);
      setHasMore(response.hasMore || false);
      setOffset(prev => prev + (response.limit || 20));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [fetchFunction, dataKey, loading, hasMore, offset]);

  return {
    items,
    loading,
    error,
    hasMore,
    loadInitial,
    loadMore
  };
}

export default usePagination;
