import { motion } from 'framer-motion';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { articles, Article } from '../data/articles';
import Modal from '../components/Modal';

function ArticleRow({ article, index }: { article: Article; index: number }) {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => setOpen(true)}
        className="group relative cursor-pointer border-b border-black/10 hover:border-black/40 transition-colors py-7 md:py-9"
      >
        <div className="flex items-baseline gap-6 mb-3">
          <span className="font-mono text-xs text-black/40 tracking-wider">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span
            className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-[0.18em] uppercase"
            style={{
              backgroundColor: `${article.accent}15`,
              color: article.accent,
            }}
          >
            {article.tag}
          </span>
        </div>

        <div className="flex items-baseline justify-between gap-6">
          <motion.h3
            className="font-albert font-black text-2xl md:text-4xl lg:text-5xl tracking-tighter leading-[1.05] flex-1"
            animate={{ x: hover ? 12 : 0, color: hover ? article.accent : '#000' }}
            transition={{ type: 'spring', stiffness: 200, damping: 22 }}
          >
            {article.title}
          </motion.h3>

          <motion.div
            animate={{ x: hover ? 10 : 0, rotate: hover ? 0 : -20 }}
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            className="hidden md:block flex-shrink-0 pt-2"
          >
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </motion.div>
        </div>

        <p className="mt-3 text-sm md:text-base text-black/60 leading-relaxed max-w-3xl">
          {article.excerpt}
        </p>
      </motion.div>

      <Modal open={open} onClose={() => setOpen(false)} title={article.title} maxWidth="max-w-3xl">
        <article className="prose-article">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.content}</ReactMarkdown>
        </article>
      </Modal>
    </>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative w-full bg-white py-32 md:py-44 px-6 md:px-12 overflow-hidden"
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="ghost-type text-[24vw] md:text-[18vw] skew-display">
          Writings
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-14 md:mb-20"
        >
          <div className="text-[10px] md:text-xs font-semibold tracking-[0.4em] text-black/50 mb-3">
            03 · WRITINGS
          </div>
          <h2 className="font-albert font-black text-4xl sm:text-5xl md:text-7xl tracking-tighter skew-display leading-none whitespace-nowrap">
            PRODUCT NOTES.
          </h2>
          <p className="mt-6 text-sm md:text-base text-black/65 leading-relaxed">
            一些产品观察笔记 —— 关于 AI 社交、Agent 赛道，还有我做过的事情如何在新词汇里被重新读懂。
          </p>
        </motion.div>

        <div>
          {articles.map((a, i) => (
            <ArticleRow key={a.id} article={a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
