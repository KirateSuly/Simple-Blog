export type Article = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  cover: string;
  readingTime: string;
  content: string[];
};

// 示例文章数据（后续接入 Markdown 内容系统）
export const articles: Article[] = [
  {
    id: "1",
    title: "从零搭建一个 Next.js 15 个人博客",
    excerpt:
      "记录搭建这个毛玻璃博客的完整过程：项目初始化、Tailwind 4 配置、组件拆分到最终构建部署。",
    date: "2025.06.01",
    tags: ["Next.js", "前端"],
    cover: "/covers/cover1.jpg",
    readingTime: "8 分钟",
    content: [
      "从 `create-next-app` 初始化项目说起，选择 App Router 与 TypeScript，一步步搭起清晰的目录结构。根布局负责导航、页脚与全局音乐播放器，页面则按模块拆分为独立组件。",
      "样式部分采用了 Tailwind CSS 4，CSS-first 的配置方式让主题定制变得非常直观。毛玻璃效果通过 backdrop-filter 与半透明背景组合实现，配合漂浮的光斑背景，营造出通透的层次感。",
      "组件拆分上，把导航、页脚、背景等布局组件与首页各模块分开，保持结构清晰的同时也方便复用。音乐播放器用 React Context 管理全局状态，保证页面跳转时音乐不断流。",
      "最后通过 `next build` 验证，所有页面静态预渲染，首屏性能表现令人满意。从零到上线，整个过程比想象中顺利。",
    ],
  },
  {
    id: "2",
    title: "极致毛玻璃（Glassmorphism）的实现细节",
    excerpt:
      "backdrop-filter、光斑、噪点与高光边的搭配技巧，以及渲染性能的注意事项。",
    date: "2025.05.20",
    tags: ["CSS", "设计"],
    cover: "/covers/cover2.jpg",
    readingTime: "6 分钟",
    content: [
      "毛玻璃的核心是 `backdrop-filter: blur() saturate()` 与半透明背景的组合。blur 负责模糊背后内容，saturate 让透出的颜色更鲜艳，两者缺一不可。",
      "为了让玻璃背后有内容可透，背景不能是纯色。我在页面底部放了几团缓慢漂移的彩色光斑，再叠一层极淡的噪点纹理，既增加层次又避免大面积渐变出现色带。",
      "细节决定质感：玻璃卡片顶部加一条细的高光边模拟反光，边框使用半透明白色，阴影则用偏大的模糊值营造悬浮感。",
      "性能方面，backdrop-filter 开销不低，应避免对超大区域或过多元素同时使用；能合并就合并，移动端尤其要注意。",
    ],
  },
  {
    id: "3",
    title: "用 React Context 打造全局音乐播放器",
    excerpt:
      "如何让播放器在页面跳转时不断流：Context、唯一 audio 实例与歌词同步。",
    date: "2025.05.10",
    tags: ["React", "前端"],
    cover: "/covers/cover3.jpg",
    readingTime: "10 分钟",
    content: [
      "播放器的核心思路：在 Provider 中创建唯一的 `new Audio()` 实例，而不是让每个页面各自持有 audio 标签。这样页面切换时，音频状态不会丢失。",
      "用 Context 暴露播放/暂停/切歌/音量等操作方法，首页的嵌入播放器和独立的音乐页都能共享同一份状态，界面与真实播放始终保持同步。",
      "歌词部分通过解析 LRC 文件，把时间戳与文本转成有序数组，再监听 audio 的 timeupdate 事件逐行高亮。滚动用 scrollTo 精确控制歌词容器，避免连带滚动整个页面。",
      "踩过的坑：切换歌曲时要先 setLyrics([]) 清空旧歌词；纯音乐（instrumental）歌曲不拉取歌词，直接展示「纯音乐无歌词，请欣赏吧」。",
    ],
  },
  {
    id: "4",
    title: "图片懒加载的几种姿势",
    excerpt:
      "从原生 loading=\"lazy\" 到 IntersectionObserver 的自定义实现，以及 next/image 的最佳实践。",
    date: "2025.04.28",
    tags: ["前端"],
    cover: "/covers/cover4.jpg",
    readingTime: "5 分钟",
    content: [
      "原生 `loading=\"lazy\"` 是零成本方案，浏览器会自动判断图片是否接近视口，再决定何时加载，适合大多数场景。",
      "更精细的控制可以使用 IntersectionObserver，手动监听元素进入视口，实现自定义的占位图、渐入动画或优先加载顺序。",
      "在 Next.js 中，next/image 已经内置了懒加载、响应式尺寸与占位符处理，配合 remotePatterns 配置远程图片域名即可。",
      "小建议：懒加载只对首屏之外的图片有意义，首屏图片建议直接加载，避免闪烁。",
    ],
  },
  {
    id: "5",
    title: "我的 TypeScript 类型体操笔记",
    excerpt:
      "条件类型、infer、模板字面量类型——把类型当代码写的一些实用套路。",
    date: "2025.04.15",
    tags: ["TypeScript"],
    cover: "/covers/cover1.jpg",
    readingTime: "12 分钟",
    content: [
      "条件类型（T extends U ? X : Y）与 infer 关键字是类型体操的两大基石，几乎所有复杂类型都建立在这两个机制之上。",
      "模板字面量类型可以把字符串类型玩出花样，比如推导路径参数、拼接前缀，甚至实现类型安全的表单字段映射。",
      "实战中要注意：过度复杂的类型会严重降低可读性，团队的维护成本也随之上升。类型安全与代码清晰的平衡点，需要在实践中慢慢摸索。",
      "推荐从小练习开始，比如实现 DeepPartial、PickByType、TupleToUnion 等经典工具类型，循序渐进地建立直觉。",
    ],
  },
  {
    id: "6",
    title: "回溯算法入门：组合、排列与剪枝",
    excerpt:
      "LeetCode 组合总和等经典题目的思路拆解：回溯模板、排序剪枝与去重。",
    date: "2025.04.02",
    tags: ["算法"],
    cover: "/covers/cover2.jpg",
    readingTime: "9 分钟",
    content: [
      "回溯算法的本质是「递归 + 撤销选择」，用一个路径数组记录当前状态，在递归返回时把最后一步撤销，回到上一个选择点继续尝试。",
      "以组合总和为例：先对候选数组排序，在递归中跳过大于剩余目标值的分支，这就是经典的剪枝优化，能大幅减少无效递归。",
      "去重是另一个关键点：同一层不允许重复选择相同元素，配合 used 数组或 startIndex 技巧可以轻松处理。",
      "把模板背熟之后，组合、排列、子集、N 皇后等问题都能套用同一套框架，关键是理解「选择—递归—撤销」三步曲。",
    ],
  },
  {
    id: "7",
    title: "让博客支持 Markdown 渲染",
    excerpt:
      "gray-matter + next-mdx-remote，从 .mdx 文件到页面的完整渲染链路。",
    date: "2025.03.20",
    tags: ["前端"],
    cover: "/covers/cover3.jpg",
    readingTime: "7 分钟",
    content: [
      "gray-matter 负责解析文件的 frontmatter 元数据（标题、日期、标签等），把内容与元数据分离，方便列表页与详情页共用。",
      "正文渲染交给 next-mdx-remote，在 Server Component 中用 fs 读取文件、解析并渲染，首屏返回的就是完整 HTML，对 SEO 非常友好。",
      "代码高亮用 rehype-pretty-code + shiki，可以自定义主题，还支持行号与聚焦行等增强特性。",
      "这个方案最大的好处是内容即文件：直接在仓库里写 Markdown，配合 Git 就能管理所有文章，无需数据库。",
    ],
  },
  {
    id: "8",
    title: "2025 上半年总结",
    excerpt: "关于工作、学习与生活的碎碎念，和一些新的小目标。",
    date: "2025.06.15",
    tags: ["生活"],
    cover: "/covers/cover4.jpg",
    readingTime: "4 分钟",
    content: [
      "上半年把个人博客从零搭了起来，也写了不少技术文章。从毛玻璃设计到音乐播放器，再到文章系统的雏形，一步步把想法变成了现实。",
      "下半年希望把内容系统完善，接入真正的 Markdown 写作流程，再多写一些有深度的文章。",
      "生活方面，保持锻炼，规律作息，继续热爱前端与音乐。写代码的时候永远开着歌单，这大概就是程序员的浪漫。",
    ],
  },
];
