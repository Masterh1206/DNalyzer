import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { XIcon } from './icons.tsx';

interface ModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, onClose, children }) => {
  const modalRoot = document.getElementById('modal-root');

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 animate-modal-fade-in"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
    >
      <div 
        className="bg-brand-surface rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col animate-modal-content-slide-up border border-brand-border"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-brand-border flex-shrink-0">
          <h2 id="modal-title" className="text-xl font-bold text-brand-text-primary">{title}</h2>
          <button 
            onClick={onClose} 
            className="p-1 rounded-full text-brand-text-secondary hover:bg-brand-bg hover:text-brand-text-primary transition-colors"
            aria-label="Close modal"
          >
            <XIcon className="w-6 h-6" />
          </button>
        </header>
        <main className="p-6 overflow-y-auto">
          <div className="prose prose-invert prose-sm md:prose-base max-w-none text-brand-text-secondary prose-headings:text-brand-text-primary prose-a:text-brand-secondary hover:prose-a:text-brand-primary prose-strong:text-brand-text-primary">
            {children}
          </div>
        </main>
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
