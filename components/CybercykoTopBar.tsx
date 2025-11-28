import { Search, Bell, Settings, User } from 'lucide-react';

interface TopBarProps {
  onMenuToggle?: () => void;
  currentPageTitle: string;
}

export function CybercykoTopBar({ currentPageTitle }: TopBarProps) {
  return (
    <div className="sticky top-0 z-30 bg-gradient-to-r from-[#0D0D0D]/95 to-[#050505]/95 backdrop-blur-[20px] border-b border-[#1A1A1A]">
      <div className="flex items-center justify-between px-[24px] py-[16px]">
        {/* Left: Title */}
        <div className="flex items-center gap-[16px]">
          <div>
            <h2 className="text-[16px] font-semibold text-[#D5FFD6]">Welcome back, Admin</h2>
          </div>
        </div>

        {/* Right: Search + Icons + Profile */}
        <div className="flex items-center gap-[16px]">
          {/* Search Bar */}
          <div className="hidden md:flex items-center gap-[8px] bg-[rgba(255,255,255,0.05)] border border-[#1A1A1A] rounded-[12px] px-[16px] py-[10px] min-w-[300px]">
            <Search size={18} className="text-[#8F8F8F]" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none outline-none text-[14px] text-[#D5FFD6] placeholder:text-[#8F8F8F] w-full"
            />
          </div>

          {/* Notification Icon */}
          <button className="relative p-[10px] rounded-[10px] bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(0,255,102,0.1)] border border-[#1A1A1A] hover:border-[#00FF66] transition-all text-[#8F8F8F] hover:text-[#00FF66]">
            <Bell size={20} />
            <span className="absolute top-[6px] right-[6px] w-[8px] h-[8px] bg-[#FF4444] rounded-full border-2 border-[#0D0D0D]" />
          </button>

          {/* Settings Icon */}
          <button className="p-[10px] rounded-[10px] bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(0,255,102,0.1)] border border-[#1A1A1A] hover:border-[#00FF66] transition-all text-[#8F8F8F] hover:text-[#00FF66]">
            <Settings size={20} />
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-[12px] pl-[16px] border-l border-[#1A1A1A]">
            <div className="text-right hidden sm:block">
              <p className="text-[12px] font-medium text-[#D5FFD6]">Admin User</p>
              <p className="text-[10px] text-[#8F8F8F]">Admin@cybercyko.com</p>
            </div>
            <div className="w-[40px] h-[40px] rounded-[12px] bg-gradient-to-br from-[#00FF66] to-[#00CC52] flex items-center justify-center border-2 border-[#1A1A1A]">
              <User size={20} className="text-[#050505]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}