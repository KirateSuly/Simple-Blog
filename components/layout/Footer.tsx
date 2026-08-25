import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-8 sm:px-6">
      <div className="glass rounded-2xl px-6 py-4 text-center text-sm text-white/60">
        © {new Date().getFullYear()} {site.name} · 由 Next.js 15 + React 19 +
        Tailwind CSS 4 驱动
      </div>
    </footer>
  );
}
