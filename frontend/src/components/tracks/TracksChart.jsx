import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function TracksChart({ tracks }) {
  if (!tracks || tracks.length === 0) return null;

  // Agrupa por ano de lançamento
  const tracksByYear = tracks.reduce((acc, track) => {
    const year = track.releaseDate ? track.releaseDate.split('-')[0] : 'Unknown';
    acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {});

  const yearData = Object.entries(tracksByYear)
    .map(([year, count]) => ({
      year,
      quantidade: count
    }))
    .sort((a, b) => a.year.localeCompare(b.year));

  // Agrupa por gravadora (top 5)
  const tracksByLabel = tracks.reduce((acc, track) => {
    const label = track.label || 'N/A';
    acc[label] = (acc[label] || 0) + 1;
    return acc;
  }, {});

  const labelData = Object.entries(tracksByLabel)
    .map(([label, count]) => ({
      label: label.length > 20 ? label.substring(0, 20) + '...' : label,
      quantidade: count
    }))
    .sort((a, b) => b.quantidade - a.quantidade)
    .slice(0, 5);

  return (
    <div className="space-y-8 mb-8">
      <div className="card">
        <div className="mb-4">
          <h3 className="text-xl font-bold mb-2">Faixas por Ano</h3>
          <p className="text-xs text-gray-500">
            * Gráfico baseado nas faixas carregadas
          </p>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={yearData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="year" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#282828',
                border: '1px solid #A327F5',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Bar dataKey="quantidade" fill="#A327F5" name="Quantidade de Faixas" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="card">
        <div className="mb-4">
          <h3 className="text-xl font-bold mb-2">Top 5 Gravadoras</h3>
          <p className="text-xs text-gray-500">
            * Gráfico baseado nas faixas carregadas
          </p>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={labelData} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis type="number" stroke="#9CA3AF" />
            <YAxis dataKey="label" type="category" width={150} stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#282828',
                border: '1px solid #A327F5',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Bar dataKey="quantidade" fill="#A327F5" name="Quantidade de Faixas" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
