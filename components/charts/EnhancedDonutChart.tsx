import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface DataItem {
  name: string;
  value: number;
  color: string;
}

interface EnhancedDonutChartProps {
  data: DataItem[];
  title?: string;
}

// Custom Tooltip that shows only the hovered item
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const total = payload[0].payload.total || 0;
    const percent = total > 0 ? ((data.value / total) * 100).toFixed(0) : '0';
    
    return (
      <div className="bg-[#1A1A1A] border border-[#00FF66] rounded-[8px] p-[12px] shadow-lg">
        <p className="text-[#00FF66] font-semibold text-[14px] mb-[4px]">{data.name}</p>
        <p className="text-[#D5FFD6] text-[16px] font-bold">{data.value.toLocaleString()}</p>
        <p className="text-[#8F8F8F] text-[12px] mt-[4px]">{percent}%</p>
      </div>
    );
  }
  return null;
};

export function EnhancedDonutChart({ data, title }: EnhancedDonutChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  // Add total to each data item for tooltip
  const dataWithTotal = data.map(item => ({ ...item, total }));

  return (
    <div className="w-full h-full flex flex-col">
      {title && (
        <h4 className="text-[14px] font-medium text-[#D5FFD6] mb-[16px] flex-shrink-0">{title}</h4>
      )}
      
      <div className="relative w-full flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%" minHeight={200}>
          <PieChart>
            <Pie
              data={dataWithTotal.map((item, idx) => ({ ...item, __index: idx }))}
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="85%"
              paddingAngle={2}
              dataKey="value"
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  stroke="none"
                  style={{
                    opacity: activeIndex === null ? 1 : activeIndex === index ? 1 : 0.3,
                    filter: activeIndex === index ? 'brightness(1.2)' : 'none',
                    transition: 'opacity 0.2s, filter 0.2s',
                  }}
                />
              ))}
            </Pie>
            <Tooltip 
              content={<CustomTooltip />}
              cursor={false}
            />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <p className="text-[32px] font-bold text-[#00FF66]">
              {Math.round((data[0]?.value / total) * 100)}%
            </p>
            <p className="text-[11px] text-[#8F8F8F]">Total</p>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-[12px] mt-[16px] w-full flex-shrink-0">
        {data.map((item, index) => {
          const percentage = Math.round((item.value / total) * 100);
          const isActive = activeIndex === index;
          return (
            <div
              key={index}
              className="flex items-center gap-[8px] cursor-pointer transition-all duration-200"
              style={{
                opacity: activeIndex === null ? 1 : isActive ? 1 : 0.3,
              }}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div
                className="w-[12px] h-[12px] rounded-full flex-shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <div className="flex-1 min-w-0">
                <p
                  className="text-[11px] truncate"
                  style={{
                    color: isActive ? '#00FF66' : '#8F8F8F',
                    fontWeight: isActive ? '700' : '400',
                  }}
                >
                  {item.name}
                </p>
                <p
                  className="text-[14px] font-medium"
                  style={{
                    color: isActive ? '#00FF66' : '#D5FFD6',
                  }}
                >
                  {percentage}%
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}