"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import type { Moment } from "@/lib/moments";

export default function MomentCard({ m }: { m: Moment }) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(m.likes ?? 0);

  const toggleLike = () => {
    const next = !liked;
    setLiked(next);
    setCount((c) => c + (next ? 1 : -1));
  };

  return (
    <div className="glass card-float mb-6 break-inside-avoid rounded-3xl p-5">
      {/* 顶部：头像 + 昵称 + 日期 */}
      <div className="flex items-center gap-3">
        {site.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={site.avatar}
            alt={site.name}
            className="h-10 w-10 rounded-full object-cover ring-2 ring-white/20"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#8b7cff] to-[#ff7cc0] text-sm font-bold text-white ring-2 ring-white/20">
            {site.name.slice(0, 1)}
          </div>
        )}
        <div>
          <div className="text-sm font-semibold text-white">{site.name}</div>
          <div className="text-xs text-white/50">{m.date}</div>
        </div>
      </div>

      {/* 文本 */}
      <p className="mt-4 text-sm leading-relaxed text-white/85">{m.text}</p>

      {/* 图片缩略图 */}
      {m.images && m.images.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {m.images.map((img, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={img}
              alt=""
              className="h-24 w-full rounded-xl object-cover transition-transform duration-300 hover:scale-105"
            />
          ))}
        </div>
      )}

      {/* 底部：定位 + 点赞 */}
      <div className="mt-4 flex items-center justify-between">
        {m.location ? (
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/60">
            📍 {m.location}
          </span>
        ) : (
          <span />
        )}
        <button
          type="button"
          onClick={toggleLike}
          aria-label={liked ? "取消点赞" : "点赞"}
          className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs transition ${
            liked
              ? "bg-[#ff7cc0]/15 text-[#ff7cc0]"
              : "text-white/40 hover:text-white"
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            fill={liked ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
          </svg>
          <span className="tabular-nums">{count}</span>
        </button>
      </div>
    </div>
  );
}
