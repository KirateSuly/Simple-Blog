import { site } from "@/lib/site";

export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {site.backgroundImage ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={site.backgroundImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* 半透明深色遮罩，保证玻璃卡片与文字可读 */}
          <div className="absolute inset-0 bg-[#0b0b14]/75" />
        </>
      ) : (
        <div className="absolute inset-0 bg-[#0b0b14]" />
      )}
      <div className="blob absolute -left-24 -top-24 h-96 w-96 rounded-full bg-[#8b7cff]/30 blur-3xl" />
      <div className="blob2 absolute -right-24 top-1/3 h-[28rem] w-[28rem] rounded-full bg-[#ff7cc0]/20 blur-3xl" />
      <div className="blob3 absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-[#3ec6ff]/20 blur-3xl" />
      <div className="noise absolute inset-0 opacity-[0.04]" />
    </div>
  );
}
