import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import GlassCard from "@/components/ui/GlassCard";
import ProfileCard from "@/components/essays/ProfileCard";
import Calendar from "@/components/essays/Calendar";
import RecentRecords from "@/components/essays/RecentRecords";
import { ChevronLeft } from "@/components/ui/icons";
import { essays } from "@/lib/essays";

export function generateStaticParams() {
  return essays.map((e) => ({ slug: e.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const essay = essays.find((e) => e.id === slug);
  return {
    title: essay ? `${essay.title} · 杂谈` : "杂谈",
    description: essay?.excerpt,
  };
}

export default async function EssayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const essay = essays.find((e) => e.id === slug);
  if (!essay) notFound();

  return (
    <div className="grid gap-6 lg:grid-cols-[5fr_2fr]">
      {/* 主内容 */}
      <div className="space-y-6">
        <GlassCard strong className="card-float overflow-hidden rounded-3xl">
          <div className="relative h-64 overflow-hidden sm:h-80">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={essay.cover}
              alt={essay.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </div>
          <div className="p-6 sm:p-8">
            <Link
              href="/essays"
              className="inline-flex items-center gap-1 text-sm text-white/60 transition hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" /> 返回上一级
            </Link>
            <h1 className="mt-4 text-2xl font-bold leading-snug text-white sm:text-4xl">
              {essay.title}
            </h1>

            {/* 元信息 */}
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded-full bg-white/10 px-3 py-1 text-white/70">
                🕒 {essay.date}
              </span>
              <span className="rounded-full bg-[#ff7cc0]/15 px-3 py-1 text-[#ffd3ea]">
                ✦ 心情：{essay.mood}
              </span>
              {essay.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/70"
                >
                  #{t}
                </span>
              ))}
            </div>

            {/* 正文 */}
            <div className="mt-6 space-y-5 border-t border-white/10 pt-6">
              {essay.content.map((block, i) =>
                block.type === "heading" ? (
                  <h2 key={i} className="text-xl font-bold text-white">
                    {block.text}
                  </h2>
                ) : (
                  <p
                    key={i}
                    className="text-[15px] leading-7 text-white/75"
                  >
                    {block.text}
                  </p>
                )
              )}
            </div>
          </div>
        </GlassCard>
      </div>

      {/* 侧栏 */}
      <div className="space-y-6">
        <ProfileCard />
        <Calendar />
        <RecentRecords />
      </div>
    </div>
  );
}
