import { useEffect } from 'react';
import Button from './Button';

export default function Modal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar'
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-spotify-gray rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl">
        <h2 className="text-2xl font-bold mb-4 text-spotify-green">{title}</h2>
        <p className="text-gray-300 mb-6">{message}</p>

        <div className="flex gap-4 justify-end">
          <Button variant="secondary" onClick={onClose}>
            {cancelText}
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}
