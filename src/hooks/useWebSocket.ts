import { useEffect, useRef, useState } from 'react';
import { PriceUpdate } from '@/types/token';

export const useWebSocket = (tokenIds: string[]) => {
  const [priceUpdates, setPriceUpdates] = useState<Map<string, PriceUpdate>>(new Map());
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Mock WebSocket connection with realistic price updates
    const simulatePriceUpdates = () => {
      tokenIds.forEach((tokenId) => {
        const changePercent = (Math.random() - 0.5) * 0.1; // ±5% change
        const mockUpdate: PriceUpdate = {
          tokenId,
          price: Math.random() * 10, // Random price for demo
          timestamp: new Date(),
          change: changePercent,
        };

        setPriceUpdates((prev) => {
          const newMap = new Map(prev);
          newMap.set(tokenId, mockUpdate);
          return newMap;
        });
      });
    };

    // Update prices every 2-5 seconds
    intervalRef.current = setInterval(simulatePriceUpdates, Math.random() * 3000 + 2000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [tokenIds]);

  return priceUpdates;
};
