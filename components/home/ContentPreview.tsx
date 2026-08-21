import Link from "next/link";
import GlassCard from "@/components/ui/GlassCard";

const articles = [
  {
    title: "从零搭建一个 Next.js 15 个人博客",
    date: "2025-01-01",
    desc: "记录搭建这个博客的完整过程与踩坑心得。",
  },
  {
    title: "极致毛玻璃（Glassmorphism）的实现细节",
    date: "2024-12-20",
    desc: "backdrop-filter、光斑与噪点的搭配技巧。",
  },
  {
    title: "用 React Context 打造不中断的全局音乐播放器",
    date: "2024-12-05",
    desc: "跨页面共享音频实例的优雅做法。",
  },
];

const moments = [
  { text: "今天开始搭建个人博客啦 🎉", date: "2025-01-01" },
  { text: "毛玻璃效果真的越看越喜欢 ✨", date: "2024-12-22" },
  { text: "写代码的时候一定要有音乐 🎵", date: "2024-12-10" },
];

export default function ContentPreview() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section className="fade-up">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">最新文章</h2>
          <Link
            href="/articles"
            className="text-sm text-white/60 transition hover:text-white"
          >
            查看全部 →
          </Link>
        </div>
        <div className="space-y-4">
          {articles.map((a) => (
            <GlassCard
              key={a.title}
              className="p-5 transition-all duration-300 hover:scale-[1.02] hover:bg-white/10"
            >
              <div className="text-xs text-white/50">{a.date}</div>
              <h3 className="mt-1 font-semibold">{a.title}</h3>
              <p className="mt-1 text-sm text-white/60">{a.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="fade-up">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">最新说说</h2>
          <Link
            href="/moments"
            className="text-sm text-white/60 transition hover:text-white"
          >
            查看全部 →
          </Link>
        </div>
        <div className="space-y-4">
          {moments.map((m) => (
            <GlassCard key={m.text} className="p-5 transition-all duration-300 hover:scale-[1.02] hover:bg-white/10">
              <p className="text-sm leading-relaxed text-white/90">{m.text}</p>
              <div className="mt-2 text-xs text-white/50">{m.date}</div>
            </GlassCard>
          ))}
        </div>
      </section>
    </div>
  );
}
