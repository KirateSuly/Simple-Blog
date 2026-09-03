export type Moment = {
  id: string;
  text: string;
  date: string;
  images?: string[];
  location?: string;
  likes?: number; // 初始点赞数（可选，不填默认 0）
};

// 示例说说数据，内容围绕开发之旅撰写
export const moments: Moment[] = [
  {
    id: "1",
    text: "第一次 next build 全绿，9 个路由全部静态预渲染，首页 First Load 只有 112kB，太爽了 🚀",
    date: "2026.8.10",
    location: "浙江 · 宁波",
  },
  {
    id: "2",
    text: "把音乐播放器做成了全局的，切页面歌不断流，歌词还能逐行高亮，成就感满满 🎵",
    date: "2026.8.28",
    images: ["/covers/cover3.jpg", "/covers/cover1.jpg"],
  },
  {
    id: "3",
    text: "装依赖的时候 SWC 原生二进制老报错，折腾了半天才发现是下载被中断了，重装一遍就好了。",
    date: "2026.8.10",
  },
  {
    id: "4",
    text: "bento 布局调了一晚上，箴言卡片终于有想要的样子了，右下角还能一键换句 ✨",
    date: "2026.8.28",
    location: "浙江 · 宁波",
  },
  {
    id: "5",
    text: "修了个隐藏 bug：歌词自动滚动会把整页带走，改成手动 scrollTo 只滚容器，瞬间清爽。",
    date: "2026.8.19",
    images: ["/covers/cover2.jpg"],
  },
  {
    id: "6",
    text: "换了新的动漫背景图，二次元浓度直线上升 🎨 越看越喜欢。",
    date: "2026.8.22",
    location: "浙江 · 宁波",
  },
  {
    id: "7",
    text: "深夜写文章，窗外在下雨 🌧 突然文思泉涌，把今天的开发日历写了下来c i a l l o~",
    date: "2026.8.13",
  },
  {
    id: "8",
    text: "给小喇叭加了点击静音的功能，细节控表示很满足 🔇",
    date: "2026.8.25",
    images: ["/covers/cover4.jpg"],
    location: "浙江 · 宁波",
  },
  {
    id: "9",
    text: "今天终于找到歌源了，嘿嘿(*^▽^*)，放了三首歌呢",
    date:"2026.8.28",
    images:["/covers/cover5.jpg"],
    location:"浙江 · 宁波"
  },
];
