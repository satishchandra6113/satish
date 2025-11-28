import { TrendingUp, TrendingDown } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string | number;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  subtitle?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export function KpiCard({ title, value, trend, subtitle, icon, children }: KpiCardProps) {
  return (
    <div className="bg-[#0F0F0F] border border-[#1A1A1A] rounded-[12px] p-[24px] hover:border-[#00FF66] transition-colors">
      <div className="flex items-start justify-between mb-[12px]">
        <h3 className="font-medium text-[#8F8F8F] text-[14px]">{title}</h3>
        {icon && <div className="text-[#00FF66]">{icon}</div>}
      </div>
      
      {children ? (
        children
      ) : (
        <>
          <div className="flex items-end gap-[12px] mb-[8px]">
            <p className="font-semibold text-[#FFFFFF] text-[32px] leading-none">{value}</p>
            {trend && (
              <div className={`flex items-center gap-[4px] pb-[4px] ${trend.isPositive ? 'text-[#00FF66]' : 'text-[#FF4444]'}`}>
                {trend.isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                <span className="text-[14px] font-medium">{Math.abs(trend.value)}%</span>
              </div>
            )}
          </div>
          {subtitle && (
            <p className="text-[#8F8F8F] text-[12px]">{subtitle}</p>
          )}
        </>
      )}
    </div>
  );
}
