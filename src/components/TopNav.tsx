import { useState } from "react";
import { ChevronDown, SlidersHorizontal, Star, EyeOff, LayoutGrid } from "lucide-react";

export default function TopNav() {
  const [activeTab, setActiveTab] = useState("Trending");
  const [timeframe, setTimeframe] = useState("1h");
  const [preset, setPreset] = useState("P1");

  const tabs = ["Trending", "Surge", "DEX Screener", "Pump Live"];
  const times = ["1m", "5m", "30m", "1h"];
  const presets = ["P1", "P2", "P3"];

  return (
    <div className="w-full flex items-center justify-between py-3">

      {/* LEFT SIDE – TABS */}
      <div className="flex items-center gap-6 text-gray-300">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`text-sm transition ${
              activeTab === t ? "text-white font-semibold" : "hover:text-white"
            }`}
          >
            {t}
          </button>
        ))}

        {/* Timeframes */}
        <div className="flex items-center gap-3 ml-4">
          {times.map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`text-xs ${
                timeframe === t
                  ? "text-blue-400"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Filter */}
        <button className="ml-4 flex items-center gap-1 bg-[#16171a] px-3 py-1.5 rounded-lg border border-[#202225] text-sm text-gray-300 hover:bg-[#222325]">
          <SlidersHorizontal size={14} />
          Filter
          <ChevronDown size={14} />
        </button>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">

        <Star size={16} className="text-gray-400 hover:text-white cursor-pointer" />
        <EyeOff size={16} className="text-gray-400 hover:text-white cursor-pointer" />
        <LayoutGrid size={16} className="text-gray-400 hover:text-white cursor-pointer" />

        {/* Quick Buy */}
        <button className="bg-[#16171a] px-3 py-1.5 rounded-lg border border-[#202225] text-sm text-gray-300 hover:bg-[#222325] flex items-center gap-1">
          Quick Buy
          <ChevronDown size={14} />
        </button>

        {/* Presets */}
        <div className="flex items-center gap-2">
          {presets.map((p) => (
            <button
              key={p}
              onClick={() => setPreset(p)}
              className={`px-2 py-1 text-xs rounded-md border ${
                preset === p
                  ? "border-blue-500 text-blue-400"
                  : "border-[#1e1f22] text-gray-400 hover:text-white"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}
