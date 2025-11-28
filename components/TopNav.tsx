import { Bell, Menu, X } from 'lucide-react';
import CybercykoLogo from '../imports/CybercykoLogo1';
import { useState } from 'react';

interface TopNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function TopNav({ activeTab, onTabChange }: TopNavProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navItems = [
    'Users',
    'Applications',
    'Devices',
    'Authentication',
    'Activity',
    'Security',
    'Settings',
    'Developers'
  ];

  const handleTabChange = (tab: string) => {
    onTabChange(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#0D0D0D] border-b border-[#1A1A1A]">
      <div className="flex items-center justify-between px-[16px] md:px-[32px] lg:px-[48px] py-0">
        <div className="flex items-center gap-4 md:gap-8 lg:gap-12 flex-1">
          {/* Logo */}
          <div className="flex items-center gap-2 py-4 pl-[16px] md:pl-0">
            <div className="h-8 w-8 md:h-10 md:w-10 [&_svg]:!bg-transparent [&_path:first-child]:!fill-transparent shrink-0">
              <CybercykoLogo />
            </div>
          </div>

          {/* Desktop Navigation Items */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6 overflow-x-auto">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => handleTabChange(item)}
                className={`relative py-6 px-1 transition-colors whitespace-nowrap ${
                  activeTab === item
                    ? 'text-white'
                    : 'text-[#8F8F8F] hover:text-white'
                }`}
              >
                {item}
                {activeTab === item && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00FF66]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Right side icons */}
        <div className="flex items-center gap-2 md:gap-4 pr-[8px] md:pr-0">
          <button className="p-2 text-[#8F8F8F] hover:text-white transition-colors">
            <Bell size={20} />
          </button>
          <button className="hidden md:flex items-center gap-2 text-white">
            <div className="w-8 h-8 rounded-full bg-[#4A5568] flex items-center justify-center">
              <span>A</span>
            </div>
            <span className="hidden lg:inline">Admin</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[#8F8F8F] hover:text-white transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#0D0D0D] border-t border-[#1A1A1A] max-h-[calc(100vh-64px)] overflow-y-auto">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => handleTabChange(item)}
                className={`w-full text-left py-3 px-4 rounded-lg transition-colors ${
                  activeTab === item
                    ? 'bg-[#1A1A1A] text-white border-l-2 border-[#00FF66]'
                    : 'text-[#8F8F8F] hover:bg-[#1A1A1A] hover:text-white'
                }`}
              >
                {item}
              </button>
            ))}
            
            {/* Mobile Admin Button */}
            <div className="pt-4 border-t border-[#1A1A1A] md:hidden">
              <button className="flex items-center gap-3 w-full py-3 px-4 text-white hover:bg-[#1A1A1A] rounded-lg transition-colors">
                <div className="w-8 h-8 rounded-full bg-[#4A5568] flex items-center justify-center">
                  <span>A</span>
                </div>
                <span>Admin</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}