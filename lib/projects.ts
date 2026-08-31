export type Project = {
  name: string;
  description: string;
  language?: string;
  stars: number;
  forks: number;
  url: string;
  topics: string[];
  updated: string;
};

// 取自 GitHub 公开库（KirateSuly）
export const projects: Project[] = [
  {
    name: "Simple-Blog",
    description: "一个简洁的个人博客。",
    language: "TypeScript",
    stars: 0,
    forks: 0,
    url: "https://github.com/KirateSuly/Simple-Blog",
    topics: ["博客", "Next.js"],
    updated: "2026.08.28",
  },
  {
    name: "CodeReview-sdk",
    description: "AI 代码审查工具。",
    language: "Java",
    stars: 0,
    forks: 0,
    url: "https://github.com/KirateSuly/CodeReview-sdk",
    topics: ["AI", "代码审查"],
    updated: "2026.08.24",
  },
];
