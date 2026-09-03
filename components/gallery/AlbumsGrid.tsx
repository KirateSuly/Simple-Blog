import AlbumCard from "@/components/gallery/AlbumCard";
import { albums } from "@/lib/gallery";

// 相册从左到右排列，大小一致
export default function AlbumsGrid() {
  return (
    <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {albums.map((a) => (
        <AlbumCard key={a.id} album={a} />
      ))}
    </div>
  );
}
