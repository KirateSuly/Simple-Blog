import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import GlassCard from "@/components/ui/GlassCard";
import { ChevronLeft } from "@/components/ui/icons";
import { articles } from "@/lib/articles";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.id === slug);
  return {
    title: article ? `${article.title} · 文章` : "文章",
    description: article?.excerpt,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.id === slug);
  if (!article) notFound();

  const idx = articles.findIndex((a) => a.id === article.id);
  const prev = articles[idx - 1];
  const next = articles[idx + 1];

  return (
    <div className="space-y-6">
      {/* 返回 */}
      <Link
        href="/articles"
        className="fade-up inline-flex items-center gap-1 text-sm text-white/60 transition hover:text-white"
      >
        <ChevronLeft className="h-4 w-4" />
        返回文章列表
      </Link>

      {/* 封面横幅 */}
      <div className="glass-strong fade-up card-float relative overflow-hidden rounded-3xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={article.cover}
          alt={article.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/20" />
        <div className="relative flex min-h-[300px] flex-col justify-end p-6 sm:min-h-[380px] sm:p-8">
          <div className="flex flex-wrap gap-2">
            {article.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-[#8b7cff]/40 bg-[#8b7cff]/25 px-3 py-1 text-xs font-semibold text-[#d6d0ff] backdrop-blur"
              >
                {t}
              </span>
            ))}
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-snug text-white sm:text-4xl">
            {article.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-white/70">
            <span>{article.date}</span>
            <span className="text-white/30">·</span>
            <span>{article.readingTime}</span>
            <span className="text-white/30">·</span>
            <span>阅读 128</span>
          </div>
        </div>
      </div>

      {/* 正文 */}
      <GlassCard className="fade-up card-float p-6 sm:p-10">
        <div className="mx-auto max-w-2xl space-y-5">
          <p className="text-lg font-semibold leading-7 text-white/90">
            {article.excerpt}
          </p>
          <div className="h-px w-full bg-white/10" />
          {article.content.map((p, i) => (
            <p key={i} className="text-[15px] leading-7 text-white/75">
              {p}
            </p>
          ))}
        </div>
      </GlassCard>

      {/* 上 / 下一篇（限宽，不铺满） */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch sm:justify-between">
        {prev ? (
          <Link
            href={`/articles/${prev.id}`}
            className="glass fade-up card-float group min-w-0 flex-1 rounded-2xl p-5 hover:bg-white/10 sm:max-w-sm"
          >
            <div className="text-xs text-white/50">← 上一篇</div>
            <div className="mt-1 line-clamp-1 font-semibold text-white/90 transition-colors group-hover:text-[#c7bfff]">
              {prev.title}
            </div>
          </Link>
        ) : (
          <div className="hidden sm:block" />
        )}
        {next ? (
          <Link
            href={`/articles/${next.id}`}
            className="glass fade-up card-float group min-w-0 flex-1 rounded-2xl p-5 text-right hover:bg-white/10 sm:max-w-sm"
          >
            <div className="text-xs text-white/50">下一篇 →</div>
            <div className="mt-1 line-clamp-1 font-semibold text-white/90 transition-colors group-hover:text-[#c7bfff]">
              {next.title}
            </div>
          </Link>
        ) : (
          <div className="hidden sm:block" />
        )}
      </div>
    </div>
  );
}
