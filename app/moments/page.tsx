import MomentBoard from "@/components/moments/MomentBoard";

// 背景漂浮文字（装饰用）
function FloatingWords() {
  const words = [
    { text: "写代码", cls: "left-[6%] top-[10%] rotate-[-8deg] text-4xl" },
    { text: "深夜", cls: "right-[12%] top-[16%] rotate-[7deg] text-5xl" },
    { text: "热爱", cls: "left-[16%] top-[42%] rotate-[4deg] text-3xl" },
    { text: "灵光乍现", cls: "right-[8%] top-[48%] rotate-[-6deg] text-4xl" },
    { text: "听歌", cls: "left-[30%] top-[70%] rotate-[5deg] text-3xl" },
    { text: "坚持", cls: "right-[30%] top-[76%] rotate-[-4deg] text-4xl" },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 select-none overflow-hidden">
      {words.map((w) => (
        <span
          key={w.text}
          className={`absolute font-semibold text-white/[0.06] blur-sm ${w.cls}`}
        >
          {w.text}
        </span>
      ))}
    </div>
  );
}

export default function MomentsPage() {
  return (
    <div className="relative">
      <FloatingWords />

      {/* 居中标题 */}
      <div className="fade-up relative z-10 mb-10 text-center">
        <h1 className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
          说说
        </h1>
        <p className="mt-3 text-sm text-white/60">
          键盘敲击的间歇，也值得被记录。
        </p>
      </div>

      <div className="relative z-10">
        <MomentBoard />
      </div>
    </div>
  );
}
