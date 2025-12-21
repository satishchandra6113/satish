import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Search, Bell, User, X, Clock, ArrowRight, History, Trash2, Home, Users, Monitor, Shield, Activity, CreditCard, FileText, Smartphone, AlertTriangle, ChevronDown, LogOut, UserCircle, Key, HelpCircle, Settings, Moon, Sun, Globe, Lock, Download, Zap, Wifi, MapPin, Check, ExternalLink } from 'lucide-react';

interface TopBarProps {
  onMenuToggle?: () => void;
  currentPageTitle: string;
  onNavigate?: (page: string) => void;
}

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: 'page' | 'user' | 'device' | 'action';
  icon: any;
  path?: string;
}

// Searchable items data
const searchableItems: SearchResult[] = [
  // Pages
  { id: 'page-dashboard', title: 'Dashboard', description: 'Overview and statistics', category: 'page', icon: Home, path: 'dashboard' },
  { id: 'page-users', title: 'Users', description: 'Manage user accounts', category: 'page', icon: Users, path: 'users' },
  { id: 'page-devices', title: 'Devices', description: 'Device management', category: 'page', icon: Monitor, path: 'devices' },
  { id: 'page-policies', title: 'Policies', description: 'Security policies', category: 'page', icon: FileText, path: 'policies' },
  { id: 'page-threats', title: 'Threats', description: 'Threat detection & alerts', category: 'page', icon: AlertTriangle, path: 'threats' },
  { id: 'page-billing', title: 'Billing', description: 'Subscription & payments', category: 'page', icon: CreditCard, path: 'billing' },
  { id: 'page-security', title: 'Security', description: 'Security settings', category: 'page', icon: Shield, path: 'security' },
  { id: 'page-activity', title: 'Activity', description: 'System activity logs', category: 'page', icon: Activity, path: 'activity' },
  // Users
  { id: 'user-1', title: 'Alex Johnson', description: 'alex@company.com • Admin', category: 'user', icon: User, path: 'users' },
  { id: 'user-2', title: 'Sarah Williams', description: 'sarah@company.com • Manager', category: 'user', icon: User, path: 'users' },
  { id: 'user-3', title: 'Mike Chen', description: 'mike@company.com • Developer', category: 'user', icon: User, path: 'users' },
  { id: 'user-4', title: 'Emma Davis', description: 'emma@company.com • Designer', category: 'user', icon: User, path: 'users' },
  // Devices
  { id: 'device-1', title: 'MacBook Pro - Alex', description: 'macOS 14.2 • Online', category: 'device', icon: Monitor, path: 'devices' },
  { id: 'device-2', title: 'iPhone 15 Pro', description: 'iOS 17.2 • Online', category: 'device', icon: Smartphone, path: 'devices' },
  { id: 'device-3', title: 'Windows Desktop', description: 'Windows 11 • Offline', category: 'device', icon: Monitor, path: 'devices' },
  // Quick Actions
  { id: 'action-1', title: 'Add New User', description: 'Create a new user account', category: 'action', icon: Users, path: 'users' },
  { id: 'action-2', title: 'Add New Device', description: 'Register a new device', category: 'action', icon: Monitor, path: 'devices' },
  { id: 'action-3', title: 'Run Security Scan', description: 'Scan for vulnerabilities', category: 'action', icon: Shield, path: 'threats' },
  { id: 'action-4', title: 'View Reports', description: 'Generate system reports', category: 'action', icon: Activity, path: 'activity' },
];

const categoryLabels: Record<string, string> = {
  page: 'Pages',
  user: 'Users',
  device: 'Devices',
  action: 'Quick Actions',
};

const categoryColors: Record<string, string> = {
  page: '#00FF66',
  user: '#60A5FA',
  device: '#A78BFA',
  action: '#FFCC00',
};

