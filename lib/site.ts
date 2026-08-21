export const site = {
  name: "我的博客",
  signature: "用代码与文字，记录生活的光。",
  bio: "你好，欢迎来到我的个人博客。我是一名热爱前端与音乐的全栈开发者，喜欢把想法做成漂亮的产品，也喜欢用文字记录思考与生活。这里是我的自留地。",
  // 背景图：留空则使用默认深色渐变；填入 /public 下的图片路径（如 "/bg.jpg"）或外链 URL 即可生效
  backgroundImage: "/bg.jpg",
  social: [
    { label: "GitHub", href: "https://github.com/KirateSuly" },
    { label: "Email", href: "mailto:you@example.com" },
    { label: "Bilibili", href: "https://bilibili.com/" },
  ],
};

export type Slide = {
  title: string;
  desc: string;
  image: string;
  link: string;
};

export const slides: Slide[] = [
  {
    title: "欢迎来到我的博客",
    desc: "一个极致毛玻璃风格的个人空间，记录我的项目、文章与生活。",
    image: "/covers/cover1.svg",
    link: "/about",
  },
  {
    title: "探索我的项目",
    desc: "从想法到落地，这里是我做过的作品与实验。",
    image: "/covers/cover2.svg",
    link: "/projects",
  },
  {
    title: "一起听歌",
    desc: "内嵌音乐播放器，支持播放/暂停、切歌、音量与歌词同步。",
    image: "/covers/cover3.svg",
    link: "/music",
  },
];

export const stats = [
  { label: "文章", value: "3", href: "/articles" },
  { label: "说说", value: "3", href: "/moments" },
  { label: "项目", value: "3", href: "/projects" },
  { label: "音乐", value: "3", href: "/music" },
];
