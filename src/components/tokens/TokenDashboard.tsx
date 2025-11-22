import { useState } from "react";
import { TokenStatus, Token } from "@/types/token";
import { useTokenData } from "@/hooks/useTokenData";
import { useLiveTokenUpdates } from "@/hooks/useLiveTokenUpdates";
import { TokenTable } from "./TokenTable";
import { TokenTableSkeleton } from "./TokenTableSkeleton";

const tabs: { label: string; value: TokenStatus }[] = [
  { label: "Trending", value: "trending" },
  { label: "Surge", value: "surge" },
  { label: "DEX Screener", value: "dex" },
  { label: "Pump Live", value: "pump" },
];

export default function TokenDashboard() {
  const [status, setStatus] = useState<TokenStatus>("trending");
  const [liveData, setLiveData] = useState<Token[] | null>(null);

  const { data, isLoading, isError, refetch } = useTokenData(status);

  useLiveTokenUpdates(data, (updated) => {
    setLiveData(updated);
  });

  const displayData = liveData || data;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-white">Token Discovery</h1>
      <p className="text-gray-400 mb-6">
        Track and discover trending tokens across multiple chains with real-time updates
      </p>

      {/* NAV TABS */}
      <div className="flex items-center gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setStatus(tab.value)}
            className={`px-4 py-2 rounded-lg text-sm border ${
              status === tab.value
                ? "bg-white text-black border-white"
                : "bg-[#0f0f10] text-gray-300 border-[#1f1f23] hover:bg-[#18181a]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      {isLoading && <TokenTableSkeleton />}

      {isError && (
        <div className="text-center py-16">
          <p className="text-red-500 text-lg font-semibold">Something went wrong</p>
          <p className="text-gray-400 mb-4">Unable to fetch token data</p>

          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200"
          >
            Try Again
          </button>
        </div>
      )}

      {displayData && !isLoading && !isError && (
        <TokenTable tokens={displayData} />
      )}
    </div>
  );
}
