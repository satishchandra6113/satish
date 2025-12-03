import { useState } from 'react';
import { Activity, User, Monitor, Shield, FileText, Settings, LogIn, LogOut, Edit, Trash2, Plus, Download, Filter, Search, Calendar, Clock, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

const THEME = {
  primary: '#00FF66',
  danger: '#FF4444',
  warning: '#FFCC00',
  info: '#4A9EFF',
  bgCard: '#0F0F0F',
  border: '#1A1A1A',
  textPrimary: '#D5FFD6',
  textMuted: '#8F8F8F',
};

interface ActivityLog {
  id: number;
  user: string;
  action: string;
  target: string;
  category: 'auth' | 'user' | 'device' | 'policy' | 'settings' | 'security';
  timestamp: string;
  ip: string;
  location: string;
  status: 'success' | 'warning' | 'error';
}

const activityLogs: ActivityLog[] = [
  { id: 1, user: 'Admin User', action: 'Logged in', target: 'Dashboard', category: 'auth', timestamp: '2 minutes ago', ip: '192.168.1.101', location: 'San Francisco, CA', status: 'success' },
  { id: 2, user: 'John Doe', action: 'Created user', target: 'jane.smith@company.com', category: 'user', timestamp: '15 minutes ago', ip: '192.168.1.105', location: 'New York, NY', status: 'success' },
  { id: 3, user: 'Admin User', action: 'Updated policy', target: 'Password Policy', category: 'policy', timestamp: '1 hour ago', ip: '192.168.1.101', location: 'San Francisco, CA', status: 'success' },
  { id: 4, user: 'System', action: 'Failed login attempt', target: 'admin@company.com', category: 'security', timestamp: '2 hours ago', ip: '203.45.67.89', location: 'Unknown', status: 'warning' },
  { id: 5, user: 'Jane Smith', action: 'Added device', target: 'MacBook Pro M3', category: 'device', timestamp: '3 hours ago', ip: '192.168.1.110', location: 'Los Angeles, CA', status: 'success' },
  { id: 6, user: 'Admin User', action: 'Changed settings', target: 'Email notifications', category: 'settings', timestamp: '5 hours ago', ip: '192.168.1.101', location: 'San Francisco, CA', status: 'success' },
  { id: 7, user: 'Mike Johnson', action: 'Deleted user', target: 'old.employee@company.com', category: 'user', timestamp: '1 day ago', ip: '192.168.1.120', location: 'Chicago, IL', status: 'success' },
  { id: 8, user: 'System', action: 'Security scan completed', target: 'All devices', category: 'security', timestamp: '1 day ago', ip: 'System', location: 'System', status: 'success' },
  { id: 9, user: 'Admin User', action: 'Exported report', target: 'Monthly activity report', category: 'settings', timestamp: '2 days ago', ip: '192.168.1.101', location: 'San Francisco, CA', status: 'success' },
  { id: 10, user: 'John Doe', action: 'Updated device', target: 'iPhone 15 Pro', category: 'device', timestamp: '2 days ago', ip: '192.168.1.105', location: 'New York, NY', status: 'success' },
  { id: 11, user: 'System', action: 'Blocked suspicious IP', target: '203.45.67.89', category: 'security', timestamp: '3 days ago', ip: 'System', location: 'System', status: 'warning' },
  { id: 12, user: 'Jane Smith', action: 'Logged out', target: 'Dashboard', category: 'auth', timestamp: '3 days ago', ip: '192.168.1.110', location: 'Los Angeles, CA', status: 'success' },
];

const getCategoryIcon = (category: ActivityLog['category']) => {
  switch (category) {
    case 'auth': return LogIn;
    case 'user': return User;
    case 'device': return Monitor;
    case 'policy': return FileText;
    case 'settings': return Settings;
    case 'security': return Shield;
    default: return Activity;
  }
};

const getCategoryColor = (category: ActivityLog['category']) => {
  switch (category) {
    case 'auth': return THEME.info;
    case 'user': return THEME.primary;
    case 'device': return '#A78BFA';
    case 'policy': return '#F472B6';
    case 'settings': return THEME.warning;
    case 'security': return THEME.danger;
    default: return THEME.textMuted;
  }
};

const getStatusColor = (status: ActivityLog['status']) => {
  switch (status) {
    case 'success': return THEME.primary;
    case 'warning': return THEME.warning;
    case 'error': return THEME.danger;
    default: return THEME.textMuted;
  }
};

export function ActivityPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [activeStatFilter, setActiveStatFilter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const categories = [
    { id: 'all', label: 'All Activities' },
    { id: 'auth', label: 'Authentication' },
    { id: 'user', label: 'User Management' },
    { id: 'device', label: 'Devices' },
    { id: 'policy', label: 'Policies' },
    { id: 'settings', label: 'Settings' },
    { id: 'security', label: 'Security' },
  ];

  const stats = [
    { id: 'total', label: 'Total Events', value: activityLogs.length.toString(), icon: Activity, color: THEME.primary },
    { id: 'login', label: 'Login Events', value: activityLogs.filter(l => l.category === 'auth').length.toString(), icon: LogIn, color: THEME.info },
    { id: 'security', label: 'Security Alerts', value: activityLogs.filter(l => l.category === 'security' || l.status === 'warning').length.toString(), icon: Shield, color: THEME.danger },
    { id: 'today', label: 'Changes Today', value: activityLogs.filter(l => l.timestamp.includes('minute') || l.timestamp.includes('hour')).length.toString(), icon: Edit, color: THEME.warning },
  ];

  const handleStatClick = (statId: string) => {
    if (activeStatFilter === statId) {
      setActiveStatFilter(null);
      setFilterCategory('all');
    } else {
      setActiveStatFilter(statId);
      if (statId === 'login') {
        setFilterCategory('auth');
      } else if (statId === 'security') {
        setFilterCategory('security');
      } else {
        setFilterCategory('all');
      }
    }
    setCurrentPage(1);
  };

  // Filter logs based on search, category, and stat filter
  const filteredLogs = activityLogs.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.target.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || log.category === filterCategory;
    
    // Apply stat-specific filters
    let matchesStatFilter = true;
    if (activeStatFilter === 'today') {
      matchesStatFilter = log.timestamp.includes('minute') || log.timestamp.includes('hour');
    } else if (activeStatFilter === 'security') {
      matchesStatFilter = log.category === 'security' || log.status === 'warning';
    } else if (activeStatFilter === 'login') {
      matchesStatFilter = log.category === 'auth';
    }
    
    return matchesSearch && matchesCategory && matchesStatFilter;
  });

  // Pagination
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const paginatedLogs = filteredLogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: THEME.textPrimary }}>Activity Logs</h1>
          <p className="text-sm mt-1" style={{ color: THEME.textMuted }}>Track all system activities and user actions</p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
          style={{ background: THEME.primary, color: '#050505' }}
        >
          <Download size={16} />
          Export Logs
        </button>
      </div>

      {/* Stats - Clickable for filtering */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat) => {
          const isActive = activeStatFilter === stat.id;
          return (
            <button
              key={stat.id}
              onClick={() => handleStatClick(stat.id)}
              className="p-4 rounded-xl text-left transition-all hover:scale-[1.02]"
              style={{ 
                background: isActive ? `${stat.color}15` : THEME.bgCard, 
                border: `1px solid ${isActive ? stat.color : THEME.border}`,
                boxShadow: isActive ? `0 0 20px ${stat.color}20` : 'none'
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <stat.icon size={20} style={{ color: stat.color }} />
                <span className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</span>
              </div>
              <p className="text-xs" style={{ color: isActive ? stat.color : THEME.textMuted }}>{stat.label}</p>
              {isActive && (
                <p className="text-[10px] mt-1" style={{ color: stat.color }}>Click to clear filter</p>
              )}
            </button>
          );
        })}
      </div>

      {/* Active Filter Indicator */}
      {activeStatFilter && (
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg" style={{ background: `${THEME.primary}10`, border: `1px solid ${THEME.primary}30` }}>
          <span className="text-sm" style={{ color: THEME.primary }}>
            Filtered by: {stats.find(s => s.id === activeStatFilter)?.label}
          </span>
          <button
            onClick={() => { setActiveStatFilter(null); setFilterCategory('all'); }}
            className="ml-2 px-2 py-0.5 rounded text-xs font-medium"
            style={{ background: THEME.primary, color: '#050505' }}
          >
            Clear
          </button>
        </div>
      )}

      {/* Filters */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: THEME.bgCard, border: `1px solid ${THEME.border}` }}>
          <Search size={18} style={{ color: THEME.textMuted }} />
          <input
            type="text"
            placeholder="Search activities..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ color: THEME.textPrimary }}
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2">
          <Filter size={16} style={{ color: THEME.textMuted }} />
          <select
            value={filterCategory}
            onChange={(e) => { setFilterCategory(e.target.value); setActiveStatFilter(null); setCurrentPage(1); }}
            className="px-4 py-3 rounded-xl text-sm outline-none"
            style={{ background: THEME.bgCard, border: `1px solid ${THEME.border}`, color: THEME.textPrimary }}
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.label}</option>
            ))}
          </select>
        </div>

        {/* Date Filter */}
        <button
          className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm"
          style={{ background: THEME.bgCard, border: `1px solid ${THEME.border}`, color: THEME.textMuted }}
        >
          <Calendar size={16} />
          Last 7 days
        </button>
      </div>

      {/* Activity List */}
      <div className="rounded-xl overflow-hidden" style={{ background: THEME.bgCard, border: `1px solid ${THEME.border}` }}>
        {/* Table Header */}
        <div className="grid grid-cols-[2fr,1.5fr,1fr,1fr,1fr] gap-4 px-6 py-4" style={{ borderBottom: `1px solid ${THEME.border}` }}>
          <span className="text-xs font-medium uppercase" style={{ color: THEME.textMuted }}>Activity</span>
          <span className="text-xs font-medium uppercase" style={{ color: THEME.textMuted }}>User</span>
          <span className="text-xs font-medium uppercase" style={{ color: THEME.textMuted }}>Location</span>
          <span className="text-xs font-medium uppercase" style={{ color: THEME.textMuted }}>Time</span>
          <span className="text-xs font-medium uppercase" style={{ color: THEME.textMuted }}>Status</span>
        </div>

        {/* Table Body */}
        {paginatedLogs.length > 0 ? (
          paginatedLogs.map((log, idx) => {
            const Icon = getCategoryIcon(log.category);
            const categoryColor = getCategoryColor(log.category);
            const statusColor = getStatusColor(log.status);

            return (
              <div
                key={log.id}
                className="grid grid-cols-[2fr,1.5fr,1fr,1fr,1fr] gap-4 px-6 py-4 items-center hover:bg-[rgba(255,255,255,0.02)] transition-colors"
                style={{ borderBottom: idx < paginatedLogs.length - 1 ? `1px solid ${THEME.border}` : 'none' }}
              >
                {/* Activity */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${categoryColor}15` }}>
                    <Icon size={16} style={{ color: categoryColor }} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{log.action}</p>
                    <p className="text-xs" style={{ color: THEME.textMuted }}>{log.target}</p>
                  </div>
                </div>

                {/* User */}
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium" style={{ background: '#1A1A1A', color: THEME.textMuted }}>
                    {log.user.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span className="text-sm" style={{ color: THEME.textPrimary }}>{log.user}</span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-1">
                  <MapPin size={12} style={{ color: THEME.textMuted }} />
                  <span className="text-xs" style={{ color: THEME.textMuted }}>{log.location}</span>
                </div>

                {/* Time */}
                <div className="flex items-center gap-1">
                  <Clock size={12} style={{ color: THEME.textMuted }} />
                  <span className="text-xs" style={{ color: THEME.textMuted }}>{log.timestamp}</span>
                </div>

                {/* Status */}
                <div>
                  <span 
                    className="px-2 py-1 rounded-full text-xs font-medium"
                    style={{ background: `${statusColor}15`, color: statusColor }}
                  >
                    {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="px-6 py-12 text-center">
            <Activity size={40} className="mx-auto mb-3" style={{ color: THEME.border }} />
            <p style={{ color: THEME.textMuted }}>No activities found</p>
          </div>
        )}

        {/* Pagination */}
        {filteredLogs.length > itemsPerPage && (
          <div className="flex items-center justify-between px-6 py-4" style={{ borderTop: `1px solid ${THEME.border}` }}>
            <span className="text-xs" style={{ color: THEME.textMuted }}>
              Showing {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredLogs.length)} of {filteredLogs.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg disabled:opacity-40"
                style={{ background: '#1A1A1A', color: THEME.textMuted }}
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className="w-8 h-8 rounded-lg text-xs font-medium"
                  style={{
                    background: currentPage === page ? THEME.primary : '#1A1A1A',
                    color: currentPage === page ? '#050505' : THEME.textMuted
                  }}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg disabled:opacity-40"
                style={{ background: '#1A1A1A', color: THEME.textMuted }}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

