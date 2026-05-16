import { useRef, useState, useMemo } from 'react';
import {
  motion,
  useTransform,
  useMotionValue,
  useSpring,
  useScroll,
} from 'framer-motion';
import { travelPhotos, TravelPhoto } from '../data/travel';
import Terminal from '../components/Terminal';

const HERO_SCALE = 0.82;

// Slot positions match the visual order documented in data/travel.ts.
// Front row spans left → right; back row sits lower and behind via low z.
const LAYOUT = [
  // 1 — front, far left
  { left: '10%', top: '62%', z: 28 },
  // 2 — front, left-mid
  { left: '25%', top: '66%', z: 32 },
  // 3 — front, CENTER (anchor, slightly higher to feel hero)
  { left: '40%', top: '58%', z: 38 },
  // 4 — front, right-mid
  { left: '60%', top: '66%', z: 32 },
  // 5 — front, far right
  { left: '78%', top: '60%', z: 28 },
  // 6 — back, far left (tucked into slot 1 from below)
  { left: '0%', top: '76%', z: 14 },
  // 7 — back, center (pulled lower)
  { left: '46%', top: '92%', z: 16 },
  // 8 — back, far right (pokes out further right)
  { left: '89%', top: '82%', z: 14 },
];

const CARD_W = 'w-[180px] md:w-[240px] lg:w-[280px]';

