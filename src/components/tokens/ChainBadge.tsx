import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ChainBadgeProps {
  chain: 'ETH' | 'BSC' | 'SOL' | 'BASE';
  className?: string;
}

const chainColors = {
  ETH: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  BSC: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
  SOL: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
  BASE: 'bg-primary/10 text-primary border-primary/30',
};

export const ChainBadge = ({ chain, className }: ChainBadgeProps) => {
  return (
    <Badge
      variant="outline"
      className={cn(
        'font-mono text-xs font-semibold',
        chainColors[chain],
        className
      )}
    >
      {chain}
    </Badge>
  );
};
