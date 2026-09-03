import PageHeader from "@/components/ui/PageHeader";
import ProjectCard from "@/components/projects/ProjectCard";
import { projects } from "@/lib/projects";

export default function ProjectsPage() {
  return (
    <div>
      <PageHeader title="项目" subtitle="我做过与正在做的作品" center />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.name} p={p} />
        ))}
      </div>

      <a
        href="https://github.com/KirateSuly"
        target="_blank"
        rel="noreferrer"
        className="fade-up mt-8 inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
      >
        更多项目访问 GitHub →
      </a>
    </div>
  );
}