function FloatingCard({
  photo,
  index,
  entered,
}: {
  photo: TravelPhoto;
  index: number;
  entered: boolean;
}) {
  const layout = LAYOUT[index] ?? { left: '50%', top: '50%', z: 1 };
  const [hover, setHover] = useState(false);

  const bobDuration = useMemo(() => 3 + Math.random() * 2, []);
  const bobOffset = useMemo(() => 5 + Math.random() * 6, []);

  return (
    <motion.div
      className={`absolute cursor-pointer ${CARD_W} will-change-transform`}
      style={{
        top: layout.top,
        left: layout.left,
        aspectRatio: `${photo.ratio}`,
        zIndex: layout.z,
        transformStyle: 'preserve-3d',
      }}
      initial={{
        opacity: 0,
        y: 1000 + Math.random() * 400,
        rotate: photo.rotate + (Math.random() * 30 - 15),
        scale: photo.scale,
      }}
      animate={
        entered
          ? { opacity: 1, y: 0, rotate: photo.rotate, scale: photo.scale }
          : {}
      }
      transition={{
        duration: 1.4,
        delay: 0.15 + Math.random() * 0.5,
        type: 'spring',
        stiffness: 45,
        damping: 16,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <motion.div
        animate={{
          y: [0, -bobOffset, 0],
        }}
        transition={{
          y: {
            duration: bobDuration,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          },
        }}
        className="w-full h-full origin-center"
      >
        <div
          className="w-full h-full rounded-[2rem] bg-white p-2 relative transition-shadow duration-300"
          style={{
            border: `1px solid rgba(0,0,0,0.06)`,
            boxShadow: hover
              ? '0 35px 70px -15px rgba(0,0,0,0.35)'
              : '0 25px 50px -12px rgba(0,0,0,0.18)',
          }}
        >
            <div className="w-full h-full rounded-[1.6rem] overflow-hidden relative bg-neutral-100">
              {photo.kind === 'terminal' ? (
                <Terminal />
              ) : photo.img ? (
                <>
                  <img
                    src={photo.img}
                    alt={photo.caption}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                  <div className="absolute bottom-3 left-3 text-[10px] font-semibold tracking-[0.2em] text-white drop-shadow uppercase">
                    {photo.caption}
                  </div>
                </>
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center text-[10px] font-semibold tracking-[0.25em] uppercase"
                  style={{ color: photo.color }}
                >
                  <div className="text-center opacity-50">
                    <div className="text-3xl mb-2">{photo.id}</div>
                    <div>Coming Soon</div>
                  </div>
                </div>
              )}
            </div>
          </div>
      </motion.div>
    </motion.div>
  );
}

function HeroTitle() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative flex items-center justify-center select-none cursor-pointer h-[1.1em] w-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.h1
        className="font-albert font-black text-[11vw] md:text-[9vw] leading-none tracking-tighter whitespace-nowrap skew-display origin-right relative z-20"
        animate={{ x: hovered ? '-18%' : '0%' }}
        transition={{ type: 'spring', stiffness: 150, damping: 16 }}
      >
        FANG
      </motion.h1>

      <motion.div
        className="absolute z-10 pointer-events-none overflow-hidden rounded-[1.5rem] border-4 border-white shadow-2xl"
        style={{
          width: '11vw',
          height: '14vw',
          top: '50%',
          left: '50%',
          marginTop: '-7vw',
          marginLeft: '-5.5vw',
        }}
        initial={{ scale: 0, rotate: -12, opacity: 0 }}
        animate={{
          scale: hovered ? 1 : 0,
          rotate: hovered ? 4 : -12,
          opacity: hovered ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 180, damping: 14 }}
      >
        <img
          src={travelPhotos[0].img || ''}
          alt="reveal"
          className="w-full h-full object-cover"
        />
      </motion.div>

      <motion.h1
        className="font-albert font-black text-[11vw] md:text-[9vw] leading-none tracking-tighter whitespace-nowrap skew-display origin-left relative z-20 ml-[2vw]"
        animate={{ x: hovered ? '18%' : '0%' }}
        transition={{ type: 'spring', stiffness: 150, damping: 16 }}
      >
        ZHUYI
      </motion.h1>
    </div>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });
  const floorY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 40, damping: 20 });
  const sy = useSpring(y, { stiffness: 40, damping: 20 });

  const handleMove = (e: React.MouseEvent) => {
    x.set(e.clientX / window.innerWidth - 0.5);
    y.set(e.clientY / window.innerHeight - 0.5);
  };

  const rotateX = useTransform(sy, [-0.5, 0.5], ['28deg', '24deg']);
  const rotateY = useTransform(sx, [-0.5, 0.5], ['-4deg', '4deg']);
  const translateX = useTransform(sx, [-0.5, 0.5], ['-1.5%', '1.5%']);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMove}
      className="relative w-full overflow-hidden bg-white"
      style={{ height: '140vh' }}
    >
      <motion.div
        className="sticky top-0 w-full h-screen flex items-center justify-center"
        onViewportEnter={() => setEntered(true)}
      >
        <div className="absolute inset-0 flex items-center justify-center perspective-2000">
          <motion.div
            className="relative w-full max-w-[1400px] transform-gpu"
            style={{
              scale: HERO_SCALE,
              rotateX,
              rotateY,
              x: translateX,
              y: floorY,
              aspectRatio: '16/9',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Title block */}
            <div
              className="absolute top-[24%] left-0 w-full text-center pointer-events-none"
              style={{ transform: 'translateZ(20px) rotateX(-8deg)' }}
            >
              <motion.div
                className="pointer-events-auto inline-block w-full"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              >
                <HeroTitle />
              </motion.div>

              <motion.div
                className="mt-12 md:mt-16 flex flex-col items-center gap-2"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: 'easeOut', delay: 0.5 }}
              >
                <div className="font-albert font-light text-base md:text-xl text-neutral-500 tracking-[0.3em] uppercase">
                  Building AI
                </div>
                <div className="w-10 h-px bg-neutral-300" />
                <div className="font-albert font-light text-sm md:text-lg text-neutral-400 tracking-[0.3em] uppercase">
                  That People Actually Use
                </div>
              </motion.div>
            </div>

            {/* Scattered cards */}
            {travelPhotos.map((p, i) => (
              <FloatingCard key={p.id} photo={p} index={i} entered={entered} />
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <div className="text-[10px] font-semibold tracking-[0.3em] text-black/40">SCROLL</div>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="w-px h-8 bg-black/30"
        />
      </motion.div>
    </section>
  );
}
