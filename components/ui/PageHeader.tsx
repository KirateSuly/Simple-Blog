export default function PageHeader({
  title,
  subtitle,
  accent,
}: {
  title: string;
  subtitle: string;
  accent?: string;
}) {
  return (
    <div className="fade-up mb-8">
      <div className="flex items-center gap-4">
        {accent && (
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8b7cff] to-[#ff7cc0] text-2xl font-bold text-white shadow-lg shadow-[#8b7cff]/30">
            {accent}
          </div>
        )}
        <div>
          <h1 className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
            {title}
          </h1>
          <p className="mt-1 text-sm text-white/60">{subtitle}</p>
        </div>
      </div>
      <div className="mt-5 h-px w-full bg-gradient-to-r from-[#8b7cff]/60 via-white/10 to-transparent" />
    </div>
  );
}
