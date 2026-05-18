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

// Drop an mp3 in /public/assets/ and update path + title.
const MUSIC_URL: string | null = null;
const MUSIC_TITLE = 'Come Here';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [showMusicModal, setShowMusicModal] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [muted, setMuted] = useState(false);
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
    audioRef.current.muted = false;
    audioRef.current.play().catch(() => {});
    setMusicOn(true);
    setMuted(false);
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

  const toggleMute = () => {
    if (!audioRef.current) return;
    const next = !muted;
    audioRef.current.muted = next;
    setMuted(next);
  };

  const skipTrack = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
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
          <Navbar
            musicEnabled={musicOn}
            muted={muted}
            musicTitle={MUSIC_TITLE}
            onToggleMusic={toggleMusic}
            onToggleMute={toggleMute}
            onSkip={skipTrack}
          />
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
