import * as XLSX from 'xlsx';
import { formatDuration, formatDateForExport } from './formatters';

/**
 * Exporta faixas para arquivo Excel
 * @param {Array} tracks - Array de faixas
 * @param {string} artistName - Nome do artista
 */
export function exportTracksToExcel(tracks, artistName) {
  // Formata dados para o Excel
  const data = tracks.map((track, index) => ({
    '#': index + 1,
    'Música': track.name,
    'Artista(s)': track.artists,
    'Álbum': track.album,
    'Lançamento': formatDateForExport(track.releaseDate),
    'Duração': formatDuration(track.duration),
    'Gravadora': track.label
  }));

  // Cria worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Ajusta largura das colunas
  const columnWidths = [
    { wch: 5 },  // #
    { wch: 30 }, // Música
    { wch: 25 }, // Artista(s)
    { wch: 30 }, // Álbum
    { wch: 12 }, // Lançamento
    { wch: 10 }, // Duração
    { wch: 25 }  // Gravadora
  ];
  worksheet['!cols'] = columnWidths;

  // Cria workbook
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Faixas');

  // Gera arquivo
  const fileName = `${artistName}_faixas_${new Date().getTime()}.xlsx`;
  XLSX.writeFile(workbook, fileName);
}

/**
 * Exporta álbuns para arquivo Excel
 * @param {Array} albums - Array de álbuns
 * @param {string} artistName - Nome do artista
 * @param {string} customFileName - Nome customizado para o arquivo (opcional)
 */
export function exportAlbumsToExcel(albums, artistName, customFileName = null) {
  // Formata dados para o Excel
  const data = albums.map((album, index) => ({
    '#': index + 1,
    'Álbum': album.name,
    'Artista(s)': album.artists,
    'Lançamento': formatDateForExport(album.releaseDate),
    'Gravadora': album.label,
    'Número de Faixas': album.totalTracks
  }));

  // Cria worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Ajusta largura das colunas
  const columnWidths = [
    { wch: 5 },  // #
    { wch: 35 }, // Álbum
    { wch: 25 }, // Artista(s)
    { wch: 12 }, // Lançamento
    { wch: 25 }, // Gravadora
    { wch: 15 }  // Número de Faixas
  ];
  worksheet['!cols'] = columnWidths;

  // Cria workbook
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Álbuns');

  // Gera arquivo
  const fileName = customFileName || `${artistName}_albuns_${new Date().getTime()}.xlsx`;
  XLSX.writeFile(workbook, fileName);
}
