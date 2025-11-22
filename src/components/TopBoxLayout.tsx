import BottomStatusBar from "./ui/BottomStatusBar";

export default function TopBoxLayout({ active, onChange, children }: any) {
  return (
    <div className="w-full min-h-screen bg-[#0b0b0c] text-white">
      {/* Top Navigation */}
      <div className="w-full flex items-center gap-6 px-6 py-4 border-b border-[#1f1f23]">
        <button
          onClick={() => onChange("trending")}
          className={active === "trending" ? "text-white font-semibold" : "text-gray-400"}
        >
          Trending
        </button>

        <button
          onClick={() => onChange("surge")}
          className={active === "surge" ? "text-white font-semibold" : "text-gray-400"}
        >
          Surge
        </button>

        <button
          onClick={() => onChange("dex")}
          className={active === "dex" ? "text-white font-semibold" : "text-gray-400"}
        >
          DEX Screener
        </button>

        <button
          onClick={() => onChange("pump")}
          className={active === "pump" ? "text-white font-semibold" : "text-gray-400"}
        >
          Pump Live ▾
        </button>
      </div>

      {/* Page Content */}
      <div className="px-6 py-6">{children}</div>

      {/* 🔥 Bottom Axiom Status Bar */}
      <BottomStatusBar />
    </div>
  );
}
