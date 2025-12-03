import { useState, useRef, useEffect } from 'react';
import { Search, Bell, Settings, User, LogOut, UserCircle, Shield, Key, HelpCircle, ChevronDown, Check, Trash2, AlertCircle, Info, CheckCircle, AlertTriangle, Moon, Sun, Globe, Smartphone, Monitor, Keyboard, Download, Activity, Lock, Eye, EyeOff, Copy, X, Zap, Clock, MapPin, Wifi, Home, CreditCard, FileCheck, Users, ArrowRight, History } from 'lucide-react';

interface Notification {
  id: number;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: 'page' | 'user' | 'device' | 'policy' | 'action';
  icon: any;
  path?: string;
  action?: () => void;
}

// Search data
const searchableItems: SearchResult[] = [
  // Pages
  { id: 'page-dashboard', title: 'Dashboard', description: 'Overview and statistics', category: 'page', icon: Home, path: 'dashboard' },
  { id: 'page-users', title: 'Users', description: 'Manage user accounts', category: 'page', icon: Users, path: 'users' },
  { id: 'page-devices', title: 'Devices', description: 'Device management', category: 'page', icon: Monitor, path: 'devices' },
  { id: 'page-policies', title: 'Policies', description: 'Security policies', category: 'page', icon: FileCheck, path: 'policies' },
  { id: 'page-threats', title: 'Threats', description: 'Threat detection', category: 'page', icon: AlertTriangle, path: 'threats' },
  { id: 'page-billing', title: 'Billing', description: 'Insurance & billing', category: 'page', icon: CreditCard, path: 'billing' },
  { id: 'page-security', title: 'Security Settings', description: 'Account security', category: 'page', icon: Shield, path: 'security' },
  { id: 'page-activity', title: 'Activity Logs', description: 'System activity', category: 'page', icon: Activity, path: 'activity' },
  // Users
  { id: 'user-1', title: 'John Smith', description: 'john.smith@company.com • Admin', category: 'user', icon: User, path: 'users' },
  { id: 'user-2', title: 'Sarah Johnson', description: 'sarah.j@company.com • Manager', category: 'user', icon: User, path: 'users' },
  { id: 'user-3', title: 'Mike Wilson', description: 'mike.w@company.com • Developer', category: 'user', icon: User, path: 'users' },
  { id: 'user-4', title: 'Emily Davis', description: 'emily.d@company.com • Designer', category: 'user', icon: User, path: 'users' },
  { id: 'user-5', title: 'Alex Brown', description: 'alex.b@company.com • Analyst', category: 'user', icon: User, path: 'users' },
  // Devices
  { id: 'device-1', title: 'MacBook Pro - John', description: 'macOS • Active', category: 'device', icon: Monitor, path: 'devices' },
  { id: 'device-2', title: 'iPhone 15 Pro', description: 'iOS 17 • Active', category: 'device', icon: Smartphone, path: 'devices' },
  { id: 'device-3', title: 'Windows Desktop', description: 'Windows 11 • Inactive', category: 'device', icon: Monitor, path: 'devices' },
  { id: 'device-4', title: 'Samsung Galaxy S24', description: 'Android 14 • Active', category: 'device', icon: Smartphone, path: 'devices' },
  // Policies
  { id: 'policy-1', title: 'Password Policy', description: 'Security • Active', category: 'policy', icon: Key, path: 'policies' },
  { id: 'policy-2', title: 'Device Enrollment', description: 'Access • Active', category: 'policy', icon: FileCheck, path: 'policies' },
  { id: 'policy-3', title: 'Data Protection', description: 'Compliance • Active', category: 'policy', icon: Shield, path: 'policies' },
  // Actions
  { id: 'action-1', title: 'Add New User', description: 'Create a new user account', category: 'action', icon: Users, path: 'users' },
  { id: 'action-2', title: 'Add New Device', description: 'Register a new device', category: 'action', icon: Monitor, path: 'devices' },
  { id: 'action-3', title: 'Create Policy', description: 'Create a new security policy', category: 'action', icon: FileCheck, path: 'policies' },
  { id: 'action-4', title: 'Run Security Scan', description: 'Scan for threats', category: 'action', icon: Shield, path: 'threats' },
  { id: 'action-5', title: 'Export Data', description: 'Download reports', category: 'action', icon: Download, path: 'activity' },
];

interface TopBarProps {
  onMenuToggle?: () => void;
  currentPageTitle: string;
  onNavigate?: (page: string) => void;
}

