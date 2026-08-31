"use client";

import { useEffect, useRef, useState } from "react";
import GlassCard from "@/components/ui/GlassCard";
import PageHeader from "@/components/ui/PageHeader";
import VerticalSlider from "@/components/ui/VerticalSlider";
import { useMusic, type PlayMode } from "@/components/music/MusicProvider";
import { playlist } from "@/lib/music";
import {
  ListIcon,
  MutedIcon,
  MusicNoteIcon,
  NextIcon,
  PauseIcon,
  PlayIcon,
  PrevIcon,
  RepeatIcon,
  ShuffleIcon,
  VolumeIcon,
} from "@/components/ui/icons";

function fmt(t: number) {
  if (!Number.isFinite(t) || t < 0) t = 0;
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function fillGradient(pct: number) {
  return `linear-gradient(to right, #8b7cff 0%, #8b7cff ${pct}%, rgba(255,255,255,0.14) ${pct}%)`;
}

const modeMeta: Record<PlayMode, { label: string; Icon: typeof ListIcon }> = {
  order: { label: "顺序", Icon: ListIcon },
  loop: { label: "循环", Icon: RepeatIcon },
  random: { label: "随机", Icon: ShuffleIcon },
};

// 右侧内容区统一高度，歌单/歌词保持一致
const PANEL_HEIGHT = 430;

export default function MusicCenter() {
  const {
    currentIndex,
    song,
    isPlaying,
    volume,
    muted,
    mode,
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
    selectSong,
    cycleMode,
  } = useMusic();

  const [tab, setTab] = useState<"playlist" | "lyrics">("playlist");

  const lyricsRef = useRef<HTMLDivElement | null>(null);
  const activeRef = useRef<HTMLParagraphElement | null>(null);

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
  const currentMode = modeMeta[mode];

  const tabClass = (active: boolean) =>
    `flex-1 rounded-full px-4 py-2 text-sm transition ${
      active
        ? "bg-[#8b7cff] font-semibold text-white shadow-lg"
        : "text-white/60 hover:text-white"
    }`;

  return (
    <div>
      <PageHeader title="音乐" subtitle="戴上耳机，享受此刻吧" accent="♪" />

      <div className="grid gap-6 lg:grid-cols-[2fr_3fr]">
        {/* 播放器（左） */}
        <GlassCard strong className="card-float flex flex-col items-center p-10">
          <div
            className="h-44 w-44 shrink-0 overflow-hidden rounded-full ring-4 ring-white/20 shadow-2xl sm:h-52 sm:w-52 animate-spin-slow"
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
                <MusicNoteIcon className="h-12 w-12" />
              </div>
            )}
          </div>
          <h2 className="mt-5 text-2xl font-bold text-white">
            {song?.title ?? "未选择"}
          </h2>
          <p className="mt-1 text-sm text-white/60">{song?.artist ?? ""}</p>

          {/* 控制行：播放模式(最左) + 上一首 + 播放 + 下一首 + 竖直音量 */}
          <div className="mt-7 flex items-center gap-2">
            <button
              type="button"
              onClick={cycleMode}
              title={currentMode.label}
              aria-label={`播放模式：${currentMode.label}`}
              className="rounded-full p-2 text-white/60 transition hover:bg-white/10 hover:text-white"
            >
              <currentMode.Icon className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={prev}
              aria-label="上一首"
              className="rounded-full p-2.5 text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              <PrevIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={toggle}
              aria-label={isPlaying ? "暂停" : "播放"}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-black shadow-lg transition hover:scale-105"
            >
              {isPlaying ? (
                <PauseIcon className="h-6 w-6" />
              ) : (
                <PlayIcon className="ml-0.5 h-6 w-6" />
              )}
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="下一首"
              className="rounded-full p-2.5 text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              <NextIcon className="h-5 w-5" />
            </button>

            {/* 音量：点击静音，悬停在下方弹出竖直音量条 */}
            <div className="group relative">
              <button
                type="button"
                onClick={toggleMute}
                aria-label={muted ? "取消静音" : "静音"}
                className="rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                {muted ? (
                  <MutedIcon className="h-5 w-5" />
                ) : (
                  <VolumeIcon className="h-5 w-5" />
                )}
              </button>
              <div className="pointer-events-none absolute left-1/2 bottom-full z-10 -translate-x-1/2 rounded-2xl border border-white/15 bg-black/50 p-3 opacity-0 shadow-xl backdrop-blur-xl transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
                <VerticalSlider
                  value={volume}
                  onChange={setVolume}
                  height={70}
                  ariaLabel="音量"
                />
                <div className="mt-2 text-center text-xs font-semibold tabular-nums text-white/90">
                  {Math.round(volume * 100)}%
                </div>
              </div>
            </div>
          </div>

          {/* 进度 */}
          <div className="mt-10 flex w-full items-center gap-2 text-xs text-white/60">
            <span className="w-8 shrink-0 text-right tabular-nums">
              {fmt(currentTime)}
            </span>
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
        </GlassCard>

        {/* 歌词 / 歌单（右，可切换，等高） */}
        <GlassCard className="card-float flex flex-col p-4">
          <div className="flex rounded-full bg-white/5 p-1">
            <button
              type="button"
              onClick={() => setTab("playlist")}
              className={tabClass(tab === "playlist")}
            >
              歌单 {playlist.length}
            </button>
            <button
              type="button"
              onClick={() => setTab("lyrics")}
              className={tabClass(tab === "lyrics")}
            >
              歌词
            </button>
          </div>

          <div className="mt-4" style={{ height: PANEL_HEIGHT }}>
            {tab === "playlist" ? (
              <div className="hidden-scrollbar h-full space-y-1.5 overflow-y-auto">
                {playlist.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => selectSong(i)}
                    className={`flex w-full items-center gap-3 rounded-2xl p-2.5 text-left transition ${
                      i === currentIndex ? "bg-[#8b7cff]/20" : "hover:bg-white/5"
                    }`}
                  >
                    <div className="h-11 w-11 shrink-0 overflow-hidden rounded-lg">
                      {s.cover ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={s.cover}
                          alt={s.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#8b7cff] to-[#ff7cc0] text-white">
                          <MusicNoteIcon className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div
                        className={`truncate text-sm font-medium ${
                          i === currentIndex ? "text-white" : "text-white/80"
                        }`}
                      >
                        {s.title}
                      </div>
                      <div className="truncate text-xs text-white/50">
                        {s.artist}
                      </div>
                    </div>
                    {i === currentIndex && (
                      <span className="text-[#8b7cff]">♪</span>
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <div
                ref={lyricsRef}
                className="lyrics h-full overflow-y-auto scroll-smooth py-2 text-center"
              >
                {song?.instrumental ? (
                  <p className="py-10 text-sm text-white/40">
                    纯音乐无歌词，请欣赏吧
                  </p>
                ) : lyrics.length === 0 ? (
                  <p className="py-10 text-lg text-white/40">暂无歌词</p>
                ) : (
                  lyrics.map((line, i) => (
                    <p
                      key={`${i}-${line.time}`}
                      ref={i === currentLyricIndex ? activeRef : undefined}
                      className={`py-3.5 text-base transition-all duration-300 ${
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
            )}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
