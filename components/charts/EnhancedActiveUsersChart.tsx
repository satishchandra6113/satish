import { useState, useEffect } from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

interface DataItem {
  name: string;
  value: number;
}

interface EnhancedActiveUsersChartProps {
  data: DataItem[];
  title?: string;
  color?: string;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const change = data.change || 0;
    const isPositive = change >= 0;
    
    return (
      <div className="bg-[#0F0F0F] border border-[#00FF66] rounded-[12px] p-[16px] shadow-xl backdrop-blur-sm">
        <p className="text-[#8F8F8F] text-[11px] uppercase mb-[8px]">{data.name}</p>
        <div className="flex items-baseline gap-[8px] mb-[8px]">
          <p className="text-[#00FF66] font-bold text-[24px]">{data.value.toLocaleString()}</p>
          <span className="text-[#8F8F8F] text-[12px]">users</span>
        </div>
        {change !== 0 && (
          <div className={`flex items-center gap-[4px] ${isPositive ? 'text-[#00FF66]' : 'text-[#FF4444]'}`}>
            {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            <span className="text-[11px] font-medium">{isPositive ? '+' : ''}{change}%</span>
          </div>
        )}
      </div>
    );
  }
  return null;
};

export function EnhancedActiveUsersChart({ 
  data, 
  title = "Active Users (Last 7 Days)",
  color = '#00FF66'
}: EnhancedActiveUsersChartProps) {
  const [animatedData, setAnimatedData] = useState(data.map(item => ({ ...item, value: 0 })));
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Calculate average for reference line
  const average = data.reduce((sum, item) => sum + item.value, 0) / data.length;
  
  // Calculate trend (comparing last day to first day)
  const trend = data.length >= 2 
    ? ((data[data.length - 1].value - data[0].value) / data[0].value) * 100 
    : 0;
  const isPositiveTrend = trend >= 0;
  
  // Add change percentage to each data point
  const dataWithChange = data.map((item, index) => {
    if (index === 0) return { ...item, change: 0 };
    const prevValue = data[index - 1].value;
    const change = prevValue > 0 ? ((item.value - prevValue) / prevValue) * 100 : 0;
    return { ...item, change: Math.round(change) };
  });

  // Animate bars on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const dataWithChange = data.map((item, index) => {
        if (index === 0) return { ...item, change: 0 };
        const prevValue = data[index - 1].value;
        const change = prevValue > 0 ? ((item.value - prevValue) / prevValue) * 100 : 0;
        return { ...item, change: Math.round(change) };
      });
      setAnimatedData(dataWithChange);
    }, 100);
    return () => clearTimeout(timer);
  }, [data]);

  // Calculate gradient stops based on value
  const getGradientStops = (value: number, maxValue: number) => {
    const percentage = (value / maxValue) * 100;
    return [
      { offset: '0%', stopColor: color, stopOpacity: 0.9 },
      { offset: `${Math.min(percentage, 80)}%`, stopColor: color, stopOpacity: 0.8 },
      { offset: '100%', stopColor: color, stopOpacity: 0.4 },
    ];
  };

  const maxValue = Math.max(...data.map(item => item.value));

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between mb-[20px] flex-shrink-0">
        <div className="flex-1">
          <h4 className="text-[14px] font-medium text-[#D5FFD6] mb-[8px]">{title}</h4>
          <div className="flex items-center gap-[12px]">
            <div className="flex items-baseline gap-[4px]">
              <p className="text-[28px] font-bold text-[#00FF66]">
                {data[data.length - 1]?.value.toLocaleString() || 0}
              </p>
              <span className="text-[12px] text-[#8F8F8F]">today</span>
            </div>
            <div className={`flex items-center gap-[4px] px-[8px] py-[4px] rounded-[6px] ${
              isPositiveTrend ? 'bg-[rgba(0,255,102,0.1)]' : 'bg-[rgba(255,68,68,0.1)]'
            }`}>
              {isPositiveTrend ? <TrendingUp size={14} className="text-[#00FF66]" /> : <TrendingDown size={14} className="text-[#FF4444]" />}
              <span className={`text-[11px] font-medium ${
                isPositiveTrend ? 'text-[#00FF66]' : 'text-[#FF4444]'
              }`}>
                {isPositiveTrend ? '+' : ''}{Math.abs(trend).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
        <div className="p-[10px] rounded-[10px] bg-[rgba(0,255,102,0.1)] border border-[#00FF66]">
          <Activity size={18} className="text-[#00FF66]" />
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 w-full min-h-[200px] relative">
        <ResponsiveContainer width="100%" height="100%" minHeight={200}>
          <RechartsBarChart 
            data={animatedData} 
            margin={{ top: 20, right: 10, left: -20, bottom: 10 }}
            onMouseMove={(state) => {
              if (state && state.activeTooltipIndex !== undefined) {
                setHoveredIndex(state.activeTooltipIndex);
              }
            }}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <defs>
              <linearGradient id="activeUsersGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.95} />
                <stop offset="50%" stopColor={color} stopOpacity={0.75} />
                <stop offset="100%" stopColor={color} stopOpacity={0.4} />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#1A1A1A" 
              vertical={false}
              horizontal={true}
            />
            <XAxis 
              dataKey="name" 
              stroke="#8F8F8F" 
              tick={{ fill: '#8F8F8F', fontSize: 11 }}
              axisLine={{ stroke: '#1A1A1A' }}
              tickLine={{ stroke: '#1A1A1A' }}
            />
            <YAxis 
              stroke="#8F8F8F" 
              tick={{ fill: '#8F8F8F', fontSize: 11 }}
              axisLine={{ stroke: '#1A1A1A' }}
              tickLine={{ stroke: '#1A1A1A' }}
              width={50}
            />
            <Tooltip 
              content={<CustomTooltip />}
              cursor={{ fill: 'rgba(0, 255, 102, 0.1)', radius: 8 }}
            />
            <ReferenceLine 
              y={average} 
              stroke="#00FF66" 
              strokeDasharray="5 5" 
              strokeOpacity={0.3}
              label={{ value: 'Avg', position: 'right', fill: '#8F8F8F', fontSize: 10 }}
            />
            <Bar 
              dataKey="value" 
              radius={[8, 8, 0, 0]}
              maxBarSize={50}
              animationDuration={1500}
              animationEasing="ease-out"
            >
              {animatedData.map((entry, index) => {
                const isHovered = hoveredIndex === index;
                return (
                  <Cell 
                    key={`cell-${index}`}
                    fill={isHovered ? color : "url(#activeUsersGradient)"}
                    style={{
                      filter: isHovered ? 'url(#glow)' : 'none',
                      transform: isHovered ? 'scaleY(1.05)' : 'scaleY(1)',
                      transformOrigin: 'bottom',
                      transition: 'all 0.3s ease',
                    }}
                  />
                );
              })}
            </Bar>
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>

      {/* Stats Footer */}
      <div className="grid grid-cols-3 gap-[12px] mt-[16px] flex-shrink-0">
        <div className="bg-[rgba(0,255,102,0.05)] border border-[#1A1A1A] rounded-[8px] p-[10px]">
          <p className="text-[10px] text-[#8F8F8F] mb-[4px]">Peak</p>
          <p className="text-[16px] font-bold text-[#00FF66]">
            {Math.max(...data.map(item => item.value)).toLocaleString()}
          </p>
        </div>
        <div className="bg-[rgba(0,255,102,0.05)] border border-[#1A1A1A] rounded-[8px] p-[10px]">
          <p className="text-[10px] text-[#8F8F8F] mb-[4px]">Average</p>
          <p className="text-[16px] font-bold text-[#D5FFD6]">
            {Math.round(average).toLocaleString()}
          </p>
        </div>
        <div className="bg-[rgba(0,255,102,0.05)] border border-[#1A1A1A] rounded-[8px] p-[10px]">
          <p className="text-[10px] text-[#8F8F8F] mb-[4px]">Total</p>
          <p className="text-[16px] font-bold text-[#D5FFD6]">
            {data.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}

