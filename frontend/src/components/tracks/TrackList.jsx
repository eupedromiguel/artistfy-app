import TrackItem from './TrackItem';

export default function TrackList({ tracks }) {
  if (!tracks || tracks.length === 0) {
    return (
      <div className="text-center text-gray-400 py-8">
        Nenhuma faixa encontrada
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-12 gap-4 px-6 py-2 text-xs text-gray-500 font-semibold border-b border-gray-700">
        <div className="col-span-1">#</div>
        <div className="col-span-7 md:col-span-4">MÚSICA</div>
        <div className="col-span-4 md:col-span-3 hidden md:block">ÁLBUM</div>
        <div className="col-span-2 md:col-span-2 text-center">DATA</div>
        <div className="col-span-2 md:col-span-1 text-center">DURAÇÃO</div>
        <div className="col-span-2 md:col-span-1 text-right">LINK</div>
      </div>

      {tracks.map((track, index) => (
        <TrackItem key={track.id || index} track={track} index={index} />
      ))}
    </div>
  );
}
