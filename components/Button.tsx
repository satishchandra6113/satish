import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'cybercyko';
  onClick?: (e?: any) => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export function Button({ children, variant = 'primary', onClick, className = '', type = 'button', disabled = false }: ButtonProps) {
  const baseStyles = 'px-4 py-2 rounded-[11.5px] transition-all cursor-pointer relative text-[14px] font-medium tracking-wide flex items-center justify-center';

  const variantStyles = {
    primary: 'bg-[#4A90E2] text-white hover:bg-[#357ABD] border border-transparent shadow-sm',
    secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 shadow-sm',
    danger: 'bg-red-500 text-white hover:bg-red-600 border border-transparent shadow-sm',
    cybercyko: 'bg-transparent text-[#00FF66] border border-[#00FF66] hover:bg-[#85FF72] hover:text-[#084D2A] hover:border-[#6DFF40] font-medium tracking-wide'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );
}