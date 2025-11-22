import TopBoxLayout from "@/components/TopBoxLayout";
import { useState } from "react";
import { useTokenData } from "@/hooks/useTokenData";
import { TokenTable } from "@/components/tokens/TokenTable";

export default function IndexPage() {
  const [status, setStatus] = useState<"trending" | "surge" | "dex" | "pump">(
    "trending"
  );

  const { data: tokens, isLoading } = useTokenData(status);

  return (
    <TopBoxLayout active={status} onChange={setStatus}>
      {isLoading ? (
        <div className="p-6 text-gray-400">Loading...</div>
      ) : (
        <TokenTable tokens={tokens ?? []} />
      )}
    </TopBoxLayout>
  );
}
