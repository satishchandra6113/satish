import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Sector } from 'recharts';
import { CheckCircle, AlertTriangle, XCircle, Activity } from 'lucide-react';

interface DataItem {
  name: string;
  value: number;
  color: string;
}

interface EnhancedDeviceHealthChartProps {
  data: DataItem[];
  title?: string;
}

// Custom Tooltip that shows only the hovered item
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const total = payload[0].payload.total || 0;
    const percent = total > 0 ? ((data.value / total) * 100).toFixed(1) : '0';
    
    return (
      <div 
        className="bg-[#1A1A1A] border border-[#00FF66] rounded-[8px] p-[12px] shadow-lg"
        style={{
          backgroundColor: '#1A1A1A',
          opacity: 1,
          position: 'relative',
          zIndex: 9999
        }}
      >
        <div className="flex items-center gap-[8px] mb-[4px]">
          <div 
            className="w-[12px] h-[12px] rounded-full"
            style={{ backgroundColor: data.color }}
          />
          <p className="text-[#00FF66] font-semibold text-[14px]">{data.name}</p>
        </div>
        <p className="text-[#D5FFD6] text-[16px] font-bold mb-[4px]">{data.value.toLocaleString()}</p>
        <p className="text-[#8F8F8F] text-[12px]">{percent}% of total devices</p>
      </div>
    );
  }
  return null;
};

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 20) * cos;
  const my = cy + (outerRadius + 20) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        style={{ filter: 'drop-shadow(0 0 8px rgba(0, 255, 102, 0.5))' }}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
    </g>
  );
};

const getIcon = (name: string) => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('healthy') || lowerName.includes('good')) {
    return <CheckCircle className="text-[#00FF66]" style={{ width: '100%', height: '100%' }} />;
  } else if (lowerName.includes('warning') || lowerName.includes('caution')) {
    return <AlertTriangle className="text-[#FFCC00]" style={{ width: '100%', height: '100%' }} />;
  } else if (lowerName.includes('critical') || lowerName.includes('error')) {
    return <XCircle className="text-[#FF4444]" style={{ width: '100%', height: '100%' }} />;
  }
  return <Activity className="text-[#8F8F8F]" style={{ width: '100%', height: '100%' }} />;
};

