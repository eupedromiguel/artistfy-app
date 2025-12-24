import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useArtist } from '../hooks/useArtist';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Button from '../components/common/Button';
import { formatFollowers } from '../utils/formatters';

export default function ArtistPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { artist, loading, error } = useArtist(id);

  const handleGoBack = () => {
    // Retorna para a pesquisa se veio de lá, senão vai para home
    if (location.state?.fromSearch) {
      navigate(-1);
    } else {
      navigate('/pesquisa');
    }
  };

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

  // Cor baseada na popularidade
  const getPopularityColor = (popularity) => {
    if (popularity >= 80) return '#1DB954'; // Verde Spotify
    if (popularity >= 60) return '#A327F5'; // Roxo
    if (popularity >= 40) return '#FFA500'; // Laranja
    return '#FF4444'; // Vermelho
  };

  // Texto descritivo da popularidade
  const getPopularityLabel = (popularity) => {
    if (popularity >= 80) return 'Muito Popular';
    if (popularity >= 60) return 'Popular';
    if (popularity >= 40) return 'Moderado';
    return 'Em Crescimento';
  };

  return (
  <div className="container mx-auto px-4 py-8">
    {/* Botão Voltar */}
    <Button
      variant="secondary"
      onClick={handleGoBack}
      className="mb-6"
    >
      Voltar para pesquisa
    </Button>

    <div className="flex min-h-[calc(90vh-200px)] items-center justify-center">
      <div className="w-full max-w-4xl bg-spotify-gray rounded-lg shadow-xl p-8">
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

            <Button
              onClick={() => navigate(`/artista/${id}/aparece-em`)}
            >
              Aparece em
            </Button>
          </div>

        </div>
      </div>

      {/* Barra de Popularidade */}
      <div className="mt-8 border-t border-gray-700 pt-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Popularidade do Artista</h2>

        <div className="max-w-2xl mx-auto">
          {/* Label e valor */}
          <div className="flex justify-between items-center mb-3">
            <span className="text-lg font-semibold" style={{ color: getPopularityColor(artist.popularity) }}>
              {getPopularityLabel(artist.popularity)}
            </span>
            <span className="text-2xl font-bold">
              {artist.popularity}<span className="text-gray-500 text-lg">/100</span>
            </span>
          </div>

          {/* Barra de progresso */}
          <div className="w-full bg-gray-800 rounded-full h-8 overflow-hidden shadow-inner">
            <div
              className="h-full rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-3"
              style={{
                width: `${artist.popularity}%`,
                backgroundColor: getPopularityColor(artist.popularity),
                boxShadow: `0 0 20px ${getPopularityColor(artist.popularity)}40`
              }}
            >
              {artist.popularity > 15 && (
                <span className="text-white font-bold text-sm drop-shadow-lg">
                  {artist.popularity}%
                </span>
              )}
            </div>
          </div>

          {/* Escala de referência */}
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>0</span>
            <span>25</span>
            <span>50</span>
            <span>75</span>
            <span>100</span>
          </div>
        </div>

      </div>
    </div>
    </div>
  </div>
);

}
