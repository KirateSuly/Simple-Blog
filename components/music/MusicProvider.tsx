"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { playlist, type Song } from "@/lib/music";
import { parseLrc, findLyricIndex, type LyricLine } from "@/lib/lrc";

type MusicContextValue = {
  currentIndex: number;
  song: Song | undefined;
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  lyrics: LyricLine[];
  currentLyricIndex: number;
  toggle: () => void;
  play: () => void;
  pause: () => void;
  next: () => void;
  prev: () => void;
  setVolume: (v: number) => void;
  seek: (t: number) => void;
};

const MusicContext = createContext<MusicContextValue | null>(null);

export function MusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playingRef = useRef(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.8);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [lyrics, setLyrics] = useState<LyricLine[]>([]);

  const song = playlist[currentIndex];

  const next = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % playlist.length);
  }, []);

  const prev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + playlist.length) % playlist.length);
  }, []);

  const play = useCallback(() => {
    void audioRef.current?.play().catch(() => {});
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const toggle = useCallback(() => {
    if (playingRef.current) pause();
    else play();
  }, [play, pause]);

  const setVolume = useCallback((v: number) => {
    const vol = Math.min(1, Math.max(0, v));
    setVolumeState(vol);
    if (audioRef.current) audioRef.current.volume = vol;
  }, []);

  const seek = useCallback((t: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = t;
      setCurrentTime(t);
    }
  }, []);

  // 初始化唯一的 audio 实例
  useEffect(() => {
    const audio = new Audio();
    audio.preload = "metadata";
    audio.volume = 0.8;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  // 切换歌曲时加载
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !song) return;
    setLyrics([]);
    setCurrentTime(0);
    setDuration(0);
    audio.src = song.src;
    audio.load();
    if (playingRef.current) {
      void audio.play().catch(() => {});
    }
    if (song.lrc) {
      fetch(song.lrc)
        .then((r) => r.text())
        .then((t) => setLyrics(parseLrc(t)))
        .catch(() => setLyrics([]));
    }
  }, [song]);

  // 事件监听
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => setCurrentTime(audio.currentTime);
    const onDur = () => setDuration(audio.duration || 0);
    const onPlay = () => {
      setIsPlaying(true);
      playingRef.current = true;
    };
    const onPause = () => {
      setIsPlaying(false);
      playingRef.current = false;
    };
    const onEnded = () => next();

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("durationchange", onDur);
    audio.addEventListener("loadedmetadata", onDur);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("durationchange", onDur);
      audio.removeEventListener("loadedmetadata", onDur);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, [next]);

  const currentLyricIndex = useMemo(
    () => findLyricIndex(lyrics, currentTime),
    [lyrics, currentTime]
  );

  const value: MusicContextValue = {
    currentIndex,
    song,
    isPlaying,
    volume,
    currentTime,
    duration,
    lyrics,
    currentLyricIndex,
    toggle,
    play,
    pause,
    next,
    prev,
    setVolume,
    seek,
  };

  return (
    <MusicContext.Provider value={value}>{children}</MusicContext.Provider>
  );
}

export function useMusic(): MusicContextValue {
  const ctx = useContext(MusicContext);
  if (!ctx) {
    throw new Error("useMusic 必须在 MusicProvider 内部使用");
  }
  return ctx;
}
