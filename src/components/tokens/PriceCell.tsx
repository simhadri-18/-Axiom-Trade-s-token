import { memo, useEffect, useState } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PriceCellProps {
  price: number;
  change?: number;
  className?: string;
}

export const PriceCell = memo(({ price, change, className }: PriceCellProps) => {
  const [flashDirection, setFlashDirection] = useState<'up' | 'down' | null>(null);
  const [prevPrice, setPrevPrice] = useState(price);

  useEffect(() => {
    if (price !== prevPrice) {
      setFlashDirection(price > prevPrice ? 'up' : 'down');
      setPrevPrice(price);

      const timer = setTimeout(() => setFlashDirection(null), 500);
      return () => clearTimeout(timer);
    }
  }, [price, prevPrice]);

  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <div
      className={cn(
        'flex items-center gap-2 transition-all duration-200',
        flashDirection === 'up' && 'animate-price-flash-up',
        flashDirection === 'down' && 'animate-price-flash-down',
        className
      )}
    >
      <span className="font-mono font-medium">
        ${price.toFixed(4)}
      </span>
      {change !== undefined && (
        <span
          className={cn(
            'flex items-center gap-0.5 text-xs font-medium',
            isPositive && 'text-success',
            isNegative && 'text-destructive',
            !isPositive && !isNegative && 'text-muted-foreground'
          )}
        >
          {isPositive && <ArrowUp className="h-3 w-3" />}
          {isNegative && <ArrowDown className="h-3 w-3" />}
          {Math.abs(change).toFixed(2)}%
        </span>
      )}
    </div>
  );
});

PriceCell.displayName = 'PriceCell';
