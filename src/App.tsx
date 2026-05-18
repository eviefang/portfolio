import { useState, useEffect } from 'react';
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

export default function App() {
  const [loading, setLoading] = useState(true);
  const [showMusicModal, setShowMusicModal] = useState(false);

  useEffect(() => {
    if (!loading) {
      const t = setTimeout(() => setShowMusicModal(true), 400);
      return () => clearTimeout(t);
    }
  }, [loading]);

  const handleConfirm = () => {
    setShowMusicModal(false);
    window.dispatchEvent(new Event('enable-background-music'));
  };
  const handleDecline = () => setShowMusicModal(false);

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
          <Navbar />
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
