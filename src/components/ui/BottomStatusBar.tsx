import { useEffect, useState } from "react";

export default function BottomStatusBar() {
  const [wallet, setWallet] = useState(0);
  const [tokenValue, setTokenValue] = useState(0);
  const [ethValue, setEthValue] = useState(0);
  const [pnl, setPnl] = useState(0);

  // Fake live updates every 3s
  useEffect(() => {
    const t = setInterval(() => {
      setWallet(70000 + Math.random() * 5000);
      setTokenValue(2000 + Math.random() * 200);
      setEthValue(120 + Math.random() * 20);
      setPnl(100 + Math.random() * 50);
    }, 3000);

    return () => clearInterval(t);
  }, []);

  const fmt = (n: number) => `$${n.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0c0c0e] border-t border-[#1f1f23] text-gray-300 px-4 py-2 flex items-center justify-between z-50">

      {/* LEFT SECTION */}
      <div className="flex items-center gap-5">

        <button className="text-xs px-3 py-1 bg-blue-700/30 text-blue-400 rounded">
          PRESET 1
        </button>

        <div className="flex items-center gap-2">
          <span className="text-gray-400">Wallet</span>
          <span className="text-white">{fmt(wallet)}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-gray-400">Token</span>
          <span className="text-white">{fmt(tokenValue)}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-gray-400">ETH</span>
          <span className="text-white">{fmt(ethValue)}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-gray-400">PnL</span>
          <span className="text-emerald-400">{fmt(pnl)}</span>
        </div>

      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-5">

        <button className="hover:text-white text-gray-400 text-sm">Twitter</button>
        <button className="hover:text-white text-gray-400 text-sm">Discover</button>
        <button className="hover:text-white text-gray-400 text-sm">Pulse</button>

        <div className="px-3 py-1 bg-emerald-700/30 text-emerald-400 rounded text-xs">
          ● Connection is stable
        </div>

        <div className="text-gray-400 text-sm">GLOBAL ▼</div>
        <div className="text-gray-400 text-sm">Docs</div>

      </div>
    </div>
  );
}
