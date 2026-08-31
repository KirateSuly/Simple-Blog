"use client";

import { useEffect, useRef, useState } from "react";
import { bento } from "@/lib/site";
import { ChevronRight } from "@/components/ui/icons";

export default function BentoGrid() {
  const [index, setIndex] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const paused = useRef(false);

  // 轮播：interval 只创建一次；悬停时暂停，移开后自动恢复
  useEffect(() => {
    const id = setInterval(() => {
      if (!paused.current) {
        setIndex((i) => (i + 1) % bento.insights.length);
      }
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr_0.7fr] lg:grid-rows-2">
      {/* 高卡片：轮播（占整列两行） */}
      <div
        className="glass-strong fade-up card-float relative min-h-[420px] overflow-hidden rounded-3xl lg:row-span-2"
        onMouseEnter={() => {
          paused.current = true;
        }}
        onMouseLeave={() => {
          paused.current = false;
        }}
      >
        {/* 右→左滑动轨道 */}
        <div
          className="flex h-full transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {bento.insights.map((s, i) => (
            <div key={i} className="relative h-full w-full shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.image}
                alt={s.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#8b7cff] px-3 py-1 text-xs font-semibold text-white">
                    {s.badge}
                  </span>
                  <span className="rounded-full bg-black/40 px-3 py-1 text-xs text-white/80">
                    {s.date}
                  </span>
                </div>
                <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
                  {s.title}
                </h3>
                <p className="mt-1 text-sm text-white/70">{s.desc}</p>
                <div className="mt-4 flex gap-3">
                  {bento.insights.map((_, j) => (
                    <button
                      key={j}
                      type="button"
                      aria-label={`第 ${j + 1} 张`}
                      onClick={() => setIndex(j)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        j === index ? "w-6 bg-[#8b7cff]" : "w-2 bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 宽卡片：照片 */}
      <div className="glass-strong fade-up card-float relative min-h-[200px] overflow-hidden rounded-3xl lg:col-span-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bento.photo.image}
          alt={bento.photo.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6">
          <h3 className="text-xl font-bold text-white sm:text-2xl">
            {bento.photo.title}
          </h3>
          <p className="mt-1 text-sm text-white/80">{bento.photo.desc}</p>
        </div>
      </div>

      {/* 中卡片：记录 */}
      <div className="glass-strong fade-up card-float relative min-h-[200px] overflow-hidden rounded-3xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bento.records.image}
          alt={bento.records.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-black/50 px-3 py-1 text-xs text-white/80">
              {bento.records.badge}
            </span>
            <span className="rounded-full bg-black/40 px-3 py-1 text-xs text-white/70">
              {bento.records.date}
            </span>
          </div>
          <h3 className="mt-3 text-lg font-bold text-white">
            {bento.records.title}
          </h3>
          <p className="mt-1 text-sm text-white/70">{bento.records.desc}</p>
        </div>
      </div>

      {/* 小卡片：箴言（支持背景图，右下角可换一句） */}
      <div className="glass-strong fade-up card-float relative min-h-[200px] overflow-hidden rounded-3xl">
        {bento.theme.image && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={bento.theme.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/45" />
          </>
        )}
        <div className="relative flex h-full min-h-[200px] flex-col p-6">
          {/* 顶部：标题 + 小圆球（放标题右边） */}
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold text-white">{bento.theme.title}</h3>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8b7cff] text-lg text-white shadow-lg">
              ✦
            </div>
          </div>
          {/* 底部：居中的箴言文字 */}
          <div className="flex flex-1 items-center justify-center">
            <p className="text-center text-xl font-medium text-white/90">
              {bento.theme.quotes[quoteIndex % bento.theme.quotes.length]}
            </p>
          </div>
          {/* 右下角：换一句箴言 */}
          <button
            type="button"
            aria-label="换一句箴言"
            onClick={() =>
              setQuoteIndex((i) => (i + 1) % bento.theme.quotes.length)
            }
            className="absolute bottom-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/80 transition hover:bg-white/20 hover:text-white"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
