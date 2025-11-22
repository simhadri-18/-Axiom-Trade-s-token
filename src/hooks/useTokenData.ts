import { useQuery } from "@tanstack/react-query";
import { Token, TokenStatus } from "@/types/token";

const generateMockTokens = (count: number, status: TokenStatus): Token[] => {
  const tokens: Token[] = [];
  const symbols = ["PEPE", "SHIB", "DOGE", "WIF", "BONK", "FLOKI", "CHAD", "WOJAK"];

  for (let i = 0; i < count; i++) {
    const symbol = symbols[Math.floor(Math.random() * symbols.length)] + Math.floor(Math.random() * 999);
    const basePrice = Math.random() * 10;

    const marketCapChange = (Math.random() - 0.5) * 200;

    tokens.push({
      id: `${status}-${i}`,
      symbol,
      name: `${symbol} Token`,
      price: basePrice,
      priceChange24h: marketCapChange,
      priceChange1h: (Math.random() - 0.5) * 50,
      marketCap: Math.random() * 1_000_000,
      liquidity: Math.random() * 500_000,
      volume24h: Math.random() * 50_000,
      txns: Math.floor(Math.random() * 5000),
      txnsBuy: Math.floor(Math.random() * 2000),
      txnsSell: Math.floor(Math.random() * 2000),

      holders: Math.floor(Math.random() * 50000),
      buyTax: Math.floor(Math.random() * 10),
      sellTax: Math.floor(Math.random() * 10),

      contractAge: Math.floor(Math.random() * 500),

      priceHistory: Array.from({ length: 40 }, () => basePrice * (0.9 + Math.random() * 0.2)),

      tokenInfo24h: (Math.random() - 0.5) * 50,
      tokenInfo1h: (Math.random() - 0.5) * 8,
      topHoldersPercent: Math.floor(Math.random() * 60) + 20,
      paidStatus: Math.random() > 0.5 ? "Paid" : "Unpaid",
    });
  }
  return tokens;
};

export const useTokenData = (status: TokenStatus) => {
  return useQuery({
    queryKey: ["tokens", status],
    queryFn: async () => {
      await new Promise((res) => setTimeout(res, 200));
      return generateMockTokens(20, status);
    },
    staleTime: 4000,
    refetchInterval: 4000, // ⏱ refresh every 2.5 seconds
  });
};
