import { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import LoadingScreen from './components/LoadingScreen';
import MusicModal from './components/MusicModal';
import SmoothScroll from './components/SmoothScroll';
import Hero from './sections/Hero';
import AboutMe from './sections/AboutMe';
import Capabilities from './sections/Capabilities';
import Projects from './sections/Projects';
import Backstage from './sections/Backstage';
import Contact from './sections/Contact';

// Replace this with your own track when ready.
// Drop an mp3 in /public/ (or /assets/) and update the path.
const MUSIC_URL: string | null = null;

export default function App() {
  const [loading, setLoading] = useState(true);
  const [showMusicModal, setShowMusicModal] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!loading) {
      const t = setTimeout(() => setShowMusicModal(true), 400);
      return () => clearTimeout(t);
    }
  }, [loading]);

  const playMusic = () => {
    if (!MUSIC_URL) return;
    if (!audioRef.current) {
      const a = new Audio(MUSIC_URL);
      a.loop = true;
      a.volume = 0.4;
      audioRef.current = a;
    }
    audioRef.current.play().catch(() => {});
    setMusicOn(true);
  };

  const stopMusic = () => {
    audioRef.current?.pause();
    setMusicOn(false);
  };

  const handleConfirm = () => {
    setShowMusicModal(false);
    playMusic();
  };
  const handleDecline = () => setShowMusicModal(false);

  const toggleMusic = () => {
    if (musicOn) stopMusic();
    else playMusic();
  };

  return (
    <div className="relative min-h-screen bg-white text-black">
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {showMusicModal && (
          <MusicModal onConfirm={handleConfirm} onDecline={handleDecline} />
        )}
      </AnimatePresence>

      {!loading && (
        <>
          <SmoothScroll />
          <Navbar musicEnabled={musicOn} onToggleMusic={toggleMusic} />
          <main>
            <Hero />
            <AboutMe />
            <Capabilities />
            <Projects />
            <Backstage />
            <Contact />
          </main>
        </>
      )}
    </div>
  );
}
