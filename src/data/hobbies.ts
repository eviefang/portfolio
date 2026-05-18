const miquan = '/assets/miquan.jpeg';

export interface Hobby {
  emoji: string;
  name: string;
  desc: string;
  link?: { label: string; url: string };
  image?: string;
  accent: string;
}

export const hobbies: Hobby[] = [
  {
    emoji: '🎤',
    name: '唱歌',
    desc: '用抖音记录日常翻唱，唱歌是我最直接的情绪出口。',
    link: { label: '抖音', url: 'https://v.douyin.com/2GXieWH8qqk/' },
    accent: '#FF7F27',
  },
  {
    emoji: '💃',
    name: '跳舞',
    desc: 'Instagram story 合集里记录了我学舞的片段。',
    link: {
      label: 'Instagram',
      url: 'https://www.instagram.com/s/aGlnaGxpZ2h0OjE4MDgyNzQ4NTMwODQxODA0?igsh=MTc0OXcwNm5odWw5cA==',
    },
    accent: '#E0221E',
  },
  {
    emoji: '🧠',
    name: '推理博弈节目',
    desc: '看了大量推理综艺与博弈节目，在小红书写了很多复盘笔记。',
    link: { label: '小红书', url: 'https://xhslink.com/m/2pi2sh83iBg' },
    accent: '#AA88EE',
  },
  {
    emoji: '🔍',
    name: '剧本杀',
    desc: '谜圈记录已超过 100 本，推理和角色扮演是我的长期爱好。',
    image: miquan,
    accent: '#00A2E8',
  },
];
