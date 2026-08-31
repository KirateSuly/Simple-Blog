import Link from "next/link";
import { site } from "@/lib/site";
import GlassCard from "@/components/ui/GlassCard";
import { articles } from "@/lib/articles";
import { moments } from "@/lib/moments";
import { projects } from "@/lib/projects";
import { playlist } from "@/lib/music";

// 与内容数据同步的实际数量统计
const stats = [
  { label: "文章", value: String(articles.length), href: "/articles" },
  { label: "说说", value: String(moments.length), href: "/moments" },
  { label: "项目", value: String(projects.length), href: "/projects" },
  { label: "音乐", value: String(playlist.length), href: "/music" },
];

export default function Hero() {
  return (
    <GlassCard
      strong
      className="flex h-full flex-col justify-center gap-4 px-6 py-6 transition-transform duration-300 hover:scale-[1.02]"
    >
      {/* 头像 + 简介 */}
      <div className="flex items-center gap-5">
        {site.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={site.avatar}
            alt={site.name}
            className="h-20 w-20 shrink-0 rounded-full object-cover ring-4 ring-white/20"
          />
        ) : (
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#8b7cff] to-[#ff7cc0] text-3xl font-bold text-white ring-4 ring-white/20">
            {site.name.slice(0, 1)}
          </div>
        )}
        <div className="min-w-0">
          <h1 className="text-2xl font-bold">{site.name}</h1>
          <p className="mt-0.5 text-sm text-[#ffd3ea]">{site.signature}</p>
          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-white/65">
            {site.bio}
          </p>
        </div>
      </div>

      {/* 社交链接 + 数据统计（并列） */}
      <div className="flex flex-wrap items-center gap-x-35 gap-y-3 border-t border-white/10 pt-4">
        <div className="flex flex-wrap items-center gap-3">
          {site.social.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs text-white/80 transition hover:bg-white/20 hover:text-white"
            >
              {s.label}
            </a>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {stats.map((s) => (
            <Link
              key={s.label}
              href={s.href}
              className="flex items-center gap-2 text-white/60 transition hover:text-white"
            >
              <span className="text-xs">{s.label}</span>
              <span className="bg-gradient-to-r from-[#c7bfff] to-[#ffd3ea] bg-clip-text  text-base font-bold text-transparent">
                {s.value}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
