import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface DropdownProps {
  label: string;
  items: { label: string; onClick: () => void }[];
  variant?: 'dark' | 'light';
}

export function Dropdown({ label, items, variant = 'dark' }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isLight = variant === 'light';

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-colors border ${isLight
            ? 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            : 'bg-[#0F0F0F] border-[#1A1A1A] text-white hover:border-[#00FF66]'
          }`}
      >
        {label}
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className={`absolute top-full right-0 mt-2 w-56 rounded-lg shadow-lg overflow-hidden z-50 border ${isLight
            ? 'bg-white border-gray-200'
            : 'bg-[#0F0F0F] border-[#1A1A1A]'
          }`}>
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                item.onClick();
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-3 transition-colors ${isLight
                  ? 'text-gray-700 hover:bg-gray-50'
                  : 'text-white hover:bg-[#1A1A1A]'
                }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
