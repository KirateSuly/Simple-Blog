import EssayGrid from "@/components/essays/EssayGrid";

export default function EssaysPage() {
  return (
    <div className="relative">
      {/* 居中标题 */}
      <div className="fade-up mb-10 text-center">
        <h1 className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
          云端杂谈
        </h1>
        <p className="mt-3 text-sm text-white/60">
          在深海、技术、随想与生活的碎片里，记录一些杂谈。
        </p>
      </div>

      <EssayGrid />
    </div>
  );
}
