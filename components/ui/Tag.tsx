interface TagProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'critical' | 'info' | 'default';
}

export function Tag({ children, variant = 'default' }: TagProps) {
  const variants = {
    success: 'bg-[rgba(0,255,102,0.1)] border-[#00FF66] text-[#00FF66]',
    warning: 'bg-[rgba(255,204,0,0.1)] border-[#FFCC00] text-[#FFCC00]',
    critical: 'bg-[rgba(255,68,68,0.1)] border-[#FF4444] text-[#FF4444]',
    info: 'bg-[rgba(0,153,255,0.1)] border-[#0099FF] text-[#0099FF]',
    default: 'bg-[#1A1A1A] border-[#1A1A1A] text-[#8F8F8F]'
  };

  return (
    <span className={`inline-flex items-center px-[12px] py-[4px] rounded-full border text-[12px] font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
}
