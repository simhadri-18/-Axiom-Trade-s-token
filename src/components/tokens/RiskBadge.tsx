import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Shield, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface RiskBadgeProps {
  lpLocked: number;
  isHoneypot: boolean;
  buyTax: number;
  sellTax: number;
  className?: string;
}

export const RiskBadge = ({ lpLocked, isHoneypot, buyTax, sellTax, className }: RiskBadgeProps) => {
  const getRiskLevel = () => {
    if (isHoneypot) return 'high';
    if (lpLocked < 50 || buyTax > 5 || sellTax > 5) return 'medium';
    if (lpLocked >= 80 && buyTax <= 2 && sellTax <= 2) return 'low';
    return 'medium';
  };

  const riskLevel = getRiskLevel();

  const riskConfig = {
    low: {
      icon: ShieldCheck,
      label: 'Low Risk',
      className: 'bg-success/10 text-success border-success/30',
    },
    medium: {
      icon: Shield,
      label: 'Medium Risk',
      className: 'bg-warning/10 text-warning border-warning/30',
    },
    high: {
      icon: AlertTriangle,
      label: 'High Risk',
      className: 'bg-destructive/10 text-destructive border-destructive/30',
    },
  };

  const config = riskConfig[riskLevel];
  const Icon = config.icon;

  const getRiskDetails = () => {
    const issues = [];
    if (isHoneypot) issues.push('Possible honeypot detected');
    if (lpLocked < 50) issues.push(`LP only ${lpLocked}% locked`);
    if (buyTax > 5) issues.push(`High buy tax: ${buyTax}%`);
    if (sellTax > 5) issues.push(`High sell tax: ${sellTax}%`);
    
    if (issues.length === 0) {
      return `✓ LP ${lpLocked}% locked\n✓ Buy tax: ${buyTax}%\n✓ Sell tax: ${sellTax}%`;
    }
    
    return issues.join('\n');
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Badge
            variant="outline"
            className={cn(
              'font-semibold text-xs flex items-center gap-1',
              config.className,
              className
            )}
          >
            <Icon className="h-3 w-3" />
            {config.label}
          </Badge>
        </TooltipTrigger>
        <TooltipContent className="whitespace-pre-line max-w-xs">
          <p className="text-xs">{getRiskDetails()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
