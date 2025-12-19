import { 
  LayoutDashboard, 
  Users, 
  Monitor, 
  AppWindow, 
  Shield, 
  Key, 
  Network, 
  ShieldAlert, 
  CheckCircle, 
  Activity, 
  Settings 
} from 'lucide-react';
import CybercykoLogo from '../imports/CybercykoLogo1';

interface DashboardSidebarProps {
  activeItem: string;
  onItemClick: (item: string) => void;
  isOpen: boolean;
}

export function DashboardSidebar({ activeItem, onItemClick, isOpen }: DashboardSidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'devices', label: 'Devices', icon: Monitor },
    { id: 'applications', label: 'Applications', icon: AppWindow },
    { id: 'policies', label: 'Policies', icon: Shield },
    { id: 'authentication', label: 'Authentication', icon: Key },
    { id: 'network', label: 'Network', icon: Network },
    { id: 'security', label: 'Security', icon: ShieldAlert },
    { id: 'compliance', label: 'Compliance', icon: CheckCircle },
    { id: 'activity', label: 'Activity', icon: Activity },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <aside 
      className={`bg-[#0D0D0D] border-r border-[#1A1A1A] h-screen sticky top-0 overflow-y-auto transition-all duration-300 ease-in-out ${
        isOpen ? 'w-[240px]' : 'w-[80px]'
      }`}
    >
      <div className={`transition-all duration-300 ${isOpen ? 'p-[24px]' : 'px-[12px] py-[24px]'}`}>
        {/* Logo Section - Always visible, centered when collapsed */}
        <div className={`mb-[32px] flex items-center transition-all duration-300 ${
          isOpen ? 'justify-start' : 'justify-center w-full'
        }`}>
          <div className={`[&_svg]:!bg-transparent [&_path:first-child]:!fill-transparent transition-all duration-300 flex items-center justify-center overflow-visible ${
            isOpen ? 'h-10 w-10' : 'h-10 w-10'
          }`}>
            <CybercykoLogo />
          </div>
        </div>

        <nav className="space-y-[8px]">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onItemClick(item.id)}
                className={`w-full flex items-center gap-[12px] rounded-[8px] transition-all relative group ${
                  isOpen ? 'px-[16px] py-[12px]' : 'px-0 py-[12px] justify-center'
                } ${
                  isActive
                    ? 'bg-[rgba(0,255,102,0.1)] text-[#00FF66]'
                    : 'text-[#8F8F8F] hover:bg-[#1A1A1A] hover:text-[#D5FFD6]'
                }`}
                title={!isOpen ? item.label : undefined}
              >
                {isActive && (
                  <div className={`absolute left-0 top-0 bottom-0 w-[3px] bg-[#00FF66] rounded-r-full transition-all duration-300 ${
                    isOpen ? 'opacity-100' : 'opacity-0'
                  }`} />
                )}
                <Icon size={20} className="flex-shrink-0" />
                <span className={`font-medium text-[14px] transition-all duration-300 whitespace-nowrap ${
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
        </nav>
      </div>
    </aside>
  );
}