import { formatFollowers } from '../../utils/formatters';

export default function ArtistStats({ artist }) {
  if (!artist) return null;

  const stats = [
    {
      label: 'Seguidores',
      value: formatFollowers(artist.followers)
    },
    {
      label: 'Popularidade',
      value: `${artist.popularity}/100`
    },
    {
      label: 'Gêneros',
      value: artist.genres?.length || 0
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="card text-center">
          <p className="text-3xl font-bold text-spotify-green mb-2">
            {stat.value}
          </p>
          <p className="text-sm text-gray-400">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
