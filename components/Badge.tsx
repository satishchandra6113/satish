interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'default';
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  const variantStyles = {
    success: 'bg-[#00FF66]/10 text-[#00FF66] border-[#00FF66]/20',
    default: 'bg-[#0f5f3c]/30 text-[#00FF66] border-[#0f5f3c]/50'
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full border ${variantStyles[variant]}`}>
      {children}
    </span>
  );
}
