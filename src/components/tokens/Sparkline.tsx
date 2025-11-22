import React from "react";

interface SparklineProps {
  data: number[];
  color: string; // pass green/red from TokenRow
}

export default function Sparkline({ data, color }: SparklineProps) {
  if (!data || data.length === 0) return null;

  // 1. Reduce data points to remove noise
  const simplified = data.filter((_, i) => i % 2 === 0);

  const max = Math.max(...simplified);
  const min = Math.min(...simplified);

  const normalize = (val: number) =>
    ((val - min) / (max - min)) * 30 + 5; // height smoothing

  const points = simplified.map((v, i) => `${i * 6},${40 - normalize(v)}`);

  // 2. Catmull–Rom → Cubic Bézier interpolation (smooth curve)
  const catmullRom2bezier = (pts: string[]) => {
    const coords = pts.map((p) => p.split(",").map(Number));
    let d = `M ${coords[0][0]},${coords[0][1]}`;

    for (let i = 0; i < coords.length - 1; i++) {
      const p0 = coords[i - 1] || coords[i];
      const p1 = coords[i];
      const p2 = coords[i + 1];
      const p3 = coords[i + 2] || p2;

      const cp1x = p1[0] + (p2[0] - p0[0]) / 6;
      const cp1y = p1[1] + (p2[1] - p0[1]) / 6;

      const cp2x = p2[0] - (p3[0] - p1[0]) / 6;
      const cp2y = p2[1] - (p3[1] - p1[1]) / 6;

      d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2[0]},${p2[1]}`;
    }
    return d;
  };

  const pathData = catmullRom2bezier(points);

  return (
    <svg width="120" height="40">
      <path
        d={pathData}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
