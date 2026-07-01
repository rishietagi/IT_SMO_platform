import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";

/** A single-value radial progress ring (replaces the hand-drawn SVG donut). */
export function Donut({
  value,
  color = "#00338D",
  size = 120,
  track = "#E9EDF3",
  children,
}: {
  value: number;
  color?: string;
  size?: number;
  track?: string;
  children?: React.ReactNode;
}) {
  const data = [{ name: "v", value: Math.max(0, Math.min(100, value)), fill: color }];
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <RadialBarChart
        width={size}
        height={size}
        cx="50%"
        cy="50%"
        innerRadius="72%"
        outerRadius="100%"
        barSize={10}
        data={data}
        startAngle={90}
        endAngle={-270}
      >
        <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
        <RadialBar background={{ fill: track }} dataKey="value" cornerRadius={8} />
      </RadialBarChart>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
}
