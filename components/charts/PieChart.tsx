import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface PieChartProps {
  data: any[];
  dataKey: string;
  nameKey: string;
  height?: number;
  colors?: string[];
  innerRadius?: number;
}

const DEFAULT_COLORS = ['#00FF66', '#0099FF', '#FFCC00', '#FF4444', '#8F8F8F', '#00FFCC', '#FF6B9D'];

export function PieChart({ data, dataKey, nameKey, height = 300, colors = DEFAULT_COLORS, innerRadius = 0 }: PieChartProps) {
  // Calculate total for percentage display
  const total = data.reduce((sum, item) => sum + item[dataKey], 0);
  
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="45%"
          labelLine={false}
          label={false}
          outerRadius={height * 0.28}
          innerRadius={innerRadius}
          fill="#8884d8"
          dataKey={dataKey}
          nameKey={nameKey}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#0F0F0F', 
            border: '1px solid #1A1A1A',
            borderRadius: '8px',
            color: '#FFFFFF'
          }}
          labelStyle={{ color: '#8F8F8F' }}
          formatter={(value: any) => {
            const percent = ((value / total) * 100).toFixed(1);
            return [`${value.toLocaleString()} (${percent}%)`, ''];
          }}
        />
        <Legend 
          wrapperStyle={{ color: '#8F8F8F', fontSize: '12px' }}
          iconType="circle"
          formatter={(value, entry: any) => {
            const percent = ((entry.payload[dataKey] / total) * 100).toFixed(1);
            return `${value}: ${entry.payload[dataKey].toLocaleString()} (${percent}%)`;
          }}
        />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
}