export function CybercykoTopBar({ currentPageTitle, onNavigate }: TopBarProps) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminModalTab, setAdminModalTab] = useState<'profile' | 'security' | 'sessions' | 'preferences' | 'help'>('profile');
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>(['Dashboard', 'Users', 'Security']);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // User preferences
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [language, setLanguage] = useState('English');

  // Open admin modal with specific tab
  const openAdminModal = (tab: typeof adminModalTab = 'profile') => {
    setAdminModalTab(tab);
    setShowAdminModal(true);
    setShowProfileMenu(false);
  };

  // Search functionality
  const filteredResults = searchQuery.trim()
    ? searchableItems.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 8)
    : [];

  const groupedResults = filteredResults.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, SearchResult[]>);

  const categoryLabels: Record<string, string> = {
    page: 'Pages',
    user: 'Users',
    device: 'Devices',
    policy: 'Policies',
    action: 'Quick Actions',
  };

  const handleSearchSelect = (result: SearchResult) => {
    if (result.path) {
      onNavigate?.(result.path);
    }
    if (result.action) {
      result.action();
    }
    // Add to recent searches
    setRecentSearches(prev => {
      const filtered = prev.filter(s => s !== result.title);
      return [result.title, ...filtered].slice(0, 5);
    });
    setSearchQuery('');
    setShowSearch(false);
    setShowHistory(false);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    setShowHistory(false);
  };

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
    }
  };

  // Keyboard shortcut for search (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearch(true);
        setTimeout(() => searchInputRef.current?.focus(), 100);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearch(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);
  
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, type: 'success', title: 'Device Approved', message: 'MacBook Pro has been approved and added to the system.', time: '2 min ago', read: false },
    { id: 2, type: 'warning', title: 'Security Alert', message: 'Unusual login attempt detected from IP 192.168.1.45', time: '15 min ago', read: false },
    { id: 3, type: 'info', title: 'New User Registered', message: 'John Doe has joined the organization.', time: '1 hour ago', read: false },
    { id: 4, type: 'error', title: 'Compliance Issue', message: '3 devices are non-compliant with security policies.', time: '2 hours ago', read: true },
    { id: 5, type: 'success', title: 'Backup Complete', message: 'System backup completed successfully.', time: '3 hours ago', read: true },
  ]);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Handle mouse enter - open immediately
  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setShowProfileMenu(true);
  };

  // Handle mouse leave - close with small delay
  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setShowProfileMenu(false);
    }, 150);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Notification functions
  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success': return <CheckCircle size={16} className="text-[#00FF66]" />;
      case 'warning': return <AlertTriangle size={16} className="text-[#FFB800]" />;
      case 'error': return <AlertCircle size={16} className="text-[#FF4444]" />;
      default: return <Info size={16} className="text-[#60A5FA]" />;
    }
  };

  const getNotificationBg = (type: Notification['type']) => {
    switch (type) {
      case 'success': return 'bg-[rgba(0,255,102,0.1)]';
      case 'warning': return 'bg-[rgba(255,184,0,0.1)]';
      case 'error': return 'bg-[rgba(255,68,68,0.1)]';
      default: return 'bg-[rgba(96,165,250,0.1)]';
    }
  };

  const profileMenuItems = [
    { icon: UserCircle, label: 'My Profile', action: () => openAdminModal('profile') },
    { icon: Shield, label: 'Security', action: () => openAdminModal('security') },
    { icon: Smartphone, label: 'Sessions', action: () => openAdminModal('sessions'), badge: '3' },
    { icon: Settings, label: 'Preferences', action: () => openAdminModal('preferences') },
    { icon: HelpCircle, label: 'Help', action: () => openAdminModal('help') },
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
          {/* Search Bar with Dropdown */}
          <div className="relative" ref={searchRef}>
            <div 
              className={`hidden md:flex items-center gap-[8px] rounded-[12px] px-[16px] py-[10px] min-w-[300px] cursor-text transition-all ${
                showSearch 
                  ? 'bg-[rgba(0,255,102,0.05)] border border-[#00FF66]/50 shadow-[0_0_20px_rgba(0,255,102,0.1)]' 
                  : 'bg-[rgba(255,255,255,0.05)] border border-[#1A1A1A] hover:border-[#2A2A2A]'
              }`}
              onClick={() => {
                setShowSearch(true);
                setShowHistory(false);
                setTimeout(() => searchInputRef.current?.focus(), 50);
              }}
            >
              <Search size={18} className={showSearch ? 'text-[#00FF66]' : 'text-[#8F8F8F]'} />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setShowHistory(false); }}
                onFocus={() => { setShowSearch(true); setShowHistory(false); }}
                onKeyDown={handleSearchKeyDown}
                className="bg-transparent border-none outline-none text-[14px] text-[#D5FFD6] placeholder:text-[#8F8F8F] w-full"
              />
              {/* History Icon Button */}
              {recentSearches.length > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowHistory(!showHistory);
                    setShowSearch(true);
                  }}
                  className={`p-[6px] rounded-[6px] transition-all ${
                    showHistory 
                      ? 'bg-[rgba(0,255,102,0.15)] text-[#00FF66]' 
                      : 'text-[#5A5A5A] hover:bg-[#1A1A1A] hover:text-[#8F8F8F]'
                  }`}
                  title="Search History"
                >
                  <History size={14} />
                </button>
              )}
              <div className="flex items-center gap-[4px] text-[#5A5A5A] text-[11px]">
                <kbd className="px-[6px] py-[2px] bg-[#1A1A1A] rounded-[4px] font-mono text-[10px]">⌘</kbd>
                <kbd className="px-[6px] py-[2px] bg-[#1A1A1A] rounded-[4px] font-mono text-[10px]">K</kbd>
              </div>
            </div>

            {/* Search Dropdown - Only shows when typing or viewing history */}
            {showSearch && (searchQuery.trim() || showHistory) && (
              <div 
                className="absolute right-0 top-full mt-[8px] w-[420px] bg-[#0F0F0F]/98 backdrop-blur-xl border border-[#1A1A1A] rounded-[16px] shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden"
                style={{ animation: 'fadeInDown 0.2s ease-out' }}
              >
                {/* Search Results */}
                {searchQuery.trim() ? (
                  filteredResults.length > 0 ? (
                    <div className="max-h-[400px] overflow-y-auto py-[8px]">
                      {Object.entries(groupedResults).map(([category, items]) => (
                        <div key={category}>
                          <p className="px-[16px] py-[6px] text-[10px] font-semibold text-[#5A5A5A] uppercase tracking-wider">
                            {categoryLabels[category] || category}
                          </p>
                          {items.map((result, idx) => {
                            const globalIndex = filteredResults.findIndex(r => r.id === result.id);
                            const Icon = result.icon;
                            return (
                              <button
                                key={result.id}
                                onClick={() => handleSearchSelect(result)}
                                className={`w-full flex items-center gap-[12px] px-[16px] py-[10px] text-left transition-all ${
                                  selectedIndex === globalIndex
                                    ? 'bg-[rgba(0,255,102,0.1)] text-[#00FF66]'
                                    : 'text-[#D5FFD6] hover:bg-[rgba(255,255,255,0.03)]'
                                }`}
                              >
                                <div className={`w-[36px] h-[36px] rounded-[10px] flex items-center justify-center flex-shrink-0 ${
                                  selectedIndex === globalIndex ? 'bg-[rgba(0,255,102,0.15)]' : 'bg-[#1A1A1A]'
                                }`}>
                                  <Icon size={16} className={selectedIndex === globalIndex ? 'text-[#00FF66]' : 'text-[#8F8F8F]'} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-[13px] font-medium truncate">{result.title}</p>
                                  <p className="text-[11px] text-[#5A5A5A] truncate">{result.description}</p>
                                </div>
                                {selectedIndex === globalIndex && (
                                  <ArrowRight size={14} className="text-[#00FF66] flex-shrink-0" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-[32px] text-center">
                      <Search size={40} className="mx-auto mb-[12px] text-[#2A2A2A]" />
                      <p className="text-[14px] text-[#8F8F8F]">No results found</p>
                      <p className="text-[12px] text-[#5A5A5A]">Try searching for pages, users, or devices</p>
                    </div>
                  )
                ) : showHistory && recentSearches.length > 0 ? (
                  /* History View - Only shown when history icon is clicked */
                  <div className="py-[8px]">
                    <div className="flex items-center justify-between px-[16px] py-[6px]">
                      <p className="text-[10px] font-semibold text-[#5A5A5A] uppercase tracking-wider flex items-center gap-[6px]">
                        <History size={12} />
                        Search History
                      </p>
                      <button 
                        onClick={clearRecentSearches}
                        className="text-[10px] text-[#5A5A5A] hover:text-[#FF4444] transition-colors flex items-center gap-[4px]"
                      >
                        <Trash2 size={10} />
                        Clear
                      </button>
                    </div>
                    {recentSearches.map((search, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSearchQuery(search);
                          setShowHistory(false);
                        }}
                        className="w-full flex items-center gap-[12px] px-[16px] py-[10px] text-left text-[#8F8F8F] hover:bg-[rgba(0,255,102,0.05)] hover:text-[#00FF66] transition-all group"
                      >
                        <div className="w-[32px] h-[32px] rounded-[8px] bg-[#1A1A1A] group-hover:bg-[rgba(0,255,102,0.1)] flex items-center justify-center transition-all">
                          <Clock size={14} className="group-hover:text-[#00FF66]" />
                        </div>
                        <span className="text-[13px]">{search}</span>
                        <ArrowRight size={12} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                ) : null}

                {/* Footer */}
                <div className="px-[16px] py-[10px] border-t border-[#1A1A1A] bg-[rgba(0,0,0,0.3)]">
                  <div className="flex items-center justify-between text-[10px] text-[#5A5A5A]">
                    <div className="flex items-center gap-[12px]">
                      <span className="flex items-center gap-[4px]">
                        <kbd className="px-[4px] py-[1px] bg-[#1A1A1A] rounded text-[9px]">↑</kbd>
                        <kbd className="px-[4px] py-[1px] bg-[#1A1A1A] rounded text-[9px]">↓</kbd>
                        Navigate
                      </span>
                      <span className="flex items-center gap-[4px]">
                        <kbd className="px-[4px] py-[1px] bg-[#1A1A1A] rounded text-[9px]">↵</kbd>
                        Select
                      </span>
                      <span className="flex items-center gap-[4px]">
                        <kbd className="px-[6px] py-[1px] bg-[#1A1A1A] rounded text-[9px]">Esc</kbd>
                        Close
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Notification Icon with Dropdown */}
          <div className="relative" ref={notificationRef}>
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className={`relative p-[10px] rounded-[10px] border transition-all ${
                showNotifications 
                  ? 'bg-[rgba(0,255,102,0.1)] border-[#00FF66] text-[#00FF66]' 
                  : 'bg-[rgba(255,255,255,0.05)] border-[#1A1A1A] text-[#8F8F8F] hover:bg-[rgba(0,255,102,0.1)] hover:border-[#00FF66] hover:text-[#00FF66]'
              }`}
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-[2px] -right-[2px] min-w-[18px] h-[18px] px-[4px] bg-[#FF4444] rounded-full border-2 border-[#0D0D0D] flex items-center justify-center text-[10px] font-bold text-white">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div 
                className="absolute right-0 top-full mt-[8px] w-[380px] bg-[#0F0F0F]/95 backdrop-blur-xl border border-[#1A1A1A] rounded-[16px] shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden"
                style={{ animation: 'fadeInDown 0.2s ease-out' }}
              >
                {/* Header */}
                <div className="p-[16px] border-b border-[#1A1A1A] bg-gradient-to-r from-[rgba(0,255,102,0.1)] to-transparent">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-[10px]">
                      <Bell size={18} className="text-[#00FF66]" />
                      <h3 className="text-[15px] font-semibold text-[#D5FFD6]">Notifications</h3>
                      {unreadCount > 0 && (
                        <span className="px-[8px] py-[2px] bg-[#00FF66]/20 text-[#00FF66] text-[11px] font-semibold rounded-full">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-[8px]">
                      {unreadCount > 0 && (
                        <button 
                          onClick={markAllAsRead}
                          className="p-[6px] rounded-[6px] text-[#8F8F8F] hover:bg-[rgba(0,255,102,0.1)] hover:text-[#00FF66] transition-all"
                          title="Mark all as read"
                        >
                          <Check size={16} />
                        </button>
                      )}
                      {notifications.length > 0 && (
                        <button 
                          onClick={clearAllNotifications}
                          className="p-[6px] rounded-[6px] text-[#8F8F8F] hover:bg-[rgba(255,68,68,0.1)] hover:text-[#FF4444] transition-all"
                          title="Clear all"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Notifications List */}
                <div className="max-h-[400px] overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-[32px] text-center">
                      <Bell size={40} className="mx-auto mb-[12px] text-[#2A2A2A]" />
                      <p className="text-[14px] text-[#8F8F8F]">No notifications yet</p>
                      <p className="text-[12px] text-[#5A5A5A]">We'll notify you when something arrives</p>
                    </div>
                  ) : (
                    <div className="py-[8px]">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`group px-[16px] py-[12px] hover:bg-[rgba(255,255,255,0.02)] transition-all cursor-pointer border-l-2 ${
                            notification.read ? 'border-transparent' : 'border-[#00FF66]'
                          }`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="flex gap-[12px]">
                            <div className={`w-[36px] h-[36px] rounded-[10px] ${getNotificationBg(notification.type)} flex items-center justify-center flex-shrink-0`}>
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-[8px]">
                                <p className={`text-[13px] font-medium ${notification.read ? 'text-[#8F8F8F]' : 'text-[#D5FFD6]'}`}>
                                  {notification.title}
                                </p>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteNotification(notification.id);
                                  }}
                                  className="opacity-0 group-hover:opacity-100 p-[4px] rounded-[4px] text-[#5A5A5A] hover:bg-[rgba(255,68,68,0.1)] hover:text-[#FF4444] transition-all"
                                >
                                  <Trash2 size={12} />
                                </button>
                              </div>
                              <p className={`text-[12px] mt-[2px] ${notification.read ? 'text-[#5A5A5A]' : 'text-[#8F8F8F]'}`}>
                                {notification.message}
                              </p>
                              <p className="text-[10px] text-[#5A5A5A] mt-[4px]">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer */}
                {notifications.length > 0 && (
                  <div className="p-[12px] border-t border-[#1A1A1A]">
                    <button 
                      onClick={() => {
                        onNavigate?.('notifications');
                        setShowNotifications(false);
                      }}
                      className="w-full py-[10px] text-center text-[13px] font-medium text-[#00FF66] hover:bg-[rgba(0,255,102,0.1)] rounded-[8px] transition-all"
                    >
                      View all notifications
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* User Profile with Dropdown */}
          <div 
            className="relative"
            ref={profileMenuRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div 
              className={`flex items-center gap-[12px] pl-[16px] border-l border-[#1A1A1A] cursor-pointer transition-all duration-200 ${
                showProfileMenu 
                  ? 'bg-[rgba(0,255,102,0.05)]' 
                  : 'hover:bg-[rgba(255,255,255,0.02)]'
              }`}
              style={{ padding: '8px 0 8px 16px', marginLeft: '0', borderRadius: '12px' }}
            >
              <div className="text-right hidden sm:block">
                <p className={`text-[12px] font-medium transition-colors ${showProfileMenu ? 'text-[#00FF66]' : 'text-[#D5FFD6]'}`}>Admin User</p>
                <p className="text-[10px] text-[#8F8F8F]">Admin@cybercyko.com</p>
              </div>
              <div className={`w-[40px] h-[40px] rounded-[12px] bg-gradient-to-br from-[#00FF66] to-[#00CC52] flex items-center justify-center border-2 transition-all duration-200 ${
                showProfileMenu ? 'border-[#00FF66] scale-105 shadow-[0_0_20px_rgba(0,255,102,0.3)]' : 'border-[#1A1A1A]'
              }`}>
                <User size={20} className="text-[#050505]" />
              </div>
              <ChevronDown 
                size={16} 
                className={`text-[#8F8F8F] transition-transform duration-200 ${showProfileMenu ? 'rotate-180 text-[#00FF66]' : ''}`} 
              />
            </div>

            {/* Profile Dropdown Menu */}
            {showProfileMenu && (
              <div 
                className="absolute right-0 top-full mt-[4px] w-[320px] bg-[#0F0F0F]/95 backdrop-blur-xl border border-[#1A1A1A] rounded-[16px] shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden max-h-[85vh] overflow-y-auto"
                style={{ 
                  animation: 'fadeInDown 0.2s ease-out',
                }}
              >
                {/* Profile Header */}
                <div className="p-[16px] border-b border-[#1A1A1A] bg-gradient-to-br from-[rgba(0,255,102,0.15)] via-[rgba(0,255,102,0.05)] to-transparent">
                  <div className="flex items-center gap-[14px]">
                    <div className="relative">
                      <div className="w-[52px] h-[52px] rounded-[14px] bg-gradient-to-br from-[#00FF66] to-[#00CC52] flex items-center justify-center shadow-[0_4px_20px_rgba(0,255,102,0.3)]">
                        <User size={26} className="text-[#050505]" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-[16px] h-[16px] bg-[#00FF66] rounded-full border-2 border-[#0F0F0F] flex items-center justify-center">
                        <svg className="w-[8px] h-[8px] text-[#050505]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-[15px] font-semibold text-[#D5FFD6]">Admin User</p>
                      <p className="text-[12px] text-[#8F8F8F] mb-[6px]">Admin@cybercyko.com</p>
                      <div className="flex items-center gap-[6px]">
                        <span className="inline-flex items-center gap-[4px] px-[8px] py-[3px] bg-[#00FF66]/20 text-[#00FF66] text-[10px] font-semibold rounded-full">
                          <Shield size={10} />
                          Administrator
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Theme Toggle */}
                <div className="px-[12px] py-[10px] border-b border-[#1A1A1A]">
                  <div className="flex items-center justify-between px-[4px]">
                    <div className="flex items-center gap-[10px]">
                      {isDarkMode ? <Moon size={16} className="text-[#8F8F8F]" /> : <Sun size={16} className="text-[#FFB800]" />}
                      <span className="text-[13px] text-[#D5FFD6]">Dark Mode</span>
                    </div>
                    <button
                      onClick={() => setIsDarkMode(!isDarkMode)}
                      className={`relative w-[44px] h-[24px] rounded-full transition-all ${
                        isDarkMode ? 'bg-[#00FF66]' : 'bg-[#2A2A2A]'
                      }`}
                    >
                      <div className={`absolute top-[3px] w-[18px] h-[18px] rounded-full bg-white shadow transition-transform ${
                        isDarkMode ? 'translate-x-[23px]' : 'translate-x-[3px]'
                      }`} />
                    </button>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="px-[12px] py-[10px] border-b border-[#1A1A1A]">
                  <p className="text-[10px] text-[#8F8F8F] uppercase tracking-wider mb-[8px] px-[4px]">Quick Actions</p>
                  <div className="grid grid-cols-3 gap-[8px]">
                    <button 
                      onClick={() => { onNavigate?.('profile'); setShowProfileMenu(false); }}
                      className="flex flex-col items-center gap-[6px] p-[12px] rounded-[10px] bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(0,255,102,0.1)] border border-[#1A1A1A] hover:border-[#00FF66]/30 transition-all group"
                    >
                      <UserCircle size={18} className="text-[#8F8F8F] group-hover:text-[#00FF66]" />
                      <span className="text-[10px] text-[#8F8F8F] group-hover:text-[#00FF66]">Profile</span>
                    </button>
                    <button 
                      onClick={() => { onNavigate?.('profile'); setShowProfileMenu(false); }}
                      className="flex flex-col items-center gap-[6px] p-[12px] rounded-[10px] bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(0,255,102,0.1)] border border-[#1A1A1A] hover:border-[#00FF66]/30 transition-all group"
                    >
                      <Settings size={18} className="text-[#8F8F8F] group-hover:text-[#00FF66]" />
                      <span className="text-[10px] text-[#8F8F8F] group-hover:text-[#00FF66]">Settings</span>
                    </button>
                    <button 
                      onClick={() => { onNavigate?.('activity'); setShowProfileMenu(false); }}
                      className="flex flex-col items-center gap-[6px] p-[12px] rounded-[10px] bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(0,255,102,0.1)] border border-[#1A1A1A] hover:border-[#00FF66]/30 transition-all group"
                    >
                      <Activity size={18} className="text-[#8F8F8F] group-hover:text-[#00FF66]" />
                      <span className="text-[10px] text-[#8F8F8F] group-hover:text-[#00FF66]">Activity</span>
                    </button>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-[8px] px-[8px]">
                  {profileMenuItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={index}
                        onClick={() => {
                          item.action();
                          setShowProfileMenu(false);
                        }}
                        className="w-full flex items-center gap-[10px] px-[10px] py-[9px] text-[#8F8F8F] hover:bg-[rgba(0,255,102,0.1)] hover:text-[#00FF66] rounded-[8px] transition-all duration-200 group"
                      >
                        <div className="w-[28px] h-[28px] rounded-[6px] bg-[#1A1A1A] group-hover:bg-[rgba(0,255,102,0.2)] flex items-center justify-center transition-all duration-200">
                          <Icon size={14} className="group-hover:scale-110 transition-transform" />
                        </div>
                        <span className="text-[12px] font-medium flex-1 text-left">{item.label}</span>
                        {(item as any).badge && (
                          <span className="px-[6px] py-[2px] bg-[#00FF66]/20 text-[#00FF66] text-[9px] font-bold rounded-full">
                            {(item as any).badge}
                          </span>
                        )}
                        {(item as any).value && (
                          <span className="text-[10px] text-[#5A5A5A]">{(item as any).value}</span>
                        )}
                        {(item as any).shortcut && (
                          <span className="text-[10px] text-[#5A5A5A] font-mono bg-[#1A1A1A] px-[6px] py-[2px] rounded">
                            {(item as any).shortcut}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Logout */}
                <div className="border-t border-[#1A1A1A] p-[8px]">
                  <button
                    onClick={() => {
                      console.log('Logout clicked');
                      setShowProfileMenu(false);
                    }}
                    className="w-full flex items-center gap-[10px] px-[10px] py-[9px] text-[#FF4444] hover:bg-[rgba(255,68,68,0.15)] rounded-[8px] transition-all duration-200 group"
                  >
                    <div className="w-[28px] h-[28px] rounded-[6px] bg-[rgba(255,68,68,0.1)] group-hover:bg-[rgba(255,68,68,0.2)] flex items-center justify-center transition-all duration-200">
                      <LogOut size={14} className="group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="text-[12px] font-medium">Sign Out</span>
                    <span className="text-[10px] text-[#5A5A5A] font-mono bg-[rgba(255,68,68,0.1)] px-[6px] py-[2px] rounded ml-auto">
                      ⌘Q
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Admin User Modal - All functions in one place */}
      {showAdminModal && (
        <AdminUserModal 
          activeTab={adminModalTab}
          onTabChange={setAdminModalTab}
          onClose={() => setShowAdminModal(false)}
          language={language}
          onLanguageChange={setLanguage}
          isDarkMode={isDarkMode}
          onDarkModeChange={setIsDarkMode}
        />
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
      `}</style>
    </div>
  );
}

// Comprehensive Admin User Modal - All functions in one place
interface AdminUserModalProps {
  activeTab: 'profile' | 'security' | 'sessions' | 'preferences' | 'help';
  onTabChange: (tab: 'profile' | 'security' | 'sessions' | 'preferences' | 'help') => void;
  onClose: () => void;
  language: string;
  onLanguageChange: (lang: string) => void;
  isDarkMode: boolean;
  onDarkModeChange: (value: boolean) => void;
}

function AdminUserModal({ activeTab, onTabChange, onClose, language, onLanguageChange, isDarkMode, onDarkModeChange }: AdminUserModalProps) {
  const [success, setSuccess] = useState<string | null>(null);
  
  // Password state
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [passwordError, setPasswordError] = useState('');
  
  // 2FA state
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  
  // Sessions state
  const [sessions, setSessions] = useState([
    { id: 1, device: 'MacBook Pro', browser: 'Chrome', location: 'San Francisco', current: true },
    { id: 2, device: 'iPhone 15', browser: 'Safari', location: 'San Francisco', current: false },
    { id: 3, device: 'Windows PC', browser: 'Firefox', location: 'New York', current: false },
  ]);

  const tabs = [
    { id: 'profile' as const, label: 'Profile', icon: User },
    { id: 'security' as const, label: 'Security', icon: Shield },
    { id: 'sessions' as const, label: 'Sessions', icon: Smartphone },
    { id: 'preferences' as const, label: 'Preferences', icon: Settings },
    { id: 'help' as const, label: 'Help', icon: HelpCircle },
  ];

  const languages = [
    { name: 'English', flag: '🇺🇸' },
    { name: 'Español', flag: '🇪🇸' },
    { name: 'Français', flag: '🇫🇷' },
    { name: 'Deutsch', flag: '🇩🇪' },
    { name: '日本語', flag: '🇯🇵' },
    { name: '中文', flag: '🇨🇳' },
  ];

  const showSuccess = (message: string, autoClose = false) => {
    setSuccess(message);
    setTimeout(() => {
      setSuccess(null);
      if (autoClose) onClose();
    }, autoClose ? 1500 : 2000);
  };

  const handlePasswordChange = () => {
    setPasswordError('');
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      setPasswordError('All fields required');
      return;
    }
    if (passwords.new.length < 8) {
      setPasswordError('Min 8 characters');
      return;
    }
    if (passwords.new !== passwords.confirm) {
      setPasswordError('Passwords don\'t match');
      return;
    }
    setPasswords({ current: '', new: '', confirm: '' });
    showSuccess('Password updated!');
  };

  const terminateSession = (id: number) => {
    setSessions(prev => prev.filter(s => s.id !== id));
    showSuccess('Session terminated');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm p-4 pt-[80px]" onClick={onClose}>
      <div 
        className="bg-[#0A0A0A] rounded-[16px] w-full max-w-[480px] border border-[#1A1A1A] shadow-2xl overflow-hidden max-h-[calc(100vh-100px)] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-[12px] border-b border-[#1A1A1A] shrink-0">
          <div className="flex items-center gap-[10px]">
            <div className="w-[36px] h-[36px] rounded-[8px] bg-gradient-to-br from-[#00FF66] to-[#00CC52] flex items-center justify-center">
              <User size={18} className="text-[#050505]" />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-white">Admin User</p>
              <p className="text-[10px] text-[#8F8F8F]">admin@cybercyko.com</p>
            </div>
          </div>
          <button onClick={onClose} className="p-[6px] rounded-[6px] text-[#8F8F8F] hover:bg-[#1A1A1A] hover:text-white transition-all">
            <X size={16} />
          </button>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mx-[14px] mt-[10px] p-[8px] bg-[rgba(0,255,102,0.1)] border border-[#00FF66]/30 rounded-[8px] flex items-center gap-[6px] shrink-0">
            <Check size={12} className="text-[#00FF66]" />
            <span className="text-[11px] text-[#00FF66]">{success}</span>
          </div>
        )}

        {/* Tabs */}
        <div className="flex border-b border-[#1A1A1A] px-[12px] overflow-x-auto shrink-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-[4px] px-[10px] py-[10px] text-[11px] font-medium border-b-2 transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-[#00FF66] border-[#00FF66]'
                  : 'text-[#8F8F8F] border-transparent hover:text-white'
              }`}
            >
              <tab.icon size={12} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-[14px] flex-1 overflow-y-auto">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-[10px]">
              <div>
                <label className="block text-[10px] text-[#8F8F8F] uppercase mb-[4px]">Full Name</label>
                <input
                  type="text"
                  defaultValue="Admin User"
                  className="w-full bg-[#0F0F0F] border border-[#1A1A1A] rounded-[6px] px-[10px] py-[8px] text-white text-[12px] focus:outline-none focus:border-[#00FF66]"
                />
              </div>
              <div>
                <label className="block text-[10px] text-[#8F8F8F] uppercase mb-[4px]">Email</label>
                <input
                  type="email"
                  defaultValue="admin@cybercyko.com"
                  className="w-full bg-[#0F0F0F] border border-[#1A1A1A] rounded-[6px] px-[10px] py-[8px] text-white text-[12px] focus:outline-none focus:border-[#00FF66]"
                />
              </div>
              <div>
                <label className="block text-[10px] text-[#8F8F8F] uppercase mb-[4px]">Role</label>
                <div className="px-[10px] py-[8px] bg-[#0F0F0F] border border-[#1A1A1A] rounded-[6px] text-[12px] text-[#00FF66]">
                  Administrator
                </div>
              </div>
              <button
                onClick={() => showSuccess('Profile saved!', true)}
                className="w-full py-[8px] bg-[#00FF66] text-[#050505] text-[11px] font-semibold rounded-[6px] hover:bg-[#00DD55] transition-all mt-[6px]"
              >
                Save Changes
              </button>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-[12px]">
              {/* 2FA */}
              <div className="p-[10px] bg-[#0F0F0F] border border-[#1A1A1A] rounded-[8px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-[8px]">
                    <Lock size={14} className="text-[#00FF66]" />
                    <div>
                      <p className="text-[12px] font-medium text-white">Two-Factor Auth</p>
                      <p className="text-[9px] text-[#8F8F8F]">{twoFactorEnabled ? 'Enabled' : 'Disabled'}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => { setTwoFactorEnabled(!twoFactorEnabled); showSuccess('2FA ' + (!twoFactorEnabled ? 'enabled' : 'disabled')); }}
                    className={`relative w-[36px] h-[20px] rounded-full transition-all ${twoFactorEnabled ? 'bg-[#00FF66]' : 'bg-[#2A2A2A]'}`}
                  >
                    <div className={`absolute top-[2px] w-[16px] h-[16px] rounded-full bg-white shadow transition-transform ${twoFactorEnabled ? 'translate-x-[18px]' : 'translate-x-[2px]'}`} />
                  </button>
                </div>
              </div>

              {/* Change Password */}
              <div>
                <p className="text-[10px] text-[#8F8F8F] uppercase mb-[8px]">Change Password</p>
                <div className="space-y-[6px]">
                  <input
                    type="password"
                    placeholder="Current password"
                    value={passwords.current}
                    onChange={(e) => setPasswords(p => ({ ...p, current: e.target.value }))}
                    className="w-full bg-[#0F0F0F] border border-[#1A1A1A] rounded-[6px] px-[10px] py-[8px] text-white text-[11px] focus:outline-none focus:border-[#00FF66]"
                  />
                  <input
                    type="password"
                    placeholder="New password (min 8 chars)"
                    value={passwords.new}
                    onChange={(e) => setPasswords(p => ({ ...p, new: e.target.value }))}
                    className="w-full bg-[#0F0F0F] border border-[#1A1A1A] rounded-[6px] px-[10px] py-[8px] text-white text-[11px] focus:outline-none focus:border-[#00FF66]"
                  />
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    value={passwords.confirm}
                    onChange={(e) => setPasswords(p => ({ ...p, confirm: e.target.value }))}
                    className="w-full bg-[#0F0F0F] border border-[#1A1A1A] rounded-[6px] px-[10px] py-[8px] text-white text-[11px] focus:outline-none focus:border-[#00FF66]"
                  />
                  {passwordError && <p className="text-[10px] text-[#FF4444]">{passwordError}</p>}
                  <button
                    onClick={handlePasswordChange}
                    className="w-full py-[8px] bg-[#00FF66] text-[#050505] text-[11px] font-semibold rounded-[6px] hover:bg-[#00DD55] transition-all"
                  >
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Sessions Tab */}
          {activeTab === 'sessions' && (
            <div className="space-y-[8px]">
              {sessions.map((session) => (
                <div key={session.id} className={`p-[10px] rounded-[8px] border ${session.current ? 'bg-[rgba(0,255,102,0.05)] border-[#00FF66]/20' : 'bg-[#0F0F0F] border-[#1A1A1A]'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-[8px]">
                      <div className={`p-[6px] rounded-[6px] ${session.current ? 'bg-[rgba(0,255,102,0.1)]' : 'bg-[#1A1A1A]'}`}>
                        {session.device.includes('iPhone') ? <Smartphone size={12} className={session.current ? 'text-[#00FF66]' : 'text-[#8F8F8F]'} /> : <Monitor size={12} className={session.current ? 'text-[#00FF66]' : 'text-[#8F8F8F]'} />}
                      </div>
                      <div>
                        <div className="flex items-center gap-[4px]">
                          <p className="text-[11px] font-medium text-white">{session.device}</p>
                          {session.current && <span className="px-[3px] py-[1px] bg-[#00FF66]/20 text-[#00FF66] text-[7px] font-bold rounded">Current</span>}
                        </div>
                        <p className="text-[9px] text-[#8F8F8F]">{session.browser} • {session.location}</p>
                      </div>
                    </div>
                    {!session.current && (
                      <button onClick={() => terminateSession(session.id)} className="text-[9px] text-[#FF4444] hover:underline">
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {sessions.filter(s => !s.current).length > 0 && (
                <button 
                  onClick={() => { setSessions(prev => prev.filter(s => s.current)); showSuccess('All sessions terminated'); }}
                  className="w-full py-[8px] text-[#FF4444] text-[10px] font-medium bg-[rgba(255,68,68,0.05)] hover:bg-[rgba(255,68,68,0.1)] border border-[#FF4444]/20 rounded-[6px] transition-all mt-[4px]"
                >
                  Sign Out All Other Devices
                </button>
              )}
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="space-y-[12px]">
              {/* Dark Mode */}
              <div className="flex items-center justify-between p-[10px] bg-[#0F0F0F] border border-[#1A1A1A] rounded-[8px]">
                <div className="flex items-center gap-[8px]">
                  {isDarkMode ? <Moon size={14} className="text-[#8F8F8F]" /> : <Sun size={14} className="text-[#FFB800]" />}
                  <span className="text-[12px] text-white">Dark Mode</span>
                </div>
                <button
                  onClick={() => onDarkModeChange(!isDarkMode)}
                  className={`relative w-[36px] h-[20px] rounded-full transition-all ${isDarkMode ? 'bg-[#00FF66]' : 'bg-[#2A2A2A]'}`}
                >
                  <div className={`absolute top-[2px] w-[16px] h-[16px] rounded-full bg-white shadow transition-transform ${isDarkMode ? 'translate-x-[18px]' : 'translate-x-[2px]'}`} />
                </button>
              </div>

              {/* Language */}
              <div>
                <p className="text-[10px] text-[#8F8F8F] uppercase mb-[6px]">Language</p>
                <div className="grid grid-cols-3 gap-[4px]">
                  {languages.map((lang) => (
                    <button
                      key={lang.name}
                      onClick={() => { onLanguageChange(lang.name); showSuccess('Language changed!'); }}
                      className={`flex items-center gap-[4px] p-[8px] rounded-[6px] text-left transition-all ${
                        language === lang.name
                          ? 'bg-[rgba(0,255,102,0.1)] border border-[#00FF66]/30'
                          : 'bg-[#0F0F0F] border border-[#1A1A1A] hover:border-[#2A2A2A]'
                      }`}
                    >
                      <span className="text-[14px]">{lang.flag}</span>
                      <span className={`text-[10px] ${language === lang.name ? 'text-[#00FF66]' : 'text-white'}`}>{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Download Data */}
              <button
                onClick={() => showSuccess('Download started!')}
                className="w-full flex items-center justify-center gap-[6px] py-[8px] bg-[#0F0F0F] border border-[#1A1A1A] text-white text-[11px] font-medium rounded-[6px] hover:bg-[#1A1A1A] transition-all"
              >
                <Download size={12} />
                Download My Data
              </button>
            </div>
          )}

          {/* Help Tab */}
          {activeTab === 'help' && (
            <div className="space-y-[10px]">
              <div className="grid grid-cols-2 gap-[6px]">
                {[
                  { icon: '📚', title: 'Docs', desc: 'Guides' },
                  { icon: '💬', title: 'Chat', desc: 'Support' },
                  { icon: '📧', title: 'Email', desc: 'Contact' },
                  { icon: '🎥', title: 'Videos', desc: 'Tutorials' },
                ].map((item, idx) => (
                  <button key={idx} className="p-[10px] bg-[#0F0F0F] rounded-[8px] border border-[#1A1A1A] hover:border-[#00FF66]/30 transition-all text-left">
                    <span className="text-[14px] block mb-[2px]">{item.icon}</span>
                    <p className="text-[11px] font-medium text-white">{item.title}</p>
                    <p className="text-[9px] text-[#5A5A5A]">{item.desc}</p>
                  </button>
                ))}
              </div>

              {/* Shortcuts */}
              <div>
                <p className="text-[10px] text-[#8F8F8F] uppercase mb-[6px]">Shortcuts</p>
                <div className="grid grid-cols-2 gap-[4px]">
                  {[
                    { key: '⌘K', desc: 'Search' },
                    { key: '⌘P', desc: 'Profile' },
                    { key: '⌘/', desc: 'Shortcuts' },
                    { key: 'Esc', desc: 'Close' },
                  ].map((s, idx) => (
                    <div key={idx} className="flex items-center justify-between py-[5px] px-[8px] bg-[#0F0F0F] rounded-[4px]">
                      <span className="text-[10px] text-white">{s.desc}</span>
                      <span className="px-[4px] py-[1px] bg-[#1A1A1A] rounded text-[9px] font-mono text-[#8F8F8F]">{s.key}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-[8px] bg-[rgba(0,255,102,0.05)] rounded-[6px] border border-[#00FF66]/20">
                <p className="text-[10px] text-[#8F8F8F]">Email: <span className="text-[#00FF66]">support@cybercyko.com</span></p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

