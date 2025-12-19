import { useState, useRef } from 'react';
import { AlertTriangle, Shield, Bug, Wifi, Lock, Eye, CheckCircle, XCircle, Clock, Search, Filter, ChevronLeft, ChevronRight, MoreVertical, Globe, Monitor, Smartphone, AlertCircle, Zap, TrendingUp, TrendingDown, X } from 'lucide-react';

const THEME = {
  primary: '#00FF66',
  danger: '#FF4444',
  warning: '#FFCC00',
  info: '#4A9EFF',
  critical: '#FF1744',
  high: '#FF5722',
  medium: '#FFCC00',
  low: '#4A9EFF',
  bgCard: '#0F0F0F',
  border: '#1A1A1A',
  textPrimary: '#D5FFD6',
  textMuted: '#8F8F8F',
};

interface Threat {
  id: number;
  name: string;
  type: 'malware' | 'phishing' | 'intrusion' | 'vulnerability' | 'suspicious' | 'ddos';
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'active' | 'blocked' | 'investigating' | 'resolved';
  source: string;
  target: string;
  detectedAt: string;
  description: string;
  affectedDevices: number;
}

const threats: Threat[] = [
  { id: 1, name: 'Ransomware Attack Attempt', type: 'malware', severity: 'critical', status: 'blocked', source: '203.45.67.89', target: 'File Server', detectedAt: '5 min ago', description: 'Attempted ransomware deployment detected and blocked', affectedDevices: 1 },
  { id: 2, name: 'Phishing Email Campaign', type: 'phishing', severity: 'high', status: 'investigating', source: 'fake-login.com', target: '12 Users', detectedAt: '15 min ago', description: 'Mass phishing emails targeting employee credentials', affectedDevices: 12 },
  { id: 3, name: 'Brute Force Login', type: 'intrusion', severity: 'high', status: 'blocked', source: '185.23.45.67', target: 'Admin Portal', detectedAt: '1 hour ago', description: 'Multiple failed login attempts from single IP', affectedDevices: 1 },
  { id: 4, name: 'Outdated SSL Certificate', type: 'vulnerability', severity: 'medium', status: 'active', source: 'Internal Scan', target: 'api.company.com', detectedAt: '2 hours ago', description: 'SSL certificate expires in 7 days', affectedDevices: 1 },
  { id: 5, name: 'Unusual Data Transfer', type: 'suspicious', severity: 'medium', status: 'investigating', source: '192.168.1.45', target: 'External Server', detectedAt: '3 hours ago', description: 'Large data upload to unknown external IP', affectedDevices: 1 },
  { id: 6, name: 'DDoS Attack Mitigated', type: 'ddos', severity: 'critical', status: 'resolved', source: 'Multiple IPs', target: 'Web Server', detectedAt: '1 day ago', description: 'Distributed denial of service attack successfully mitigated', affectedDevices: 3 },
  { id: 7, name: 'SQL Injection Attempt', type: 'intrusion', severity: 'high', status: 'blocked', source: '89.34.56.78', target: 'Database', detectedAt: '1 day ago', description: 'SQL injection attack blocked by WAF', affectedDevices: 1 },
  { id: 8, name: 'Unpatched Software', type: 'vulnerability', severity: 'low', status: 'active', source: 'Vulnerability Scan', target: '5 Workstations', detectedAt: '2 days ago', description: 'Critical security patches pending installation', affectedDevices: 5 },
  { id: 9, name: 'Malicious USB Device', type: 'malware', severity: 'high', status: 'resolved', source: 'USB Device', target: 'Workstation-23', detectedAt: '3 days ago', description: 'USB device with malware detected and removed', affectedDevices: 1 },
  { id: 10, name: 'Suspicious Login Location', type: 'suspicious', severity: 'medium', status: 'investigating', source: 'Russia', target: 'john.doe@company.com', detectedAt: '3 days ago', description: 'Login from unusual geographic location', affectedDevices: 1 },
];

const getThreatIcon = (type: Threat['type']) => {
  switch (type) {
    case 'malware': return Bug;
    case 'phishing': return Globe;
    case 'intrusion': return Lock;
    case 'vulnerability': return AlertCircle;
    case 'suspicious': return Eye;
    case 'ddos': return Zap;
    default: return AlertTriangle;
  }
};

