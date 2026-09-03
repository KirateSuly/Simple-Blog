"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { Album } from "@/lib/gallery";
import { ChevronLeft, ChevronRight, CloseIcon } from "@/components/ui/icons";

export default function AlbumView({ album }: { album: Album }) {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      else if (e.key === "ArrowLeft")
        setActive((a) =>
          a === null ? a : (a - 1 + album.photos.length) % album.photos.length
        );
      else if (e.key === "ArrowRight")
        setActive((a) => (a === null ? a : (a + 1) % album.photos.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, album.photos.length]);

  useEffect(() => {
    document.body.style.overflow = active !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <div>
      {/* 照片网格 */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {album.photos.map((p, i) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setActive(i)}
            className="group relative h-44 overflow-hidden rounded-2xl"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.src}
              alt={p.title ?? ""}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/30" />
            {p.title && (
              <span className="absolute bottom-2 left-2 rounded-full bg-black/50 px-2.5 py-1 text-xs text-white/90 opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                {p.title}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* 灯箱（通过 Portal 挂到 body，盖住头部/时钟/底部/音乐条） */}
      {active !== null &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl"
            onClick={() => setActive(null)}
          >
            <button
              type="button"
              aria-label="关闭"
              className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white/80 transition hover:bg-white/20 hover:text-white"
              onClick={() => setActive(null)}
            >
              <CloseIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="上一张"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white/80 transition hover:bg-white/20 hover:text-white"
              onClick={(e) => {
                e.stopPropagation();
                setActive((a) =>
                  a === null
                    ? a
                    : (a - 1 + album.photos.length) % album.photos.length
                );
              }}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={album.photos[active].src}
              alt={album.photos[active].title ?? ""}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[84vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
            />
            <button
              type="button"
              aria-label="下一张"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white/80 transition hover:bg-white/20 hover:text-white"
              onClick={(e) => {
                e.stopPropagation();
                setActive((a) => (a === null ? a : (a + 1) % album.photos.length));
              }}
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>,
          document.body
        )}
    </div>
  );
}
