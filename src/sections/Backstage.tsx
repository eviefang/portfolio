import { motion } from 'framer-motion';
import { useState } from 'react';
import { hobbies, Hobby } from '../data/hobbies';

function WhyProduct() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      <div className="text-[10px] font-semibold tracking-[0.35em] text-black/50 mb-4">
        WHY · PRODUCT
      </div>
      <h3 className="font-albert font-black text-3xl md:text-4xl tracking-tighter mb-8 skew-display leading-tight whitespace-nowrap">
        为什么做产品？
      </h3>

      <div className="space-y-5 text-[15px] text-black/80 leading-[1.85]">
        <p>AI 让不够专精于代码的人长出了手脚。</p>
        <p>
          我恰好是<span className="font-bold underline decoration-2 underline-offset-4">执行能力与思考能力的混合物</span>——有技术背景，能深入思考产品逻辑，也能快速把想法做成可体验的 demo。
        </p>

        <div className="bg-black text-white rounded-2xl px-5 py-4 text-[15px] leading-relaxed font-medium">
          这个网站，就是我和 AI 一起从零搭建的。
        </div>

        <p className="pt-2">
          另外，我有一种<span className="font-bold">天然的用户体验视角</span>。我的大众点评 Lv6+ 全部一个字一个字写出来——去一家店，总能看到好的点和不好的点。
        </p>
        <p className="text-sm text-black/60 italic">
          最初的动力是想抽霸王餐。写着写着，"站在用户视角给反馈"变成了一种习惯。
        </p>

        <div className="bg-black text-white rounded-2xl px-5 py-4 text-[15px] leading-relaxed font-medium">
          从「想抽霸王餐」到「Lv6 的用户洞察肌肉记忆」——<br />
          好的产品直觉，有时候就是这么长出来的。
        </div>
      </div>
    </motion.div>
  );
}

function HobbyCard({ hobby, index }: { hobby: Hobby; index: number }) {
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: index % 2 === 0 ? -2 : 2 }}
      whileInView={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? -1 : 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ rotate: 0, scale: 1.03, y: -4 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative rounded-2xl bg-white border border-black/10 overflow-hidden p-5 group"
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: hover ? 0.12 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ backgroundColor: hobby.accent }}
      />

      <div className="relative flex items-start gap-4">
        <div
          className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
          style={{ backgroundColor: `${hobby.accent}1F` }}
        >
          {hobby.emoji}
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="font-albert font-black text-xl tracking-tight mb-1">
            {hobby.name}
          </h4>
          <p className="text-xs text-black/65 leading-relaxed mb-3">{hobby.desc}</p>

          {hobby.link && (
            <a
              href={hobby.link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.18em] uppercase pb-0.5 border-b-2"
              style={{ color: hobby.accent, borderColor: hobby.accent }}
            >
              {hobby.link.label}
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </a>
          )}
        </div>
      </div>

      {hobby.image && (
        <div
          className="relative mt-4 rounded-xl overflow-y-auto bg-neutral-100 max-h-64"
          data-lenis-prevent
        >
          <img
            src={hobby.image}
            alt={hobby.name}
            className="w-full h-auto block"
            draggable={false}
          />
        </div>
      )}
    </motion.div>
  );
}

export default function Backstage() {
  return (
    <section
      id="backstage"
      className="relative w-full bg-white py-32 md:py-44 px-6 md:px-12 overflow-hidden"
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="ghost-type text-[26vw] md:text-[18vw] skew-display">Off Duty</div>
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
            04 · OFF DUTY
          </div>
          <h2 className="font-albert font-black text-4xl sm:text-5xl md:text-7xl tracking-tighter skew-display leading-none whitespace-nowrap">
            BEHIND THE WORK.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16">
          {/* Left — why product */}
          <div>
            <WhyProduct />
          </div>

          {/* Right — hobbies */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <div className="text-[10px] font-semibold tracking-[0.35em] text-black/50 mb-3">
                MY · WORLD
              </div>
              <h3 className="font-albert font-black text-3xl md:text-4xl tracking-tighter skew-display leading-tight whitespace-nowrap">
                工作之外，让我充电的事
              </h3>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {hobbies.map((h, i) => (
                <HobbyCard key={h.name} hobby={h} index={i} />
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {['🎤 唱歌', '💃 跳舞', '🔍 剧本杀', '🧠 推理博弈'].map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full bg-black/5 text-xs text-black/65"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