export function CybercykoTopBar({ currentPageTitle, onNavigate }: TopBarProps) {
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>(['Dashboard', 'Users', 'Devices', 'Security']);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchCloseTimerRef = useRef<number | null>(null);

  // Profile & Notifications state
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminModalTab, setAdminModalTab] = useState<'profile' | 'security' | 'sessions' | 'preferences'>('profile');
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  // User preferences
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [language, setLanguage] = useState('English');

  // Mock data
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'success', title: 'Device Approved', message: 'MacBook Pro has been approved.', time: '2 min ago', read: false },
    { id: 2, type: 'warning', title: 'Security Alert', message: 'Unusual login attempt detected.', time: '15 min ago', read: false },
    { id: 3, type: 'info', title: 'New User', message: 'John Doe joined the organization.', time: '1 hour ago', read: true },
  ]);

  const [sessions] = useState([
    { id: 1, device: 'MacBook Pro', browser: 'Chrome', location: 'New York, USA', current: true, lastActive: 'Now' },
    { id: 2, device: 'iPhone 15', browser: 'Safari', location: 'New York, USA', current: false, lastActive: '2 hours ago' },
    { id: 3, device: 'Windows PC', browser: 'Firefox', location: 'Los Angeles, USA', current: false, lastActive: '1 day ago' },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Open notifications and mark them read
  const openNotifications = () => {
    setShowNotifications(true);
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Filter search results
  const filteredResults = searchQuery.trim()
    ? searchableItems.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 8)
    : [];

  // Group results by category
  const groupedResults = filteredResults.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, SearchResult[]>);

  // Handle search selection
  const handleSearchSelect = (result: SearchResult) => {
    if (result.path && onNavigate) {
      onNavigate(result.path);
    }
    setRecentSearches(prev => {
      const filtered = prev.filter(s => s !== result.title);
      return [result.title, ...filtered].slice(0, 5);
    });
    setSearchQuery('');
    setShowSearch(false);
    setShowHistory(false);
  };

  // Handle recent search click
  const handleRecentSearchClick = (search: string) => {
    setSearchQuery(search);
    setShowHistory(false);
  };

  // Clear search history
  const clearRecentSearches = () => {
    setRecentSearches([]);
    setShowHistory(false);
  };

  // Keyboard navigation
  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    const totalResults = filteredResults.length;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % Math.max(totalResults, 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + Math.max(totalResults, 1)) % Math.max(totalResults, 1));
    } else if (e.key === 'Enter' && filteredResults[selectedIndex]) {
      e.preventDefault();
      handleSearchSelect(filteredResults[selectedIndex]);
    } else if (e.key === 'Escape') {
      setShowSearch(false);
      setSearchQuery('');
      setShowHistory(false);
    }
  };

  // Keyboard shortcut (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearch(true);
        setShowHistory(false);
        setTimeout(() => searchInputRef.current?.focus(), 100);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearch(false);
        setShowHistory(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

  // Open admin modal
  const openAdminModal = (tab: typeof adminModalTab) => {
    setAdminModalTab(tab);
    setShowAdminModal(true);
    setShowProfileMenu(false);
  };

  return (
    <div className="sticky top-0 z-[10001] bg-gradient-to-r from-[#0D0D0D]/95 to-[#050505]/95 backdrop-blur-[20px] border-b border-[#1A1A1A]">
      <div className="flex items-center justify-between px-[24px] py-[16px]">
        {/* Left: Title */}
        <div className="flex items-center gap-[16px]">
          <div>
            <h2 className="text-[16px] font-semibold text-[#D5FFD6]">Welcome back, Admin</h2>
          </div>
        </div>

        {/* Right: Search + Icons + Profile */}
        <div className="flex items-center gap-[16px]">
          {/* Search Bar with Dropdown */}
          <div
            className="relative"
            ref={searchRef}
            onMouseEnter={() => {
              if (searchCloseTimerRef.current) { window.clearTimeout(searchCloseTimerRef.current); searchCloseTimerRef.current = null; }
            }}
            onMouseLeave={() => {
              if (searchCloseTimerRef.current) window.clearTimeout(searchCloseTimerRef.current);
              searchCloseTimerRef.current = window.setTimeout(() => {
                if (searchInputRef.current !== document.activeElement) setShowHistory(false);
              }, 200) as unknown as number;
            }}
          >
            <div
              className={`hidden md:flex items-center gap-[8px] rounded-[12px] px-[16px] py-[10px] min-w-[320px] cursor-text transition-all duration-300 ${showSearch
                ? 'bg-[rgba(0,255,102,0.05)] border border-[#00FF66]/50 shadow-[0_0_20px_rgba(0,255,102,0.15)] min-w-[400px]'
                : 'bg-[rgba(255,255,255,0.05)] border border-[#1A1A1A] hover:border-[#2A2A2A]'
                }`}
              onClick={() => {
                setShowSearch(true);
                setShowHistory(false);
                setTimeout(() => searchInputRef.current?.focus(), 50);
              }}
            >
              <Search size={18} className={`transition-colors ${showSearch ? 'text-[#00FF66]' : 'text-[#8F8F8F]'}`} />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search pages, users, devices..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setShowHistory(false); }}
                onFocus={() => { setShowSearch(true); setShowHistory(false); if (searchCloseTimerRef.current) { window.clearTimeout(searchCloseTimerRef.current); searchCloseTimerRef.current = null; } }}
                onKeyDown={handleSearchKeyDown}
                className="bg-transparent border-none outline-none text-[14px] text-[#D5FFD6] placeholder:text-[#8F8F8F] w-full"
              />
              {searchQuery && (
                <button
                  onClick={(e) => { e.stopPropagation(); setSearchQuery(''); }}
                  className="p-[4px] rounded-[4px] text-[#5A5A5A] hover:bg-[#1A1A1A] hover:text-[#8F8F8F] transition-all"
                >
                  <X size={14} />
                </button>
              )}
              {recentSearches.length > 0 && !searchQuery && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (searchCloseTimerRef.current) { window.clearTimeout(searchCloseTimerRef.current); searchCloseTimerRef.current = null; }
                    setShowHistory(!showHistory);
                    setShowSearch(true);
                  }}
                  className={`p-[6px] rounded-[6px] transition-all ${showHistory
                    ? 'bg-[rgba(0,255,102,0.15)] text-[#00FF66]'
                    : 'text-[#5A5A5A] hover:bg-[#1A1A1A] hover:text-[#8F8F8F]'
                    }`}
                  title="Search History"
                >
                  <History size={14} />
                </button>
              )}
            </div>

            {/* Search Dropdown */}
            {showSearch && (searchQuery.trim() || showHistory) && (
              <div
                className="absolute left-0 top-full mt-[8px] w-[420px] bg-[#0A0A0A] border border-[#1A1A1A] rounded-[16px] shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden z-50"
                style={{ animation: 'fadeInDown 0.2s ease-out' }}
              >
                {searchQuery.trim() ? (
                  filteredResults.length > 0 ? (
                    <div className="max-h-[400px] overflow-y-auto py-[8px]">
                      {Object.entries(groupedResults).map(([category, items]) => (
                        <div key={category}>
                          <div className="flex items-center gap-[8px] px-[16px] py-[8px]">
                            <span className="w-[6px] h-[6px] rounded-full" style={{ backgroundColor: categoryColors[category] }} />
                            <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: categoryColors[category] }}>
                              {categoryLabels[category] || category}
                            </p>
                          </div>
                          {items.map((result) => {
                            const globalIndex = filteredResults.findIndex(r => r.id === result.id);
                            const Icon = result.icon;
                            const isSelected = selectedIndex === globalIndex;
                            return (
                              <button
                                key={result.id}
                                onClick={() => handleSearchSelect(result)}
                                className={`w-full flex items-center gap-[12px] px-[16px] py-[12px] text-left transition-all ${isSelected ? 'bg-[rgba(0,255,102,0.1)]' : 'hover:bg-[rgba(255,255,255,0.03)]'
                                  }`}
                              >
                                <div className={`w-[40px] h-[40px] rounded-[10px] flex items-center justify-center flex-shrink-0 transition-all ${isSelected ? 'bg-[rgba(0,255,102,0.15)]' : 'bg-[#1A1A1A]'
                                  }`}>
                                  <Icon size={18} className={isSelected ? 'text-[#00FF66]' : 'text-[#8F8F8F]'} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className={`text-[14px] font-medium truncate ${isSelected ? 'text-[#00FF66]' : 'text-[#D5FFD6]'}`}>
                                    {result.title}
                                  </p>
                                  <p className="text-[12px] text-[#5A5A5A] truncate">{result.description}</p>
                                </div>
                                {isSelected && <ArrowRight size={16} className="text-[#00FF66] flex-shrink-0" />}
                              </button>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-[40px] text-center">
                      <Search size={48} className="mx-auto mb-[16px] text-[#2A2A2A]" />
                      <p className="text-[15px] font-medium text-[#8F8F8F]">No results found</p>
                      <p className="text-[13px] text-[#5A5A5A] mt-[4px]">Try searching for pages, users, or devices</p>
                    </div>
                  )
                ) : showHistory && recentSearches.length > 0 ? (
                  <div className="py-[8px]">
                    <div className="flex items-center justify-between px-[16px] py-[8px]">
                      <p className="text-[10px] font-semibold text-[#5A5A5A] uppercase tracking-wider flex items-center gap-[6px]">
                        <Clock size={12} />
                        Recent Searches
                      </p>
                      <button
                        onClick={clearRecentSearches}
                        className="text-[10px] text-[#5A5A5A] hover:text-[#FF4444] transition-colors flex items-center gap-[4px]"
                      >
                        <Trash2 size={10} />
                        Clear All
                      </button>
                    </div>
                    {recentSearches.map((search, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleRecentSearchClick(search)}
                        className="w-full flex items-center gap-[12px] px-[16px] py-[12px] text-left text-[#8F8F8F] hover:bg-[rgba(0,255,102,0.05)] hover:text-[#00FF66] transition-all group"
                      >
                        <div className="w-[36px] h-[36px] rounded-[10px] bg-[#1A1A1A] group-hover:bg-[rgba(0,255,102,0.1)] flex items-center justify-center transition-all">
                          <Clock size={14} className="group-hover:text-[#00FF66]" />
                        </div>
                        <span className="text-[14px] flex-1">{search}</span>
                        <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                ) : null}

                <div className="px-[16px] py-[12px] border-t border-[#1A1A1A] bg-[rgba(0,0,0,0.3)]">
                  <div className="flex items-center justify-between text-[11px] text-[#5A5A5A]">
                    <div className="flex items-center gap-[16px]">
                      <span className="flex items-center gap-[4px]">
                        <kbd className="px-[5px] py-[2px] bg-[#1A1A1A] rounded text-[9px]">↑</kbd>
                        <kbd className="px-[5px] py-[2px] bg-[#1A1A1A] rounded text-[9px]">↓</kbd>
                        Navigate
                      </span>
                      <span className="flex items-center gap-[4px]">
                        <kbd className="px-[5px] py-[2px] bg-[#1A1A1A] rounded text-[9px]">↵</kbd>
                        Select
                      </span>
                      <span className="flex items-center gap-[4px]">
                        <kbd className="px-[8px] py-[2px] bg-[#1A1A1A] rounded text-[9px]">Esc</kbd>
                        Close
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Notification Icon with Dropdown */}
          <div
            className="relative z-[10002]"
            ref={notificationRef}
            onMouseEnter={() => openNotifications()}
            onMouseLeave={() => setShowNotifications(false)}
          >
            <button
              onClick={() => openNotifications()}
              className={`relative p-[10px] rounded-[10px] border transition-all ${showNotifications
                ? 'bg-[rgba(0,255,102,0.1)] border-[#00FF66] text-[#00FF66]'
                : 'bg-[rgba(255,255,255,0.05)] border-[#1A1A1A] text-[#8F8F8F] hover:bg-[rgba(0,255,102,0.1)] hover:border-[#00FF66] hover:text-[#00FF66]'
                }`}
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-[2px] -right-[2px] min-w-[18px] h-[18px] px-[4px] bg-[#FF4444] rounded-full border-2 border-[#0D0D0D] flex items-center justify-center text-[10px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <>
                <div className="absolute right-0 top-full h-[8px] w-[300px]" />
                <div
                  className="absolute right-0 top-full mt-[8px] w-[300px] bg-[#0A0A0A] border border-[#00FF66] rounded-[16px] shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden z-[10000]"
                  style={{ animation: 'fadeInDown 0.2s ease-out' }}
                >
                  <div className="p-[16px] border-b border-[#1A1A1A] bg-gradient-to-r from-[rgba(0,255,102,0.1)] to-transparent">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[14px] font-semibold text-[#D5FFD6]">Notifications</h3>
                      {unreadCount > 0 && (
                        <span className="px-[8px] py-[2px] bg-[#00FF66]/20 text-[#00FF66] text-[10px] font-semibold rounded-full">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="max-h-[300px] overflow-y-auto">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`px-[16px] py-[12px] border-l-2 hover:bg-[rgba(255,255,255,0.02)] transition-all cursor-pointer ${notif.read ? 'border-transparent' : 'border-[#00FF66]'
                          }`}
                      >
                        <p className={`text-[13px] font-medium ${notif.read ? 'text-[#8F8F8F]' : 'text-[#D5FFD6]'}`}>
                          {notif.title}
                        </p>
                        <p className="text-[12px] text-[#5A5A5A] mt-[2px]">{notif.message}</p>
                        <p className="text-[10px] text-[#5A5A5A] mt-[4px]">{notif.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-[12px] border-t border-[#1A1A1A]">
                    <button className="w-full py-[8px] text-center text-[12px] font-medium text-[#00FF66] hover:bg-[rgba(0,255,102,0.1)] rounded-[8px] transition-all">
                      View all notifications
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* User Profile with Enhanced Dropdown */}
          <div
            className="relative z-[10002]"
            ref={profileRef}
            onMouseEnter={() => setShowProfileMenu(true)}
            onMouseLeave={() => setShowProfileMenu(false)}
          >
            <div
              className={`flex items-center gap-[12px] pl-[16px] border-l border-[#1A1A1A] cursor-pointer transition-all ${showProfileMenu ? 'opacity-100' : 'hover:opacity-80'
                }`}
            >
              <div className="text-right hidden sm:block">
                <p className={`text-[12px] font-medium transition-colors ${showProfileMenu ? 'text-[#00FF66]' : 'text-[#D5FFD6]'}`}>Admin User</p>
                <p className="text-[10px] text-[#8F8F8F]">Admin@cybercyko.com</p>
              </div>
              <div className="relative">
                <div className={`w-[40px] h-[40px] rounded-[12px] bg-gradient-to-br from-[#00FF66] to-[#00CC52] flex items-center justify-center border-2 transition-all ${showProfileMenu ? 'border-[#00FF66] scale-105' : 'border-[#1A1A1A]'
                  }`}>
                  <User size={20} className="text-[#050505]" />
                </div>
                {/* Online indicator */}
                <span className="absolute -bottom-[2px] -right-[2px] w-[12px] h-[12px] bg-[#00FF66] rounded-full border-2 border-[#0D0D0D]" />
              </div>
              <ChevronDown size={16} className={`text-[#8F8F8F] transition-transform ${showProfileMenu ? 'rotate-180 text-[#00FF66]' : ''}`} />
            </div>

            {/* Enhanced Profile Dropdown */}
            {showProfileMenu && (
              <>
                <div className="absolute right-0 top-full h-[8px] w-[300px]" />
                <div
                  className="absolute right-0 top-full mt-[8px] w-[300px] bg-[#0A0A0A] border border-[#00FF66] rounded-[16px] shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden max-h-[80vh] overflow-y-auto z-[10000]"
                  style={{ animation: 'fadeInDown 0.2s ease-out' }}
                >
                  {/* Profile Header */}
                  <div className="p-[14px] border-b border-[#1A1A1A] bg-gradient-to-br from-[rgba(0,255,102,0.15)] via-[rgba(0,255,102,0.05)] to-transparent">
                    <div className="flex items-center gap-[12px]">
                      <div className="relative">
                        <div className="w-[48px] h-[48px] rounded-[12px] bg-gradient-to-br from-[#00FF66] to-[#00CC52] flex items-center justify-center shadow-[0_4px_16px_rgba(0,255,102,0.3)]">
                          <User size={24} className="text-[#050505]" />
                        </div>
                        <span className="absolute -bottom-1 -right-1 w-[14px] h-[14px] bg-[#00FF66] rounded-full border-2 border-[#0A0A0A] flex items-center justify-center">
                          <Check size={8} className="text-[#050505]" />
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[15px] font-semibold text-[#D5FFD6]">Admin User</p>
                        <p className="text-[11px] text-[#8F8F8F] truncate">Admin@cybercyko.com</p>
                        <span className="inline-flex items-center gap-[4px] px-[6px] py-[2px] bg-[#00FF66]/20 text-[#00FF66] text-[9px] font-semibold rounded-full mt-[4px]">
                          <Shield size={9} />
                          Administrator
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions Grid */}
                  <div className="p-[10px] border-b border-[#1A1A1A]">
                    <div className="grid grid-cols-3 gap-[6px]">
                      {[
                        { icon: UserCircle, label: 'Profile', action: () => openAdminModal('profile') },
                        { icon: Settings, label: 'Settings', action: () => openAdminModal('preferences') },
                        { icon: Activity, label: 'Activity', action: () => onNavigate?.('activity') },
                      ].map((item) => (
                        <button
                          key={item.label}
                          onClick={item.action}
                          className="flex flex-col items-center gap-[4px] p-[10px] rounded-[8px] bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(0,255,102,0.1)] border border-[#1A1A1A] hover:border-[#00FF66]/30 transition-all group"
                        >
                          <item.icon size={16} className="text-[#8F8F8F] group-hover:text-[#00FF66]" />
                          <span className="text-[9px] text-[#8F8F8F] group-hover:text-[#00FF66]">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-[6px]">
                    {[
                      { icon: Key, label: 'Security', badge: twoFactorEnabled ? '2FA' : null, badgeColor: '#00FF66', action: () => openAdminModal('security') },
                      { icon: Smartphone, label: 'Sessions', badge: `${sessions.length}`, badgeColor: '#60A5FA', action: () => openAdminModal('sessions') },
                      { icon: Globe, label: 'Language', value: language, action: () => openAdminModal('preferences') },
                      { icon: Download, label: 'Download Data', action: () => { } },
                      { icon: HelpCircle, label: 'Help', external: true, action: () => { } },
                    ].map((item) => (
                      <button
                        key={item.label}
                        onClick={item.action}
                        className="w-full flex items-center gap-[10px] px-[12px] py-[9px] text-[#8F8F8F] hover:bg-[rgba(0,255,102,0.05)] hover:text-[#00FF66] transition-all group"
                      >
                        <div className="w-[28px] h-[28px] rounded-[6px] bg-[#1A1A1A] group-hover:bg-[rgba(0,255,102,0.15)] flex items-center justify-center transition-all">
                          <item.icon size={14} />
                        </div>
                        <span className="text-[12px] flex-1 text-left">{item.label}</span>
                        {item.badge && (
                          <span className="px-[6px] py-[1px] rounded-full text-[9px] font-semibold" style={{ backgroundColor: `${item.badgeColor}20`, color: item.badgeColor }}>
                            {item.badge}
                          </span>
                        )}
                        {item.value && (
                          <span className="text-[10px] text-[#5A5A5A]">{item.value}</span>
                        )}
                        {item.external && (
                          <ExternalLink size={10} className="text-[#5A5A5A]" />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Sign Out */}
                  <div className="border-t border-[#1A1A1A] p-[6px]">
                    <button className="w-full flex items-center gap-[10px] px-[10px] py-[8px] text-[#FF4444] hover:bg-[rgba(255,68,68,0.1)] rounded-[6px] transition-all group">
                      <div className="w-[28px] h-[28px] rounded-[6px] bg-[rgba(255,68,68,0.1)] group-hover:bg-[rgba(255,68,68,0.2)] flex items-center justify-center transition-all">
                        <LogOut size={14} />
                      </div>
                      <span className="text-[12px] font-medium">Sign Out</span>
                      <kbd className="ml-auto px-[5px] py-[1px] bg-[rgba(255,68,68,0.1)] rounded text-[8px] font-mono text-[#FF4444]">⌘Q</kbd>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Admin Modal - Using Portal to render outside sticky container */}
      {showAdminModal && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-6" onClick={() => setShowAdminModal(false)}>
          <div
            className="bg-[#0A0A0A] rounded-[20px] w-full max-w-[480px] border border-[#1A1A1A] shadow-2xl overflow-hidden max-h-[80vh] flex flex-col"
            onClick={e => e.stopPropagation()}
            style={{ animation: 'fadeInUp 0.2s ease-out' }}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-[20px] border-b border-[#1A1A1A] bg-gradient-to-r from-[rgba(0,255,102,0.1)] to-transparent">
              <div className="flex items-center gap-[12px]">
                <div className="w-[44px] h-[44px] rounded-[12px] bg-gradient-to-br from-[#00FF66] to-[#00CC52] flex items-center justify-center">
                  <User size={22} className="text-[#050505]" />
                </div>
                <div>
                  <p className="text-[16px] font-semibold text-white">Admin User</p>
                  <p className="text-[12px] text-[#8F8F8F]">Manage your account</p>
                </div>
              </div>
              <button
                onClick={() => setShowAdminModal(false)}
                className="p-[8px] rounded-[8px] text-[#8F8F8F] hover:bg-[#1A1A1A] hover:text-white transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-[#1A1A1A] px-[20px]">
              {[
                { id: 'profile' as const, label: 'Profile', icon: User },
                { id: 'security' as const, label: 'Security', icon: Shield },
                { id: 'sessions' as const, label: 'Sessions', icon: Smartphone },
                { id: 'preferences' as const, label: 'Preferences', icon: Settings },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setAdminModalTab(tab.id)}
                  className={`flex items-center gap-[6px] px-[16px] py-[14px] text-[13px] font-medium border-b-2 transition-all ${adminModalTab === tab.id
                    ? 'text-[#00FF66] border-[#00FF66]'
                    : 'text-[#8F8F8F] border-transparent hover:text-white'
                    }`}
                >
                  <tab.icon size={14} />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Modal Content */}
            <div className="p-[20px] flex-1 overflow-y-auto">
              {adminModalTab === 'profile' && (
                <div className="space-y-[16px]">
                  <div>
                    <label className="block text-[11px] text-[#8F8F8F] uppercase tracking-wider mb-[8px]">Full Name</label>
                    <input
                      type="text"
                      defaultValue="Admin User"
                      className="w-full bg-[#0F0F0F] border border-[#1A1A1A] rounded-[10px] px-[14px] py-[12px] text-white text-[14px] focus:outline-none focus:border-[#00FF66] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#8F8F8F] uppercase tracking-wider mb-[8px]">Email Address</label>
                    <input
                      type="email"
                      defaultValue="admin@cybercyko.com"
                      className="w-full bg-[#0F0F0F] border border-[#1A1A1A] rounded-[10px] px-[14px] py-[12px] text-white text-[14px] focus:outline-none focus:border-[#00FF66] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#8F8F8F] uppercase tracking-wider mb-[8px]">Role</label>
                    <div className="px-[14px] py-[12px] bg-[#0F0F0F] border border-[#1A1A1A] rounded-[10px] text-[14px] text-[#00FF66] flex items-center gap-[8px]">
                      <Shield size={16} />
                      Administrator
                    </div>
                  </div>
                  <button className="w-full py-[12px] bg-[#00FF66] text-[#050505] text-[14px] font-semibold rounded-[10px] hover:bg-[#00DD55] transition-all mt-[8px]">
                    Save Changes
                  </button>
                </div>
              )}

              {adminModalTab === 'security' && (
                <div className="space-y-[16px]">
                  {/* 2FA */}
                  <div className="p-[16px] bg-[#0F0F0F] border border-[#1A1A1A] rounded-[12px]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-[12px]">
                        <div className={`w-[40px] h-[40px] rounded-[10px] flex items-center justify-center ${twoFactorEnabled ? 'bg-[rgba(0,255,102,0.15)]' : 'bg-[#1A1A1A]'}`}>
                          <Lock size={18} className={twoFactorEnabled ? 'text-[#00FF66]' : 'text-[#8F8F8F]'} />
                        </div>
                        <div>
                          <p className="text-[14px] font-medium text-white">Two-Factor Authentication</p>
                          <p className="text-[12px] text-[#8F8F8F]">{twoFactorEnabled ? 'Enabled' : 'Disabled'}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                        className={`relative w-[48px] h-[26px] rounded-full transition-all ${twoFactorEnabled ? 'bg-[#00FF66]' : 'bg-[#2A2A2A]'}`}
                      >
                        <div className={`absolute top-[3px] w-[20px] h-[20px] rounded-full bg-white shadow transition-transform ${twoFactorEnabled ? 'translate-x-[25px]' : 'translate-x-[3px]'}`} />
                      </button>
                    </div>
                  </div>

                  {/* Change Password */}
                  <div>
                    <p className="text-[11px] text-[#8F8F8F] uppercase tracking-wider mb-[12px]">Change Password</p>
                    <div className="space-y-[10px]">
                      <input type="password" placeholder="Current password" className="w-full bg-[#0F0F0F] border border-[#1A1A1A] rounded-[10px] px-[14px] py-[12px] text-white text-[14px] focus:outline-none focus:border-[#00FF66]" />
                      <input type="password" placeholder="New password" className="w-full bg-[#0F0F0F] border border-[#1A1A1A] rounded-[10px] px-[14px] py-[12px] text-white text-[14px] focus:outline-none focus:border-[#00FF66]" />
                      <input type="password" placeholder="Confirm new password" className="w-full bg-[#0F0F0F] border border-[#1A1A1A] rounded-[10px] px-[14px] py-[12px] text-white text-[14px] focus:outline-none focus:border-[#00FF66]" />
                      <button className="w-full py-[12px] bg-[#00FF66] text-[#050505] text-[14px] font-semibold rounded-[10px] hover:bg-[#00DD55] transition-all">
                        Update Password
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {adminModalTab === 'sessions' && (
                <div className="space-y-[12px]">
                  {sessions.map((session) => (
                    <div
                      key={session.id}
                      className={`p-[14px] rounded-[12px] border ${session.current ? 'bg-[rgba(0,255,102,0.05)] border-[#00FF66]/30' : 'bg-[#0F0F0F] border-[#1A1A1A]'}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-[12px]">
                          <div className={`w-[40px] h-[40px] rounded-[10px] flex items-center justify-center ${session.current ? 'bg-[rgba(0,255,102,0.15)]' : 'bg-[#1A1A1A]'}`}>
                            {session.device.includes('iPhone') ? <Smartphone size={18} className={session.current ? 'text-[#00FF66]' : 'text-[#8F8F8F]'} /> : <Monitor size={18} className={session.current ? 'text-[#00FF66]' : 'text-[#8F8F8F]'} />}
                          </div>
                          <div>
                            <div className="flex items-center gap-[8px]">
                              <p className="text-[14px] font-medium text-white">{session.device}</p>
                              {session.current && <span className="px-[6px] py-[2px] bg-[#00FF66]/20 text-[#00FF66] text-[9px] font-bold rounded-full">Current</span>}
                            </div>
                            <p className="text-[12px] text-[#8F8F8F]">{session.browser} • {session.location}</p>
                            <p className="text-[11px] text-[#5A5A5A]">{session.lastActive}</p>
                          </div>
                        </div>
                        {!session.current && (
                          <button className="px-[12px] py-[6px] text-[12px] text-[#FF4444] hover:bg-[rgba(255,68,68,0.1)] rounded-[6px] transition-all">
                            Revoke
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  <button className="w-full py-[10px] text-[#FF4444] text-[13px] font-medium bg-[rgba(255,68,68,0.05)] hover:bg-[rgba(255,68,68,0.1)] border border-[#FF4444]/20 rounded-[10px] transition-all mt-[8px]">
                    Sign Out All Other Devices
                  </button>
                </div>
              )}

              {adminModalTab === 'preferences' && (
                <div className="space-y-[16px]">
                  {/* Language */}
                  <div>
                    <p className="text-[11px] text-[#8F8F8F] uppercase tracking-wider mb-[10px]">Language</p>
                    <div className="grid grid-cols-3 gap-[8px]">
                      {['English', 'Spanish', 'French', 'German', 'Japanese', 'Chinese'].map((lang) => (
                        <button
                          key={lang}
                          onClick={() => setLanguage(lang)}
                          className={`px-[12px] py-[10px] rounded-[8px] text-[12px] font-medium transition-all ${language === lang
                            ? 'bg-[#00FF66] text-[#050505]'
                            : 'bg-[#0F0F0F] border border-[#1A1A1A] text-[#8F8F8F] hover:border-[#2A2A2A]'
                            }`}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Theme */}
                  <div className="flex items-center justify-between p-[14px] bg-[#0F0F0F] border border-[#1A1A1A] rounded-[12px]">
                    <div className="flex items-center gap-[10px]">
                      {isDarkMode ? <Moon size={18} className="text-[#8F8F8F]" /> : <Sun size={18} className="text-[#FFCC00]" />}
                      <span className="text-[14px] text-white">Dark Mode</span>
                    </div>
                    <button
                      onClick={() => setIsDarkMode(!isDarkMode)}
                      className={`relative w-[48px] h-[26px] rounded-full transition-all ${isDarkMode ? 'bg-[#00FF66]' : 'bg-[#2A2A2A]'}`}
                    >
                      <div className={`absolute top-[3px] w-[20px] h-[20px] rounded-full bg-white shadow transition-transform ${isDarkMode ? 'translate-x-[25px]' : 'translate-x-[3px]'}`} />
                    </button>
                  </div>

                  {/* Download Data */}
                  <button className="w-full flex items-center justify-center gap-[8px] py-[12px] bg-[#0F0F0F] border border-[#1A1A1A] text-white text-[14px] font-medium rounded-[10px] hover:bg-[#1A1A1A] transition-all">
                    <Download size={16} />
                    Download My Data
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}

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
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