const getSeverityColor = (severity: Threat['severity']) => {
  switch (severity) {
    case 'critical': return THEME.critical;
    case 'high': return THEME.high;
    case 'medium': return THEME.medium;
    case 'low': return THEME.low;
    default: return THEME.textMuted;
  }
};

const getStatusColor = (status: Threat['status']) => {
  switch (status) {
    case 'active': return THEME.danger;
    case 'blocked': return THEME.primary;
    case 'investigating': return THEME.warning;
    case 'resolved': return THEME.info;
    default: return THEME.textMuted;
  }
};

const getStatusIcon = (status: Threat['status']) => {
  switch (status) {
    case 'active': return AlertTriangle;
    case 'blocked': return Shield;
    case 'investigating': return Clock;
    case 'resolved': return CheckCircle;
    default: return AlertCircle;
  }
};

export function ThreatsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(['Ransomware Attack Attempt', 'Phishing Email Campaign']);
  const searchCloseTimerRef = useRef<number | null>(null);
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [activeStatFilter, setActiveStatFilter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedThreat, setSelectedThreat] = useState<Threat | null>(null);
  const itemsPerPage = 6;

  // Stats
  const stats = {
    total: threats.length,
    active: threats.filter(t => t.status === 'active').length,
    blocked: threats.filter(t => t.status === 'blocked').length,
    critical: threats.filter(t => t.severity === 'critical').length,
  };

  // Handle stat card click
  const handleStatClick = (statId: string) => {
    if (activeStatFilter === statId) {
      // Clear filter if clicking same stat
      setActiveStatFilter(null);
      setFilterSeverity('all');
      setFilterStatus('all');
    } else {
      setActiveStatFilter(statId);
      // Apply appropriate filter based on stat
      if (statId === 'active') {
        setFilterStatus('active');
        setFilterSeverity('all');
      } else if (statId === 'blocked') {
        setFilterStatus('blocked');
        setFilterSeverity('all');
      } else if (statId === 'critical') {
        setFilterSeverity('critical');
        setFilterStatus('all');
      } else {
        setFilterStatus('all');
        setFilterSeverity('all');
      }
    }
    setCurrentPage(1);
  };

  // Filter threats
  const filteredThreats = threats.filter(threat => {
    const matchesSearch = threat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      threat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      threat.source.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity = filterSeverity === 'all' || threat.severity === filterSeverity;
    const matchesStatus = filterStatus === 'all' || threat.status === filterStatus;
    const matchesType = filterType === 'all' || threat.type === filterType;
    return matchesSearch && matchesSeverity && matchesStatus && matchesType;
  });

  // Pagination
  const totalPages = Math.ceil(filteredThreats.length / itemsPerPage);
  const paginatedThreats = filteredThreats.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleAction = (threat: Threat, action: string) => {
    console.log(`Action: ${action} on threat:`, threat.name);
    // In real app, this would call an API
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: THEME.textPrimary }}>Threat Detection</h1>
          <p className="text-sm mt-1" style={{ color: THEME.textMuted }}>Monitor and respond to security threats</p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
          style={{ background: THEME.primary, color: '#050505' }}
        >
          <Shield size={16} />
          Run Security Scan
        </button>
      </div>

      {/* Stats Cards - Clickable for filtering */}
      <div className="grid grid-cols-4 gap-4">
        {/* Total Threats */}
        <button
          onClick={() => handleStatClick('total')}
          className="p-5 rounded-xl text-left transition-all hover:scale-[1.02]"
          style={{
            background: activeStatFilter === 'total' ? `${THEME.danger}20` : THEME.bgCard,
            border: `1px solid ${activeStatFilter === 'total' ? THEME.danger : THEME.border}`,
            boxShadow: activeStatFilter === 'total' ? `0 0 20px ${THEME.danger}20` : 'none'
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <AlertTriangle size={22} style={{ color: THEME.danger }} />
            <div className="flex items-center gap-1">
              <TrendingDown size={14} style={{ color: THEME.primary }} />
              <span className="text-xs" style={{ color: THEME.primary }}>-12%</span>
            </div>
          </div>
          <p className="text-3xl font-bold text-white">{stats.total}</p>
          <p className="text-xs mt-1" style={{ color: activeStatFilter === 'total' ? THEME.danger : THEME.textMuted }}>Total Threats</p>
          {activeStatFilter === 'total' && <p className="text-[10px] mt-1" style={{ color: THEME.danger }}>Click to clear</p>}
        </button>

        {/* Active Threats */}
        <button
          onClick={() => handleStatClick('active')}
          className="p-5 rounded-xl text-left transition-all hover:scale-[1.02]"
          style={{
            background: activeStatFilter === 'active' ? `${THEME.danger}25` : `${THEME.danger}10`,
            border: `1px solid ${activeStatFilter === 'active' ? THEME.danger : THEME.danger + '30'}`,
            boxShadow: activeStatFilter === 'active' ? `0 0 25px ${THEME.danger}30` : 'none'
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <Zap size={22} style={{ color: THEME.danger }} />
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold animate-pulse" style={{ background: THEME.danger, color: 'white' }}>ALERT</span>
          </div>
          <p className="text-3xl font-bold" style={{ color: THEME.danger }}>{stats.active}</p>
          <p className="text-xs mt-1" style={{ color: activeStatFilter === 'active' ? THEME.danger : THEME.textMuted }}>Active Threats</p>
          {activeStatFilter === 'active' && <p className="text-[10px] mt-1" style={{ color: THEME.danger }}>Click to clear</p>}
        </button>

        {/* Blocked */}
        <button
          onClick={() => handleStatClick('blocked')}
          className="p-5 rounded-xl text-left transition-all hover:scale-[1.02]"
          style={{
            background: activeStatFilter === 'blocked' ? `${THEME.primary}20` : `${THEME.primary}10`,
            border: `1px solid ${activeStatFilter === 'blocked' ? THEME.primary : THEME.primary + '30'}`,
            boxShadow: activeStatFilter === 'blocked' ? `0 0 20px ${THEME.primary}20` : 'none'
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <Shield size={22} style={{ color: THEME.primary }} />
            <div className="flex items-center gap-1">
              <TrendingUp size={14} style={{ color: THEME.primary }} />
              <span className="text-xs" style={{ color: THEME.primary }}>+8%</span>
            </div>
          </div>
          <p className="text-3xl font-bold" style={{ color: THEME.primary }}>{stats.blocked}</p>
          <p className="text-xs mt-1" style={{ color: activeStatFilter === 'blocked' ? THEME.primary : THEME.textMuted }}>Blocked</p>
          {activeStatFilter === 'blocked' && <p className="text-[10px] mt-1" style={{ color: THEME.primary }}>Click to clear</p>}
        </button>

        {/* Critical Severity */}
        <button
          onClick={() => handleStatClick('critical')}
          className="p-5 rounded-xl text-left transition-all hover:scale-[1.02]"
          style={{
            background: activeStatFilter === 'critical' ? `${THEME.critical}25` : `${THEME.critical}10`,
            border: `1px solid ${activeStatFilter === 'critical' ? THEME.critical : THEME.critical + '30'}`,
            boxShadow: activeStatFilter === 'critical' ? `0 0 25px ${THEME.critical}30` : 'none'
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <AlertCircle size={22} style={{ color: THEME.critical }} />
            {activeStatFilter === 'critical' && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: THEME.critical, color: 'white' }}>FILTERED</span>
            )}
          </div>
          <p className="text-3xl font-bold" style={{ color: THEME.critical }}>{stats.critical}</p>
          <p className="text-xs mt-1" style={{ color: activeStatFilter === 'critical' ? THEME.critical : THEME.textMuted }}>Critical Severity</p>
          {activeStatFilter === 'critical' && <p className="text-[10px] mt-1" style={{ color: THEME.critical }}>Click to clear</p>}
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 flex-wrap">
        {/* Search */}
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
              placeholder="Search threats..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); setActiveStatFilter(null); setShowSearch(true); setShowHistory(false); }}
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
                  {threats.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.description.toLowerCase().includes(searchQuery.toLowerCase())).map(t => (
                    <button key={t.id} onClick={() => { setSearchQuery(t.name); setShowSearch(false); setShowHistory(false); }} className="w-full text-left px-3 py-2 hover:bg-[#1A1A1A]">{t.name}</button>
                  ))}
                  {threats.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.description.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
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

        {/* Severity Filter */}
        <select
          value={filterSeverity}
          onChange={(e) => { setFilterSeverity(e.target.value); setCurrentPage(1); setActiveStatFilter(null); }}
          className="px-4 py-3 rounded-xl text-sm outline-none"
          style={{ background: THEME.bgCard, border: `1px solid ${THEME.border}`, color: THEME.textPrimary }}
        >
          <option value="all">All Severities</option>
          <option value="critical">Critical</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        {/* Status Filter */}
        <select
          value={filterStatus}
          onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); setActiveStatFilter(null); }}
          className="px-4 py-3 rounded-xl text-sm outline-none"
          style={{ background: THEME.bgCard, border: `1px solid ${THEME.border}`, color: THEME.textPrimary }}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
          <option value="investigating">Investigating</option>
          <option value="resolved">Resolved</option>
        </select>

        {/* Type Filter */}
        <select
          value={filterType}
          onChange={(e) => { setFilterType(e.target.value); setCurrentPage(1); setActiveStatFilter(null); }}
          className="px-4 py-3 rounded-xl text-sm outline-none"
          style={{ background: THEME.bgCard, border: `1px solid ${THEME.border}`, color: THEME.textPrimary }}
        >
          <option value="all">All Types</option>
          <option value="malware">Malware</option>
          <option value="phishing">Phishing</option>
          <option value="intrusion">Intrusion</option>
          <option value="vulnerability">Vulnerability</option>
          <option value="suspicious">Suspicious Activity</option>
          <option value="ddos">DDoS</option>
        </select>
      </div>

      {/* Active Filter Indicator */}
      {(activeStatFilter || searchQuery || filterSeverity !== 'all' || filterStatus !== 'all' || filterType !== 'all') && (
        <div className="flex items-center gap-2 flex-wrap text-sm" style={{ color: THEME.textMuted }}>
          <span>Active Filters:</span>
          {activeStatFilter === 'total' && (
            <span className="flex items-center gap-1 px-2 py-1 rounded-full text-xs" style={{ background: `${THEME.danger}20`, color: THEME.danger }}>
              <AlertTriangle size={12} /> All Threats
              <button onClick={() => { setActiveStatFilter(null); }} className="ml-1 hover:opacity-70">×</button>
            </span>
          )}
          {activeStatFilter === 'active' && (
            <span className="flex items-center gap-1 px-2 py-1 rounded-full text-xs" style={{ background: `${THEME.danger}20`, color: THEME.danger }}>
              <Zap size={12} /> Active Threats
              <button onClick={() => { setActiveStatFilter(null); setFilterStatus('all'); }} className="ml-1 hover:opacity-70">×</button>
            </span>
          )}
          {activeStatFilter === 'blocked' && (
            <span className="flex items-center gap-1 px-2 py-1 rounded-full text-xs" style={{ background: `${THEME.primary}20`, color: THEME.primary }}>
              <Shield size={12} /> Blocked
              <button onClick={() => { setActiveStatFilter(null); setFilterStatus('all'); }} className="ml-1 hover:opacity-70">×</button>
            </span>
          )}
          {activeStatFilter === 'critical' && (
            <span className="flex items-center gap-1 px-2 py-1 rounded-full text-xs" style={{ background: `${THEME.critical}20`, color: THEME.critical }}>
              <AlertCircle size={12} /> Critical Severity
              <button onClick={() => { setActiveStatFilter(null); setFilterSeverity('all'); }} className="ml-1 hover:opacity-70">×</button>
            </span>
          )}
          {searchQuery && !activeStatFilter && (
            <span className="flex items-center gap-1 px-2 py-1 rounded-full text-xs" style={{ background: `${THEME.info}20`, color: THEME.info }}>
              Search: "{searchQuery}"
              <button onClick={() => setSearchQuery('')} className="ml-1 hover:opacity-70">×</button>
            </span>
          )}
          {filterSeverity !== 'all' && !activeStatFilter && (
            <span className="flex items-center gap-1 px-2 py-1 rounded-full text-xs" style={{ background: `${THEME.warning}20`, color: THEME.warning }}>
              Severity: {filterSeverity}
              <button onClick={() => setFilterSeverity('all')} className="ml-1 hover:opacity-70">×</button>
            </span>
          )}
          {filterStatus !== 'all' && !activeStatFilter && (
            <span className="flex items-center gap-1 px-2 py-1 rounded-full text-xs" style={{ background: `${THEME.primary}20`, color: THEME.primary }}>
              Status: {filterStatus}
              <button onClick={() => setFilterStatus('all')} className="ml-1 hover:opacity-70">×</button>
            </span>
          )}
          {filterType !== 'all' && (
            <span className="flex items-center gap-1 px-2 py-1 rounded-full text-xs" style={{ background: `${THEME.info}20`, color: THEME.info }}>
              Type: {filterType}
              <button onClick={() => setFilterType('all')} className="ml-1 hover:opacity-70">×</button>
            </span>
          )}
          <button
            onClick={() => {
              setActiveStatFilter(null);
              setSearchQuery('');
              setFilterSeverity('all');
              setFilterStatus('all');
              setFilterType('all');
              setCurrentPage(1);
            }}
            className="ml-2 font-medium hover:opacity-80"
            style={{ color: THEME.primary }}
          >
            Clear All
          </button>
        </div>
      )}

      {/* Threats List */}
      <div className="space-y-3">
        {paginatedThreats.length > 0 ? (
          paginatedThreats.map((threat) => {
            const ThreatIcon = getThreatIcon(threat.type);
            const StatusIcon = getStatusIcon(threat.status);
            const severityColor = getSeverityColor(threat.severity);
            const statusColor = getStatusColor(threat.status);

            return (
              <div
                key={threat.id}
                className="p-4 rounded-xl transition-all hover:border-[#2A2A2A] cursor-pointer"
                style={{ background: THEME.bgCard, border: `1px solid ${threat.status === 'active' ? THEME.danger + '50' : THEME.border}` }}
                onClick={() => setSelectedThreat(threat)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${severityColor}15`, border: `1px solid ${severityColor}30` }}
                    >
                      <ThreatIcon size={22} style={{ color: severityColor }} />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-sm font-semibold text-white">{threat.name}</h3>
                        <span
                          className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase"
                          style={{ background: `${severityColor}20`, color: severityColor }}
                        >
                          {threat.severity}
                        </span>
                        <span
                          className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium"
                          style={{ background: `${statusColor}15`, color: statusColor }}
                        >
                          <StatusIcon size={10} />
                          {threat.status}
                        </span>
                      </div>
                      <p className="text-xs mb-2" style={{ color: THEME.textMuted }}>{threat.description}</p>
                      <div className="flex items-center gap-4 text-xs" style={{ color: THEME.textMuted }}>
                        <span className="flex items-center gap-1">
                          <Globe size={12} />
                          Source: {threat.source}
                        </span>
                        <span className="flex items-center gap-1">
                          <Monitor size={12} />
                          Target: {threat.target}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {threat.detectedAt}
                        </span>
                        <span className="flex items-center gap-1">
                          <Smartphone size={12} />
                          {threat.affectedDevices} device(s)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {threat.status === 'active' && (
                      <button
                        onClick={(e) => { e.stopPropagation(); handleAction(threat, 'block'); }}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium"
                        style={{ background: THEME.danger, color: 'white' }}
                      >
                        Block Now
                      </button>
                    )}
                    {threat.status === 'investigating' && (
                      <button
                        onClick={(e) => { e.stopPropagation(); handleAction(threat, 'resolve'); }}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium"
                        style={{ background: THEME.primary, color: '#050505' }}
                      >
                        Mark Resolved
                      </button>
                    )}
                    <button
                      onClick={(e) => { e.stopPropagation(); }}
                      className="p-2 rounded-lg"
                      style={{ background: '#1A1A1A', color: THEME.textMuted }}
                    >
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-12 rounded-xl text-center" style={{ background: THEME.bgCard, border: `1px solid ${THEME.border}` }}>
            <Shield size={48} className="mx-auto mb-4" style={{ color: THEME.primary }} />
            <p className="text-lg font-medium text-white mb-2">No threats found</p>
            <p className="text-sm" style={{ color: THEME.textMuted }}>Your system is secure. No threats match your filters.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredThreats.length > itemsPerPage && (
        <div className="flex items-center justify-between">
          <span className="text-xs" style={{ color: THEME.textMuted }}>
            Showing {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredThreats.length)} of {filteredThreats.length} threats
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

      {/* Threat Detail Modal */}
      {selectedThreat && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setSelectedThreat(null)}
        >
          <div
            className="bg-[#0A0A0A] rounded-xl w-full max-w-lg border border-[#1A1A1A] overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className="p-4 border-b border-[#1A1A1A]"
              style={{ background: `${getSeverityColor(selectedThreat.severity)}10` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {(() => {
                    const Icon = getThreatIcon(selectedThreat.type);
                    return <Icon size={24} style={{ color: getSeverityColor(selectedThreat.severity) }} />;
                  })()}
                  <div>
                    <h2 className="text-lg font-semibold text-white">{selectedThreat.name}</h2>
                    <p className="text-xs" style={{ color: THEME.textMuted }}>Threat ID: #{selectedThreat.id}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedThreat(null)}
                  className="p-2 rounded-lg hover:bg-[#1A1A1A]"
                  style={{ color: THEME.textMuted }}
                >
                  <XCircle size={20} />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-4 space-y-4">
              {/* Status & Severity */}
              <div className="flex items-center gap-3">
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold uppercase"
                  style={{ background: `${getSeverityColor(selectedThreat.severity)}20`, color: getSeverityColor(selectedThreat.severity) }}
                >
                  {selectedThreat.severity} Severity
                </span>
                <span
                  className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium"
                  style={{ background: `${getStatusColor(selectedThreat.status)}15`, color: getStatusColor(selectedThreat.status) }}
                >
                  {(() => {
                    const StatusIcon = getStatusIcon(selectedThreat.status);
                    return <StatusIcon size={12} />;
                  })()}
                  {selectedThreat.status.charAt(0).toUpperCase() + selectedThreat.status.slice(1)}
                </span>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs uppercase mb-2" style={{ color: THEME.textMuted }}>Description</h4>
                <p className="text-sm text-white">{selectedThreat.description}</p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg" style={{ background: '#1A1A1A' }}>
                  <p className="text-xs mb-1" style={{ color: THEME.textMuted }}>Source</p>
                  <p className="text-sm font-medium text-white">{selectedThreat.source}</p>
                </div>
                <div className="p-3 rounded-lg" style={{ background: '#1A1A1A' }}>
                  <p className="text-xs mb-1" style={{ color: THEME.textMuted }}>Target</p>
                  <p className="text-sm font-medium text-white">{selectedThreat.target}</p>
                </div>
                <div className="p-3 rounded-lg" style={{ background: '#1A1A1A' }}>
                  <p className="text-xs mb-1" style={{ color: THEME.textMuted }}>Detected</p>
                  <p className="text-sm font-medium text-white">{selectedThreat.detectedAt}</p>
                </div>
                <div className="p-3 rounded-lg" style={{ background: '#1A1A1A' }}>
                  <p className="text-xs mb-1" style={{ color: THEME.textMuted }}>Affected Devices</p>
                  <p className="text-sm font-medium text-white">{selectedThreat.affectedDevices}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-2">
                {selectedThreat.status === 'active' && (
                  <button
                    onClick={() => { handleAction(selectedThreat, 'block'); setSelectedThreat(null); }}
                    className="flex-1 py-2.5 rounded-lg text-sm font-medium"
                    style={{ background: THEME.danger, color: 'white' }}
                  >
                    Block Threat
                  </button>
                )}
                {selectedThreat.status === 'investigating' && (
                  <button
                    onClick={() => { handleAction(selectedThreat, 'resolve'); setSelectedThreat(null); }}
                    className="flex-1 py-2.5 rounded-lg text-sm font-medium"
                    style={{ background: THEME.primary, color: '#050505' }}
                  >
                    Mark as Resolved
                  </button>
                )}
                <button
                  onClick={() => setSelectedThreat(null)}
                  className="flex-1 py-2.5 rounded-lg text-sm font-medium"
                  style={{ background: '#1A1A1A', color: THEME.textMuted }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

