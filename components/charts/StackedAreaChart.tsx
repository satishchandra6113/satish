import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface StackedAreaChartProps {
  data: any[];
  title?: string;
  dataKeys: { key: string; color: string; name: string; stackId?: string }[];
}

export function StackedAreaChart({ data, title, dataKeys }: StackedAreaChartProps) {
  return (
    <div className="w-full h-full flex flex-col">
      {title && (
        <h4 className="text-[14px] font-medium text-[#D5FFD6] mb-[16px] flex-shrink-0">{title}</h4>
      )}
      <div className="flex-1 w-full min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%" minHeight={200}>
          <AreaChart data={data}>
            <defs>
              {dataKeys.map((item, index) => (
                <linearGradient key={index} id={`gradient-${item.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={item.color} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={item.color} stopOpacity={0.1} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1A1A1A" />
            <XAxis
              dataKey="name"
              stroke="#8F8F8F"
              tick={{ fill: '#8F8F8F', fontSize: 11 }}
            />
            <YAxis
              stroke="#8F8F8F"
              tick={{ fill: '#8F8F8F', fontSize: 11 }}
              label={{ value: 'GB/s', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#8F8F8F', fontSize: 11 } }}
              domain={[0, 20]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0D0D0D',
                border: '1px solid #1A1A1A',
                borderRadius: '8px',
                fontSize: '12px',
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: '12px', color: '#8F8F8F' }}
              iconType="circle"
            />
            {dataKeys.map((item, index) => (
              <Area
                key={index}
                type="monotone"
                dataKey={item.key}
                stackId={item.stackId !== undefined ? item.stackId : "1"}
                stroke={item.color}
                fill={`url(#gradient-${item.key})`}
                name={item.name}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}