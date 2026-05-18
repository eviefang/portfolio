export interface TimelineItem {
  year: string;
  role: string;
  org: string;
  detail: string;
  tags?: string[];
}

export const timeline: TimelineItem[] = [
  {
    year: '2025.12',
    role: '硕士毕业 · 求职中',
    org: '寻找 AI 产品方向全职机会',
    detail:
      '完成硕士学业，目前积极寻找 AI 产品经理方向的全职机会，欢迎交流。',
    tags: ['Open to Work'],
  },
  {
    year: '2025.07',
    role: '技术产品实习生',
    org: '阿里巴巴橙狮体育 · 杭州',
    detail:
      '加入阿里巴巴橙狮体育担任技术产品实习生，参与体育科技方向的产品规划与落地工作。',
    tags: ['Product', 'Sports Tech'],
  },
  {
    year: '2025.01',
    role: '产品设计实习生',
    org: 'Recraft AI · 伦敦',
    detail:
      '在 AI 设计工具 Recraft AI 担任产品设计实习生，参与产品功能迭代与用户体验优化，积累了 AI 工具类产品的一线经验。',
    tags: ['AIGC', 'Growth'],
  },
  {
    year: '2024',
    role: '环境数据科学与机器学习 · Merit',
    org: 'Imperial College London',
    detail:
      '以 Merit 优等成绩完成帝国理工学院环境数据科学与机器学习硕士项目，深化了对 AI/ML 在真实场景中应用的理解。',
    tags: ['MSc', 'ML'],
  },
  {
    year: '2023 — 2024',
    role: '备考与申请',
    org: '雅思 7.5 · 独立申请帝国理工',
    detail:
      '自主完成全部申请材料准备，雅思取得 7.5 分，成功申请至帝国理工学院。',
  },
  {
    year: '2019',
    role: '数据科学与大数据技术',
    org: '北京体育大学',
    detail:
      '本科就读于北京体育大学，专业为数据科学与大数据技术，建立了扎实的技术基础与数据思维。',
    tags: ['BSc'],
  },
];
