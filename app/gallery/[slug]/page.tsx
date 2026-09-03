import { notFound } from "next/navigation";
import Link from "next/link";
import AlbumView from "@/components/gallery/AlbumView";
import { ChevronLeft } from "@/components/ui/icons";
import { albums } from "@/lib/gallery";

export function generateStaticParams() {
  return albums.map((a) => ({ slug: a.id }));
}

export default async function AlbumPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const album = albums.find((a) => a.id === slug);
  if (!album) notFound();

  return (
    <div>
      <Link
        href="/gallery"
        className="fade-up inline-flex items-center gap-1 text-sm text-white/60 transition hover:text-white"
      >
        <ChevronLeft className="h-4 w-4" /> 返回照片墙
      </Link>

      <div className="fade-up mt-5 mb-8 flex items-center gap-4">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">
          {album.name}
        </h1>
        <span className="rounded-full bg-[#8b7cff]/20 px-3 py-1 text-xs text-[#c7bfff]">
          {album.photos.length} 张
        </span>
        <span className="hidden text-sm text-white/50 sm:inline">
          {album.description}
        </span>
      </div>

      <AlbumView album={album} />
    </div>
  );
}
