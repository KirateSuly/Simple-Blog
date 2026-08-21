"use client";

import { useEffect, useState } from "react";
import GlassCard from "@/components/ui/GlassCard";

const WEEK = ["日", "一", "二", "三", "四", "五", "六"];

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function greeting(h: number) {
  if (h < 6) return "夜深了";
  if (h < 9) return "早上好";
  if (h < 12) return "上午好";
  if (h < 14) return "中午好";
  if (h < 18) return "下午好";
  return "晚上好";
}

export default function Clock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <GlassCard
      strong
      className=" h-35 fade-up px-6 py-8 text-center transition-transform duration-300 hover:scale-[1.01]"
    >
      <div className="text-xs uppercase tracking-[0.3em] text-white/50">
        {now
          ? `${greeting(now.getHours())} · ${now.getFullYear()}/${pad(now.getMonth() + 1)}/${pad(now.getDate())} · 星期${WEEK[now.getDay()]}`
          : "· ----/--/-- · 星期-"}
      </div>
      <div className="mt-2 bg-gradient-to-r from-[#c7bfff] via-[#ffd3ea] to-[#c7bfff] bg-clip-text font-mono text-5xl font-bold tabular-nums text-transparent sm:text-7xl">
        {now
          ? `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
          : "--:--:--"}
      </div>
    </GlassCard>
  );
}
