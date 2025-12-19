import { useState } from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis, Tooltip, Cell } from 'recharts';

interface DataItem {
  name: string;
  value: number;
  fill: string;
}

interface RadialBarChartComponentProps {
  data: DataItem[];
  title?: string;
}

// Custom Tooltip that shows only the hovered item
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;

    return (
      <div className="bg-[#1A1A1A] border border-[#00FF66] rounded-[8px] p-[12px] shadow-lg">
        <p className="text-[#00FF66] font-semibold text-[14px] mb-[4px]">{data.name}</p>
        <p className="text-[#D5FFD6] text-[16px] font-bold">{data.value}%</p>
      </div>
    );
  }
  return null;
};

export function RadialBarChartComponent({ data, title }: RadialBarChartComponentProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="w-full h-full flex flex-col">
      {title && (
        <h4 className="text-[14px] font-medium text-[#D5FFD6] mb-[16px] flex-shrink-0">{title}</h4>
      )}
      <div className="flex-1 w-full min-h-[180px]">
        <ResponsiveContainer width="100%" height="100%" minHeight={180}>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="20%"
            outerRadius="90%"
            barSize={20}
            data={data.map((item, idx) => ({ ...item, __index: idx }))}
            startAngle={90}
            endAngle={-270}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
            <RadialBar
              background={{ fill: '#1A1A1A' }}
              clockWise
              dataKey="value"
              cornerRadius={10}
              onMouseEnter={(data: any, index: number) => {
                setActiveIndex(index);
              }}
              onMouseLeave={() => setActiveIndex(null)}

            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.fill}
                  stroke="none"
                  style={{
                    opacity: activeIndex === null ? 1 : activeIndex === index ? 1 : 0.3,
                    filter: activeIndex === index ? 'brightness(1.2)' : 'none',
                    transition: 'opacity 0.2s, filter 0.2s',
                    outline: 'none',
                  }}
                />
              ))}
            </RadialBar>
            <Tooltip
              content={<CustomTooltip />}
              cursor={false}
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-[12px] mt-[16px] justify-center flex-shrink-0">
        {data.map((item, index) => {
          const isActive = activeIndex === index;
          return (
            <div
              key={index}
              className="flex items-center gap-[6px] cursor-pointer transition-all duration-200"
              style={{
                opacity: activeIndex === null ? 1 : isActive ? 1 : 0.3,
              }}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div
                className="w-[10px] h-[10px] rounded-full"
                style={{ backgroundColor: item.fill }}
              />
              <span
                className="text-[11px]"
                style={{
                  color: isActive ? '#00FF66' : '#8F8F8F',
                  fontWeight: isActive ? '700' : '400',
                }}
              >
                {item.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}