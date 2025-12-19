import { formatDuration, formatDate } from '../../utils/formatters';

export default function TrackItem({ track, index }) {
  const albumImage = track.albumData?.images?.[0]?.url || track.image;

  return (
    <div className="card">
      <div className="flex gap-4">
        {albumImage && (
          <img
            src={albumImage}
            alt={track.albumData?.name || track.album || track.name}
            className="w-24 h-24 rounded-lg object-cover"
          />
        )}

        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <span className="text-gray-500 font-semibold mr-2">#{index + 1}</span>
              <h3 className="inline font-semibold text-white text-lg">{track.name}</h3>
            </div>

            {track.external_url && (
              <a
                href={track.external_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-spotify-violet text-sm"
              >
                Spotify
              </a>
            )}
          </div>

          <p className="text-sm text-gray-400 mb-3">{track.artists}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div>
              <span className="text-gray-500">Álbum:</span>
              <p className="text-gray-300">{track.album}</p>
            </div>

            <div>
              <span className="text-gray-500">Lançamento:</span>
              <p className="text-gray-300">{formatDate(track.releaseDate)}</p>
            </div>

            <div>
              <span className="text-gray-500">Duração:</span>
              <p className="text-gray-300">{formatDuration(track.duration)}</p>
            </div>

            <div>
              <span className="text-gray-500">Gravadora:</span>
              <p className="text-gray-300">{track.label}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
