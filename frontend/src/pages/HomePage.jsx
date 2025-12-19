import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/common/SearchBar';
import { MESSAGES } from '../utils/constants';

export default function HomePage() {
  const navigate = useNavigate();

  const handleSearch = (query) => {
    navigate(`/pesquisa?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center px-4">
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold text-spotify-green mb-4">
          artistFy
        </h1>
        <p className="text-xl text-gray-400 mb-2">
          Explore artistas do Spotify
        </p>
        <p className="text-sm text-gray-500">
          {MESSAGES.PUBLIC_DATA_NOTE}
        </p>
      </div>

      <SearchBar onSearch={handleSearch} />

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
        <div className="text-center">
          <div className="text-4xl mb-2">🔍</div>
          <h3 className="text-lg font-semibold mb-2">Pesquise Artistas</h3>
          <p className="text-sm text-gray-400">
            Encontre seus artistas favoritos no Spotify
          </p>
        </div>

        <div className="text-center">
          <div className="text-4xl mb-2">📊</div>
          <h3 className="text-lg font-semibold mb-2">Visualize Dados</h3>
          <p className="text-sm text-gray-400">
            Explore faixas, álbuns e estatísticas
          </p>
        </div>

        <div className="text-center">
          <div className="text-4xl mb-2">📥</div>
          <h3 className="text-lg font-semibold mb-2">Exporte Relatórios</h3>
          <p className="text-sm text-gray-400">
            Baixe dados em Excel ou PDF
          </p>
        </div>
      </div>
    </div>
  );
}
