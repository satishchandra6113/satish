import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface DataItem {
  name: string;
  value: number;
  color: string;
}

interface EnhancedPieChartProps {
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

// Custom label function that displays percentage and name on slices
const renderCustomLabel = (props: any, activeIndex: number | null, currentIndex: number) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent, name, fill } = props;
  const RADIAN = Math.PI / 180;
  
  // Hide labels when hovering and this is not the active slice
  if (activeIndex !== null && activeIndex !== currentIndex) {
    return null;
  }
  
  // Calculate radius values - Recharts may pass percentage strings or numbers
  const innerRad = innerRadius || 0;
  let outerRad: number;
  
  if (typeof outerRadius === 'number') {
    outerRad = outerRadius;
  } else if (typeof outerRadius === 'string' && outerRadius.includes('%')) {
    // For percentage, calculate based on available space (use min of cx/cy to ensure it fits)
    const chartSize = Math.min(cx, cy) * 2;
    const percentage = parseFloat(outerRadius.replace('%', '')) / 100;
    outerRad = (chartSize / 2) * percentage;
  } else {
    // Fallback: use 80% of available space
    outerRad = Math.min(cx, cy) * 0.8;
  }
  
  // Position label near the outer radius of the slice (about 75% from center to outer edge)
  const radius = innerRad + (outerRad - innerRad) * 0.75;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
  // Determine text color based on slice color brightness
  // Light colors: #E6FF47 (yellow), #7DFF56 (light green)
  // Dark colors: #FF5858 (red), #084D2A (dark green), #36C9FF (cyan)
  const isLight = fill === '#E6FF47' || fill === '#7DFF56';
  const textColor = isLight ? '#1e2125' : '#D5FFD6';
  const percentValue = (percent * 100).toFixed(0);
  
  // Center the text on the slice using middle anchor
  return (
    <g>
      <text
        x={x}
        y={y - 5}
        fill={textColor}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="13"
        fontWeight="600"
        fontFamily="Poppins, sans-serif"
      >
        {percentValue}%
      </text>
      <text
        x={x}
        y={y + 9}
        fill={textColor}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="10"
        fontWeight="400"
        fontFamily="Poppins, sans-serif"
      >
        {name}
      </text>
    </g>
  );
};

export function EnhancedPieChart({ data, title }: EnhancedPieChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  // Add total to each data item for tooltip
  const dataWithTotal = data.map(item => ({ ...item, total }));
  
  return (
    <div className="w-full h-full flex flex-col">
      {title && (
        <h4 className="text-[14px] font-medium text-[#D5FFD6] mb-[8px] flex-shrink-0">{title}</h4>
      )}
      {/* Pie Chart Section */}
      <div className="flex-1 w-full min-h-[200px] relative mb-[16px]">
        <ResponsiveContainer width="100%" height="100%" minHeight={200}>
          <PieChart>
            <Pie
              data={dataWithTotal.map((item, idx) => ({ ...item, __index: idx }))}
              cx="50%"
              cy="50%"
              innerRadius={0}
              outerRadius="75%"
              paddingAngle={2}
              dataKey="value"
              label={(props: any) => {
                const currentIndex = props.payload.__index;
                return renderCustomLabel(props, activeIndex, currentIndex);
              }}
              labelLine={false}
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color} 
                  stroke="#0F0F0F" 
                  strokeWidth={activeIndex === index ? 4 : 2}
                  opacity={activeIndex === null ? 1 : activeIndex === index ? 1 : 0.3}
                  style={{ 
                    filter: activeIndex === index ? 'brightness(1.2)' : 'none',
                    transition: 'opacity 0.2s, filter 0.2s, stroke-width 0.2s'
                  }}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      {/* Legend Section Below */}
      <div className="w-full flex-shrink-0 flex flex-wrap items-center justify-center gap-[16px] pt-[8px]">
        {data.map((entry, index) => {
          const percent = ((entry.value / total) * 100).toFixed(0);
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
                className="w-[10px] h-[10px] rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span
                className="text-[12px] font-medium whitespace-nowrap"
                style={{
                  color: isActive ? '#00FF66' : '#D5FFD6',
                  fontWeight: isActive ? '700' : '500',
                }}
              >
                {entry.name} {percent}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}