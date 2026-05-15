import { motion } from 'framer-motion';

interface Props {
  onConfirm: () => void;
  onDecline: () => void;
}

export default function MusicModal({ onConfirm, onDecline }: Props) {
  return (
    <motion.div
      key="music-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[180] bg-black/40 backdrop-blur-sm flex items-center justify-center px-6"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 10 }}
        transition={{ type: 'spring', stiffness: 180, damping: 22 }}
        className="bg-white rounded-3xl p-8 md:p-10 max-w-md w-full border-2 border-black shadow-[0_20px_50px_-10px_rgba(0,0,0,0.3)]"
      >
        <div className="text-xs font-semibold tracking-[0.25em] text-black/50 mb-3">
          BEFORE YOU SCROLL
        </div>
        <h3 className="font-albert font-black text-3xl md:text-4xl leading-tight tracking-tighter mb-4 skew-display">
          PLAY SOME MUSIC?
        </h3>
        <p className="text-sm text-black/70 leading-relaxed mb-6">
          这是一个个人网站，听点音乐再逛会更有意思。当然，安静地看也完全没问题。
        </p>
        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            className="flex-1 py-3 rounded-full bg-black text-white text-sm font-semibold tracking-wider hover:bg-neutral-800 transition-colors"
          >
            YES, PLAY
          </button>
          <button
            onClick={onDecline}
            className="flex-1 py-3 rounded-full border-2 border-black text-black text-sm font-semibold tracking-wider hover:bg-black hover:text-white transition-colors"
          >
            NO, THANKS
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
