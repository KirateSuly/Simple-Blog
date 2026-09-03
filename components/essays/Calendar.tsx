"use client";

import { useEffect, useState } from "react";

const WEEK = ["一", "二", "三", "四", "五", "六", "日"];

export default function Calendar() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => setNow(new Date()), []);

  const year = now?.getFullYear() ?? 2026;
  const month = (now?.getMonth() ?? 5) + 1;
  const today = now?.getDate() ?? 1;
  const firstDay = new Date(year, month - 1, 1).getDay();
  const offset = (firstDay + 6) % 7; // 周一开始
  const days = new Date(year, month, 0).getDate();

  return (
    <div className="glass card-float rounded-3xl p-5">
      <h3 className="font-bold text-white">
        {year}年{month}月
      </h3>
      <div className="mt-3 grid grid-cols-7 gap-1 text-center text-xs">
        {WEEK.map((w) => (
          <div key={w} className="text-white/40">
            {w}
          </div>
        ))}
        {Array.from({ length: offset }).map((_, i) => (
          <div key={`e${i}`} />
        ))}
        {Array.from({ length: days }).map((_, i) => {
          const d = i + 1;
          return (
            <div
              key={d}
              className={`flex h-8 items-center justify-center rounded-full text-sm ${
                d === today
                  ? "bg-[#8b7cff] font-bold text-white"
                  : "text-white/70"
              }`}
            >
              {d}
            </div>
          );
        })}
      </div>
    </div>
  );
}
