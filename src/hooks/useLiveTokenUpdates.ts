import { useEffect, useRef } from "react";
import { Token } from "@/types/token";

export function useLiveTokenUpdates(
  tokens: Token[] | undefined,
  onUpdate: (updated: Token[]) => void
) {
  const intervalRef = useRef<number | NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!tokens) return;

    // clear previous if any
    if (intervalRef.current) {
      clearInterval(intervalRef.current as number);
      intervalRef.current = null;
    }

    intervalRef.current = setInterval(() => {
      const updated = tokens.map((t) => {
        // small trend + noise
        const trend = (Math.random() - 0.5) * 0.012; // direction drift
        const noise = (Math.random() - 0.5) * 0.006;

        const newPrice = Number((t.price * (1 + trend + noise)).toFixed(6));

        // push new history and keep length 40
        const newHistory = [...t.priceHistory, newPrice];
        if (newHistory.length > 40) newHistory.shift();

        const flashVal = newPrice > t.price ? "up" : newPrice < t.price ? "down" : null;

        // TXNS update: realistic variability
        const total = Math.max(
          10,
          Math.floor(t.txns * (1 + (Math.random() - 0.5) * 0.2)) +
            Math.floor(Math.random() * 200 - 50)
        );
        const buys = Math.floor(total * (0.55 + Math.random() * 0.25));
        const sells = Math.max(0, total - buys);

        // token info drift
        const tokenInfo24h = Number((t.tokenInfo24h + (Math.random() - 0.5) * 0.5).toFixed(2));
        const tokenInfo1h = Number((t.tokenInfo1h + (Math.random() - 0.5) * 0.2).toFixed(2));
        const paidStatus = Math.random() > 0.995 ? (t.paidStatus === "Paid" ? "Unpaid" : "Paid") : t.paidStatus;

        return {
          ...t,
          price: newPrice,
          priceHistory: newHistory,
          flash: flashVal,
          txns: total,
          txnsBuy: buys,
          txnsSell: sells,
          marketCap: Number((t.marketCap * (1 + trend)).toFixed(2)),
          liquidity: Number((t.liquidity * (1 + (Math.random() - 0.5) * 0.02)).toFixed(2)),
          tokenInfo24h,
          tokenInfo1h,
          paidStatus,
        } as Token;
      });

      onUpdate(updated as Token[]);
    }, 900); // ~1s updates

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current as number);
    };
  }, [tokens, onUpdate]);
}
