import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface NavbarProps {
  musicEnabled: boolean;
  onToggleMusic: () => void;
}

const links = [
  { href: '#about', label: 'ABOUT ME' },
  { href: '#capabilities', label: 'CAPABILITIES' },
  { href: '#projects', label: 'PROJECTS' },
  { href: '#backstage', label: 'OFF DUTY' },
];

export default function Navbar({ musicEnabled, onToggleMusic }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-[80] px-6 md:px-12 py-5 flex items-center justify-between transition-all duration-300 ${
        scrolled ? 'bg-white/85 backdrop-blur-md border-b border-black/5' : ''
      }`}
    >
      {/* Vinyl logo + music toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMusic}
          aria-label="Toggle music"
          className="relative w-10 h-10 rounded-full bg-black flex items-center justify-center group"
        >
          <motion.div
            animate={{ rotate: musicEnabled ? 360 : 0 }}
            transition={{
              duration: 4,
              repeat: musicEnabled ? Infinity : 0,
              ease: 'linear',
            }}
            className="w-full h-full rounded-full flex items-center justify-center"
            style={{
              background:
                'radial-gradient(circle at center, #FF7F27 0 18%, #000 18% 30%, #1a1a1a 30% 100%)',
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
          </motion.div>
        </button>
        <span className="hidden md:inline text-xs font-medium tracking-[0.25em] text-black/60">
          FANG · ZHUYI
        </span>
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
