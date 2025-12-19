import { Home, Users, CreditCard, Shield, Activity, ChevronRight, Monitor, FileCheck, AlertTriangle } from 'lucide-react';
import CybercykoLogo from '../imports/CybercykoLogo1';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

// Total devices count (matches dashboard data)
const TOTAL_DEVICES = 32;

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'devices', label: 'Devices', icon: Monitor, badge: TOTAL_DEVICES },
  { id: 'policies', label: 'Policies', icon: FileCheck },
  { id: 'threats', label: 'Threats', icon: AlertTriangle },
  { id: 'billing', label: 'Billing', icon: CreditCard },
];

const bottomItems = [
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'activity', label: 'Activity', icon: Activity },
];

export function CybercykoSidebar({ currentPage, onNavigate }: SidebarProps) {
  return (
    <>
      <style>{`
        .cyber-sidebar {
          position: fixed;
          left: 0;
          top: 0;
          height: 100%;
          width: 80px;
          background: linear-gradient(to bottom, #0D0D0D, #050505);
          border-right: 1px solid #1A1A1A;
          z-index: 50;
          overflow: hidden;
          will-change: width;
          transition: width 0.18s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .cyber-sidebar:hover {
          width: 240px;
        }
        
        /* Main content adjustment when sidebar is hovered */
        .cyber-sidebar:hover ~ .main-content {
          margin-left: 240px;
        }
        
        .cyber-sidebar .sidebar-text {
          opacity: 0;
          overflow: hidden;
          white-space: nowrap;
          transition: opacity 0.15s ease-out;
        }
        
        .cyber-sidebar:hover .sidebar-text {
          opacity: 1;
        }
        
        .cyber-sidebar .menu-label {
          opacity: 0;
          height: 0;
          margin-bottom: 0;
          overflow: hidden;
          transition: opacity 0.12s ease-out, height 0.12s ease-out, margin 0.12s ease-out;
        }
        
        .cyber-sidebar:hover .menu-label {
          opacity: 1;
          height: 20px;
          margin-bottom: 8px;
        }
        
        .cyber-sidebar .badge-collapsed {
          opacity: 1;
          transition: opacity 0.1s ease-out;
        }
        
        .cyber-sidebar:hover .badge-collapsed {
          opacity: 0;
        }
        
        .cyber-sidebar .badge-expanded {
          opacity: 0;
          overflow: hidden;
          transition: opacity 0.15s ease-out;
        }
        
        .cyber-sidebar:hover .badge-expanded {
          opacity: 1;
        }
        
        .cyber-sidebar .tooltip {
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.1s ease-out;
        }
        
        .cyber-sidebar .menu-item:hover .tooltip {
          opacity: 1;
        }
        
        .cyber-sidebar:hover .tooltip {
          opacity: 0 !important;
        }
        
        .cyber-sidebar .chevron-icon {
          opacity: 0;
          overflow: hidden;
          transition: opacity 0.15s ease-out;
        }
        
        .cyber-sidebar:hover .chevron-icon {
          opacity: 1;
        }
      `}</style>

      <div className="cyber-sidebar">
        <div className="flex flex-col h-full pt-[24px]">
          {/* Logo Section with Version */}
          <div className="mb-[24px] flex items-center justify-between px-[20px]">
            <div className="[&_svg]:!bg-transparent [&_path:first-child]:!fill-transparent flex items-center justify-center overflow-visible h-10 w-10 flex-shrink-0">
              <CybercykoLogo />
            </div>
            <span className="sidebar-text text-[12px] font-medium text-[#8F8F8F]">
              v 0.1.0
            </span>
          </div>

          {/* Main Menu */}
          <div className="px-[12px] space-y-[8px]">
            <p className="menu-label text-[10px] font-medium text-[#8F8F8F] px-[18px] tracking-wider">
              MAIN MENU
            </p>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              const hasBadge = 'badge' in item && item.badge !== undefined;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`menu-item w-full flex items-center gap-[12px] rounded-[12px] px-[18px] py-[12px] transition-colors group relative ${
                    isActive
                      ? 'bg-gradient-to-r from-[rgba(0,255,102,0.2)] to-[rgba(0,255,102,0.05)] border border-[#00FF66] text-[#00FF66]'
                      : 'text-[#8F8F8F] hover:bg-[rgba(255,255,255,0.05)] hover:text-[#D5FFD6]'
                  }`}
                >
                  <div className="relative flex-shrink-0 w-[20px] flex items-center justify-center">
                    <Icon size={20} />
                    {hasBadge && (
                      <span className="badge-collapsed absolute -top-1 -right-1 min-w-[16px] h-[16px] px-[4px] bg-[#00FF66] text-[#050505] text-[9px] font-bold rounded-full flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className="sidebar-text text-[14px] font-medium">
                    {item.label}
                  </span>
                  {hasBadge && (
                    <span className="badge-expanded ml-auto min-w-[24px] h-[20px] px-[6px] bg-[#00FF66] text-[#050505] text-[11px] font-bold rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                  {isActive && !hasBadge && (
                    <ChevronRight size={16} className="chevron-icon ml-auto flex-shrink-0" />
                  )}
                  {/* Tooltip */}
                  <div className="tooltip absolute left-full ml-[12px] px-[8px] py-[4px] bg-[#1A1A1A] text-[#D5FFD6] text-[12px] rounded-[6px] whitespace-nowrap z-50 border border-[#2A2A2A]">
                    {item.label} {hasBadge && `(${item.badge})`}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full w-0 h-0 border-t-[4px] border-t-transparent border-r-[4px] border-r-[#1A1A1A] border-b-[4px] border-b-transparent"></div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Account Section */}
          <div className="absolute bottom-[24px] left-[12px] right-[12px] space-y-[8px]">
            <p className="menu-label text-[10px] font-medium text-[#8F8F8F] px-[18px] tracking-wider">
              ACCOUNT
            </p>
            {bottomItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className="menu-item w-full flex items-center gap-[12px] rounded-[12px] px-[18px] py-[12px] text-[#8F8F8F] hover:bg-[rgba(255,255,255,0.05)] hover:text-[#D5FFD6] transition-colors group relative"
                >
                  <div className="flex-shrink-0 w-[20px] flex items-center justify-center">
                    <Icon size={20} />
                  </div>
                  <span className="sidebar-text text-[14px] font-medium">
                    {item.label}
                  </span>
                  {/* Tooltip */}
                  <div className="tooltip absolute left-full ml-[12px] px-[8px] py-[4px] bg-[#1A1A1A] text-[#D5FFD6] text-[12px] rounded-[6px] whitespace-nowrap z-50 border border-[#2A2A2A]">
                    {item.label}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full w-0 h-0 border-t-[4px] border-t-transparent border-r-[4px] border-r-[#1A1A1A] border-b-[4px] border-b-transparent"></div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
