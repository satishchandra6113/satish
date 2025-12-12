import { useState, useRef } from 'react';
import { FileCheck, Shield, Lock, Eye, Users, Clock, CheckCircle, XCircle, AlertTriangle, Search, Filter, Plus, MoreVertical, X } from 'lucide-react';

const THEME = {
  primary: '#00FF66',
  warning: '#FFCC00',
  danger: '#FF4444',
  info: '#4A9EFF',
  bgDark: '#050505',
  bgCard: '#0F0F0F',
  border: '#1A1A1A',
  textPrimary: '#D5FFD6',
  textMuted: '#8F8F8F',
};

interface Policy {
  id: number;
  name: string;
  description: string;
  type: 'security' | 'access' | 'compliance' | 'privacy';
  status: 'active' | 'inactive' | 'draft';
  appliedTo: number;
  lastModified: string;
  createdBy: string;
}

const policies: Policy[] = [
  { id: 1, name: 'Multi-Factor Authentication', description: 'Require MFA for all user logins', type: 'security', status: 'active', appliedTo: 156, lastModified: '2 hours ago', createdBy: 'Admin' },
  { id: 2, name: 'Password Complexity', description: 'Enforce strong password requirements', type: 'security', status: 'active', appliedTo: 156, lastModified: '1 day ago', createdBy: 'Admin' },
  { id: 3, name: 'Device Encryption', description: 'Require full disk encryption on all devices', type: 'security', status: 'active', appliedTo: 32, lastModified: '3 days ago', createdBy: 'Admin' },
  { id: 4, name: 'Remote Access Control', description: 'Restrict remote access to approved locations', type: 'access', status: 'active', appliedTo: 89, lastModified: '1 week ago', createdBy: 'Security Team' },
  { id: 5, name: 'Data Retention', description: 'Auto-delete data after 90 days', type: 'compliance', status: 'active', appliedTo: 45, lastModified: '2 weeks ago', createdBy: 'Compliance' },
  { id: 6, name: 'GDPR Compliance', description: 'Ensure data handling meets GDPR requirements', type: 'privacy', status: 'active', appliedTo: 156, lastModified: '1 month ago', createdBy: 'Legal' },
  { id: 7, name: 'Session Timeout', description: 'Auto-logout after 30 minutes of inactivity', type: 'security', status: 'active', appliedTo: 156, lastModified: '2 months ago', createdBy: 'Admin' },
  { id: 8, name: 'IP Whitelisting', description: 'Allow access only from approved IP ranges', type: 'access', status: 'inactive', appliedTo: 0, lastModified: '3 months ago', createdBy: 'Network Team' },
  { id: 9, name: 'Audit Logging', description: 'Log all user actions for compliance', type: 'compliance', status: 'active', appliedTo: 156, lastModified: '1 month ago', createdBy: 'Compliance' },
  { id: 10, name: 'Data Anonymization', description: 'Anonymize PII in analytics', type: 'privacy', status: 'draft', appliedTo: 0, lastModified: '1 week ago', createdBy: 'Data Team' },
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'security': return Shield;
    case 'access': return Lock;
    case 'compliance': return FileCheck;
    case 'privacy': return Eye;
    default: return FileCheck;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'security': return THEME.primary;
    case 'access': return THEME.info;
    case 'compliance': return THEME.warning;
    case 'privacy': return '#A855F7';
    default: return THEME.textMuted;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'active': return CheckCircle;
    case 'inactive': return XCircle;
    case 'draft': return AlertTriangle;
    default: return CheckCircle;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return THEME.primary;
    case 'inactive': return THEME.danger;
    case 'draft': return THEME.warning;
    default: return THEME.textMuted;
  }
};

