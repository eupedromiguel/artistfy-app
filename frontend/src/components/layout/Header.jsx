import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-spotify-gray shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <h1 className="text-3xl font-bold text-spotify-violet">artistFy</h1>
          </Link>
        </div>
      </div>
    </header>
  );
}
