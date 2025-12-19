import { LucideIcon } from 'lucide-react';

interface IconStatCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  IconComponent?: React.ReactNode;
}

export function IconStatCard({ icon: Icon, title, value, IconComponent }: IconStatCardProps) {
  return (
    <div className="bg-gradient-to-br from-[#0F0F0F] to-[#0A0A0A] border border-[#1A1A1A] rounded-[16px] p-[24px] hover:border-[#00FF66] transition-all group">
      <div className="flex flex-col items-center text-center">
        {/* Icon */}
        <div className="relative mb-[16px]">
          <div className="absolute inset-0 bg-[#00FF66] opacity-20 blur-[20px] rounded-full" />
          <div className="relative p-[16px] rounded-[16px] bg-gradient-to-br from-[rgba(0,255,102,0.2)] to-[rgba(0,204,82,0.1)] border border-[#00FF66]">
            {IconComponent || <Icon size={32} className="text-[#00FF66]" />}
          </div>
        </div>
        
        {/* Value */}
        <p className="text-[24px] font-bold text-white mb-[4px]">{value}</p>
        
        {/* Title */}
        <p className="text-[12px] text-[#8F8F8F]">{title}</p>
      </div>
    </div>
  );
}
