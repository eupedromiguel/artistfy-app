import AlbumItem from './AlbumItem';

export default function AlbumList({ albums }) {
  if (!albums || albums.length === 0) {
    return (
      <div className="text-center text-gray-400 py-8">
        Nenhum álbum encontrado
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {albums.map((album, index) => (
        <AlbumItem key={album.id || index} album={album} index={index} />
      ))}
    </div>
  );
}
