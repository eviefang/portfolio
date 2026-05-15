export interface ProjectSection {
  label: string;
  text?: string;
  items?: { title: string; desc: string }[];
  highlight?: string;
  list?: string[];
}

export interface Project {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  date: string;
  stack: string;
  status?: 'active' | 'stopped';
  liveUrl?: string;
  liveLabel?: string;
  accent: string;
  sections: ProjectSection[];
}

export const projects: Project[] = [
  {
    id: 'lyricsync',
    tag: '工具 · NLP · AI',
    title: 'LyricSync',
    subtitle:
      '双语歌词字幕打轴工具。把「制作外语歌词视频」从多工具、多步骤、有付费门槛，压缩成一个页面内的完整闭环。',
    date: '2026.03',
    stack: 'HTML / CSS / JS · Vercel Serverless · 智谱 GLM-4-Flash',
    liveUrl: 'https://lyricsync-theta.vercel.app',
    liveLabel: '在线体验',
    accent: '#FF7F27',
    sections: [
      {
        label: '背景',
        text: '我制作外语翻唱视频，需要给视频加双语字幕。现有工具都无法顺畅完成这件事。',
      },
      {
        label: '痛点',
        items: [
          {
            title: '剪映：付费墙 + 翻译质量差',
            desc: '双语字幕需要 SVIP，自动翻译逐字直译缺乏歌词韵味。',
          },
          {
            title: '自有译文无法落地',
            desc: '即使有满意的翻译，也要先找工具转成字幕文件格式，导入后还和自动识别的原文时间戳对不准，前后功夫全白费。',
          },
          {
            title: 'Whisper 对快歌无效',
            desc: 'rap 和快歌的时间戳断句完全不准，多语言混排（英/韩/泰）识别率低。',
          },
        ],
      },
      {
        label: '核心洞察',
        highlight:
          '用户往往已经有了满意的翻译，缺的只是「把双语歌词精准贴上时间轴」这一步。',
      },
      {
        label: '关键产品决策',
        items: [
          {
            title: '决策一：放弃自动时间戳，改用手动打轴',
            desc: '实测发现 Whisper 对 rap 和快歌断句完全不可用。转向手动打轴后，用户播放音频、按键标记每句开始时间，一遍听完即可完成。实际体验反而比自动识别更顺手——可控性高，短视频场景效率更优。',
          },
          {
            title: '决策二：支持双语交替格式自动识别拆分',
            desc: '目标用户最常见的操作是从音乐 App 直接复制歌词，格式通常是「一句外语 + 一句中文」交替排列。粘入后自动检测并提示拆分，无需手动整理。',
          },
          {
            title: '决策三：AI 翻译作为辅助而非主流程',
            desc: '集成 AI 翻译和行数自动对齐，但定位是辅助工具。主要用户路径是：自带满意译文 → 拆分对齐 → 打轴导出。AI 翻译是没有译文时的备选方案，API 调用通过 Serverless Function 保护密钥安全。',
          },
        ],
      },
      {
        label: '迭代记录',
        list: [
          '空格/回车键与浏览器原生音频控件冲突，改用 J 键打点，彻底绕开焦点问题',
          '原生 <audio> 元素键盘事件被拦截，替换为自定义播放器完全掌控键盘事件',
          '「对齐行数」功能触发时机不明确，改为行数不一致时自动出现，行数一致后消失',
          '变速功能藏在播放器三点菜单内，改为直接显示 0.5× / 0.75× / 1× 三个按钮',
          '双语歌词需手动拆分体验差，自动检测交替格式，一键拆分到两列',
        ],
      },
      {
        label: '产品价值',
        highlight:
          '将「制作外语歌词视频」的字幕处理流程从多步骤、多工具、有付费门槛，压缩成一个页面内的完整闭环。工具本身即作为目标用户日常使用，验证了产品对真实需求的拟合。',
      },
    ],
  },
  {
    id: 'thinklog',
    tag: '知识管理 · 语音 · AI',
    title: 'ThinkLog',
    subtitle:
      '语音驱动的个人知识沉淀工具。通过语音与 AI 对话，自动提炼为结构化知识卡片。完成原型验证后主动否决——展示产品判断而非技术能力。',
    date: '2025.12',
    stack: 'React · FastAPI · Whisper · Claude · Supabase',
    status: 'stopped',
    liveUrl: 'https://think-log-liard.vercel.app',
    liveLabel: '原型体验',
    accent: '#00A2E8',
    sections: [
      {
        label: '产品定义',
        text: 'ThinkLog 是一个语音驱动的个人知识沉淀工具。用户通过语音与 AI 自由对话 5-10 分钟，结束后 AI 自动将对话提炼为结构化知识卡片，存入个人知识库，支持分类浏览和关键词检索。',
      },
      {
        label: '为什么做',
        text: '与 AI 对话产生的高质量思考，随着聊天窗口关闭而消失，无法复用。我想让「想清楚一件事」这个过程本身变成可沉淀、可检索的资产。',
      },
      {
        label: '做到哪里了',
        text: '完成了完整 PRD（技术栈选型、API 设计、数据库结构、页面交互设计），并构建了前端交互原型，核心页面流程和动效已实现（对话为模拟数据）。后端大模型 API 接入和知识卡片提炼功能已验证跑通，但未集成到前端展示。',
      },
      {
        label: '为什么停掉',
        text: '经过原型验证后，我判断这个产品的 ROI 不成立：',
        items: [
          {
            title: '对我自己有更好的替代方案',
            desc: '一是用 OpenClaw 养一只专属头脑风暴助手，个人定制化是它最大的优势，且开源免费；二是在 Claude 里写一个针对头脑风暴场景的 skill，链接 GitHub 知识库，对话结束后自动写入 repo——无需额外 App，无缝嵌入现有工作流。',
          },
          {
            title: '对普通用户缺乏使用动机',
            desc: '非技术用户没有高频的 AI 头脑风暴需求，不会专门下载一个 App 来做这件事。产品还需要接入大模型、用户还要付 API 费用，使用门槛高但价值感知低。',
          },
          {
            title: '核心体验无法自建达标',
            desc: '语音实时对话的体验只在 Gemini、GPT、豆包这类大模型原生产品中足够丝滑，第三方产品自建语音对话链路（录音 → 转写 → 生成 → TTS）延迟和体验都无法与之匹敌，而这恰恰是 ThinkLog 最核心的交互。',
          },
        ],
      },
      {
        label: '复盘',
        highlight:
          '不是所有做得出来的产品都值得做。技术上完全可以实现，但当更轻量的替代方案已经存在、目标用户群不明确、核心体验无法自建达标时，及时止损是更好的产品判断。',
      },
    ],
  },
];
