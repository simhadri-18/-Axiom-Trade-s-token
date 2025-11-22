import { memo } from "react";
import { Token } from "@/types/token";
import Sparkline from "./Sparkline";

export const TokenRow = memo(({ token }: { token: Token }) => {

  const fmtK = (n: number) =>
    n >= 1000 ? `${(n / 1000).toFixed(1)}K` : n.toString();

  // ✔ If marketCap change positive → green else red
  const graphColor = token.priceChange24h >= 0 ? "#22c55e" : "#ef4444";

  return (
    <tr className="border-b border-[#1f1f23] hover:bg-[#111214] transition">

      {/* PAIR INFO */}
      <td className="p-3 w-64">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#111214] border border-[#222227] overflow-hidden">
            <img src="/placeholder.svg" className="w-full h-full" />
          </div>
          <div>
            <div className="text-sm font-medium text-white">{token.name}</div>
            <div className="text-xs text-gray-400">
              {Math.floor(token.contractAge / 24)}d
            </div>
          </div>
        </div>
      </td>

      {/* ✔ GRAPH (WITH COLOR BASED ON MARKET CAP CHANGE) */}
      <td className="p-3">
        <Sparkline data={token.priceHistory} color={graphColor} />
      </td>

      {/* MARKET CAP */}
      <td className="p-3">
        <div className="text-white text-sm">${fmtK(token.marketCap)}</div>
        <div
          className={`text-xs ${
            token.priceChange24h >= 0 ? "text-emerald-400" : "text-red-400"
          }`}
        >
          {token.priceChange24h.toFixed(2)}%
        </div>
      </td>

      {/* LIQUIDITY */}
      <td className="p-3 text-white text-sm">${fmtK(token.liquidity)}</td>

      {/* VOLUME */}
      <td className="p-3 text-white text-sm">${fmtK(token.volume24h)}</td>

      {/* TXNS */}
      <td className="p-3 text-sm">
        <div className="text-white font-medium">{fmtK(token.txns)}</div>
        <div className="flex gap-2 text-xs mt-1">
          <div className="text-emerald-400">{fmtK(token.txnsBuy)}</div>
          <div className="text-red-400">{fmtK(token.txnsSell)}</div>
        </div>
      </td>

      {/* TOKEN INFO */}
      <td className="p-3 text-sm">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <span className="text-red-400 text-xs">
              {token.tokenInfo24h.toFixed(2)}%
            </span>
            <span className="text-emerald-400 text-xs">
              {token.tokenInfo1h.toFixed(2)}%
            </span>
          </div>

          <div className="flex gap-2">
            <span className="text-emerald-400 text-xs">{token.buyTax}%</span>
            <span className="text-red-400 text-xs">{token.sellTax}%</span>
          </div>

          <div className="flex gap-4 text-xs text-gray-300">
            <span>👥 {token.holders}</span>
            <span>🏦 {token.topHoldersPercent}%</span>
          </div>

          <span
            className={`px-2 py-0.5 text-xs rounded-md ${
              token.paidStatus === "Paid"
                ? "text-emerald-400 bg-emerald-900/20"
                : "text-red-400 bg-red-900/20"
            }`}
          >
            {token.paidStatus}
          </span>
        </div>
      </td>

      {/* ACTION */}
      <td className="p-3 text-right">
        <button className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm">
          Buy
        </button>
      </td>
    </tr>
  );
});

TokenRow.displayName = "TokenRow";