export function EnhancedDeviceHealthChart({ data, title = "Device Health Status" }: EnhancedDeviceHealthChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const dataWithTotal = data.map(item => ({ ...item, total }));
  const primaryPercentage = Math.round((data[0]?.value / total) * 100);

  return (
    <div className="w-full h-full flex flex-col min-h-0">
      {/* Header */}
      <div className="flex items-start justify-between mb-[12px] sm:mb-[16px] lg:mb-[20px] flex-shrink-0">
        <div className="flex-1 min-w-0">
          <h4 className="text-[12px] sm:text-[13px] lg:text-[14px] font-medium text-white mb-[4px] sm:mb-[6px] lg:mb-[8px]">{title}</h4>
          <div className="flex items-baseline gap-[4px] sm:gap-[6px] lg:gap-[8px]">
            <p className="text-[20px] sm:text-[24px] lg:text-[28px] font-bold text-[#00FF66]">{total.toLocaleString()}</p>
            <span className="text-[10px] sm:text-[11px] lg:text-[12px] text-[#8F8F8F]">devices</span>
          </div>
        </div>
        <div className="p-[8px] sm:p-[9px] lg:p-[10px] rounded-[10px] bg-[rgba(0,255,102,0.1)] border border-[#00FF66] flex-shrink-0 ml-[8px]">
          <Activity className="text-[#00FF66] w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] lg:w-[18px] lg:h-[18px]" />
        </div>
      </div>

      {/* Chart */}
      <div className="relative w-full flex-1 min-h-0 overflow-hidden" style={{ containerType: 'inline-size' }}>
        <ResponsiveContainer width="100%" height="100%" minHeight={150}>
          <PieChart>
            <defs>
              <filter id="healthGlow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <Pie
              data={dataWithTotal.map((item, idx) => ({ ...item, __index: idx }))}
              cx="50%"
              cy="50%"
              innerRadius="55%"
              outerRadius="80%"
              paddingAngle={3}
              dataKey="value"
              activeIndex={activeIndex || hoveredIndex}
              activeShape={renderActiveShape}
              onMouseEnter={(_, index) => {
                setHoveredIndex(index);
                setActiveIndex(index);
              }}
              onMouseLeave={() => {
                setHoveredIndex(null);
                setActiveIndex(null);
              }}
            >
              {data.map((entry, index) => {
                const isActive = (activeIndex === index || hoveredIndex === index);
                return (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    stroke="none"
                    style={{
                      opacity: hoveredIndex === null ? 1 : isActive ? 1 : 0.4,
                      filter: isActive ? 'url(#healthGlow)' : 'none',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                    }}
                  />
                );
              })}
            </Pie>
            <Tooltip 
              content={<CustomTooltip />}
              cursor={false}
              contentStyle={{
                backgroundColor: '#1A1A1A',
                border: 'none',
                borderRadius: '0',
                padding: '0',
                opacity: 1
              }}
              wrapperStyle={{
                backgroundColor: 'transparent',
                opacity: 1,
                zIndex: 9999
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center display - constrained to inner circle (55% of container) */}
        <div 
          className="absolute flex items-center justify-center pointer-events-none"
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '55%',
            height: '55%',
            maxWidth: '55%',
            maxHeight: '55%'
          }}
        >
          <div className="text-center w-full h-full flex flex-col items-center justify-center px-[4px]">
            <div className="mb-[2px] sm:mb-[3px] flex justify-center items-center">
              <div style={{ 
                width: 'clamp(12px, 7cqw, 20px)', 
                height: 'clamp(12px, 7cqw, 20px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {getIcon(data[0]?.name || '')}
              </div>
            </div>
            <p 
              className="font-bold text-[#00FF66] mb-[1px] sm:mb-[2px] leading-[1.1]" 
              style={{ fontSize: 'clamp(0.875rem, 7cqw, 1.75rem)' }}
            >
              {primaryPercentage}%
            </p>
            <p 
              className="text-[#8F8F8F] uppercase leading-[1.2]" 
              style={{ fontSize: 'clamp(0.45rem, 2.2cqw, 0.625rem)' }}
            >
              {data[0]?.name || 'Total'}
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced Legend */}
      <div className="space-y-[6px] sm:space-y-[8px] lg:space-y-[10px] mt-[12px] sm:mt-[16px] lg:mt-[20px] w-full flex-shrink-0">
        {data.map((item, index) => {
          const percentage = Math.round((item.value / total) * 100);
          const isActive = activeIndex === index || hoveredIndex === index;
          return (
            <div
              key={index}
              className={`flex items-center justify-between p-[8px] sm:p-[10px] lg:p-[12px] rounded-[8px] sm:rounded-[9px] lg:rounded-[10px] border transition-all duration-300 cursor-pointer ${
                isActive 
                  ? 'bg-[rgba(0,255,102,0.1)] border-[#00FF66]' 
                  : 'bg-[rgba(255,255,255,0.02)] border-[#1A1A1A]'
              }`}
              onMouseEnter={() => {
                setHoveredIndex(index);
                setActiveIndex(index);
              }}
              onMouseLeave={() => {
                setHoveredIndex(null);
                setActiveIndex(null);
              }}
            >
              <div className="flex items-center gap-[8px] sm:gap-[10px] lg:gap-[12px] flex-1 min-w-0">
                <div className="flex items-center justify-center w-[24px] h-[24px] sm:w-[28px] sm:h-[28px] lg:w-[32px] lg:h-[32px] rounded-[6px] sm:rounded-[7px] lg:rounded-[8px] bg-[rgba(255,255,255,0.05)] flex-shrink-0">
                  {getIcon(item.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-[10px] sm:text-[11px] lg:text-[12px] font-medium mb-[2px] truncate"
                    style={{
                      color: isActive ? '#00FF66' : '#FFFFFF',
                    }}
                  >
                    {item.name}
                  </p>
                  <div className="flex items-center gap-[6px] sm:gap-[7px] lg:gap-[8px]">
                    <div className="flex-1 h-[3px] sm:h-[3.5px] lg:h-[4px] bg-[#1A1A1A] rounded-full overflow-hidden min-w-0">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: item.color,
                          boxShadow: isActive ? `0 0 8px ${item.color}` : 'none',
                        }}
                      />
                    </div>
                    <p
                      className="text-[12px] sm:text-[13px] lg:text-[14px] font-bold min-w-[35px] sm:min-w-[38px] lg:min-w-[40px] text-right flex-shrink-0"
                      style={{
                        color: isActive ? item.color : '#FFFFFF',
                      }}
                    >
                      {percentage}%
                    </p>
                  </div>
                </div>
              </div>
              <div className="ml-[8px] sm:ml-[10px] lg:ml-[12px] text-right flex-shrink-0">
                <p className="text-[14px] sm:text-[15px] lg:text-[16px] font-bold text-white">{item.value.toLocaleString()}</p>
                <p className="text-[9px] sm:text-[9.5px] lg:text-[10px] text-[#8F8F8F]">devices</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

