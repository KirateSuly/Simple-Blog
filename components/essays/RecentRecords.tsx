const records = [
  { title: "音乐板块完成", date: "2026-04-04" },
  { title: "实现整套 UI 为最终上线准备", date: "2026-04-10" },
  { title: "归档规组重建", date: "2026-04-15" },
];

export default function RecentRecords() {
  return (
    <div className="glass card-float rounded-3xl p-5">
      <h3 className="text-sm font-bold text-white">RECENT RECORDS</h3>
      <div className="mt-3 divide-y divide-white/10">
        {records.map((r) => (
          <div key={r.title} className="py-2.5">
            <div className="text-sm text-white/85">{r.title}</div>
            <div className="mt-0.5 text-xs text-white/45">{r.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
