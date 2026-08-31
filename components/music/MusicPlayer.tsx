"use client";

import { useEffect, useRef, useState } from "react";
import { useMusic } from "@/components/music/MusicProvider";
import {
  MusicNoteIcon,
  MutedIcon,
  NextIcon,
  PauseIcon,
  PlayIcon,
  PrevIcon,
  VolumeIcon,
} from "@/components/ui/icons";
import VerticalSlider from "@/components/ui/VerticalSlider";

function fmt(t: number) {
  if (!Number.isFinite(t) || t < 0) t = 0;
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function fillGradient(pct: number) {
  return `linear-gradient(to right, #8b7cff 0%, #8b7cff ${pct}%, rgba(255,255,255,0.14) ${pct}%)`;
}

export default function MusicPlayer({ compact = false }: { compact?: boolean }) {
  const {
    song,
    isPlaying,
    volume,
    muted,
    currentTime,
    duration,
    lyrics,
    currentLyricIndex,
    toggle,
    next,
    prev,
    setVolume,
    toggleMute,
    seek,
  } = useMusic();

  const [showLyrics, setShowLyrics] = useState(!compact);
  const lyricsRef = useRef<HTMLDivElement | null>(null);
  const activeRef = useRef<HTMLParagraphElement | null>(null);

  // 只滚动歌词容器本身，避免 scrollIntoView 连带滚动整个页面
  useEffect(() => {
    const container = lyricsRef.current;
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

  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;

  const coverNode = song?.cover ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={song.cover} alt={song.title} className="h-full w-full object-cover" />
  ) : (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#8b7cff] to-[#ff7cc0] text-white">
      <MusicNoteIcon className="h-6 w-6" />
    </div>
  );

  const prevButton = (
    <button
      type="button"
      onClick={prev}
      aria-label="上一首"
      className="rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-white"
    >
      <PrevIcon className="h-5 w-5" />
    </button>
  );

  const playButton = (
    <button
      type="button"
      onClick={toggle}
      aria-label={isPlaying ? "暂停" : "播放"}
      className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-lg transition hover:scale-105"
    >
      {isPlaying ? (
        <PauseIcon className="h-5 w-5" />
      ) : (
        <PlayIcon className="ml-0.5 h-5 w-5" />
      )}
    </button>
  );


  const nextButton = (
    <button
      type="button"
      onClick={next}
      aria-label="下一首"
      className="rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-white"
    >
      <NextIcon className="h-5 w-5" />
    </button>
  );

  // 音量：点击喇叭静音/取消静音；悬停在喇叭上方弹出垂直音量条
  const volumeButton = (
    <div className="group relative">
      <button
        type="button"
        aria-label={muted ? "取消静音" : "静音"}
        onClick={toggleMute}
        className="rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-white"
      >
        {muted ? (
          <MutedIcon className="h-5 w-5" />
        ) : (
          <VolumeIcon className="h-5 w-5" />
        )}
      </button>
      <div className="pointer-events-none absolute bottom-full left-1/2 z-10 -translate-x-1/2 rounded-2xl border border-white/15 bg-black/50 p-3 opacity-0 shadow-xl backdrop-blur-xl transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
        <VerticalSlider
          value={volume}
          onChange={setVolume}
          height={90}
          ariaLabel="音量"
        />
        <div className="mt-2 text-center text-xs font-semibold tabular-nums text-white/90">
          {Math.round(volume * 100)}%
        </div>
      </div>
    </div>
  );

  
  const progressNode = (
    <div className="flex items-center gap-2 text-xs text-white/60">
      <span className="w-8 shrink-0 text-right tabular-nums">{fmt(currentTime)}</span>
      <input
        type="range"
        className="slider"
        min={0}
        max={duration || 100}
        step={0.1}
        value={currentTime}
        onChange={(e) => seek(Number(e.target.value))}
        style={{ background: fillGradient(progressPct) }}
        aria-label="播放进度"
      />
      <span className="w-8 shrink-0 tabular-nums">{fmt(duration)}</span>
    </div>
  );

  const volumeNode = (
    <div className="flex items-center gap-2">
      <VolumeIcon className="h-5 w-5 shrink-0 text-white/70" />
      <input
        type="range"
        className="slider"
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onChange={(e) => setVolume(Number(e.target.value))}
        style={{ background: fillGradient(volume * 100) }}
        aria-label="音量"
      />
    </div>
  );

  const lyricsNode = (
    <div ref={lyricsRef} className="lyrics overflow-y-auto scroll-smooth text-center">
      {lyrics.length === 0 ? (
        <p className="py-4 text-sm text-white/40">
          {song?.instrumental ? "纯音乐无歌词，请欣赏吧" : "暂无歌词"}
        </p>
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
  );

  // 紧凑模式：用于右上角小格子
  if (compact) {
    return (
      <section className="glass-strong fade-up flex h-full flex-col items-center rounded-3xl p-5 text-center transition-transform duration-300 hover:scale-[1.02]">
        <div
          className="h-20 w-20 shrink-0 overflow-hidden rounded-full ring-2 ring-white/20 animate-spin-slow"
          style={{ animationPlayState: isPlaying ? "running" : "paused" }}
        >
          {coverNode}
        </div>
        <div className="mt-3 w-full truncate font-semibold">
          {song?.title ?? "未选择"}
        </div>
        <div className="w-full truncate text-xs text-white/60">
          {song?.artist ?? ""}
        </div>
        <div className="relative mt-4 flex w-full items-center justify-center">
          <div className="flex items-center gap-3">
            {prevButton}
            {playButton}
            {nextButton}
          </div>
          <div className="absolute left-1/2 top-1/2 -translate-y-1/2 translate-x-[84px]">
            {volumeButton}
          </div>
        </div>
        <div className="mt-3 w-full">{progressNode}</div>
      </section>
    );
  }

  // 通栏模式
  return (
    <section className="glass-strong fade-up rounded-3xl p-5 transition-transform duration-300 hover:scale-[1.01] sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
        <div className="flex items-center gap-4 lg:w-64">
          <div
            className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-2 ring-white/20 animate-spin-slow"
            style={{ animationPlayState: isPlaying ? "running" : "paused" }}
          >
            {coverNode}
          </div>
          <div className="min-w-0">
            <div className="truncate font-semibold">{song?.title ?? "未选择"}</div>
            <div className="truncate text-sm text-white/60">
              {song?.artist ?? ""}
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-center gap-4">
            {prevButton}
            {playButton}
            {nextButton}
          </div>
          <div className="mt-3">{progressNode}</div>
        </div>
        <div className="lg:w-40">{volumeNode}</div>
      </div>

      <div className="mt-5 border-t border-white/10 pt-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white/80">歌词</h3>
          <button
            type="button"
            onClick={() => setShowLyrics((s) => !s)}
            className="text-xs text-white/50 transition hover:text-white"
          >
            {showLyrics ? "收起" : "展开"}
          </button>
        </div>
        {showLyrics && <div className="mt-2 max-h-44 py-2">{lyricsNode}</div>}
      </div>
    </section>
  );
}
