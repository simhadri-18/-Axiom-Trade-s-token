import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContractAgeDisplayProps {
  ageInHours: number;
  className?: string;
}

export const ContractAgeDisplay = ({ ageInHours, className }: ContractAgeDisplayProps) => {
  const formatAge = () => {
    if (ageInHours < 1) return `${Math.floor(ageInHours * 60)}m`;
    if (ageInHours < 24) return `${Math.floor(ageInHours)}h`;
    const days = Math.floor(ageInHours / 24);
    return `${days}d`;
  };

  const isNew = ageInHours < 24;

  return (
    <div
      className={cn(
        'flex items-center gap-1.5 text-xs font-medium',
        isNew ? 'text-primary' : 'text-muted-foreground',
        className
      )}
    >
      <Clock className="h-3 w-3" />
      <span>{formatAge()}</span>
      {isNew && (
        <span className="px-1.5 py-0.5 rounded text-[10px] bg-primary/20 text-primary font-bold">
          NEW
        </span>
      )}
    </div>
  );
};
