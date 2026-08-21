export type Song = {
  id: string;
  title: string;
  artist: string;
  cover?: string;
  src: string;
  lrc?: string;
};

// 注意：以下音频为演示用的公开测试音频（SoundHelix 示例 MP3），
// 上线时请替换为云存储上的真实音频地址；歌词文件位于 /public/lyrics/。
export const playlist: Song[] = [
  {
    id: "1",
    title: "示例歌曲一",
    artist: "Demo Artist",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    lrc: "/lyrics/song1.lrc",
    cover: "/covers/cover1.svg",
  },
  {
    id: "2",
    title: "示例歌曲二",
    artist: "Demo Artist",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    lrc: "/lyrics/song2.lrc",
    cover: "/covers/cover2.svg",
  },
  {
    id: "3",
    title: "示例歌曲三",
    artist: "Demo Artist",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    lrc: "/lyrics/song3.lrc",
    cover: "/covers/cover3.svg",
  },
];
