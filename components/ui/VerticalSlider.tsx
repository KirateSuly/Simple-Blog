"use client";

import { useCallback, useRef } from "react";

export default function VerticalSlider({
  value,
  onChange,
  height = 96,
  ariaLabel,
}: {
  value: number; // 0 ~ 1
  onChange: (v: number) => void;
  height?: number;
  ariaLabel?: string;
}) {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const update = useCallback(
    (clientY: number) => {
      const el = trackRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const ratio = 1 - (clientY - rect.top) / rect.height;
      onChange(Math.min(1, Math.max(0, ratio)));
    },
    [onChange]
  );

  return (
    <div
      ref={trackRef}
      role="slider"
      aria-label={ariaLabel}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(value * 100)}
      tabIndex={0}
      className="relative cursor-pointer touch-none select-none"
      style={{ height, width: 20 }}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        update(e.clientY);
      }}
      onPointerMove={(e) => {
        if (e.buttons === 1) update(e.clientY);
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowUp") onChange(Math.min(1, value + 0.05));
        else if (e.key === "ArrowDown") onChange(Math.max(0, value - 0.05));
      }}
    >
      {/* 轨道 */}
      <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 rounded-full bg-white/15" />
      {/* 已填充部分（自下而上） */}
      <div
        className="absolute bottom-0 left-1/2 w-1 -translate-x-1/2 rounded-full bg-gradient-to-t from-[#8b7cff] to-[#ff7cc0]"
        style={{ height: `${value * 100}%` }}
      />
      {/* 滑块圆点 */}
      <div
        className="absolute left-1/2 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-white shadow-[0_0_8px_rgba(139,124,255,0.9)]"
        style={{ bottom: `calc(${value * 100}% - 7px)` }}
      />
    </div>
  );
}
