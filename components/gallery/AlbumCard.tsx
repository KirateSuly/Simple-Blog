import Link from "next/link";
import type { Album } from "@/lib/gallery";

export default function AlbumCard({ album }: { album: Album }) {
  const cover = album.photos[0];
  const behind = album.photos.slice(1, 3); // 最多两张露边

  const polaroid = (src: string, alt: string, cls: string) => (
    // 内部 div 负责旋转/位移（悬停扇形展开），包装负责居中
    <div
      className={`h-full w-full overflow-hidden bg-white p-1.5 pb-6 shadow-xl transition-all duration-500 ${cls}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    </div>
  );

  return (
    <Link href={`/gallery/${album.id}`} className="group block h-full">
      <div className="flex h-full flex-col items-center">
        {/* 照片堆 */}
        <div className="relative mx-auto mt-3 h-72 w-80">
          {/* 背后 · 左上露边 → 悬停向左展开 */}
          {behind[0] && (
            <div className="absolute left-1/2 top-1/2 z-10 h-52 w-60 -translate-x-1/2 -translate-y-1/2">
              {polaroid(
                behind[0].src,
                behind[0].title ?? "",
                "-translate-x-3 -translate-y-2 -rotate-6 group-hover:-translate-x-10 group-hover:-translate-y-3 group-hover:-rotate-10"
              )}
            </div>
          )}
          {/* 背后 · 右上露边 → 悬停向右展开 */}
          {behind[1] && (
            <div className="absolute left-1/2 top-1/2 z-10 h-52 w-60 -translate-x-1/2 -translate-y-1/2">
              {polaroid(
                behind[1].src,
                behind[1].title ?? "",
                "translate-x-3 -translate-y-2 rotate-6 group-hover:translate-x-14 group-hover:-translate-y-3 group-hover:rotate-20"
              )}
            </div>
          )}
          {/* 封面（置顶照片） */}
          <div className="absolute left-1/2 top-1/2 z-30 h-56 w-64 -translate-x-1/2 -translate-y-1/2">
            <div className="relative h-full w-full overflow-hidden bg-white p-1.5 pb-6 shadow-2xl transition-all duration-500 -rotate-2 group-hover:-translate-y-4 group-hover:rotate-0 group-hover:scale-105">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cover.src}
                alt={cover.title ?? album.name}
                className="h-full w-full object-cover"
              />
              {/* 悬停遮罩：张数 + Click to Open */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/45 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="text-lg font-bold text-white">
                  {album.photos.length} 张照片
                </span>
                <span className="mt-1 text-sm text-white/80">Click to Open</span>
              </div>
            </div>
          </div>
        </div>

        {/* 名称 + 数量 */}
        <div className="mt-6 text-center">
          <h3 className="text-lg font-bold text-white">{album.name}</h3>
          <p className="mt-1 text-xs text-white/50">
            {album.description} · {album.photos.length} 张
          </p>
        </div>
      </div>
    </Link>
  );
}
