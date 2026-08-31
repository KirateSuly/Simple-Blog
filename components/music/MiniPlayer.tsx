"use client";

import { usePathname } from "next/navigation";
import { useMusic } from "@/components/music/MusicProvider";
import {
  MutedIcon,
  MusicNoteIcon,
  NextIcon,
  PauseIcon,
  PlayIcon,
  PrevIcon,
  VolumeIcon,
} from "@/components/ui/icons";
import VerticalSlider from "@/components/ui/VerticalSlider";

export default function MiniPlayer() {
  const pathname = usePathname();
  const { song, isPlaying, volume, muted, toggle, next, prev, setVolume, toggleMute } =
    useMusic();

  // 首页不显示（首页已有嵌入播放器）
  if (pathname === "/") return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      <div className="glass-strong flex items-center gap-3 rounded-full py-2 pl-2 pr-4 shadow-2xl">
        {/* 圆形封面（播放时旋转） */}
        <div
          className="h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-white/20 animate-spin-slow"
          style={{ animationPlayState: isPlaying ? "running" : "paused" }}
        >
          {song?.cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={song.cover}
              alt={song.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#8b7cff] to-[#ff7cc0] text-white">
              <MusicNoteIcon className="h-5 w-5" />
            </div>
          )}
        </div>

        {/* 标题 + 歌手（封面位置、字体参考图二） */}
        <div className="min-w-0 max-w-[140px]">
          <div className="truncate text-sm font-semibold text-white">
            {song?.title ?? "未选择"}
          </div>
          <div className="truncate text-xs text-white/60">
            {song?.artist ?? "作词：佚名"}
          </div>
        </div>

        {/* 控制 */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={prev}
            aria-label="上一首"
            className="rounded-full p-1.5 text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <PrevIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={toggle}
            aria-label={isPlaying ? "暂停" : "播放"}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#8b7cff] text-white shadow-lg transition hover:scale-105"
          >
            {isPlaying ? (
              <PauseIcon className="h-4 w-4" />
            ) : (
              <PlayIcon className="ml-0.5 h-4 w-4" />
            )}
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="下一首"
            className="rounded-full p-1.5 text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <NextIcon className="h-4 w-4" />
          </button>

          {/* 音量：点击喇叭静音，悬停弹出垂直音量条（与首页一致） */}
          <div className="group relative">
            <button
              type="button"
              onClick={toggleMute}
              aria-label={muted ? "取消静音" : "静音"}
              className="rounded-full p-1.5 text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              {muted ? (
                <MutedIcon className="h-4 w-4" />
              ) : (
                <VolumeIcon className="h-4 w-4" />
              )}
            </button>
            <div className="pointer-events-none absolute bottom-full left-1/2 z-10 -translate-x-1/2 rounded-2xl border border-white/15 bg-black/50 p-3 opacity-0 shadow-xl backdrop-blur-xl transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
              <VerticalSlider
                value={volume}
                onChange={setVolume}
                height={80}
                ariaLabel="音量"
              />
              <div className="mt-2 text-center text-xs font-semibold tabular-nums text-white/90">
                {Math.round(volume * 100)}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
