interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

export function ChartCard({ title, subtitle, actions, children }: ChartCardProps) {
  return (
    <div className="bg-gradient-to-br from-[#0F0F0F] to-[#0A0A0A] border border-[#1A1A1A] rounded-[12px] p-[24px] hover:border-[#00FF66] transition-all duration-300 hover:shadow-lg hover:shadow-[#00FF66]/10">
      <div className="flex items-start justify-between mb-[20px]">
        <div>
          <h3 className="font-medium text-[#D5FFD6] text-[16px]">{title}</h3>
          {subtitle && <p className="text-[#8F8F8F] text-[12px] mt-[4px]">{subtitle}</p>}
        </div>
        {actions && <div>{actions}</div>}
      </div>
      {children}
    </div>
  );
}