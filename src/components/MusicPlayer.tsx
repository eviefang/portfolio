import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 把音频文件丢进 public/assets/music/ 后，按需扩充这个数组。
// title 显示在 hover 出来的标签上，url 可以是相对路径或 CDN 链接。
const ORIGINAL_PLAYLIST: { title: string; url: string }[] = [
  { title: 'Ylang Ylang — FKJ & ((( O )))', url: '/assets/music/ylang-ylang.mp3' },
];

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const wasPlayingRef = useRef(false);

  const [playlist, setPlaylist] = useState(ORIGINAL_PLAYLIST);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Fisher–Yates shuffle on mount
  useEffect(() => {
    if (ORIGINAL_PLAYLIST.length <= 1) return;
    const shuffled = [...ORIGINAL_PLAYLIST];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setPlaylist(shuffled);
  }, []);

  // 默认音量
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = 0.4;
  }, []);

  // 切歌时若在播放则自动续播
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.load();
    if (isPlaying) {
      audio.play().catch(() => {});
    }
  }, [currentIndex, playlist]);

  // 来自 MusicModal 的「确认」事件
  useEffect(() => {
    const handleEnable = () => {
      const audio = audioRef.current;
      if (!audio) return;
      audio.volume = 0.4;
      audio.muted = false;
      audio.play().then(() => {
        setIsPlaying(true);
        setIsMuted(false);
        wasPlayingRef.current = true;
      }).catch(() => {});
    };
    window.addEventListener('enable-background-music', handleEnable);
    return () => window.removeEventListener('enable-background-music', handleEnable);
  }, []);

  const currentSong = playlist[currentIndex];
  const hasSongs = playlist.length > 0;

  const handleDiscClick = () => {
    const audio = audioRef.current;
    if (!audio || !hasSongs) return;
    if (audio.paused) {
      audio.play().then(() => {
        setIsPlaying(true);
        setIsMuted(false);
        wasPlayingRef.current = true;
      }).catch(() => {});
    } else {
      audio.pause();
      setIsPlaying(false);
      wasPlayingRef.current = false;
    }
  };

  const handleNext = () => {
    if (playlist.length === 0) return;
    setCurrentIndex((i) => (i + 1) % playlist.length);
    setIsPlaying(true);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
    if (audio.paused) {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <div className="flex items-center gap-3">
      {currentSong && (
        <audio
          ref={audioRef}
          src={currentSong.url}
          preload="auto"
          onEnded={handleNext}
        />
      )}

      {/* Vinyl disc */}
      <motion.button
        type="button"
        onClick={handleDiscClick}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        className="relative cursor-pointer"
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        <motion.div
          key={`disc-${currentIndex}`}
          initial={{ rotate: 0 }}
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{
            rotate: isPlaying
              ? { duration: 4, repeat: Infinity, ease: 'linear' }
              : { duration: 0.4 },
          }}
          className="relative w-12 h-12 rounded-full bg-black flex items-center justify-center shadow-lg border border-gray-800"
        >
          <div className="absolute inset-1 rounded-full border border-gray-700/50" />
          <div className="absolute inset-2 rounded-full border border-gray-700/50" />
          <div className="absolute inset-3 rounded-full border border-gray-700/50" />

          <div
            className="w-5 h-5 rounded-full flex items-center justify-center z-10 transition-colors duration-500"
            style={{
              backgroundColor: currentIndex % 2 === 0 ? '#F97316' : '#3B82F6',
            }}
          >
            <div className="w-1.5 h-1.5 bg-black rounded-full" />
          </div>
        </motion.div>
      </motion.button>

      {/* Next */}
      <button
        type="button"
        onClick={handleNext}
        disabled={playlist.length < 2}
        title="Next Song"
        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-black hover:bg-gray-100 transition-colors bg-white/50 backdrop-blur-sm disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M5 4l10 8-10 8V4z" />
          <rect x="17" y="4" width="2" height="16" />
        </svg>
      </button>

      {/* Hover-revealed title */}
      <AnimatePresence>
        {isHovered && currentSong && (
          <motion.div
            initial={{ width: 0, opacity: 0, x: -10 }}
            animate={{ width: 'auto', opacity: 1, x: 0 }}
            exit={{ width: 0, opacity: 0, x: -10 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden flex items-center"
          >
            <div className="whitespace-nowrap text-[10px] font-black tracking-widest text-black mr-1">
              {currentSong.title}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mute */}
      <button
        type="button"
        onClick={toggleMute}
        title={isMuted ? 'Unmute' : 'Mute'}
        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-black hover:bg-gray-100 transition-colors bg-white/50 backdrop-blur-sm"
      >
        <AnimatePresence mode="wait">
          {isMuted ? (
            <motion.svg
              key="mute"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="1" y1="1" x2="23" y2="23" />
              <path d="M9 9v6a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
              <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0a7 7 0 0 1-7 7v0" />
            </motion.svg>
          ) : (
            <motion.svg
              key="sound"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
            </motion.svg>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
