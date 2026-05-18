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
      className="fixed inset-0 z-[180] bg-black/30 backdrop-blur-sm flex items-center justify-center px-6"
    >
      <motion.div
        initial={{ scale: 0.92, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 10 }}
        transition={{ type: 'spring', stiffness: 180, damping: 22 }}
        className="rounded-3xl px-9 py-8 max-w-sm w-full backdrop-blur-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)]"
        style={{
          background:
            'linear-gradient(135deg, rgba(60,60,70,0.78), rgba(20,20,28,0.85))',
        }}
      >
        <h3 className="font-albert font-black text-3xl text-white text-center tracking-tight mb-4">
          Music?
        </h3>
        <p className="text-center text-white/75 text-[14px] leading-relaxed mb-7">
          这是一个个人网站，听点音乐再逛会更有意思。<br />当然，安静地看也完全没问题。
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={onDecline}
            className="px-8 py-2.5 rounded-full bg-white/12 text-white/85 text-sm font-semibold tracking-wider hover:bg-white/22 transition-colors"
          >
            NO
          </button>
          <button
            onClick={onConfirm}
            className="px-8 py-2.5 rounded-full bg-white text-neutral-900 text-sm font-semibold tracking-wider hover:bg-white/90 transition-colors"
          >
            YES
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
