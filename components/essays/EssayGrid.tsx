"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import GlassCard from "@/components/ui/GlassCard";
import { essays } from "@/lib/essays";

export default function EssayGrid() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("全部");

  const tags = useMemo(() => {
    const set = new Set<string>();
    essays.forEach((e) => e.tags.forEach((t) => set.add(t)));
    return ["全部", ...set];
  }, []);

  const filtered = useMemo(() => {
    let arr =
      activeTag === "全部" ? essays : essays.filter((e) => e.tags.includes(activeTag));
    const q = query.trim();
    if (q) {
      arr = arr.filter(
        (e) => e.title.includes(q) || e.excerpt.includes(q) || e.tags.some((t) => t.includes(q))
      );
    }
    return arr;
  }, [activeTag, query]);

  return (
    <div>
      {/* 搜索 */}
      <div className="mx-auto mb-6 max-w-lg">
        <div className="flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-5 py-3 backdrop-blur transition focus-within:border-[#8b7cff]/60">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="h-5 w-5 shrink-0 text-white/50"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索杂谈里的思绪..."
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/40"
          />
        </div>
      </div>

      {/* 标签筛选 */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {tags.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setActiveTag(t)}
            className={`rounded-full px-4 py-1.5 text-sm transition-all duration-300 ${
              activeTag === t
                ? "scale-105 bg-[#8b7cff] font-semibold text-white shadow-lg shadow-[#8b7cff]/40"
                : "border border-white/15 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            #{t}
          </button>
        ))}
      </div>

      {/* 杂谈卡片网格 */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((e) => (
          <Link key={e.id} href={`/essays/${e.id}`} className="group block">
            <GlassCard className="card-float overflow-hidden rounded-3xl">
            <div className="relative h-52 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={e.cover}
                alt={e.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <span className="absolute right-3 top-3 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur">
                ✦ {e.category}
              </span>
            </div>
            <div className="p-5">
              <span className="rounded-full bg-[#8b7cff]/20 px-3 py-1 text-xs text-[#c7bfff]">
                {e.date}
              </span>
              <h3 className="mt-3 line-clamp-1 text-lg font-bold text-white transition-colors group-hover:text-[#c7bfff]">
                {e.title}
              </h3>
              <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-white/60">
                {e.excerpt}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {e.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-white/60"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </GlassCard>
          </Link>
        ))}
      </div>
    </div>
  );
}
