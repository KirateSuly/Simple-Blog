export type Song = {
  id: string;
  title: string;
  artist: string;
  cover?: string;
  src: string;
  lrc?: string; // 歌词文件路径（.lrc），有歌词时填写
  instrumental?: boolean; // 纯音乐：设为 true，歌词区显示「纯音乐无歌词，请欣赏吧」
};

// 注意：以下音频为演示用的公开测试音频（SoundHelix 示例 MP3），
// 上线时请替换为你自己的音频地址；歌词文件位于 /public/lyrics/。
export const playlist: Song[] = [
  {
    id: "1",
    title: "冷空气",
    artist: "Demo Artist",
    src: "/music/Zzh; 赋生 - 冷空气.mp3",
    lrc: "/lyrics/Zzh,赋生 - 冷空气.lrc",
    cover: "/covers/cover3.jpg",
  },
  {
    id: "2",
    title: "Iknewyou",
    artist: "Demo Artist",
    src: "/music/mixed matches - Iknewyou.mp3",
    lrc:"/lyrics/mixed matches - Iknewyou.lrc",
    cover: "/covers/cover2.jpg",
  },
  {
    id: "3",
    title: "愛（slow ver）",
    artist: "Demo Artist",
    instrumental:true,
    src: "/music/Seto - 愛（slow ver）.mp3",
    cover: "/covers/cover1.jpg",
  },
  {
    id: "4",
    title: "纯音乐示例",
    artist: "Instrumental",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    instrumental: true,
    cover: "/covers/cover1.jpg",
  },
];
