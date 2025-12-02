import { useState } from 'react';
import { Monitor, Laptop, Smartphone, Tablet, Wifi, WifiOff, MapPin, Search, Filter, MoreVertical, ChevronUp, ChevronDown } from 'lucide-react';

const THEME = {
  primary: '#00FF66',
  online: '#00FF66',
  offline: '#FF4444',
  bgDark: '#050505',
  bgCard: '#0F0F0F',
  border: '#1A1A1A',
  textPrimary: '#D5FFD6',
  textMuted: '#8F8F8F',
};

interface Device {
  id: number;
  name: string;
  type: 'laptop' | 'desktop' | 'mobile' | 'tablet';
  status: 'online' | 'offline';
  user: string;
  location: string;
  lastSeen: string;
  os: string;
  ip: string;
}

const devices: Device[] = [
  { id: 1, name: 'MacBook Pro', type: 'laptop', status: 'online', user: 'Alex', location: 'New York, USA', lastSeen: 'Just now', os: 'macOS 14.2', ip: '192.168.1.101' },
  { id: 2, name: 'iPhone 15 Pro', type: 'mobile', status: 'online', user: 'Sarah', location: 'Los Angeles, USA', lastSeen: '5 min ago', os: 'iOS 17.2', ip: '192.168.1.102' },
  { id: 3, name: 'iPad Air', type: 'tablet', status: 'offline', user: 'Jordan', location: 'Chicago, USA', lastSeen: '1 hour ago', os: 'iPadOS 17.2', ip: '192.168.1.103' },
  { id: 4, name: 'Windows Desktop', type: 'desktop', status: 'online', user: 'Mike', location: 'New York, USA', lastSeen: 'Just now', os: 'Windows 11', ip: '192.168.1.104' },
  { id: 5, name: 'MacBook Air', type: 'laptop', status: 'online', user: 'Emma', location: 'Los Angeles, USA', lastSeen: '10 min ago', os: 'macOS 14.1', ip: '192.168.1.105' },
  { id: 6, name: 'Pixel 8', type: 'mobile', status: 'offline', user: 'Carlos', location: 'Chicago, USA', lastSeen: '2 days ago', os: 'Android 14', ip: '192.168.1.106' },
  { id: 7, name: 'ThinkPad X1', type: 'laptop', status: 'online', user: 'David', location: 'New York, USA', lastSeen: 'Just now', os: 'Windows 11', ip: '192.168.1.107' },
  { id: 8, name: 'iMac 24"', type: 'desktop', status: 'online', user: 'Maria', location: 'New York, USA', lastSeen: 'Just now', os: 'macOS 14.2', ip: '192.168.1.108' },
  { id: 9, name: 'Samsung Galaxy S24', type: 'mobile', status: 'online', user: 'Lucas', location: 'São Paulo, Brazil', lastSeen: '30 min ago', os: 'Android 14', ip: '192.168.1.109' },
  { id: 10, name: 'Surface Pro 9', type: 'tablet', status: 'offline', user: 'Ana', location: 'Buenos Aires, Argentina', lastSeen: '2 hours ago', os: 'Windows 11', ip: '192.168.1.110' },
  { id: 11, name: 'Dell XPS 15', type: 'laptop', status: 'online', user: 'James', location: 'London, UK', lastSeen: 'Just now', os: 'Windows 11', ip: '192.168.1.111' },
  { id: 12, name: 'Mac Studio', type: 'desktop', status: 'online', user: 'Sophie', location: 'Paris, France', lastSeen: '15 min ago', os: 'macOS 14.2', ip: '192.168.1.112' },
  { id: 13, name: 'iPhone 14', type: 'mobile', status: 'online', user: 'Hans', location: 'Berlin, Germany', lastSeen: '20 min ago', os: 'iOS 17.1', ip: '192.168.1.113' },
  { id: 14, name: 'Galaxy Tab S9', type: 'tablet', status: 'online', user: 'Priya', location: 'Mumbai, India', lastSeen: '45 min ago', os: 'Android 14', ip: '192.168.1.114' },
  { id: 15, name: 'HP Workstation', type: 'desktop', status: 'offline', user: 'Wei', location: 'Shanghai, China', lastSeen: '3 days ago', os: 'Windows 10', ip: '192.168.1.115' },
  { id: 16, name: 'OnePlus 12', type: 'mobile', status: 'online', user: 'Ali', location: 'Dubai, UAE', lastSeen: '4 hours ago', os: 'Android 14', ip: '192.168.1.116' },
];

