import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface NavbarProps {
  musicEnabled: boolean;
  muted: boolean;
  musicTitle: string;
  onToggleMusic: () => void;
  onToggleMute: () => void;
  onSkip: () => void;
}

const links = [
  { href: '#about', label: 'ABOUT ME' },
  { href: '#capabilities', label: 'CAPABILITIES' },
  { href: '#projects', label: 'PROJECTS' },
  { href: '#backstage', label: 'OFF DUTY' },
];

export default function Navbar({ musicEnabled, muted, musicTitle, onToggleMusic, onToggleMute, onSkip }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const spinning = musicEnabled && !muted;

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-[80] px-6 md:px-12 py-5 flex items-center justify-between transition-all duration-300 ${
        scrolled ? 'bg-white/85 backdrop-blur-md border-b border-black/5' : ''
      }`}
    >
      {/* Mini music player */}
      <div className="flex items-center gap-2.5">
        {/* Vinyl disc */}
        <button
          onClick={onToggleMusic}
          aria-label="Toggle music"
          className="relative w-10 h-10 rounded-full flex-shrink-0"
        >
          <motion.div
            animate={{ rotate: spinning ? 360 : 0 }}
            transition={{ duration: 3.5, repeat: spinning ? Infinity : 0, ease: 'linear' }}
            className="w-full h-full rounded-full"
            style={{
              background:
                'radial-gradient(circle at center, #C4956A 0% 16%, #111 16% 28%, #222 28% 42%, #111 42% 56%, #222 56% 100%)',
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white/80" />
            </div>
          </motion.div>
        </button>

        {/* Skip + title + mute — only when music has been turned on */}
        <AnimatePresence>
          {musicEnabled && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.3 }}
              className="hidden md:flex items-center gap-2"
            >
              {/* Skip */}
              <button
                onClick={onSkip}
                aria-label="Skip"
                className="w-7 h-7 rounded-full border border-black/20 bg-white/60 hover:bg-black hover:text-white hover:border-black transition-colors flex items-center justify-center"
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 18L14.5 12 6 6v12zM16 6v12h2V6h-2z"/>
                </svg>
              </button>

              {/* Title */}
              <span className="text-xs font-semibold tracking-wide text-black/75">
                {musicTitle}
              </span>

              {/* Mute toggle */}
              <button
                onClick={onToggleMute}
                aria-label={muted ? 'Unmute' : 'Mute'}
                className="w-7 h-7 rounded-full border border-black/20 bg-white/60 hover:bg-black hover:text-white hover:border-black transition-colors flex items-center justify-center"
              >
                {muted ? (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M11 5L6 9H2v6h4l5 4V5z"/>
                    <line x1="23" y1="9" x2="17" y2="15"/>
                    <line x1="17" y1="9" x2="23" y2="15"/>
                  </svg>
                ) : (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M11 5L6 9H2v6h4l5 4V5z"/>
                    <path d="M19.07 4.93a10 10 0 010 14.14"/>
                    <path d="M15.54 8.46a5 5 0 010 7.07"/>
                  </svg>
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fallback label when music never started */}
        {!musicEnabled && (
          <span className="hidden md:inline text-xs font-medium tracking-[0.25em] text-black/50">
            FANG · ZHUYI
          </span>
        )}
      </div>

      <ul className="hidden md:flex items-center gap-8 lg:gap-12">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="text-xs lg:text-sm font-semibold tracking-[0.18em] text-black/80 hover:text-black transition-colors"
            >
              {l.label}
            </a>
          </li>
        ))}
        <li>
          <a
            href="#contact"
            className="px-5 py-2 rounded-full border border-black/80 text-xs lg:text-sm font-semibold tracking-[0.18em] hover:bg-black hover:text-white transition-colors"
          >
            CONTACT
          </a>
        </li>
      </ul>
    </motion.nav>
  );
}
