import { motion } from 'framer-motion';
import { useState } from 'react';
import { timeline } from '../data/timeline';
import Modal from '../components/Modal';
import ResumeViewer from '../components/ResumeViewer';

export default function AboutMe() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <section
      id="about"
      className="relative w-full bg-white py-32 md:py-44 px-6 md:px-12 overflow-hidden"
    >
      {/* Ghost background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="ghost-type text-[28vw] md:text-[20vw] skew-display">
          About&nbsp;Me
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Left — name plate */}
        <div className="flex flex-col justify-end lg:sticky lg:top-32 lg:self-start min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <div className="text-[10px] md:text-xs font-semibold tracking-[0.4em] text-black/50">
              01 · ABOUT&nbsp;ME
            </div>

            <h2 className="font-albert font-black text-6xl md:text-7xl lg:text-7xl xl:text-8xl leading-[0.95] tracking-tighter skew-display">
              FANG ZHUYI
            </h2>
            <div className="font-albert font-black text-3xl md:text-4xl tracking-tight text-black/80">
              方竹伊
            </div>

            <div className="flex items-center gap-3 pt-3">
              <span className="w-1 h-4 bg-black" />
              <span className="text-xs md:text-sm font-semibold tracking-[0.18em] text-black/70">
                BEIJING · LONDON · HANGZHOU
              </span>
            </div>

            <p className="text-base text-black/70 leading-relaxed">
              产品 · AI · 设计直觉。<br />
              技术出身但更迷恋用户体验，喜欢把模糊的想法落地成可以体验的东西。
            </p>

            <button
              onClick={() => setResumeOpen(true)}
              className="group inline-flex items-center gap-3 px-6 py-3 rounded-full border-2 border-black hover:bg-black hover:text-white transition-colors text-xs font-semibold tracking-[0.2em]"
            >
              VIEW RESUME
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </button>

            <ResumeViewer open={resumeOpen} onClose={() => setResumeOpen(false)} />
          </motion.div>
        </div>

        {/* Right — timeline */}
        <div className="space-y-5">
          {timeline.map((item, i) => {
            const open = openIdx === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 60, rotate: 2 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={() => setOpenIdx(open ? null : i)}
                className={`group relative cursor-pointer rounded-2xl bg-white border border-black/10 hover:border-black/30 transition-all p-6 md:p-7 ${
                  open ? 'shadow-[0_15px_40px_-15px_rgba(0,0,0,0.2)]' : ''
                }`}
                style={{
                  transform: open ? 'translateX(-8px)' : undefined,
                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-albert font-black text-xl md:text-2xl tracking-tight mb-1">
                      {item.org}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-black/60 mb-2">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                        <rect x="2" y="7" width="20" height="14" rx="2" />
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                      </svg>
                      {item.role}
                    </div>
                  </div>
                  <span className="font-mono text-xs md:text-sm text-black/60 whitespace-nowrap pt-1">
                    {item.year}
                  </span>
                </div>

                <motion.div
                  initial={false}
                  animate={{
                    height: open ? 'auto' : 0,
                    opacity: open ? 1 : 0,
                    marginTop: open ? 12 : 0,
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="text-sm text-black/70 leading-relaxed pt-2 border-t border-black/10">
                    {item.detail}
                  </p>
                  {item.tags && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {item.tags.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 rounded-full bg-black text-white text-[10px] font-semibold tracking-wider uppercase"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
