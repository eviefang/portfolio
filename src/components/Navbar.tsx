import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import MusicPlayer from './MusicPlayer';

const links = [
  { href: '#about', label: 'ABOUT ME' },
  { href: '#capabilities', label: 'CAPABILITIES' },
  { href: '#projects', label: 'PROJECTS' },
  { href: '#backstage', label: 'OFF DUTY' },
];

export default function Navbar() {
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
      <MusicPlayer />

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