const getDeviceIcon = (type: string) => {
  switch (type) {
    case 'laptop': return Laptop;
    case 'desktop': return Monitor;
    case 'mobile': return Smartphone;
    case 'tablet': return Tablet;
    default: return Monitor;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'online': return THEME.online;
    case 'offline': return THEME.offline;
    default: return THEME.textMuted;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'online': return Wifi;
    case 'offline': return WifiOff;
    default: return Wifi;
  }
};

type SortColumn = 'name' | 'status' | 'user' | 'location' | 'lastSeen' | null;
type SortDirection = 'asc' | 'desc';

export function DevicesPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'computers' | 'mobiles'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortColumn, setSortColumn] = useState<SortColumn>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  // Separate devices by category
  const computers = devices.filter(d => d.type === 'laptop' || d.type === 'desktop');
  const mobiles = devices.filter(d => d.type === 'mobile' || d.type === 'tablet');

  // Handle column click for sorting
  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      // Toggle direction if same column
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // New column, start with ascending
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Get devices based on active tab, search, and sorting
  const getFilteredDevices = () => {
    let filtered = devices;
    if (activeTab === 'computers') filtered = computers;
    if (activeTab === 'mobiles') filtered = mobiles;
    
    if (searchQuery) {
      filtered = filtered.filter(d => 
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Helper function to convert lastSeen to minutes for proper sorting
    const getLastSeenMinutes = (lastSeen: string): number => {
      const lower = lastSeen.toLowerCase();
      if (lower.includes('just now')) return 0;
      if (lower.includes('min ago')) {
        const num = parseInt(lower) || 1;
        return num;
      }
      if (lower.includes('hour')) {
        const num = parseInt(lower) || 1;
        return num * 60;
      }
      if (lower.includes('day')) {
        const num = parseInt(lower) || 1;
        return num * 60 * 24;
      }
      return 9999; // Unknown format, put at end
    };

    // Apply sorting
    if (sortColumn) {
      filtered = [...filtered].sort((a, b) => {
        let comparison = 0;

        switch (sortColumn) {
          case 'name':
            comparison = a.name.toLowerCase().localeCompare(b.name.toLowerCase());
            break;
          case 'status':
            // Online comes before offline in ascending
            comparison = a.status.localeCompare(b.status);
            break;
          case 'user':
            comparison = a.user.toLowerCase().localeCompare(b.user.toLowerCase());
            break;
          case 'location':
            // Sort by country first, then city
            const [cityA, countryA] = a.location.split(', ');
            const [cityB, countryB] = b.location.split(', ');
            comparison = (countryA || '').localeCompare(countryB || '') || (cityA || '').localeCompare(cityB || '');
            break;
          case 'lastSeen':
            // Sort by actual time (most recent first in ascending)
            const timeA = getLastSeenMinutes(a.lastSeen);
            const timeB = getLastSeenMinutes(b.lastSeen);
            comparison = timeA - timeB;
            break;
          default:
            return 0;
        }

        return sortDirection === 'asc' ? comparison : -comparison;
      });
    }

    return filtered;
  };

  const filteredDevices = getFilteredDevices();

  const stats = {
    total: devices.length,
    computers: computers.length,
    mobiles: mobiles.length,
    online: devices.filter(d => d.status === 'online').length,
  };

  const tabs = [
    { id: 'all', label: 'All Devices', count: stats.total },
    { id: 'computers', label: 'Computers', count: stats.computers, icon: Monitor },
    { id: 'mobiles', label: 'Mobiles', count: stats.mobiles, icon: Smartphone },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: THEME.textPrimary }}>Devices</h1>
          <p className="text-sm mt-1" style={{ color: THEME.textMuted }}>Manage and monitor all connected devices</p>
        </div>
        <button
          className="px-4 py-2 rounded-lg font-medium text-sm transition-all hover:scale-105"
          style={{ background: THEME.primary, color: THEME.bgDark }}
        >
          + Add Device
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Devices', value: stats.total, icon: Monitor, color: THEME.primary },
          { label: 'Computers', value: stats.computers, icon: Laptop, color: '#60A5FA' },
          { label: 'Mobiles & Tablets', value: stats.mobiles, icon: Smartphone, color: '#A78BFA' },
          { label: 'Online Now', value: stats.online, icon: Wifi, color: THEME.online },
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

      {/* Tabs */}
      <div className="flex items-center gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as 'all' | 'computers' | 'mobiles')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id 
                ? 'text-[#050505]' 
                : 'hover:bg-[rgba(255,255,255,0.05)]'
            }`}
            style={{ 
              background: activeTab === tab.id ? THEME.primary : 'transparent',
              border: `1px solid ${activeTab === tab.id ? THEME.primary : THEME.border}`,
              color: activeTab === tab.id ? THEME.bgDark : THEME.textMuted,
            }}
          >
            {tab.icon && <tab.icon size={16} />}
            <span>{tab.label}</span>
            <span 
              className="px-2 py-0.5 rounded-full text-xs font-bold"
              style={{ 
                background: activeTab === tab.id ? 'rgba(0,0,0,0.2)' : THEME.border,
                color: activeTab === tab.id ? THEME.bgDark : THEME.textMuted,
              }}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div
          className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl"
          style={{ background: THEME.bgCard, border: `1px solid ${THEME.border}` }}
        >
          <Search size={18} style={{ color: THEME.textMuted }} />
          <input
            type="text"
            placeholder={`Search ${activeTab === 'computers' ? 'computers' : activeTab === 'mobiles' ? 'mobiles' : 'devices'}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ color: THEME.textPrimary }}
          />
        </div>
        <button
          className="flex items-center gap-2 px-4 py-3 rounded-xl transition-all hover:bg-opacity-80"
          style={{ background: THEME.bgCard, border: `1px solid ${THEME.border}`, color: THEME.textMuted }}
        >
          <Filter size={18} />
          <span className="text-sm">Filter</span>
        </button>
      </div>

      {/* Devices Table */}
      <div
        className="rounded-xl overflow-hidden"
        style={{ background: THEME.bgCard, border: `1px solid ${THEME.border}` }}
      >
        {/* Table Header */}
        <div
          className="grid grid-cols-[2fr,1fr,1fr,1.5fr,1fr,auto] gap-4 px-6 py-4"
          style={{ borderBottom: `1px solid ${THEME.border}` }}
        >
          {[
            { key: 'name', label: 'Device' },
            { key: 'status', label: 'Status' },
            { key: 'user', label: 'User' },
            { key: 'location', label: 'Location' },
            { key: 'lastSeen', label: 'Last Seen' },
            { key: null, label: '' },
          ].map((header) => (
            <button
              key={header.label || 'actions'}
              onClick={() => header.key && handleSort(header.key as SortColumn)}
              className={`flex items-center gap-1 text-xs font-medium uppercase tracking-wider transition-colors ${
                header.key ? 'cursor-pointer hover:text-[#00FF66]' : 'cursor-default'
              }`}
              style={{ color: sortColumn === header.key ? THEME.primary : THEME.textMuted }}
              disabled={!header.key}
            >
              {header.label}
              {header.key && sortColumn === header.key && (
                sortDirection === 'asc' 
                  ? <ChevronUp size={14} /> 
                  : <ChevronDown size={14} />
              )}
            </button>
          ))}
        </div>

        {/* Table Body */}
        {filteredDevices.length > 0 ? (
          filteredDevices.map((device, idx) => {
            const DeviceIcon = getDeviceIcon(device.type);
            const StatusIcon = getStatusIcon(device.status);
            const statusColor = getStatusColor(device.status);

            return (
              <div
                key={device.id}
                className="grid grid-cols-[2fr,1fr,1fr,1.5fr,1fr,auto] gap-4 px-6 py-4 items-center hover:bg-[rgba(255,255,255,0.02)] transition-colors cursor-pointer"
                style={{ borderBottom: idx < filteredDevices.length - 1 ? `1px solid ${THEME.border}` : 'none' }}
              >
                {/* Device */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: `${statusColor}15`, border: `1px solid ${statusColor}30` }}
                  >
                    <DeviceIcon size={18} style={{ color: statusColor }} />
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: THEME.textPrimary }}>{device.name}</p>
                    <p className="text-xs" style={{ color: THEME.textMuted }}>{device.os} • {device.ip}</p>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center gap-2">
                  <StatusIcon size={14} style={{ color: statusColor }} />
                  <span className="text-sm capitalize" style={{ color: statusColor }}>{device.status}</span>
                </div>

                {/* User */}
                <span className="text-sm" style={{ color: THEME.textPrimary }}>{device.user}</span>

                {/* Location */}
                <div className="flex items-center gap-2">
                  <MapPin size={14} style={{ color: THEME.textMuted }} />
                  <span className="text-sm" style={{ color: THEME.textMuted }}>{device.location}</span>
                </div>

                {/* Last Seen */}
                <span className="text-sm" style={{ color: THEME.textMuted }}>{device.lastSeen}</span>

                {/* Actions */}
                <button
                  className="p-2 rounded-lg hover:bg-[rgba(255,255,255,0.05)] transition-colors"
                  style={{ color: THEME.textMuted }}
                >
                  <MoreVertical size={16} />
                </button>
              </div>
            );
          })
        ) : (
          <div className="px-6 py-12 text-center">
            <p style={{ color: THEME.textMuted }}>No devices found</p>
          </div>
        )}
      </div>
    </div>
  );
}
