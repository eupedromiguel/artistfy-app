import { useParams, useNavigate } from 'react-router-dom';
import { useArtist } from '../hooks/useArtist';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Button from '../components/common/Button';
import { formatFollowers } from '../utils/formatters';

export default function ArtistPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { artist, loading, error } = useArtist(id);

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-red-500">{error}</p>
        <Button onClick={() => navigate('/')} className="mt-4">
          Voltar ao início
        </Button>
      </div>
    );
  }

  if (!artist) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
          {artist.image && (
            <img
              src={artist.image}
              alt={artist.name}
              className="w-64 h-64 object-cover rounded-lg shadow-2xl"
            />
          )}

          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-4">{artist.name}</h1>

            <div className="space-y-2 mb-6">
              <p className="text-xl text-gray-400">
                {formatFollowers(artist.followers)} seguidores
              </p>

              {artist.genres && artist.genres.length > 0 && (
                <p className="text-gray-500">
                  Gêneros: {artist.genres.join(', ')}
                </p>
              )}

              <p className="text-gray-500">
                Popularidade: {artist.popularity}/100
              </p>
            </div>

            <div className="flex gap-4">
              <Button onClick={() => navigate(`/artista/${id}/faixas`)}>
                Ver Faixas
              </Button>
              <Button
                variant="secondary"
                onClick={() => navigate(`/artista/${id}/albuns`)}
              >
                Ver Álbuns
              </Button>
            </div>

            {artist.external_url && (
              <a
                href={artist.external_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-spotify-green hover:underline"
              >
                Ver no Spotify →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
