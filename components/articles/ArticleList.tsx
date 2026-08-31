"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import GlassCard from "@/components/ui/GlassCard";
import { articles } from "@/lib/articles";

export default function ArticleList() {
  const [activeTag, setActiveTag] = useState("全部");

  const tags = useMemo(() => {
    const set = new Set<string>();
    articles.forEach((a) => a.tags.forEach((t) => set.add(t)));
    return ["全部", ...set];
  }, []);

  const filtered =
    activeTag === "全部"
      ? articles
      : articles.filter((a) => a.tags.includes(activeTag));

  return (
    <div>
      {/* 标签筛选 */}
      <div className="fade-up mb-6 flex flex-wrap gap-2">
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
            {t}
          </button>
        ))}
      </div>

      {/* 文章卡片网格 */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((a) => (
          <Link key={a.id} href={`/articles/${a.id}`} className="group block">
            <GlassCard className="card-float overflow-hidden rounded-3xl">
              <div className="relative h-40 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={a.cover}
                  alt={a.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute left-3 top-3 rounded-full bg-black/50 px-2.5 py-1 text-xs text-white/90 backdrop-blur">
                  {a.readingTime}
                </span>
              </div>
              <div className="p-5">
                <div className="text-xs text-white/50">{a.date}</div>
                <h3 className="mt-1.5 line-clamp-1 text-lg font-bold text-white transition-colors group-hover:text-[#c7bfff]">
                  {a.title}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-white/60">
                  {a.excerpt}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {a.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-[#8b7cff]/30 bg-[#8b7cff]/15 px-2.5 py-0.5 text-xs text-[#c7bfff]"
                    >
                      {t}
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
