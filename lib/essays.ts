export type EssayBlock = { type: "heading" | "paragraph"; text: string };

export type Essay = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  cover: string;
  category: string;
  mood: string;
  tags: string[];
  content: EssayBlock[];
};

// 示例杂谈内容：代码审查 / AI / RAG / Agent / MCP / 本站开发
export const essays: Essay[] = [
  {
    id: "1",
    title: "CodeReview 组件从 0 到 1",
    excerpt: "CodeReview-sdk 的定位是做一个 AI 代码审查工具。",
    date: "2026-06-05 10:20",
    cover: "/covers/cover1.jpg",
    category: "代码审查",
    mood: "平静",
    tags: ["CodeReview", "SDK"],
    content: [
      { type: "heading", text: "一、起心动念" },
      { type: "paragraph", text: "CodeReview-sdk 的定位是做一个 AI 代码审查工具。最初只是想给团队自动跑一些静态检查，少一些人为的疏忽。" },
      { type: "paragraph", text: "但做着做着发现，光靠 lint 规则远远不够。很多代码问题的判断，需要结合上下文和项目背景。" },
      { type: "heading", text: "二、引入 LLM 评审" },
      { type: "paragraph", text: "于是把 LLM 接进流程：先让规则引擎挑出可疑点，再让模型生成可读的改进建议，最后汇总成一份审查报告。" },
      { type: "paragraph", text: "体验下来，最花时间的不是模型本身，而是工具的封装、prompt 的打磨和结果的结构化。" },
    ],
  },
  {
    id: "2",
    title: "RAG 与智能体的结合",
    excerpt: "纯靠提示词回答问题效果不稳定，于是引入检索增强。",
    date: "2026-05-26 21:10",
    cover: "/covers/cover2.jpg",
    category: "AI",
    mood: "专注",
    tags: ["RAG", "Agent"],
    content: [
      { type: "heading", text: "一、为什么需要 RAG" },
      { type: "paragraph", text: "纯靠提示词回答问题，效果不稳定，还容易张冠李戴。尤其涉及具体知识时，模型根本不知道答案。" },
      { type: "heading", text: "二、检索增强的流程" },
      { type: "paragraph", text: "先把知识库切块、向量化，存进向量库。请求时召回最相关的上下文，拼到 prompt 里，再让模型作答。" },
      { type: "paragraph", text: "加了检索之后，回答的准确度和可控性都上了一个台阶，幻觉也少了很多。" },
    ],
  },
  {
    id: "3",
    title: "MCP 协议初探",
    excerpt: "MCP（Model Context Protocol）正在成为大模型连接外部的标准。",
    date: "2026-05-18 15:40",
    cover: "/covers/cover3.jpg",
    category: "MCP",
    mood: "好奇",
    tags: ["MCP", "协议"],
    content: [
      { type: "heading", text: "一、MCP 是什么" },
      { type: "paragraph", text: "MCP（Model Context Protocol）是一套让大模型连接外部世界的标准协议，类似「USB-C」之于硬件。" },
      { type: "heading", text: "二、能做什么" },
      { type: "paragraph", text: "通过 MCP，智能体可以调用工具、读写资源、检索上下文。开发者和工具供应商只要实现这套协议，就能互相打通。" },
      { type: "paragraph", text: "生态还在早期，但方向很清晰：把模型的能力边界向外延伸。" },
    ],
  },
  {
    id: "4",
    title: "Agent 应用的落地实践",
    excerpt: "从单轮问答到多步任务，Agent 需要规划、调用工具、观察结果再决策。",
    date: "2026-05-10 09:30",
    cover: "/covers/cover4.jpg",
    category: "Agent",
    mood: "充实",
    tags: ["Agent", "工具调用"],
    content: [
      { type: "heading", text: "一、Agent 的复杂度" },
      { type: "paragraph", text: "从单轮问答到多步任务，Agent 需要规划、调用工具、观察结果、再决策，环环相扣。" },
      { type: "heading", text: "二、实践心得" },
      { type: "paragraph", text: "工具要封装得足够简单、错误处理要到位，不然一旦中间某步失败，整个流程就崩了。" },
      { type: "paragraph", text: "另外，给 Agent 明确的指令和清晰的边界，比堆更多工具更重要。" },
    ],
  },
  {
    id: "5",
    title: "这个网站的诞生",
    excerpt: "从 Next.js 15 项目初始化，到毛玻璃设计、全局音乐播放器、文章系统。",
    date: "2026-04-28 22:05",
    cover: "/covers/cover5.jpg",
    category: "博客",
    mood: "满足",
    tags: ["博客", "Next.js"],
    content: [
      { type: "heading", text: "一、从零开始" },
      { type: "paragraph", text: "用 Next.js 15 初始化项目，一步步搭好目录结构、全局布局和毛玻璃主题。" },
      { type: "heading", text: "二、各模块的搭建" },
      { type: "paragraph", text: "从首页的 Hero、轮播、音乐播放器，到文章、说说、音乐、照片墙、杂谈，每个模块都仔细调过。" },
      { type: "paragraph", text: "中间踩了不少坑：SWC 二进制损坏、CSS 动画与悬停冲突、歌词滚动带走整页……都一一填平了。" },
    ],
  },
  {
    id: "6",
    title: "AI 辅助编程体验",
    excerpt: "把 AI 接入日常开发流程，样板代码和查文档的时间省了下来。",
    date: "2026-04-20 14:15",
    cover: "/covers/cover6.jpg",
    category: "AI",
    mood: "轻松",
    tags: ["AI", "编程"],
    content: [
      { type: "heading", text: "一、把 AI 接入流程" },
      { type: "paragraph", text: "把 AI 接入日常开发后，样板代码和查文档的时间省了不少。" },
      { type: "heading", text: "二、带来的改变" },
      { type: "paragraph", text: "更多精力能放在架构和设计上，重复劳动交给 AI，思路反而更清晰了。" },
    ],
  },
  {
    id: "7",
    title: "MCP 与智能体协作",
    excerpt: "试着把 MCP 工具接入 Hermes 智能体，让它能直接查代码仓库、跑测试。",
    date: "2026-04-12 11:50",
    cover: "/covers/cover7.jpg",
    category: "MCP",
    mood: "开心",
    tags: ["MCP", "Agent"],
    content: [
      { type: "heading", text: "一、接上 MCP 工具" },
      { type: "paragraph", text: "试着把 MCP 工具接入 Hermes 智能体，让它能直接查代码仓库、跑测试。" },
      { type: "heading", text: "二、协作体验" },
      { type: "paragraph", text: "交互顺畅了不少：智能体能自己拿到需要的上下文，不用我再一步步喂给它。" },
    ],
  },
];
