import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  maxWidth?: string;
  accent?: string;
}

function hexToRgba(hex: string, alpha: number) {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function Modal({ open, onClose, title, children, maxWidth = 'max-w-5xl', accent }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    document.dispatchEvent(new CustomEvent('modal-open'));
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      document.dispatchEvent(new CustomEvent('modal-close'));
    };
  }, [open, onClose]);

  const tint = accent ? hexToRgba(accent, 0.09) : null;
  const cardStyle = tint
    ? { background: `linear-gradient(${tint}, ${tint}), #ffffff` }
    : { background: '#ffffff' };

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[150] bg-black/55 backdrop-blur-sm flex items-center justify-center px-4 md:px-8 pt-20 md:pt-24 pb-4 md:pb-8"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.94, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, y: 10, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            style={cardStyle}
            className={`relative rounded-3xl w-full ${maxWidth} max-h-full overflow-hidden flex flex-col shadow-[0_30px_60px_-15px_rgba(0,0,0,0.35)]`}
          >
            {title && (
              <div className="flex items-center justify-between px-6 md:px-8 py-5 border-b border-black/10">
                <h3 className="font-albert font-black text-xl md:text-2xl tracking-tight">
                  {title}
                </h3>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="w-9 h-9 rounded-full border border-black/15 hover:bg-black hover:text-white transition-colors flex items-center justify-center"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            )}
            <div className="overflow-y-auto px-6 md:px-10 py-8" data-lenis-prevent>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
