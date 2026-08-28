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
  muted: boolean;
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
  toggleMute: () => void;
  seek: (t: number) => void;
};

const MusicContext = createContext<MusicContextValue | null>(null);

// 默认音量（0 ~ 1）：修改默认音量只需改这一处
const DEFAULT_VOLUME = 0.3;

export function MusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playingRef = useRef(false);
  const mutedRef = useRef(false);
  const lastVolumeRef = useRef(DEFAULT_VOLUME);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(DEFAULT_VOLUME);
  const [muted, setMuted] = useState(false);
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
    if (vol > 0) lastVolumeRef.current = vol;
    mutedRef.current = vol === 0;
    setMuted(vol === 0);
    setVolumeState(vol);
    if (audioRef.current) audioRef.current.volume = vol;
  }, []);

  const toggleMute = useCallback(() => {
    const next = !mutedRef.current;
    mutedRef.current = next;
    setMuted(next);
    const audio = audioRef.current;
    if (next) {
      lastVolumeRef.current = volume > 0 ? volume : lastVolumeRef.current;
      setVolumeState(0);
      if (audio) audio.volume = 0;
    } else {
      const v = lastVolumeRef.current || DEFAULT_VOLUME;
      setVolumeState(v);
      if (audio) audio.volume = v;
    }
  }, [volume]);

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
    audio.volume = DEFAULT_VOLUME;
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
    muted,
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
    toggleMute,
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
