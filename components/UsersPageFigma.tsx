import { useState } from 'react';
import svgPaths from "../imports/svg-b3fjcfnyxs";
import { Button } from './Button';

interface UsersPageFigmaProps {
  onNewUser: () => void;
}

const usersData = [
  {
    id: 1,
    initials: 'AC',
    name: 'Alexa CSM',
    email: 'alexa@oneLogin.com',
    roles: ['Customer Success'],
    status: 'Verified',
    lastLogin: '30d ago'
  },
  {
    id: 2,
    initials: 'AS',
    name: 'Alexa Sling',
    email: 'alexa@slinginc.com',
    roles: ['Sales', 'Admin'],
    status: 'Verified',
    lastLogin: 'Never logged in'
  },
  {
    id: 3,
    initials: 'AK',
    name: 'Alicia Keys',
    email: 'alicia@engineers.com',
    roles: ['Engineers'],
    status: 'Verified',
    lastLogin: '400d ago'
  },
  {
    id: 4,
    initials: 'DP',
    name: 'David Paul',
    email: 'david@cybercyko.com',
    roles: ['Admin'],
    status: 'Verified',
    lastLogin: '20m ago'
  }
];

export function UsersPageFigma({ onNewUser }: UsersPageFigmaProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showMoreActions, setShowMoreActions] = useState(false);

  const filteredUsers = usersData.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#050505]">
      <div className="max-w-[1400px] mx-auto w-full px-[16px] md:px-[32px] lg:px-[48px] py-[24px] md:py-[32px]">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-[16px] sm:gap-[24px] mb-[24px] lg:mb-[32px]">
          {/* Users Heading */}
          <h1 className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#d5ffd6] text-[16px] tracking-[-0.3125px]">
            Users
          </h1>

          {/* Actions Container */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-[12px] w-full sm:w-auto">
            {/* Search Bar */}
            <div className="relative w-full sm:w-[240px] md:w-[280px] lg:w-[320px]">
              <div className="bg-[#0f0f0f] h-[46px] w-full rounded-[10px] border border-[#1a1a1a] relative hover:border-[#00ff66] transition-colors focus-within:border-[#00ff66]">
                <div className="absolute left-[16px] size-[18px] top-[14px] pointer-events-none z-10">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
                    <path d="M15.75 15.75L12.495 12.495" stroke="#D5FFD6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    <path d={svgPaths.p126da180} stroke="#D5FFD6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent h-full w-full pl-[44px] pr-[16px] py-[10px] font-['Inter:Regular',sans-serif] text-[#d5ffd6] text-[16px] tracking-[-0.3125px] outline-none placeholder:text-[#d5ffd6]"
                />
              </div>
            </div>

            <div className="flex items-center gap-[12px]">
              {/* More Actions Dropdown */}
              <div className="relative flex-1 sm:flex-none">
                <button
                  onClick={() => setShowMoreActions(!showMoreActions)}
                  className="bg-[#0f0f0f] h-[46px] w-full sm:w-[140px] md:w-[150px] lg:w-[155px] rounded-[10px] border border-[#1a1a1a] relative flex items-center justify-center hover:border-[#00ff66] transition-colors px-[12px] md:px-[16px]"
                >
                  <span className="font-['Inter:Medium',sans-serif] font-medium text-[#d5ffd6] text-[14px] md:text-[16px] tracking-[-0.3125px] truncate">
                    More Actions
                  </span>
                  <div className="ml-[8px] size-[16px] shrink-0">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                      <path d="M4 6L8 10L12 6" stroke="#D5FFD6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                    </svg>
                  </div>
                </button>
                {showMoreActions && (
                  <div className="absolute top-[52px] right-0 bg-[#0f0f0f] border border-[#1a1a1a] rounded-[10px] p-[8px] w-[180px] z-10 shadow-lg">
                    <button className="w-full text-left px-[12px] py-[8px] text-[#d5ffd6] hover:bg-[#1a1a1a] rounded-[6px] transition-colors">
                      Export Users
                    </button>
                    <button className="w-full text-left px-[12px] py-[8px] text-[#d5ffd6] hover:bg-[#1a1a1a] rounded-[6px] transition-colors">
                      Bulk Edit
                    </button>
                    <button className="w-full text-left px-[12px] py-[8px] text-[#d5ffd6] hover:bg-[#1a1a1a] rounded-[6px] transition-colors">
                      Import Users
                    </button>
                  </div>
                )}
              </div>

              {/* New User Button */}
              <Button onClick={onNewUser} className="whitespace-nowrap shrink-0">Create User</Button>
            </div>
          </div>
        </div>

        {/* Users Table - Desktop */}
        <div className="hidden lg:block bg-[#0d0d0d] rounded-[12px] border border-[#1a1a1a] overflow-hidden">
          {/* Table Header */}
          <div className="h-[56.5px] border-b border-[#1a1a1a] grid grid-cols-[minmax(280px,2fr)_minmax(180px,1.5fr)_minmax(100px,1fr)_minmax(130px,1fr)]">
            <div className="flex items-center px-[24px]">
              <p className="font-['Inter:Bold',sans-serif] font-bold text-[#d5ffd6] text-[14px] lg:text-[16px] tracking-[0.4875px] uppercase">
                USER (NAME & EMAIL)
              </p>
            </div>
            <div className="flex items-center px-[24px]">
              <p className="font-['Inter:Bold',sans-serif] font-bold text-[#d5ffd6] text-[14px] lg:text-[16px] tracking-[0.4875px] uppercase">
                ROLES / GROUPS
              </p>
            </div>
            <div className="flex items-center px-[24px]">
              <p className="font-['Inter:Bold',sans-serif] font-bold text-[#d5ffd6] text-[14px] lg:text-[16px] tracking-[0.4875px] uppercase">
                STATUS
              </p>
            </div>
            <div className="flex items-center px-[24px]">
              <p className="font-['Inter:Bold',sans-serif] font-bold text-[#d5ffd6] text-[14px] lg:text-[16px] tracking-[0.4875px] uppercase">
                LAST LOGIN
              </p>
            </div>
          </div>

          {/* Table Rows */}
          {filteredUsers.map((user) => (
            <div key={user.id} className="min-h-[81px] border-b border-[#1a1a1a] last:border-b-0 grid grid-cols-[minmax(280px,2fr)_minmax(180px,1.5fr)_minmax(100px,1fr)_minmax(130px,1fr)] hover:bg-[#0f0f0f] transition-colors">
              {/* User Cell */}
              <div className="flex items-center px-[24px] py-[16px]">
                <div className="flex items-center gap-[12px] min-w-0">
                  <div className="bg-[#1a1a1a] rounded-full size-[40px] flex items-center justify-center shrink-0">
                    <p className="font-['Inter:Regular',sans-serif] text-[#d5ffd6] text-[16px] tracking-[-0.3125px]">
                      {user.initials}
                    </p>
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <p className="font-['Inter:Regular',sans-serif] text-[#d5ffd6] text-[16px] tracking-[-0.3125px] truncate">
                      {user.name}
                    </p>
                    <p className="font-['Inter:Regular',sans-serif] text-[#d5ffd6] text-[16px] tracking-[-0.3125px] truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Roles Cell */}
              <div className="flex items-center px-[24px] py-[16px]">
                <div className="flex flex-wrap gap-[8px]">
                  {user.roles.map((role, index) => (
                    <div 
                      key={index}
                      className="bg-[rgba(15,95,60,0.3)] border border-[rgba(15,95,60,0.5)] px-[10px] lg:px-[13px] py-[5px] rounded-full"
                    >
                      <p className="font-['Inter:Regular',sans-serif] text-[#00ff66] text-[14px] lg:text-[16px] tracking-[-0.3125px] whitespace-nowrap">
                        {role}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Cell */}
              <div className="flex items-center px-[24px] py-[16px]">
                <p className="font-['Inter:Regular',sans-serif] text-[#00ff66] text-[14px] lg:text-[16px] tracking-[-0.3125px]">
                  {user.status}
                </p>
              </div>

              {/* Last Login Cell */}
              <div className="flex items-center px-[24px] py-[16px]">
                <p className="font-['Inter:Regular',sans-serif] text-[#d5ffd6] text-[14px] lg:text-[16px] tracking-[-0.3125px]">
                  {user.lastLogin}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Users Table - Mobile & Tablet */}
        <div className="lg:hidden space-y-[16px]">
          {filteredUsers.map((user) => (
            <div key={user.id} className="bg-[#0d0d0d] rounded-[12px] border border-[#1a1a1a] p-[16px] hover:bg-[#0f0f0f] transition-colors">
              {/* User Info */}
              <div className="flex items-center gap-[12px] mb-[16px]">
                <div className="bg-[#1a1a1a] rounded-full size-[40px] flex items-center justify-center shrink-0">
                  <p className="font-['Inter:Regular',sans-serif] text-[#d5ffd6] text-[16px] tracking-[-0.3125px]">
                    {user.initials}
                  </p>
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <p className="font-['Inter:Regular',sans-serif] text-[#d5ffd6] text-[16px] tracking-[-0.3125px] truncate">
                    {user.name}
                  </p>
                  <p className="font-['Inter:Regular',sans-serif] text-[#d5ffd6] text-[16px] tracking-[-0.3125px] truncate">
                    {user.email}
                  </p>
                </div>
              </div>

              {/* Details Grid */}
              <div className="space-y-[12px]">
                {/* Roles */}
                <div>
                  <p className="font-['Inter:Bold',sans-serif] font-bold text-[#d5ffd6] text-[12px] tracking-[0.4875px] uppercase mb-[8px]">
                    Roles / Groups
                  </p>
                  <div className="flex flex-wrap gap-[8px]">
                    {user.roles.map((role, index) => (
                      <div 
                        key={index}
                        className="bg-[rgba(15,95,60,0.3)] border border-[rgba(15,95,60,0.5)] px-[13px] py-[5px] rounded-full"
                      >
                        <p className="font-['Inter:Regular',sans-serif] text-[#00ff66] text-[16px] tracking-[-0.3125px]">
                          {role}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status and Last Login */}
                <div className="flex justify-between gap-[16px]">
                  <div>
                    <p className="font-['Inter:Bold',sans-serif] font-bold text-[#d5ffd6] text-[12px] tracking-[0.4875px] uppercase mb-[4px]">
                      Status
                    </p>
                    <p className="font-['Inter:Regular',sans-serif] text-[#00ff66] text-[16px] tracking-[-0.3125px]">
                      {user.status}
                    </p>
                  </div>
                  <div>
                    <p className="font-['Inter:Bold',sans-serif] font-bold text-[#d5ffd6] text-[12px] tracking-[0.4875px] uppercase mb-[4px]">
                      Last Login
                    </p>
                    <p className="font-['Inter:Regular',sans-serif] text-[#d5ffd6] text-[16px] tracking-[-0.3125px]">
                      {user.lastLogin}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-[24px] text-[#8F8F8F] font-['Inter:Regular',sans-serif] text-[14px]">
          Showing demo data. Replace with your backend or Firestore integration.
        </div>
      </div>
    </div>
  );
}