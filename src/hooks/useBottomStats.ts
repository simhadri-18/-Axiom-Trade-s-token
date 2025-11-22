// src/hooks/useBottomStats.ts
import { useEffect, useMemo, useState } from "react";

export type BottomStats = {
  preset: string;
  walletUSD: number;     // total wallet value in USD
  selectedTokenUSD: number; // price of selected token in USD
  ethUSD: number;        // ETH price
  pnlUSD: number;        // current PnL (mock)
  connection: "stable" | "unstable" | "offline";
  locale: string;
};

const rnd = (v: number, pct = 0.01) =>
  Math.max(0, v * (1 + (Math.random() - 0.5) * pct * 2));

export function useBottomStats(initial?: Partial<BottomStats>) {
  const [preset] = useState(initial?.preset ?? "PRESET 1");
  const [walletUSD, setWalletUSD] = useState(initial?.walletUSD ?? 84600);
  const [selectedTokenUSD, setSelectedTokenUSD] = useState(
    initial?.selectedTokenUSD ?? 2754
  );
  const [ethUSD, setEthUSD] = useState(initial?.ethUSD ?? 127.8);
  const [pnlUSD, setPnlUSD] = useState(initial?.pnlUSD ?? 125.98);
  const [connection, setConnection] = useState<
    BottomStats["connection"]
  >(initial?.connection ?? "stable");
  const locale = useMemo(() => initial?.locale ?? "GLOBAL", [initial?.locale]);

  useEffect(() => {
    // update loop: every 800-1800ms simulate a tick
    let mounted = true;
    function tick() {
      if (!mounted) return;

      // small random walk changes
      setWalletUSD((s) => rnd(s, 0.01));
      setSelectedTokenUSD((s) => rnd(s, 0.02));
      setEthUSD((s) => rnd(s, 0.01));
      setPnlUSD((s) => rnd(s, 0.025));

      // occasionally toggle connection states (very rarely)
      if (Math.random() < 0.005) {
        setConnection((c) => (c === "stable" ? "unstable" : "stable"));
      }
      // very rarely go offline and return
      if (Math.random() < 0.002) {
        setConnection("offline");
        setTimeout(() => {
          if (!mounted) return;
          setConnection("stable");
        }, 3000 + Math.random() * 4000);
      }

      const next = 800 + Math.random() * 1000;
      timer = window.setTimeout(tick, next);
    }

    let timer = window.setTimeout(tick, 600);
    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, []);

  // helpers
  const formatUSD = (v: number) =>
    v >= 1000 ? `$${(v / 1000).toFixed(2)}K` : `$${v.toFixed(2)}`;

  return {
    preset,
    walletUSD,
    selectedTokenUSD,
    ethUSD,
    pnlUSD,
    connection,
    locale,
    formatUSD,
  };
}
