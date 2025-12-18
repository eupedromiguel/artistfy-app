export default function Footer() {
  return (
    <footer className="bg-spotify-gray mt-12 py-6">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-400 text-sm">
          Artistfy - Dados públicos do Spotify
        </p>
        <p className="text-gray-500 text-xs mt-2">
          © {new Date().getFullYear()} - Desenvolvido por Pedro Ataides
        </p>
      </div>
    </footer>
  );
}
