import { Home, Users, CreditCard, Settings, Shield, Activity, Bell, LogOut, ChevronRight } from 'lucide-react';
import CybercykoLogo from '../imports/CybercykoLogo1';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'profile', label: 'Profile', icon: Settings },
];

const bottomItems = [
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'activity', label: 'Activity', icon: Activity },
  { id: 'notifications', label: 'Notifications', icon: Bell },
];

export function CybercykoSidebar({ currentPage, onNavigate, isOpen, onToggle }: SidebarProps) {
  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-gradient-to-b from-[#0D0D0D] to-[#050505] border-r border-[#1A1A1A] transition-all duration-300 z-50 ${
          isOpen ? 'w-[240px]' : 'w-[80px]'
        } overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Navigation Menu */}
        <div className="flex flex-col h-full pt-[24px]">
          {/* Logo Section - Always visible, centered when collapsed */}
          <div className={`mb-[24px] flex items-center transition-all duration-300 ${
            isOpen ? 'justify-start gap-[40px] px-[16px]' : 'justify-center px-0'
          }`}>
            {/* Logo - Always visible, first */}
            <div className={`[&_svg]:!bg-transparent [&_path:first-child]:!fill-transparent transition-all duration-300 flex items-center justify-center overflow-visible h-10 w-10`}>
              <CybercykoLogo />
            </div>
            {/* Text - Only visible when menu is open */}
            <span className={`text-[24px] font-semibold transition-all duration-300 whitespace-nowrap ${
              isOpen ? 'opacity-100 max-w-full' : 'opacity-0 max-w-0 overflow-hidden'
            }`} style={{ color: '#D5FFD6' }}>
              Cybercyko
            </span>
          </div>

          {/* Main Menu */}
          <div className={`space-y-[8px] transition-all duration-300 ${isOpen ? 'p-[16px]' : 'px-[12px]'}`}>
            {isOpen && (
              <p className="text-[10px] font-medium text-[#8F8F8F] px-[12px] mb-[8px] tracking-wider">
                MAIN MENU
              </p>
            )}
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (!isOpen) {
                      onToggle(); // Open sidebar when collapsed
                    }
                    onNavigate(item.id);
                  }}
                  className={`w-full flex items-center gap-[12px] rounded-[12px] transition-all group relative ${
                    isOpen ? 'px-[16px] py-[12px]' : 'px-0 py-[12px] justify-center'
                  } ${
                    isActive
                      ? 'bg-gradient-to-r from-[rgba(0,255,102,0.2)] to-[rgba(0,255,102,0.05)] border border-[#00FF66] text-[#00FF66]'
                      : 'text-[#8F8F8F] hover:bg-[rgba(255,255,255,0.05)] hover:text-[#D5FFD6]'
                  }`}
                  title={!isOpen ? item.label : undefined}
                >
                  <Icon size={20} className="flex-shrink-0" />
                  <span className={`text-[14px] font-medium transition-all duration-300 whitespace-nowrap ${
                    isOpen ? 'opacity-100 max-w-full' : 'opacity-0 max-w-0 overflow-hidden'
                  }`}>
                    {item.label}
                  </span>
                  {isActive && isOpen && <ChevronRight size={16} className="ml-auto" />}
                  {/* Tooltip for collapsed state */}
                  {!isOpen && (
                    <div className="absolute left-full ml-[12px] px-[8px] py-[4px] bg-[#1A1A1A] text-[#D5FFD6] text-[12px] rounded-[6px] whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-50 border border-[#2A2A2A]">
                      {item.label}
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full w-0 h-0 border-t-[4px] border-t-transparent border-r-[4px] border-r-[#1A1A1A] border-b-[4px] border-b-transparent"></div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Account Section */}
          <div className={`absolute bottom-[24px] space-y-[8px] transition-all duration-300 ${
            isOpen ? 'left-[16px] right-[16px]' : 'left-[12px] right-[12px]'
          }`}>
            {isOpen && (
              <p className="text-[10px] font-medium text-[#8F8F8F] px-[12px] mb-[8px] tracking-wider">
                ACCOUNT
              </p>
            )}
            {bottomItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (!isOpen) {
                      onToggle(); // Open sidebar when collapsed
                    }
                    onNavigate(item.id);
                  }}
                  className={`w-full flex items-center gap-[12px] rounded-[12px] text-[#8F8F8F] hover:bg-[rgba(255,255,255,0.05)] hover:text-[#D5FFD6] transition-all group relative ${
                    isOpen ? 'px-[16px] py-[12px]' : 'px-0 py-[12px] justify-center'
                  }`}
                  title={!isOpen ? item.label : undefined}
                >
                  <Icon size={20} className="flex-shrink-0" />
                  <span className={`text-[14px] font-medium transition-all duration-300 whitespace-nowrap ${
                    isOpen ? 'opacity-100 max-w-full' : 'opacity-0 max-w-0 overflow-hidden'
                  }`}>
                    {item.label}
                  </span>
                  {/* Tooltip for collapsed state */}
                  {!isOpen && (
                    <div className="absolute left-full ml-[12px] px-[8px] py-[4px] bg-[#1A1A1A] text-[#D5FFD6] text-[12px] rounded-[6px] whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-50 border border-[#2A2A2A]">
                      {item.label}
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full w-0 h-0 border-t-[4px] border-t-transparent border-r-[4px] border-r-[#1A1A1A] border-b-[4px] border-b-transparent"></div>
                    </div>
                  )}
                </button>
              );
            })}
            
            <div className="pt-[16px] border-t border-[#1A1A1A]">
              <button 
                onClick={() => {
                  if (!isOpen) {
                    onToggle(); // Open sidebar when collapsed
                  }
                }}
                className={`w-full flex items-center gap-[12px] rounded-[12px] text-[#FF4444] hover:bg-[rgba(255,68,68,0.1)] transition-all group relative ${
                  isOpen ? 'px-[16px] py-[12px]' : 'px-0 py-[12px] justify-center'
                }`}
                title={!isOpen ? 'Sign Out' : undefined}
              >
                <LogOut size={20} className="flex-shrink-0" />
                <span className={`text-[14px] font-medium transition-all duration-300 whitespace-nowrap ${
                  isOpen ? 'opacity-100 max-w-full' : 'opacity-0 max-w-0 overflow-hidden'
                }`}>
                  Sign Out
                </span>
                {/* Tooltip for collapsed state */}
                {!isOpen && (
                    <div className="absolute left-full ml-[12px] px-[8px] py-[4px] bg-[#1A1A1A] text-[#D5FFD6] text-[12px] rounded-[6px] whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-50 border border-[#2A2A2A]">
                    Sign Out
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full w-0 h-0 border-t-[4px] border-t-transparent border-r-[4px] border-r-[#1A1A1A] border-b-[4px] border-b-transparent"></div>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}