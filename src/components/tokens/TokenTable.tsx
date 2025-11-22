import { memo } from "react";
import { Token } from "@/types/token";
import { TokenRow } from "./TokenRow";

export const TokenTable = memo(({ tokens }: { tokens: Token[] }) => {
  return (
    <div className="w-full">
      <div className="bg-[#141417] border border-[#1f1f23] rounded-xl overflow-hidden">
        <table className="w-full table-fixed">
          <thead className="bg-[#111113] text-gray-400 text-sm">
            <tr>
              <th className="p-3 text-left w-64">Pair Info</th>
              <th className="p-3 text-left">Graph</th>
              <th className="p-3 text-left">Market Cap</th>
              <th className="p-3 text-left">Liquidity</th>
              <th className="p-3 text-left">Volume</th>
              <th className="p-3 text-left">TXNS</th>
              <th className="p-3 text-left">Token Info</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {tokens.map((token) => (
              <TokenRow key={token.id} token={token} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

TokenTable.displayName = "TokenTable";
