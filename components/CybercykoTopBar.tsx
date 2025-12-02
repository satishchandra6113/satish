import { useState } from 'react';
import { Search, Bell, Settings, User, LogOut, UserCircle, Shield, Key, HelpCircle } from 'lucide-react';

interface TopBarProps {
  onMenuToggle?: () => void;
  currentPageTitle: string;
}

export function CybercykoTopBar({ currentPageTitle }: TopBarProps) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const profileMenuItems = [
    { icon: UserCircle, label: 'My Profile', action: () => console.log('Profile clicked') },
    { icon: Settings, label: 'Account Settings', action: () => console.log('Settings clicked') },
    { icon: Shield, label: 'Privacy & Security', action: () => console.log('Privacy clicked') },
    { icon: Key, label: 'Change Password', action: () => console.log('Password clicked') },
    { icon: HelpCircle, label: 'Help & Support', action: () => console.log('Help clicked') },
  ];

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

          {/* User Profile with Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setShowProfileMenu(true)}
            onMouseLeave={() => setShowProfileMenu(false)}
          >
            <div 
              className={`flex items-center gap-[12px] pl-[16px] border-l border-[#1A1A1A] cursor-pointer transition-all ${
                showProfileMenu ? 'opacity-100' : 'hover:opacity-80'
              }`}
            >
              <div className="text-right hidden sm:block">
                <p className="text-[12px] font-medium text-[#D5FFD6]">Admin User</p>
                <p className="text-[10px] text-[#8F8F8F]">Admin@cybercyko.com</p>
              </div>
              <div className={`w-[40px] h-[40px] rounded-[12px] bg-gradient-to-br from-[#00FF66] to-[#00CC52] flex items-center justify-center border-2 ${
                showProfileMenu ? 'border-[#00FF66]' : 'border-[#1A1A1A]'
              } transition-colors`}>
                <User size={20} className="text-[#050505]" />
              </div>
            </div>

            {/* Profile Dropdown Menu */}
            {showProfileMenu && (
              <div 
                className="absolute right-0 top-full mt-[8px] w-[260px] bg-[#0F0F0F] border border-[#1A1A1A] rounded-[16px] shadow-2xl overflow-hidden"
                style={{ 
                  animation: 'fadeInDown 0.2s ease-out',
                }}
              >
                {/* Profile Header */}
                <div className="p-[16px] border-b border-[#1A1A1A] bg-gradient-to-r from-[rgba(0,255,102,0.1)] to-transparent">
                  <div className="flex items-center gap-[12px]">
                    <div className="w-[48px] h-[48px] rounded-[12px] bg-gradient-to-br from-[#00FF66] to-[#00CC52] flex items-center justify-center">
                      <User size={24} className="text-[#050505]" />
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold text-[#D5FFD6]">Admin User</p>
                      <p className="text-[12px] text-[#8F8F8F]">Admin@cybercyko.com</p>
                      <span className="inline-block mt-[4px] px-[8px] py-[2px] bg-[#00FF66]/20 text-[#00FF66] text-[10px] font-medium rounded-full">
                        Administrator
                      </span>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-[8px]">
                  {profileMenuItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={index}
                        onClick={() => {
                          item.action();
                          setShowProfileMenu(false);
                        }}
                        className="w-full flex items-center gap-[12px] px-[16px] py-[12px] text-[#8F8F8F] hover:bg-[rgba(255,255,255,0.05)] hover:text-[#D5FFD6] transition-colors"
                      >
                        <Icon size={18} />
                        <span className="text-[13px] font-medium">{item.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Logout */}
                <div className="border-t border-[#1A1A1A] py-[8px]">
                  <button
                    onClick={() => {
                      console.log('Logout clicked');
                      setShowProfileMenu(false);
                    }}
                    className="w-full flex items-center gap-[12px] px-[16px] py-[12px] text-[#FF4444] hover:bg-[rgba(255,68,68,0.1)] transition-colors"
                  >
                    <LogOut size={18} />
                    <span className="text-[13px] font-medium">Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
