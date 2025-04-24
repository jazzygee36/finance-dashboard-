import React from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-50 backdrop-blur-sm '>
      <div className='bg-white rounded-2xl p-6 w-full max-w-md relative shadow-lg animate-fadeIn mx-[3%]'>
        <button
          onClick={onClose}
          className='absolute top-3 right-3 text-gray-600 hover:text-red-500 transition'
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
