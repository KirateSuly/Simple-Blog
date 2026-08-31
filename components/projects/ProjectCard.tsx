import { GitHubIcon } from "@/components/ui/icons";
import GlassCard from "@/components/ui/GlassCard";
import type { Project } from "@/lib/projects";

const languageColor: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Python: "#3572A5",
  Go: "#00ADD8",
  Rust: "#dea584",
  Vue: "#41b883",
};

export default function ProjectCard({ p }: { p: Project }) {
  const color = p.language ? languageColor[p.language] ?? "#8b7cff" : "#8b7cff";

  return (
    <GlassCard className="card-float group flex h-full flex-col p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-bold text-white transition-colors group-hover:text-[#c7bfff]">
            {p.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-white/60">
            {p.description}
          </p>
        </div>
        <a
          href={p.url}
          target="_blank"
          rel="noreferrer"
          aria-label={`访问 GitHub ${p.name}`}
          className="shrink-0 rounded-full border border-white/15 bg-white/5 p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
        >
          <GitHubIcon className="h-5 w-5" />
        </a>
      </div>

      {/* 语言 / Star / Fork / 更新时间 */}
      <div className="mt-4 flex items-center gap-4 text-xs text-white/55">
        {p.language && (
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />
            {p.language}
          </span>
        )}
        <span>⭐ {p.stars}</span>
        <span>⑂ {p.forks}</span>
        <span className="ml-auto">{p.updated}</span>
      </div>

      {/* 主题标签 */}
      {p.topics.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {p.topics.map((t) => (
            <span
              key={t}
              className="rounded-full border border-[#8b7cff]/30 bg-[#8b7cff]/15 px-2.5 py-0.5 text-xs text-[#c7bfff]"
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </GlassCard>
  );
}
