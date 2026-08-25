"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { slides } from "@/lib/site";
import { ChevronLeft, ChevronRight } from "@/components/ui/icons";

export default function Carousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = (i: number) => setIndex((i + slides.length) % slides.length);

  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 4000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused]);

  return (
    <section
      className="glass-strong fade-up relative overflow-hidden rounded-3xl transition-transform duration-300 hover:scale-[1.01]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* 层叠幻灯片，用透明度做渐隐渐出 */}
      <div className="relative h-72 sm:h-96">
        {slides.map((s, i) => (
          <Link
            key={s.title}
            href={s.link}
            aria-hidden={i !== index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              i === index ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s.image}
              alt={s.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                {s.title}
              </h2>
              <p className="mt-1 max-w-xl text-sm text-white/80 sm:text-base">
                {s.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <button
        type="button"
        aria-label="上一张"
        onClick={() => go(index - 1)}
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white/80 backdrop-blur transition hover:bg-black/50 hover:text-white"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        aria-label="下一张"
        onClick={() => go(index + 1)}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white/80 backdrop-blur transition hover:bg-black/50 hover:text-white"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`跳转到第 ${i + 1} 张`}
            onClick={() => go(i)}
            className={`h-2 rounded-full transition-all ${
              i === index ? "w-6 bg-white" : "w-2 bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
