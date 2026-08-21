import GlassCard from "@/components/ui/GlassCard";

export default function PagePlaceholder({
  title,
  desc,
}: {
  title: string;
  desc?: string;
}) {
  return (
    <GlassCard strong className="fade-up px-6 py-20 text-center">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="mt-3 text-white/60">
        {desc ?? "这个页面正在建设中，将在后续阶段实现。"}
      </p>
    </GlassCard>
  );
}
