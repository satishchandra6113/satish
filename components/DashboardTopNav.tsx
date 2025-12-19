import { Bell, User, Moon, Sun, Menu, X } from 'lucide-react';
import { useState } from 'react';
import CybercykoLogo from '../imports/CybercykoLogo1';

interface DashboardTopNavProps {
  pageTitle: string;
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
}

export function DashboardTopNav({ pageTitle, onToggleSidebar, sidebarOpen }: DashboardTopNavProps) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <nav className="h-[72px] bg-[#0D0D0D] border-b border-[#1A1A1A] sticky top-0 z-40">
      <div className="h-full px-[32px] flex items-center justify-between">
        {/* Left: Menu Toggle + Logo + Title */}
        <div className="flex items-center gap-[24px]">
          {/* Menu Toggle Button */}
          <button
            onClick={onToggleSidebar}
            className="p-[10px] text-[#8F8F8F] hover:text-[#00FF66] transition-colors rounded-[8px] hover:bg-[#1A1A1A]"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="h-10 w-10 [&_svg]:!bg-transparent [&_path:first-child]:!fill-transparent">
            <CybercykoLogo />
          </div>
          <h1 className="font-semibold text-[#D5FFD6] text-[20px]">{pageTitle}</h1>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-[16px]">
          {/* Theme Toggle */}
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-[10px] text-[#8F8F8F] hover:text-[#00FF66] transition-colors rounded-[8px] hover:bg-[#1A1A1A]"
          >
            {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {/* Notifications */}
          <button className="relative p-[10px] text-[#8F8F8F] hover:text-[#00FF66] transition-colors rounded-[8px] hover:bg-[#1A1A1A]">
            <Bell size={20} />
            <span className="absolute top-[8px] right-[8px] w-[8px] h-[8px] bg-[#FF4444] rounded-full"></span>
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-[12px] px-[12px] py-[8px] rounded-[8px] hover:bg-[#1A1A1A] transition-colors"
            >
              <div className="w-[32px] h-[32px] rounded-full bg-[#00FF66] flex items-center justify-center">
                <User size={18} className="text-[#000000]" />
              </div>
              <div className="text-left hidden lg:block">
                <p className="text-[#D5FFD6] text-[14px] font-medium">Admin User</p>
                <p className="text-[#8F8F8F] text-[12px]">admin@cybercyko.com</p>
              </div>
            </button>

            {showProfileMenu && (
              <div className="absolute top-[56px] right-0 w-[200px] bg-[#0F0F0F] border border-[#1A1A1A] rounded-[8px] p-[8px] shadow-lg">
                <button className="w-full text-left px-[12px] py-[8px] text-[#D5FFD6] hover:bg-[#1A1A1A] rounded-[6px] transition-colors text-[14px]">
                  Profile
                </button>
                <button className="w-full text-left px-[12px] py-[8px] text-[#D5FFD6] hover:bg-[#1A1A1A] rounded-[6px] transition-colors text-[14px]">
                  Settings
                </button>
                <div className="h-[1px] bg-[#1A1A1A] my-[8px]"></div>
                <button className="w-full text-left px-[12px] py-[8px] text-[#FF4444] hover:bg-[#1A1A1A] rounded-[6px] transition-colors text-[14px]">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}