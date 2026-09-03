import type { ReactNode } from "react";
import { site } from "@/lib/site";
import { GitHubIcon } from "@/components/ui/icons";

export default function ProfileCard() {
  const icons: Record<string, ReactNode> = {
    GitHub: <GitHubIcon className="h-4 w-4" />,
    Email: <span className="text-xs">✉</span>,
    Bilibili: <span className="text-xs font-bold">B</span>,
  };

  return (
    <div className="glass card-float rounded-3xl p-6 text-center">
      <div className="mx-auto h-20 w-20 overflow-hidden rounded-full ring-2 ring-white/20">
        {site.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={site.avatar}
            alt={site.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#8b7cff] to-[#ff7cc0] text-2xl font-bold text-white">
            {site.name.slice(0, 1)}
          </div>
        )}
      </div>
      <h3 className="mt-3 text-lg font-bold text-white">{site.name}</h3>
      <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-white/60">
        {site.bio}
      </p>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {site.social.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            {icons[s.label] ?? s.label.slice(0, 1)}
          </a>
        ))}
      </div>
    </div>
  );
}
