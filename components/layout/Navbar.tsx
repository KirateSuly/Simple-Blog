"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";

const links = [
  { href: "/", label: "首页" },
  { href: "/projects", label: "项目" },
  { href: "/articles", label: "文章" },
  { href: "/moments", label: "说说" },
  { href: "/music", label: "音乐" },
  { href: "/gallery", label: "照片墙" },
  { href: "/essays", label: "杂谈" },
  { href: "/about", label: "关于" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const linkClass = (href: string) => {
    const active = pathname === href;
    return `rounded-xl px-3 py-2 text-sm transition ${
      active
        ? "bg-white/15 font-semibold text-white"
        : "text-white/70 hover:bg-white/10 hover:text-white"
    }`;
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="glass-strong mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3 sm:px-6">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="bg-gradient-to-r from-[#c7bfff] to-[#ffd3ea] bg-clip-text text-lg font-bold tracking-wide text-transparent"
        >
          {site.name}
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={linkClass(l.href)}>
              {l.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          aria-label="打开菜单"
          onClick={() => setOpen((v) => !v)}
          className="rounded-xl p-2 text-white/80 transition hover:bg-white/10 lg:hidden"
        >
          {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="glass-strong mx-auto mt-2 grid max-w-6xl grid-cols-2 gap-1 rounded-2xl p-3 lg:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={linkClass(l.href)}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
