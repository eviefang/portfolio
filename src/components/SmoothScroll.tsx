import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let raf = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Pause Lenis when a modal is open so wheel events don't bleed through
    const onModalOpen = () => lenis.stop();
    const onModalClose = () => lenis.start();
    document.addEventListener('modal-open', onModalOpen);
    document.addEventListener('modal-close', onModalClose);

    // Hook anchor links into Lenis
    const onClick = (e: Event) => {
      const a = (e.target as HTMLElement).closest('a');
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const id = href.substring(1);
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -80 });
    };
    document.addEventListener('click', onClick);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      document.removeEventListener('click', onClick);
      document.removeEventListener('modal-open', onModalOpen);
      document.removeEventListener('modal-close', onModalClose);
    };
  }, []);

  return null;
}
