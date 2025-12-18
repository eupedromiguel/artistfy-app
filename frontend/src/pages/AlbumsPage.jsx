import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useArtist } from '../hooks/useArtist';
import { usePagination } from '../hooks/usePagination';
import { getArtistAlbums } from '../services/albumsService';
import { exportAlbumsToExcel } from '../utils/exportExcel';
import { exportAlbumsToPDF } from '../utils/exportPDF';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import AlbumList from '../components/albums/AlbumList';
import AlbumsChart from '../components/albums/AlbumsChart';

export default function AlbumsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { artist, loading: artistLoading } = useArtist(id);

  const {
    items: albums,
    loading,
    error,
    hasMore,
    loadInitial,
    loadMore
  } = usePagination(getArtistAlbums, 'albums');

  const [showExcelModal, setShowExcelModal] = useState(false);
  const [showPDFModal, setShowPDFModal] = useState(false);

  useEffect(() => {
    if (id) {
      loadInitial(id);
    }
  }, [id, loadInitial]);

  const handleLoadMore = () => {
    loadMore(id);
  };

  const handleExportExcel = () => {
    exportAlbumsToExcel(albums, artist?.name || 'Artista');
    setShowExcelModal(false);
  };

  const handleExportPDF = () => {
    exportAlbumsToPDF(albums, artist?.name || 'Artista');
    setShowPDFModal(false);
  };

  if (artistLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-red-500">{error}</p>
        <Button onClick={() => navigate(`/artista/${id}`)} className="mt-4">
          Voltar
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Button variant="secondary" onClick={() => navigate(`/artista/${id}`)}>
          ← Voltar para {artist?.name}
        </Button>
      </div>

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          Álbuns - {artist?.name}
        </h1>
        <p className="text-gray-400">
          {albums.length} álbu{albums.length !== 1 ? 'ns' : 'm'} carregado{albums.length !== 1 ? 's' : ''}
        </p>
      </div>

      {albums.length > 0 && (
        <>
          <AlbumsChart albums={albums} />
          <AlbumList albums={albums} />
        </>
      )}

      {loading && (
        <div className="mt-8">
          <LoadingSpinner size="sm" />
        </div>
      )}

      {!loading && albums.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          {hasMore && (
            <Button onClick={handleLoadMore}>
              Carregar Mais
            </Button>
          )}

          <Button variant="outline" onClick={() => setShowExcelModal(true)}>
            📊 Exportar em Excel
          </Button>

          <Button variant="outline" onClick={() => setShowPDFModal(true)}>
            📄 Exportar em PDF
          </Button>
        </div>
      )}

      {!loading && albums.length === 0 && (
        <div className="text-center text-gray-400 py-8">
          Nenhum álbum encontrado para este artista
        </div>
      )}

      <Modal
        isOpen={showExcelModal}
        onClose={() => setShowExcelModal(false)}
        onConfirm={handleExportExcel}
        title="Exportar em Excel"
        message={`Deseja exportar em documento os álbuns a seguir exibidos? ${albums.length} álbu${albums.length !== 1 ? 'ns' : 'm'} carregado${albums.length !== 1 ? 's' : ''}.`}
        confirmText="Exportar"
      />

      <Modal
        isOpen={showPDFModal}
        onClose={() => setShowPDFModal(false)}
        onConfirm={handleExportPDF}
        title="Exportar em PDF"
        message={`Deseja exportar em PDF os álbuns a seguir exibidos? ${albums.length} álbu${albums.length !== 1 ? 'ns' : 'm'} carregado${albums.length !== 1 ? 's' : ''}.`}
        confirmText="Exportar"
      />
    </div>
  );
}
