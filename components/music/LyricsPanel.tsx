"use client";

import { useEffect, useRef } from "react";
import { useMusic } from "@/components/music/MusicProvider";
import GlassCard from "@/components/ui/GlassCard";
import { MusicNoteIcon } from "@/components/ui/icons";

export default function LyricsPanel() {
  const { song, lyrics, currentLyricIndex } = useMusic();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const activeRef = useRef<HTMLParagraphElement | null>(null);

  // 只滚动歌词容器本身，避免 scrollIntoView 连带滚动整个页面
  useEffect(() => {
    const container = containerRef.current;
    const active = activeRef.current;
    if (!container || !active) return;
    const cRect = container.getBoundingClientRect();
    const aRect = active.getBoundingClientRect();
    const top =
      aRect.top -
      cRect.top +
      container.scrollTop -
      container.clientHeight / 2 +
      aRect.height / 2;
    container.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }, [currentLyricIndex]);

  return (
    <GlassCard className="fade-up flex flex-col p-5 transition-transform duration-300 hover:scale-[1.02]">
      <div className="mb-2 flex items-center justify-between gap-2 border-b border-white/10 pb-2">
        <h3 className="shrink-0 text-sm font-semibold text-white/80">歌词</h3>
        <span className="truncate text-xs text-white/50">
          {song?.title ?? "未选择"}
        </span>
      </div>
      <div
        ref={containerRef}
        className="lyrics h-32 overflow-y-auto overflow-x-hidden scroll-smooth py-2 text-center"
      >
        {lyrics.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-10 text-sm text-white/40">
            <MusicNoteIcon className="h-5 w-5" />
            <span>暂无歌词</span>
          </div>
        ) : (
          lyrics.map((line, i) => (
            <p
              key={`${i}-${line.time}`}
              ref={i === currentLyricIndex ? activeRef : undefined}
              className={`py-1.5 text-sm transition-all duration-300 ${
                i === currentLyricIndex
                  ? "scale-105 font-semibold text-white"
                  : i < currentLyricIndex
                    ? "text-white/40"
                    : "text-white/55"
              }`}
            >
              {line.text || "♪"}
            </p>
          ))
        )}
      </div>
    </GlassCard>
  );
}
