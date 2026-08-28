"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const WEEK = ["日", "一", "二", "三", "四", "五", "六"];

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function Clock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="glass-strong fixed left-4 top-4 z-[60] hidden overflow-hidden rounded-2xl px-9 py-9 text-center lg:block">
      {/* 背景图（可配置，留空用玻璃默认） */}
      {site.clockImage && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={site.clockImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </>
      )}
      <div className="relative">
        <div className="font-mono text-3xl font-bold leading-none tabular-nums">
          {now
            ? `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
            : "--:--:--"}
        </div>
        <div className="mt-2 text-[15px] text-white/60">
          {now
            ? `${pad(now.getFullYear())}/${pad(now.getMonth() + 1)}/${pad(now.getDate())} · 星期${WEEK[now.getDay()]}`
            : "--/-- · 星期-"}
        </div>
      </div>
    </div>
  );
}
