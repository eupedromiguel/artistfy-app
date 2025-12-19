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
  <div className="flex min-h-[calc(90vh-144px)] items-center justify-center px-4">
    <div className="w-full max-w-2xl bg-spotify-gray rounded-lg shadow-xl p-8">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        {artist.image && (
          <img
            src={artist.image}
            alt={artist.name}
            className="w-48 h-48 md:w-56 md:h-56 object-cover rounded-lg shadow-2xl flex-shrink-0"
          />
        )}

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-bold mb-4">
            {artist.name}
          </h1>

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

          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <Button
              onClick={() => navigate(`/artista/${id}/faixas`)}
            >
              Ver Faixas
            </Button>

            <Button
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
              Ver no Spotify
            </a>
          )}
        </div>
      </div>
    </div>
  </div>
);

}
