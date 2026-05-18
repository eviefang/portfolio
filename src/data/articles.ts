// Import markdown as raw text using Vite's ?raw suffix
import aiSocial from '../../articles/ai-social.md?raw';
import aiAgent from '../../articles/ai-agent.md?raw';
import claudeConcepts from '../../articles/claude-concepts.md?raw';

export interface Article {
  id: string;
  tag: string;
  title: string;
  excerpt: string;
  content: string;
  accent: string;
}

export const articles: Article[] = [
  {
    id: 'ai-social',
    tag: 'AI 社交',
    title: 'AI 社交的三条路径：Elys · SecondMe · Tolan',
    excerpt:
      '从三款 AI 社交产品切入，拆解 AI 在社交场景下的三种路径——情感陪伴、人格代理、关系增强——以及它们各自的产品取舍。',
    content: aiSocial,
    accent: '#A8C867',
  },
  {
    id: 'ai-agent',
    tag: 'AI Agent',
    title: 'AI Agent 赛道的困局：当大模型本身就够用了',
    excerpt:
      '当大模型能力快速向前推进，Agent 产品的护城河在哪里？从产品定位、用户认知、商业模式三层拆解 Agent 赛道的真问题。',
    content: aiAgent,
    accent: '#F3CB8B',
  },
  {
    id: 'claude-concepts',
    tag: '学习笔记',
    title: '用 Claude 的新语言，重新读懂我做过的事',
    excerpt:
      'Claude 的概念体系（context, skill, tool use…）给了我一套新词汇，回头看过去做过的项目，原来很多决策都已经在这套语言里。',
    content: claudeConcepts,
    accent: '#86C5CA',
  },
];
