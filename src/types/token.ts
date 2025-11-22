export type TokenStatus = "trending" | "surge" | "dex" | "pump";

export interface Token {
  id: string;
  symbol: string;
  name: string;

  price: number;
  priceChange24h: number;
  priceChange1h: number;

  marketCap: number;
  liquidity: number;
  volume24h: number;

  txns: number;
  txnsBuy: number;
  txnsSell: number;

  buyTax: number;
  sellTax: number;

  contractAge: number;

  priceHistory: number[];

  tokenInfo24h: number;
  tokenInfo1h: number;

  holders: number;
  topHoldersPercent: number;

  paidStatus: "Paid" | "Unpaid";

  /** ADD THIS LINE → flash is optional */
  flash?: "up" | "down" | null;
}
