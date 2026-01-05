import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import ArtistPage from './pages/ArtistPage';
import TracksPage from './pages/TracksPage';
import AlbumsPage from './pages/AlbumsPage';
import AppearsOnPage from './pages/AppearsOnPage';
import HowToUsePage from './pages/HowToUsePage';

function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col">
      {!isHomePage && <Header />}

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pesquisa" element={<SearchPage />} />
          <Route path="/artista/:id" element={<ArtistPage />} />
          <Route path="/artista/:id/faixas" element={<TracksPage />} />
          <Route path="/artista/:id/albuns" element={<AlbumsPage />} />
          <Route path="/artista/:id/aparece-em" element={<AppearsOnPage />} />
          <Route path="/como-usar" element={<HowToUsePage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
