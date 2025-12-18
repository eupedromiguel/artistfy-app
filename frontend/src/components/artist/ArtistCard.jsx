import { formatFollowers } from '../../utils/formatters';

export default function ArtistCard({ artist, onClick }) {
  return (
    <button
      onClick={() => onClick(artist.id)}
      className="card cursor-pointer text-left w-full"
    >
      {artist.image && (
        <img
          src={artist.image}
          alt={artist.name}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      )}

      <h3 className="text-lg font-bold mb-2 truncate">
        {artist.name}
      </h3>

      <p className="text-sm text-gray-400 mb-2">
        {formatFollowers(artist.followers)} seguidores
      </p>

      {artist.genres && artist.genres.length > 0 && (
        <p className="text-xs text-gray-500 truncate">
          {artist.genres.slice(0, 2).join(', ')}
        </p>
      )}
    </button>
  );
}
