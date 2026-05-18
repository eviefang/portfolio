import { motion } from 'framer-motion';
import { useState } from 'react';
import { projects, Project, ProjectSection } from '../data/projects';
import Modal from '../components/Modal';

function ProjectDetail({ sections, accent }: { sections: ProjectSection[]; accent: string }) {
  return (
    <div className="space-y-8">
      {sections.map((s, i) => (
        <div key={i}>
          <div className="text-[10px] font-bold tracking-[0.3em] text-black/50 uppercase mb-3">
            {s.label}
          </div>
          {s.text && (
            <p className="text-[15px] leading-relaxed text-black/85 mb-3">{s.text}</p>
          )}
          {s.highlight && (
            <div
              className="rounded-2xl px-5 py-4 text-[15px] leading-relaxed font-medium text-white"
              style={{ backgroundColor: accent }}
            >
              {s.highlight}
            </div>
          )}
          {s.items && (
            <div className="space-y-3">
              {s.items.map((it, j) => (
                <div
                  key={j}
                  className="border-l-2 pl-4 py-1"
                  style={{ borderColor: accent }}
                >
                  <div className="font-albert font-bold text-[15px] mb-1">{it.title}</div>
                  <p className="text-sm text-black/70 leading-relaxed">{it.desc}</p>
                </div>
              ))}
            </div>
          )}
          {s.list && (
            <ul className="space-y-2">
              {s.list.map((li, j) => (
                <li key={j} className="text-sm text-black/75 leading-relaxed flex gap-3">
                  <span className="font-bold" style={{ color: accent }}>·</span>
                  <span>{li}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const stopped = project.status === 'stopped';

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="relative rounded-3xl bg-white border border-black/10 p-7 md:p-9 overflow-hidden group cursor-pointer"
        onClick={() => setOpen(true)}
      >
        {/* Accent gradient on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 pointer-events-none"
          animate={{ opacity: hover ? 0.08 : 0 }}
          transition={{ duration: 0.4 }}
          style={{
            background: `radial-gradient(circle at 30% 0%, ${project.accent}, transparent 60%)`,
          }}
        />

        {/* Big accent number */}
        <div
          className="absolute -top-6 -right-2 font-albert font-black text-[12rem] leading-none opacity-[0.06] select-none pointer-events-none"
          style={{ color: project.accent }}
        >
          0{index + 1}
        </div>

        <div className="relative">
          <div className="flex items-center gap-3 text-[10px] font-bold tracking-[0.25em] text-black/60 uppercase mb-5">
            <span>{project.tag}</span>
            {stopped && (
              <span className="px-2 py-0.5 rounded-full bg-black/8 text-black/60">
                STOPPED
              </span>
            )}
          </div>

          <h3 className="font-albert font-black text-5xl md:text-6xl tracking-tighter mb-4 skew-display leading-none">
            {project.title}
          </h3>

          <p className="text-base text-black/75 leading-relaxed mb-6 max-w-xl">
            {project.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-black/55 font-mono mb-7">
            <span>{project.date}</span>
            <span className="w-1 h-1 rounded-full bg-black/30" />
            <span>{project.stack}</span>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpen(true);
              }}
              className="px-5 py-2.5 rounded-full bg-black text-white text-xs font-semibold tracking-[0.18em] hover:bg-neutral-800 transition-colors"
            >
              产品详情 →
            </button>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="px-5 py-2.5 rounded-full border border-black/30 text-xs font-semibold tracking-[0.18em] hover:bg-black hover:text-white transition-colors"
              >
                {project.liveLabel || '在线体验'} ↗
              </a>
            )}
          </div>
        </div>

        {/* Card lift on hover */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          animate={{
            boxShadow: hover
              ? '0 30px 60px -20px rgba(0,0,0,0.25)'
              : '0 0 0 rgba(0,0,0,0)',
          }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={`${project.title} · 产品详情`}
        maxWidth="max-w-5xl"
        accent={project.accent}
      >
        <ProjectDetail sections={project.sections} accent={project.accent} />
      </Modal>
    </>
  );
}

export default function Capabilities() {
  return (
    <section
      id="capabilities"
      className="relative w-full bg-white py-32 md:py-44 px-6 md:px-12 overflow-hidden"
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="ghost-type text-[24vw] md:text-[18vw] skew-display">
          Capabilities
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-14 md:mb-20"
        >
          <div className="text-[10px] md:text-xs font-semibold tracking-[0.4em] text-black/50 mb-3">
            02 · CAPABILITIES
          </div>
          <h2 className="font-albert font-black text-4xl sm:text-5xl md:text-7xl tracking-tighter skew-display leading-none whitespace-nowrap">
            BUILT WITH AI &amp; HANDS.
          </h2>
          <p className="mt-6 text-sm md:text-base text-black/65 leading-relaxed">
            从用户痛点出发，从想清楚到能体验的全过程。每个产品都是一次完整的判断 —— 包括「不该做」也是判断。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
