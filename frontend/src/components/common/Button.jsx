export default function Button({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  className = '',
  ...props
}) {
  const baseClasses = 'font-semibold py-2 px-6 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary: 'bg-spotify-green text-white hover:scale-105',
    secondary: 'bg-spotify-gray text-white hover:bg-opacity-80',
    outline: 'border-2 border-spotify-green text-spotify-green hover:bg-spotify-green hover:text-white'
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
