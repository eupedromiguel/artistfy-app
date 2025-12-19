import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#A327F5', '#C15EDB', '#DA91ED', '#D7B4E0', '#F7DBFF'];

export default function AlbumsChart({ albums }) {
  if (!albums || albums.length === 0) return null;

  // Agrupa por ano de lançamento
  const albumsByYear = albums.reduce((acc, album) => {
    const year = album.releaseDate ? album.releaseDate.split('-')[0] : 'Unknown';
    acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {});

  const yearData = Object.entries(albumsByYear)
    .map(([year, count]) => ({
      year,
      quantidade: count
    }))
    .sort((a, b) => a.year.localeCompare(b.year));

  // Agrupa por gravadora (top 5)
  const albumsByLabel = albums.reduce((acc, album) => {
    const label = album.label || 'N/A';
    acc[label] = (acc[label] || 0) + 1;
    return acc;
  }, {});

  const labelData = Object.entries(albumsByLabel)
    .map(([name, value]) => ({
      name: name.length > 25 ? name.substring(0, 25) + '...' : name,
      value
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  return (
    <div className="space-y-8 mb-8">
      <div className="card">
        <div className="mb-4">
          <h3 className="text-xl font-bold mb-2">Álbuns por Ano</h3>
          <p className="text-xs text-gray-500">
            * Gráfico baseado nos dados exibidos na tela
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
            <Bar dataKey="quantidade" fill="#A327F5" name="Quantidade de Álbuns" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="card">
        <div className="mb-4">
          <h3 className="text-xl font-bold mb-2">Distribuição por Gravadora (Top 5)</h3>
          <p className="text-xs text-gray-500">
            * Gráfico baseado nos dados exibidos na tela
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={labelData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {labelData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#282828',
                  border: '1px solid #A327F5',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="space-y-2">
            {labelData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></div>
                <span className="text-sm text-gray-300">
                  {item.name}: {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
