import { Card } from '@/components/ui/card';

export const TokenTableSkeleton = () => {
  return (
    <Card className="glass overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                <th key={i} className="px-4 py-3 text-left">
                  <div className="h-4 w-20 bg-muted shimmer rounded" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(10)].map((_, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b border-border/50 hover:bg-secondary/30 transition-colors"
              >
                {[...Array(10)].map((_, colIndex) => (
                  <td key={colIndex} className="px-4 py-4">
                    <div className={`h-4 bg-muted shimmer rounded ${
                      colIndex === 0 ? 'w-24' : 
                      colIndex === 1 ? 'w-12' : 
                      colIndex === 2 ? 'w-20' : 'w-16'
                    }`} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
