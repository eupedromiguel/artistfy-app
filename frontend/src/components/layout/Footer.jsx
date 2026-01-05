import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-spotify-gray mt-12 py-6">
      <div className="container mx-auto px-4 text-center">
        <Link
          to="/como-usar"
          className="text-spotify-green hover:text-spotify-violet transition-colors duration-300 font-semibold"
        >
          Como usar
        </Link>
        <p className="text-gray-500 text-xs mt-2">
          © {new Date().getFullYear()} - Desenvolvido por Pedro Ataides
        </p>
      </div>
    </footer>
  );
}
