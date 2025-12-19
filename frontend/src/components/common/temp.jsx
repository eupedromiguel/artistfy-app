export default function LoadingSpinner({ size = 'md', text = 'Carregando...' }) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className={`${sizeClasses[size]} border-4 border-spotify-gray border-t-spotify-green rounded-full animate-spin`}></div>
      {text && <p className="mt-4 text-gray-400">{text}</p>}
    </div>
  );
}