export function PoliciesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(['Multi-Factor Authentication', 'Device Encryption', 'Password Complexity']);
  const searchCloseTimerRef = useRef<number | null>(null);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [filterType, setFilterType] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  // Filter policies based on search and filters
  const filteredPolicies = policies.filter(policy => {
    // Search filter
    const matchesSearch = searchQuery === '' ||
      policy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      policy.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      policy.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      policy.createdBy.toLowerCase().includes(searchQuery.toLowerCase());

    // Type filter
    const matchesType = filterType === null || policy.type === filterType;

    // Status filter
    const matchesStatus = filterStatus === null || policy.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const stats = {
    total: policies.length,
    active: policies.filter(p => p.status === 'active').length,
    inactive: policies.filter(p => p.status === 'inactive').length,
    draft: policies.filter(p => p.status === 'draft').length,
  };

  const clearFilters = () => {
    setFilterType(null);
    setFilterStatus(null);
    setSearchQuery('');
  };

  const hasActiveFilters = filterType !== null || filterStatus !== null || searchQuery !== '';

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: THEME.textPrimary }}>Policies</h1>
          <p className="text-sm mt-1" style={{ color: THEME.textMuted }}>Manage security and compliance policies</p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all hover:scale-105"
          style={{ background: THEME.primary, color: THEME.bgDark }}
        >
          <Plus size={16} />
          Create Policy
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Policies', value: stats.total, icon: FileCheck, color: THEME.primary },
          { label: 'Active', value: stats.active, icon: CheckCircle, color: THEME.primary },
          { label: 'Inactive', value: stats.inactive, icon: XCircle, color: THEME.danger },
          { label: 'Draft', value: stats.draft, icon: AlertTriangle, color: THEME.warning },
        ].map((stat) => (
          <div
            key={stat.label}
            className="p-4 rounded-xl"
            style={{ background: THEME.bgCard, border: `1px solid ${THEME.border}` }}
          >
            <div className="flex items-center justify-between mb-3">
              <stat.icon size={20} style={{ color: stat.color }} />
              <span className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</span>
            </div>
            <p className="text-xs" style={{ color: THEME.textMuted }}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div
          className="flex-1 max-w-xl relative"
          onMouseEnter={() => { if (searchCloseTimerRef.current) { window.clearTimeout(searchCloseTimerRef.current); searchCloseTimerRef.current = null; } }}
          onMouseLeave={() => { if (searchCloseTimerRef.current) window.clearTimeout(searchCloseTimerRef.current); searchCloseTimerRef.current = window.setTimeout(() => { setShowSearch(false); setShowHistory(false); }, 200) as unknown as number; }}
        >
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-xl w-full"
            style={{ background: THEME.bgCard, border: `1px solid ${THEME.border}` }}
          >
            <Search size={18} style={{ color: THEME.textMuted }} />
            <input
              type="text"
              placeholder="Search policies by name, description, type..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setShowSearch(true); setShowHistory(false); }}
              onFocus={() => { if (searchCloseTimerRef.current) { window.clearTimeout(searchCloseTimerRef.current); searchCloseTimerRef.current = null; } setShowSearch(true); }}
              onBlur={() => { if (searchCloseTimerRef.current) window.clearTimeout(searchCloseTimerRef.current); searchCloseTimerRef.current = window.setTimeout(() => { setShowSearch(false); setShowHistory(false); }, 200) as unknown as number; }}
              className="flex-1 bg-transparent outline-none text-sm"
              style={{ color: THEME.textPrimary }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="p-1 rounded-full hover:bg-[rgba(255,255,255,0.1)] transition-colors"
                style={{ color: THEME.textMuted }}
              >
                <X size={14} />
              </button>
            )}

            <div className="relative">
              <button
                onClick={(e) => { e.stopPropagation(); if (searchCloseTimerRef.current) { window.clearTimeout(searchCloseTimerRef.current); searchCloseTimerRef.current = null; } setShowHistory(prev => !prev); setShowSearch(true); }}
                className="p-1.5 rounded-lg transition-all duration-200 text-[#8F8F8F]"
                title="Search history"
              >
                <Clock size={16} />
              </button>

              {recentSearches.length > 0 && !showHistory && !searchQuery && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#00FF66] rounded-full" />
              )}
            </div>
          </div>

          {showSearch && (searchQuery.trim() || showHistory) && (
            <div className="absolute left-0 top-full mt-2 w-full bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl shadow-2xl overflow-hidden z-[9999]">
              {searchQuery.trim() ? (
                <div className="p-2 max-h-48 overflow-y-auto">
                  {policies.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase())).map(p => (
                    <button key={p.id} onClick={() => { setSearchQuery(p.name); setShowSearch(false); setShowHistory(false); }} className="w-full text-left px-3 py-2 hover:bg-[#1A1A1A]">{p.name}</button>
                  ))}
                  {policies.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                    <div className="p-4 text-center text-[#8F8F8F]">No results</div>
                  )}
                </div>
              ) : showHistory && recentSearches.length > 0 ? (
                <div className="p-2">
                  <div className="flex items-center justify-between px-3 py-2">
                    <div className="flex items-center gap-2"><Clock size={14} className="text-[#00FF66]" /><p className="text-xs font-semibold text-[#8F8F8F] uppercase">Recent Searches</p></div>
                    <button onClick={() => { setRecentSearches([]); setShowHistory(false); }} className="text-xs text-[#5A5A5A] hover:text-[#FF4444]">Clear all</button>
                  </div>
                  {recentSearches.map((s, idx) => (
                    <button key={idx} onClick={() => { setSearchQuery(s); setShowHistory(false); setShowSearch(false); }} className="w-full text-left px-3 py-2 hover:bg-[#1A1A1A]">{s}</button>
                  ))}
                </div>
              ) : null}
            </div>
          )}
        </div>
        <div className="relative">
          <button
            onClick={() => setShowFilterMenu(!showFilterMenu)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all hover:bg-opacity-80 ${(filterType || filterStatus) ? 'border-[#00FF66]' : ''
              }`}
            style={{
              background: THEME.bgCard,
              border: `1px solid ${(filterType || filterStatus) ? THEME.primary : THEME.border}`,
              color: (filterType || filterStatus) ? THEME.primary : THEME.textMuted
            }}
          >
            <Filter size={18} />
            <span className="text-sm">Filter</span>
            {(filterType || filterStatus) && (
              <span
                className="w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center"
                style={{ background: THEME.primary, color: THEME.bgDark }}
              >
                {(filterType ? 1 : 0) + (filterStatus ? 1 : 0)}
              </span>
            )}
          </button>

          {/* Filter Dropdown Menu */}
          {showFilterMenu && (
            <div
              className="absolute right-0 top-full mt-2 w-[280px] rounded-xl shadow-2xl z-50 overflow-hidden"
              style={{ background: THEME.bgCard, border: `1px solid ${THEME.border}` }}
            >
              {/* Filter Header */}
              <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: `1px solid ${THEME.border}` }}>
                <span className="text-sm font-medium" style={{ color: THEME.textPrimary }}>Filters</span>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-xs font-medium hover:underline"
                    style={{ color: THEME.primary }}
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Filter by Type */}
              <div className="px-4 py-3" style={{ borderBottom: `1px solid ${THEME.border}` }}>
                <p className="text-xs font-medium uppercase tracking-wider mb-3" style={{ color: THEME.textMuted }}>Policy Type</p>
                <div className="flex flex-wrap gap-2">
                  {['security', 'access', 'compliance', 'privacy'].map((type) => {
                    const color = getTypeColor(type);
                    const isSelected = filterType === type;
                    return (
                      <button
                        key={type}
                        onClick={() => setFilterType(isSelected ? null : type)}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all"
                        style={{
                          background: isSelected ? `${color}20` : 'rgba(255,255,255,0.05)',
                          border: `1px solid ${isSelected ? color : THEME.border}`,
                          color: isSelected ? color : THEME.textMuted
                        }}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Filter by Status */}
              <div className="px-4 py-3">
                <p className="text-xs font-medium uppercase tracking-wider mb-3" style={{ color: THEME.textMuted }}>Status</p>
                <div className="flex flex-wrap gap-2">
                  {['active', 'inactive', 'draft'].map((status) => {
                    const color = getStatusColor(status);
                    const isSelected = filterStatus === status;
                    return (
                      <button
                        key={status}
                        onClick={() => setFilterStatus(isSelected ? null : status)}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all"
                        style={{
                          background: isSelected ? `${color}20` : 'rgba(255,255,255,0.05)',
                          border: `1px solid ${isSelected ? color : THEME.border}`,
                          color: isSelected ? color : THEME.textMuted
                        }}
                      >
                        {status}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Apply Button */}
              <div className="px-4 py-3" style={{ borderTop: `1px solid ${THEME.border}` }}>
                <button
                  onClick={() => setShowFilterMenu(false)}
                  className="w-full py-2 rounded-lg text-sm font-medium transition-all hover:opacity-90"
                  style={{ background: THEME.primary, color: THEME.bgDark }}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs" style={{ color: THEME.textMuted }}>Active filters:</span>
          {searchQuery && (
            <span
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs"
              style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${THEME.border}`, color: THEME.textPrimary }}
            >
              Search: "{searchQuery.length > 15 ? searchQuery.slice(0, 15) + '...' : searchQuery}"
              <button onClick={() => setSearchQuery('')} className="hover:text-[#FF4444]"><X size={12} /></button>
            </span>
          )}
          {filterType && (
            <span
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs capitalize"
              style={{ background: `${getTypeColor(filterType)}15`, border: `1px solid ${getTypeColor(filterType)}30`, color: getTypeColor(filterType) }}
            >
              Type: {filterType}
              <button onClick={() => setFilterType(null)} className="hover:text-[#FF4444]"><X size={12} /></button>
            </span>
          )}
          {filterStatus && (
            <span
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs capitalize"
              style={{ background: `${getStatusColor(filterStatus)}15`, border: `1px solid ${getStatusColor(filterStatus)}30`, color: getStatusColor(filterStatus) }}
            >
              Status: {filterStatus}
              <button onClick={() => setFilterStatus(null)} className="hover:text-[#FF4444]"><X size={12} /></button>
            </span>
          )}
          <button
            onClick={clearFilters}
            className="text-xs font-medium hover:underline"
            style={{ color: THEME.danger }}
          >
            Clear all
          </button>
        </div>
      )}

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm" style={{ color: THEME.textMuted }}>
          Showing <span style={{ color: THEME.textPrimary }}>{filteredPolicies.length}</span> of {policies.length} policies
        </p>
      </div>

      {/* Policies Grid */}
      <div className="grid grid-cols-2 gap-4">
        {filteredPolicies.length === 0 ? (
          <div className="col-span-2 py-16 text-center rounded-xl" style={{ background: THEME.bgCard, border: `1px solid ${THEME.border}` }}>
            <Search size={48} className="mx-auto mb-4" style={{ color: THEME.border }} />
            <p className="text-lg font-medium mb-2" style={{ color: THEME.textPrimary }}>No policies found</p>
            <p className="text-sm mb-4" style={{ color: THEME.textMuted }}>
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={clearFilters}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-90"
              style={{ background: THEME.primary, color: THEME.bgDark }}
            >
              Clear Filters
            </button>
          </div>
        ) : filteredPolicies.map((policy) => {
          const TypeIcon = getTypeIcon(policy.type);
          const StatusIcon = getStatusIcon(policy.status);
          const typeColor = getTypeColor(policy.type);
          const statusColor = getStatusColor(policy.status);

          return (
            <div
              key={policy.id}
              className="p-5 rounded-xl hover:border-[#00FF66] transition-all cursor-pointer group"
              style={{ background: THEME.bgCard, border: `1px solid ${THEME.border}` }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: `${typeColor}15`, border: `1px solid ${typeColor}30` }}
                  >
                    <TypeIcon size={18} style={{ color: typeColor }} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold" style={{ color: THEME.textPrimary }}>{policy.name}</h3>
                    <span
                      className="text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full"
                      style={{ background: `${typeColor}15`, color: typeColor }}
                    >
                      {policy.type}
                    </span>
                  </div>
                </div>
                <button
                  className="p-2 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-[rgba(255,255,255,0.05)] transition-all"
                  style={{ color: THEME.textMuted }}
                >
                  <MoreVertical size={16} />
                </button>
              </div>

              {/* Description */}
              <p className="text-xs mb-4 line-clamp-2" style={{ color: THEME.textMuted }}>
                {policy.description}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4" style={{ borderTop: `1px solid ${THEME.border}` }}>
                <div className="flex items-center gap-4">
                  {/* Status */}
                  <div className="flex items-center gap-1.5">
                    <StatusIcon size={12} style={{ color: statusColor }} />
                    <span className="text-xs capitalize" style={{ color: statusColor }}>{policy.status}</span>
                  </div>
                  {/* Applied To */}
                  <div className="flex items-center gap-1.5">
                    <Users size={12} style={{ color: THEME.textMuted }} />
                    <span className="text-xs" style={{ color: THEME.textMuted }}>{policy.appliedTo} users</span>
                  </div>
                </div>
                {/* Last Modified */}
                <div className="flex items-center gap-1.5">
                  <Clock size={12} style={{ color: THEME.textMuted }} />
                  <span className="text-xs" style={{ color: THEME.textMuted }}>{policy.lastModified}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}



