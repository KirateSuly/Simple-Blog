export type Photo = { id: string; src: string; title?: string };

export type Album = {
  id: string;
  name: string;
  description: string;
  photos: Photo[];
};

// 相册封面统一用 photos[0]（置顶照片）
export const albums: Album[] = [
  {
    id: "daily",
    name: "日常",
    description: "生活中的小确幸",
    photos: [
      { id: "d1", src: "/photos/daily-1.svg", title: "日常 1" },
      { id: "d2", src: "/photos/daily-2.svg", title: "日常 2" },
      { id: "d3", src: "/photos/daily-3.svg", title: "日常 3" },
    ],
  },
  {
    id: "dev",
    name: "开发",
    description: "敲代码与搭博客的日常",
    photos: [
      { id: "v1", src: "/photos/dev-1.svg", title: "开发 1" },
      { id: "v2", src: "/photos/dev-2.svg", title: "开发 2" },
      { id: "v3", src: "/photos/dev-3.svg", title: "开发 3" },
    ],
  },
  {
    id: "anime",
    name: "动漫",
    description: "喜欢的二次元插画",
    photos: [
      { id: "a1", src: "/covers/cover1.jpg", title: "战舰远航" },
      { id: "a2", src: "/covers/cover2.jpg", title: "白袍少女" },
      { id: "a3", src: "/covers/cover3.jpg", title: "樱花双马尾" },
      { id: "a4", src: "/covers/cover4.jpg", title: "瓶中少女" },
      { id: "a5", src: "/covers/cover5.jpg", title: "花间起舞" },
      { id: "a6", src: "/covers/cover6.jpg", title: "少女与猫" },
      { id: "a7", src: "/covers/cover7.jpg", title: "夏日晴天" },
    ],
  },
];
