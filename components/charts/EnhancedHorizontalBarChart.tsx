import { Globe, AppWindow, TrendingUp, Code, Cloud, MessageSquare, Box } from 'lucide-react';

interface EnhancedHorizontalBarChartProps {
  data: Array<{ name: string; value: number; icon?: React.ReactNode }>;
  title?: string;
  subtitle?: string;
  maxValue?: number;
  showIcons?: boolean;
  barColor?: string;
}

// Icon mapping for common websites
const getSiteIcon = (name: string) => {
  const lowerName = name.toLowerCase();
  
  if (lowerName.includes('github')) {
    return <Code size={16} className="text-[#00FF66]" />;
  }
  if (lowerName.includes('microsoft') || lowerName.includes('azure')) {
    return <Cloud size={16} className="text-[#00FF66]" />;
  }
  if (lowerName.includes('slack')) {
    return <MessageSquare size={16} className="text-[#00FF66]" />;
  }
  if (lowerName.includes('amazon') || lowerName.includes('aws')) {
    return <Box size={16} className="text-[#00FF66]" />;
  }
  if (lowerName.includes('docker')) {
    return <Box size={16} className="text-[#00FF66]" />;
  }
  
  return <Globe size={16} className="text-[#00FF66]" />;
};

export function EnhancedHorizontalBarChart({
  data,
  title,
  subtitle,
  maxValue,
  showIcons = true,
  barColor = '#00FF66'
}: EnhancedHorizontalBarChartProps) {
  // Calculate max value if not provided
  const calculatedMax = maxValue || Math.max(...data.map(d => d.value));
  
  // Format number with K/M suffix
  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  // Get icon for item
  const getIcon = (name: string, index: number) => {
    if (data[index]?.icon) {
      return data[index].icon;
    }
    return getSiteIcon(name);
  };

  return (
    <div className="w-full h-full flex flex-col">
      {title && (
        <div className="mb-[20px] flex-shrink-0">
          <h4 className="text-[16px] font-semibold text-[#D5FFD6] mb-[4px]">{title}</h4>
          {subtitle && (
            <p className="text-[12px] text-[#8F8F8F]">{subtitle}</p>
          )}
        </div>
      )}
      
      <div className="flex-1 w-full space-y-[16px] overflow-y-auto">
        {data.map((item, index) => {
          const percentage = (item.value / calculatedMax) * 100;
          const isTopItem = index === 0;
          
          return (
            <div key={index} className="relative group p-[12px] rounded-[10px] border border-transparent hover:border-[#00FF66] transition-all duration-300 hover:bg-[rgba(0,255,102,0.02)]">
              {/* Item Label and Icon */}
              <div className="flex items-center justify-between mb-[8px]">
                <div className="flex items-center gap-[10px] flex-1 min-w-0">
                  {showIcons && (
                    <div className={`flex-shrink-0 p-[6px] rounded-[6px] bg-[rgba(0,255,102,0.1)] border border-[rgba(0,255,102,0.3)] transition-all duration-300 group-hover:border-[#00FF66] group-hover:bg-[rgba(0,255,102,0.15)] ${
                      isTopItem ? 'border-[#00FF66]' : ''
                    }`}>
                      {getIcon(item.name, index)}
                    </div>
                  )}
                  <span className={`text-[13px] font-medium text-[#D5FFD6] truncate transition-colors duration-300 group-hover:text-[#00FF66] ${
                    isTopItem ? 'text-[#00FF66]' : ''
                  }`}>
                    {item.name}
                  </span>
                </div>
                <span className={`text-[14px] font-bold ml-[12px] flex-shrink-0 transition-colors duration-300 group-hover:text-[#00FF66] ${
                  isTopItem ? 'text-[#00FF66]' : 'text-[#D5FFD6]'
                }`}>
                  {formatNumber(item.value)}
                </span>
              </div>
              
              {/* Bar Container */}
              <div className="relative h-[32px] bg-[#0A0A0A] rounded-[8px] border border-[#1A1A1A] overflow-hidden transition-all duration-300 group-hover:border-[rgba(0,255,102,0.4)]">
                {/* Animated Bar */}
                <div
                  className={`absolute left-0 top-0 h-full rounded-[8px] transition-all duration-700 ease-out ${
                    isTopItem ? 'bg-gradient-to-r from-[#00FF66] to-[#00CC52]' : 
                    'bg-gradient-to-r from-[rgba(0,255,102,0.8)] to-[rgba(0,204,82,0.6)]'
                  }`}
                  style={{
                    width: `${percentage}%`,
                    boxShadow: isTopItem 
                      ? '0 0 12px rgba(0, 255, 102, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)' 
                      : 'inset 0 1px 0 rgba(255, 255, 255, 0.05)'
                  }}
                >
                  {/* Shine effect */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                    style={{
                      backgroundSize: '200% 100%',
                      animation: 'shimmer 3s infinite'
                    }}
                  />
                </div>
                
                {/* Percentage indicator on bar */}
                {percentage > 15 && (
                  <div className="absolute left-[8px] top-1/2 -translate-y-1/2">
                    <span className="text-[11px] font-semibold text-black drop-shadow-[0_1px_2px_rgba(255,255,255,0.3)]">
                      {percentage.toFixed(0)}%
                    </span>
                  </div>
                )}
              </div>
              
              {/* Hover effect overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="absolute right-0 top-0 h-full w-[2px] bg-[#00FF66] blur-[4px]" />
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Legend/Footer */}
      <div className="mt-[16px] pt-[16px] border-t border-[#1A1A1A] flex-shrink-0">
        <div className="flex items-center justify-between text-[11px] text-[#8F8F8F]">
          <span>Total: {formatNumber(data.reduce((sum, d) => sum + d.value, 0))}</span>
          <div className="flex items-center gap-[8px]">
            <div className="w-[8px] h-[8px] rounded-full bg-[#00FF66]" />
            <span>Traffic Volume</span>
          </div>
        </div>
      </div>
    </div>
  );
}

