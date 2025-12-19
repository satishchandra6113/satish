import { Search } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  variant?: 'dark' | 'light';
}

export function SearchBar({ placeholder = 'Search...', value, onChange, variant = 'dark' }: SearchBarProps) {
  const isLight = variant === 'light';

  return (
    <div className="relative">
      <Search
        size={18}
        className={`absolute left-4 top-1/2 -translate-y-1/2 ${isLight ? 'text-gray-400' : 'text-[#8F8F8F]'}`}
      />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-lg py-2.5 pl-11 pr-4 focus:outline-none focus:ring-1 transition-all ${isLight
            ? 'bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500'
            : 'bg-[#0F0F0F] border border-[#1A1A1A] text-white placeholder:text-[#8F8F8F] focus:border-[#00FF66] focus:ring-[#00FF66]'
          }`}
      />
    </div>
  );
}
