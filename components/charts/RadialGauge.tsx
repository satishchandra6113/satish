import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';

interface RadialGaugeProps {
  value: number;
  maxValue: number;
  label: string;
  color?: string;
  height?: number;
}

export function RadialGauge({ value, maxValue, label, color = '#00FF66', height = 200 }: RadialGaugeProps) {
  const percentage = (value / maxValue) * 100;
  const data = [{ name: label, value: percentage, fill: color }];

  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={height}>
        <RadialBarChart 
          cx="50%" 
          cy="50%" 
          innerRadius="70%" 
          outerRadius="100%" 
          barSize={12} 
          data={data}
          startAngle={90}
          endAngle={-270}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
          <RadialBar
            background={{ fill: '#1A1A1A' }}
            dataKey="value"
            cornerRadius={10}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="font-semibold text-[#FFFFFF] text-[32px]">{value}</div>
        <div className="text-[#8F8F8F] text-[12px] mt-[4px]">{label}</div>
      </div>
    </div>
  );
}
