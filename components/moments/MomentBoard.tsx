"use client";

import { useMemo, useState } from "react";
import MomentCard from "@/components/moments/MomentCard";
import { moments } from "@/lib/moments";

function toTime(s: string) {
  return new Date(s.replaceAll(".", "-")).getTime();
}

export default function MomentBoard() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");

  const list = useMemo(() => {
    let arr = [...moments];
    const q = query.trim();
    if (q) {
      arr = arr.filter(
        (m) =>
          m.text.includes(q) || (m.location && m.location.includes(q))
      );
    }
    arr.sort((a, b) => {
      const diff = toTime(a.date) - toTime(b.date);
      return sort === "newest" ? -diff : diff;
    });
    return arr;
  }, [query, sort]);

  return (
    <div>
      {/* 搜索栏 */}
      <div className="fade-up mx-auto mb-6 max-w-lg">
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
            placeholder="搜索被遗忘的记忆..."
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/40"
          />
        </div>
      </div>

      {/* 排序 */}
      <div className="fade-up mb-8 flex justify-center gap-2">
        {(["newest", "oldest"] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSort(s)}
            className={`rounded-full px-5 py-1.5 text-sm transition-all duration-300 ${
              sort === s
                ? "scale-105 bg-[#8b7cff] font-semibold text-white shadow-lg shadow-[#8b7cff]/40"
                : "border border-white/15 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            {s === "newest" ? "最新" : "最早"}
          </button>
        ))}
      </div>

      {/* 瀑布流卡片 */}
      <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
        {list.map((m) => (
          <MomentCard key={m.id} m={m} />
        ))}
      </div>
    </div>
  );
}
