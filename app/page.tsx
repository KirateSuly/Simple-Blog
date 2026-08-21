import Hero from "@/components/home/Hero";
import Carousel from "@/components/home/Carousel";
import ContentPreview from "@/components/home/ContentPreview";
import MusicPlayer from "@/components/music/MusicPlayer";
import LyricsPanel from "@/components/music/LyricsPanel";

export default function Home() {
  return (
    <div className="space-y-6">
      {/* 顶部：我的博客(占2份，与播放器等高) + 音乐播放器(占1份) */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Hero />
        </div>
        <MusicPlayer compact />
      </div>

      {/* 歌词面板：通栏拉宽 */}
      <LyricsPanel />

      <Carousel />
      <ContentPreview />
    </div>
  );
}
