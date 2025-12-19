export default function LoadingSpinner({ size = 'md', text = 'Carregando...' }) {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-12 h-12 border-4',
    lg: 'w-16 h-16 border-4'
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div
        className={`
          ${sizeClasses[size]}
          border-spotify-gray
          border-t-spotify-violet
          rounded-full
          animate-spin
        `}
      />

      {text && (
        <p className="mt-4 text-gray-400">
          {text}
        </p>
      )}
    </div>
  );
}
