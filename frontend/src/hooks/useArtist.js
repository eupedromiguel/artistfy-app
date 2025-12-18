import { useState, useEffect } from 'react';
import { getArtist } from '../services/artistService';

/**
 * Hook para buscar dados de um artista
 * @param {string} artistId - ID do artista
 * @returns {object} Estado do artista
 */
export function useArtist(artistId) {
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!artistId) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchArtist() {
      setLoading(true);
      setError(null);

      try {
        const data = await getArtist(artistId);
        if (!cancelled) {
          setArtist(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchArtist();

    return () => {
      cancelled = true;
    };
  }, [artistId]);

  return { artist, loading, error };
}

export default useArtist;
