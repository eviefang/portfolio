import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ResumeViewerProps {
  open: boolean;
  onClose: () => void;
}

export default function ResumeViewer({ open, onClose }: ResumeViewerProps) {
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

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-sm flex flex-col"
          onClick={onClose}
        >
          {/* Top bar */}
          <div
            className="flex items-center justify-between px-6 py-4 flex-shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-white/80 text-sm font-semibold tracking-widest uppercase">
              Resume
            </span>
            <button
              onClick={onClose}
              aria-label="Close"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 transition-colors flex items-center justify-center text-white"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* PDF iframe */}
          <div
            className="flex-1 px-4 pb-4 md:px-10 md:pb-8"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src="/assets/resume.pdf"
              className="w-full h-full rounded-2xl"
              title="Resume PDF"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
