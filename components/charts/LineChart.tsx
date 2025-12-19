import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface LineChartProps {
  data: any[];
  dataKeys: { key: string; color: string; name: string }[];
  height?: number;
}

export function LineChart({ data, dataKeys, height = 300 }: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1A1A1A" />
        <XAxis 
          dataKey="name" 
          stroke="#8F8F8F" 
          tick={{ fill: '#8F8F8F', fontSize: 12 }}
          axisLine={{ stroke: '#1A1A1A' }}
        />
        <YAxis 
          stroke="#8F8F8F" 
          tick={{ fill: '#8F8F8F', fontSize: 12 }}
          axisLine={{ stroke: '#1A1A1A' }}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#0F0F0F', 
            border: '1px solid #1A1A1A',
            borderRadius: '8px',
            color: '#FFFFFF'
          }}
          labelStyle={{ color: '#8F8F8F' }}
        />
        <Legend 
          wrapperStyle={{ color: '#8F8F8F', fontSize: '12px' }}
          iconType="line"
        />
        {dataKeys.map((dk) => (
          <Line 
            key={dk.key}
            type="monotone" 
            dataKey={dk.key} 
            stroke={dk.color} 
            strokeWidth={2}
            name={dk.name}
            dot={false}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}
