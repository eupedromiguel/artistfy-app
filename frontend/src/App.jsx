import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import ArtistPage from './pages/ArtistPage';
import TracksPage from './pages/TracksPage';
import AlbumsPage from './pages/AlbumsPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pesquisa" element={<SearchPage />} />
            <Route path="/artista/:id" element={<ArtistPage />} />
            <Route path="/artista/:id/faixas" element={<TracksPage />} />
            <Route path="/artista/:id/albuns" element={<AlbumsPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
