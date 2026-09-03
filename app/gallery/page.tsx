import PageHeader from "@/components/ui/PageHeader";
import AlbumsGrid from "@/components/gallery/AlbumsGrid";

export default function GalleryPage() {
  return (
    <div>
      <PageHeader title="照片墙" subtitle="把时光分成一个个相册" center />
      <AlbumsGrid />
    </div>
  );
}
