"use client";

import { useEffect, useState } from "react";

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
    <div className="glass-strong fixed left-4 top-4 z-[60] hidden rounded-2xl px-10 py-10 text-center lg:block">
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
  );
}
