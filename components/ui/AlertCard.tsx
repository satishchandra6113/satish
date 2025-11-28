import { AlertTriangle, Shield, Info, CheckCircle } from 'lucide-react';

interface AlertCardProps {
  title: string;
  severity: 'critical' | 'warning' | 'info' | 'success';
  children: React.ReactNode;
  count?: number;
}

export function AlertCard({ title, severity, count, children }: AlertCardProps) {
  const severityConfig = {
    critical: {
      bg: 'bg-gradient-to-br from-[rgba(255,68,68,0.15)] to-[rgba(255,68,68,0.05)]',
      border: 'border-[#FF4444]',
      text: 'text-[#FF4444]',
      icon: 'bg-[rgba(255,68,68,0.2)]'
    },
    warning: {
      bg: 'bg-gradient-to-br from-[rgba(255,204,0,0.15)] to-[rgba(255,204,0,0.05)]',
      border: 'border-[#FFCC00]',
      text: 'text-[#FFCC00]',
      icon: 'bg-[rgba(255,204,0,0.2)]'
    },
    info: {
      bg: 'bg-gradient-to-br from-[rgba(0,153,255,0.15)] to-[rgba(0,153,255,0.05)]',
      border: 'border-[#0099FF]',
      text: 'text-[#0099FF]',
      icon: 'bg-[rgba(0,153,255,0.2)]'
    }
  };

  const config = severityConfig[severity];

  return (
    <div className={`${config.bg} border ${config.border} rounded-[12px] p-[24px] hover:shadow-lg transition-all`}>
      <div className="flex items-start justify-between mb-[20px]">
        <div>
          <h3 className="font-medium text-[#FFFFFF] text-[16px]">{title}</h3>
          {count !== undefined && (
            <p className={`${config.text} text-[24px] font-semibold mt-[8px]`}>
              {count.toLocaleString()} events
            </p>
          )}
        </div>
        <div className={`${config.text} ${config.icon} p-[10px] rounded-[8px]`}>
          <Shield size={20} />
        </div>
      </div>
      {children}
    </div>
  );
}