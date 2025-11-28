import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Sector } from 'recharts';
import { Shield, ShieldCheck, ShieldOff, ShieldAlert, TrendingUp } from 'lucide-react';

interface DataItem {
  name: string;
  value: number;
  color: string;
}

interface EnhancedDeviceComplianceChartProps {
  data: DataItem[];
  title?: string;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const total = payload[0].payload.total || 0;
    const percent = total > 0 ? ((data.value / total) * 100).toFixed(1) : '0';
    
    return (
      <div className="bg-[#0F0F0F] border border-[#00FF66] rounded-[12px] p-[16px] shadow-xl backdrop-blur-sm">
        <div className="flex items-center gap-[8px] mb-[8px]">
          <div 
            className="w-[12px] h-[12px] rounded-full"
            style={{ backgroundColor: data.color }}
          />
          <p className="text-[#00FF66] font-semibold text-[14px]">{data.name}</p>
        </div>
        <p className="text-[#D5FFD6] text-[20px] font-bold mb-[4px]">{data.value.toLocaleString()}</p>
        <p className="text-[#8F8F8F] text-[12px]">{percent}% compliance rate</p>
      </div>
    );
  }
  return null;
};

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;

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
  if (lowerName.includes('compliant') || lowerName.includes('passed')) {
    return <ShieldCheck size={18} className="text-[#00FF66]" />;
  } else if (lowerName.includes('non-compliant') || lowerName.includes('failed')) {
    return <ShieldOff size={18} className="text-[#FF4444]" />;
  } else if (lowerName.includes('pending') || lowerName.includes('review')) {
    return <ShieldAlert size={18} className="text-[#FFCC00]" />;
  }
  return <Shield size={18} className="text-[#8F8F8F]" />;
};

export function EnhancedDeviceComplianceChart({ data, title = "Device Compliance" }: EnhancedDeviceComplianceChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const dataWithTotal = data.map(item => ({ ...item, total }));
  const compliantData = data.find(item => item.name.toLowerCase().includes('compliant'));
  const complianceRate = compliantData ? Math.round((compliantData.value / total) * 100) : 0;

  return (
    <div className="w-full h-full flex flex-col min-h-0">
      {/* Header */}
      <div className="flex items-start justify-between mb-[12px] sm:mb-[16px] lg:mb-[20px] flex-shrink-0">
        <div className="flex-1 min-w-0">
          <h4 className="text-[12px] sm:text-[13px] lg:text-[14px] font-medium text-[#D5FFD6] mb-[4px] sm:mb-[6px] lg:mb-[8px]">{title}</h4>
          <div className="flex items-baseline gap-[4px] sm:gap-[6px] lg:gap-[8px]">
            <p className="text-[20px] sm:text-[24px] lg:text-[28px] font-bold text-[#00FF66]">{complianceRate}%</p>
            <span className="text-[10px] sm:text-[11px] lg:text-[12px] text-[#8F8F8F]">compliant</span>
          </div>
        </div>
        <div className="p-[8px] sm:p-[9px] lg:p-[10px] rounded-[10px] bg-[rgba(0,255,102,0.1)] border border-[#00FF66] flex-shrink-0 ml-[8px]">
          <Shield className="text-[#00FF66] w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] lg:w-[18px] lg:h-[18px]" />
        </div>
      </div>

      {/* Chart */}
      <div className="relative w-full flex-1 min-h-0 overflow-hidden" style={{ containerType: 'inline-size' }}>
        <ResponsiveContainer width="100%" height="100%" minHeight={150}>
          <PieChart>
            <defs>
              <filter id="complianceGlow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <linearGradient id="compliantGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#00FF66" stopOpacity={1} />
                <stop offset="100%" stopColor="#00CC52" stopOpacity={0.8} />
              </linearGradient>
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
                // Only apply gradient to "Compliant" items, not "Non-Compliant"
                const isCompliant = entry.name.toLowerCase().includes('compliant') && !entry.name.toLowerCase().includes('non-compliant');
                return (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={isCompliant ? "url(#compliantGradient)" : entry.color}
                    stroke="none"
                    style={{
                      opacity: hoveredIndex === null ? 1 : isActive ? 1 : 0.4,
                      filter: isActive ? 'url(#complianceGlow)' : 'none',
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
            />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center display - constrained to inner circle (50% of container to avoid touching) */}
        <div 
          className="absolute flex items-center justify-center pointer-events-none"
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '50%',
            height: '50%',
            maxWidth: '50%',
            maxHeight: '50%'
          }}
        >
          <div className="text-center w-full h-full flex flex-col items-center justify-center px-[6px]">
            <div 
              className="mb-[2px] sm:mb-[3px] flex justify-center"
            >
              <div 
                className="rounded-full bg-[rgba(0,255,102,0.1)] border border-[#00FF66] flex items-center justify-center"
                style={{ 
                  padding: 'clamp(0.15rem, 1.5cqw, 0.4rem)',
                  width: 'clamp(1.25rem, 6cqw, 2rem)',
                  height: 'clamp(1.25rem, 6cqw, 2rem)'
                }}
              >
                <ShieldCheck 
                  style={{ 
                    width: 'clamp(0.55rem, 3cqw, 0.9rem)', 
                    height: 'clamp(0.55rem, 3cqw, 0.9rem)' 
                  }} 
                  className="text-[#00FF66]" 
                />
              </div>
            </div>
            <p 
              className="font-bold text-[#00FF66] mb-[1px] sm:mb-[1.5px] leading-[1.1]"
              style={{ fontSize: 'clamp(0.75rem, 6cqw, 1.5rem)' }}
            >
              {complianceRate}%
            </p>
            <p 
              className="text-[#8F8F8F] uppercase leading-[1.2]"
              style={{ fontSize: 'clamp(0.4rem, 2cqw, 0.55rem)' }}
            >
              Compliance Rate
            </p>
            <div 
              className="flex items-center justify-center gap-[1px] sm:gap-[2px] mt-[2px] sm:mt-[3px]"
              style={{ fontSize: 'clamp(0.35rem, 1.6cqw, 0.5rem)' }}
            >
              <TrendingUp 
                style={{ 
                  width: 'clamp(0.4rem, 2cqw, 0.55rem)', 
                  height: 'clamp(0.4rem, 2cqw, 0.55rem)' 
                }} 
                className="text-[#00FF66]" 
              />
              <span className="text-[#8F8F8F]">+2.3% from last week</span>
            </div>
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
                      color: isActive ? '#00FF66' : '#D5FFD6',
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
                <p className="text-[14px] sm:text-[15px] lg:text-[16px] font-bold text-[#D5FFD6]">{item.value.toLocaleString()}</p>
                <p className="text-[9px] sm:text-[9.5px] lg:text-[10px] text-[#8F8F8F]">devices</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

