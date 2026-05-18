import { motion } from 'framer-motion';

const links = [
  {
    label: 'EMAIL',
    value: 'fangzhuyi.evie@gmail.com',
    href: 'mailto:fangzhuyi.evie@gmail.com',
  },
  {
    label: 'GITHUB',
    value: 'github.com/eviefang',
    href: 'https://github.com/eviefang',
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative w-full bg-black text-white py-32 md:py-44 px-6 md:px-12 overflow-hidden"
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="font-albert font-black text-[28vw] md:text-[20vw] tracking-tighter skew-display leading-none text-white/[0.05] select-none whitespace-nowrap">
          Contact
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="text-[10px] md:text-xs font-semibold tracking-[0.4em] text-white/50 mb-4">
            05 · GET IN TOUCH
          </div>
          <h2 className="font-albert font-black text-6xl md:text-8xl lg:text-9xl tracking-tighter skew-display leading-[0.9]">
            LET'S
            <br />
            <span className="italic font-serif font-normal tracking-tight">make&nbsp;</span>
            <span>SOMETHING.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 px-6 py-6 md:px-8 md:py-8 rounded-2xl border border-white/15 hover:border-white/60 hover:bg-white/[0.03] transition-all"
            >
              <div>
                <div className="text-[10px] font-semibold tracking-[0.3em] text-white/50 mb-1">
                  {l.label}
                </div>
                <div className="font-albert font-bold text-lg md:text-xl tracking-tight break-all">
                  {l.value}
                </div>
              </div>
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                className="flex-shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              >
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-24 md:mt-32 flex items-center justify-between text-[10px] tracking-[0.3em] text-white/40 pt-8 border-t border-white/10"
        >
          <div>© {new Date().getFullYear()} FANG ZHUYI · EVIE</div>
          <div>BUILT WITH AI &amp; HANDS</div>
        </motion.div>
      </div>
    </section>
  );
}
