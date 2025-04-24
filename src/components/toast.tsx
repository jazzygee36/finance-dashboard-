// components/Toast.tsx
import { useEffect } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
}

export default function Toast({ message, type = 'info', onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const typeStyles = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  };

  return (
    <div
      className={`fixed top-5 right-5 px-4 py-2 text-white rounded shadow-lg z-[200] ${typeStyles[type]}`}
    >
      {message}
    </div>
  );
}

// const [toast, setToast] = useState<{
//   message: string;
//   type?: 'success' | 'error' | 'info';
// } | null>(null);
// const showToast = (message: string, type?: 'success' | 'error' | 'info') => {
//   setToast({ message, type });
// };
// showToast(`${res.data.message}`, 'success');
