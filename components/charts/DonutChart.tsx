import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface DonutChartProps {
  data: any[];
  dataKey: string;
  nameKey: string;
  height?: number;
  colors?: string[];
  centerText?: string;
  centerSubtext?: string;
}

const DEFAULT_COLORS = ['#00FF66', '#FFCC00', '#FF4444'];

export function DonutChart({ 
  data, 
  dataKey, 
  nameKey, 
  height = 250, 
  colors = DEFAULT_COLORS,
  centerText,
  centerSubtext
}: DonutChartProps) {
  const total = data.reduce((sum, item) => sum + item[dataKey], 0);
  
  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            dataKey={dataKey}
            nameKey={nameKey}
            paddingAngle={2}
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
          />
          <Legend 
            wrapperStyle={{ color: '#8F8F8F', fontSize: '12px' }}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
      
      {(centerText || centerSubtext) && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
          {centerText && <div className="font-semibold text-[#FFFFFF] text-[24px]">{centerText}</div>}
          {centerSubtext && <div className="text-[#8F8F8F] text-[12px] mt-[4px]">{centerSubtext}</div>}
        </div>
      )}
    </div>
  );
}
