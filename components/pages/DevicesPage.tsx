import { useState } from 'react';
import { Monitor, Laptop, Smartphone, Tablet, Wifi, WifiOff, MapPin, Search, Filter, MoreVertical, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, X, Plus, Edit, Trash2, RefreshCw, Download, Shield, Battery, BatteryLow, BatteryMedium, BatteryFull, BatteryCharging, Clock, Globe, Cpu, HardDrive, Check, AlertTriangle, Eye, Power, Lock, Unlock, Activity } from 'lucide-react';

const THEME = {
  primary: '#00FF66',
  online: '#00FF66',
  offline: '#FF4444',
  warning: '#FFCC00',
  info: '#60A5FA',
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
  battery?: number;
  storage?: number;
  isCompliant?: boolean;
  isEncrypted?: boolean;
  macAddress?: string;
  serialNumber?: string;
}

const initialDevices: Device[] = [
  { id: 1, name: 'MacBook Pro', type: 'laptop', status: 'online', user: 'Alex', location: 'New York, USA', lastSeen: 'Just now', os: 'macOS 14.2', ip: '192.168.1.101', battery: 85, storage: 65, isCompliant: true, isEncrypted: true, macAddress: 'A1:B2:C3:D4:E5:F6', serialNumber: 'MBP2023X001' },
  { id: 2, name: 'iPhone 15 Pro', type: 'mobile', status: 'online', user: 'Sarah', location: 'Los Angeles, USA', lastSeen: '5 min ago', os: 'iOS 17.2', ip: '192.168.1.102', battery: 92, storage: 45, isCompliant: true, isEncrypted: true, macAddress: 'A2:B3:C4:D5:E6:F7', serialNumber: 'IPH15P2023002' },
  { id: 3, name: 'iPad Air', type: 'tablet', status: 'offline', user: 'Jordan', location: 'Chicago, USA', lastSeen: '1 hour ago', os: 'iPadOS 17.2', ip: '192.168.1.103', battery: 20, storage: 78, isCompliant: false, isEncrypted: true, macAddress: 'A3:B4:C5:D6:E7:F8', serialNumber: 'IPAD2023003' },
  { id: 4, name: 'Windows Desktop', type: 'desktop', status: 'online', user: 'Mike', location: 'New York, USA', lastSeen: 'Just now', os: 'Windows 11', ip: '192.168.1.104', battery: 100, storage: 32, isCompliant: true, isEncrypted: true, macAddress: 'A4:B5:C6:D7:E8:F9', serialNumber: 'WIN2023004' },
  { id: 5, name: 'MacBook Air', type: 'laptop', status: 'online', user: 'Emma', location: 'Los Angeles, USA', lastSeen: '10 min ago', os: 'macOS 14.1', ip: '192.168.1.105', battery: 45, storage: 55, isCompliant: true, isEncrypted: false, macAddress: 'A5:B6:C7:D8:E9:FA', serialNumber: 'MBA2023005' },
  { id: 6, name: 'Pixel 8', type: 'mobile', status: 'offline', user: 'Carlos', location: 'Chicago, USA', lastSeen: '2 days ago', os: 'Android 14', ip: '192.168.1.106', battery: 0, storage: 88, isCompliant: false, isEncrypted: true, macAddress: 'A6:B7:C8:D9:EA:FB', serialNumber: 'PIX82023006' },
  { id: 7, name: 'ThinkPad X1', type: 'laptop', status: 'online', user: 'David', location: 'New York, USA', lastSeen: 'Just now', os: 'Windows 11', ip: '192.168.1.107', battery: 78, storage: 42, isCompliant: true, isEncrypted: true, macAddress: 'A7:B8:C9:DA:EB:FC', serialNumber: 'TPX12023007' },
  { id: 8, name: 'iMac 24"', type: 'desktop', status: 'online', user: 'Maria', location: 'New York, USA', lastSeen: 'Just now', os: 'macOS 14.2', ip: '192.168.1.108', battery: 100, storage: 28, isCompliant: true, isEncrypted: true, macAddress: 'A8:B9:CA:DB:EC:FD', serialNumber: 'IMAC2023008' },
  { id: 9, name: 'Samsung Galaxy S24', type: 'mobile', status: 'online', user: 'Lucas', location: 'São Paulo, Brazil', lastSeen: '30 min ago', os: 'Android 14', ip: '192.168.1.109', battery: 67, storage: 52, isCompliant: true, isEncrypted: true, macAddress: 'A9:BA:CB:DC:ED:FE', serialNumber: 'SGS242023009' },
  { id: 10, name: 'Surface Pro 9', type: 'tablet', status: 'offline', user: 'Ana', location: 'Buenos Aires, Argentina', lastSeen: '2 hours ago', os: 'Windows 11', ip: '192.168.1.110', battery: 15, storage: 71, isCompliant: true, isEncrypted: false, macAddress: 'AA:BB:CC:DD:EE:FF', serialNumber: 'SP92023010' },
  { id: 11, name: 'Dell XPS 15', type: 'laptop', status: 'online', user: 'James', location: 'London, UK', lastSeen: 'Just now', os: 'Windows 11', ip: '192.168.1.111', battery: 95, storage: 38, isCompliant: true, isEncrypted: true, macAddress: 'AB:BC:CD:DE:EF:F0', serialNumber: 'XPS152023011' },
  { id: 12, name: 'Mac Studio', type: 'desktop', status: 'online', user: 'Sophie', location: 'Paris, France', lastSeen: '15 min ago', os: 'macOS 14.2', ip: '192.168.1.112', battery: 100, storage: 22, isCompliant: true, isEncrypted: true, macAddress: 'AC:BD:CE:DF:E0:F1', serialNumber: 'MS2023012' },
  { id: 13, name: 'iPhone 14', type: 'mobile', status: 'online', user: 'Hans', location: 'Berlin, Germany', lastSeen: '20 min ago', os: 'iOS 17.1', ip: '192.168.1.113', battery: 55, storage: 62, isCompliant: true, isEncrypted: true, macAddress: 'AD:BE:CF:D0:E1:F2', serialNumber: 'IPH142023013' },
  { id: 14, name: 'Galaxy Tab S9', type: 'tablet', status: 'online', user: 'Priya', location: 'Mumbai, India', lastSeen: '45 min ago', os: 'Android 14', ip: '192.168.1.114', battery: 82, storage: 35, isCompliant: true, isEncrypted: true, macAddress: 'AE:BF:C0:D1:E2:F3', serialNumber: 'GTS92023014' },
  { id: 15, name: 'HP Workstation', type: 'desktop', status: 'offline', user: 'Wei', location: 'Shanghai, China', lastSeen: '3 days ago', os: 'Windows 10', ip: '192.168.1.115', battery: 100, storage: 85, isCompliant: false, isEncrypted: false, macAddress: 'AF:B0:C1:D2:E3:F4', serialNumber: 'HPW2023015' },
  { id: 16, name: 'OnePlus 12', type: 'mobile', status: 'online', user: 'Ali', location: 'Dubai, UAE', lastSeen: '4 hours ago', os: 'Android 14', ip: '192.168.1.116', battery: 38, storage: 48, isCompliant: true, isEncrypted: true, macAddress: 'B0:C1:D2:E3:F4:05', serialNumber: 'OP122023016' },
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

const getBatteryIcon = (battery: number, status: string) => {
  if (status === 'offline') return Battery;
  if (battery <= 20) return BatteryLow;
  if (battery <= 50) return BatteryMedium;
  if (battery >= 95) return BatteryCharging;
  return BatteryFull;
};

const getBatteryColor = (battery: number) => {
  if (battery <= 20) return THEME.offline;
  if (battery <= 50) return THEME.warning;
  return THEME.online;
};

type SortColumn = 'name' | 'status' | 'user' | 'location' | 'lastSeen' | null;
type SortDirection = 'asc' | 'desc';
type FilterType = 'all' | 'laptop' | 'desktop' | 'mobile' | 'tablet';
type FilterStatus = 'all' | 'online' | 'offline';
type FilterCategory = 'all' | 'computers' | 'mobiles' | 'compliant';

const ITEMS_PER_PAGE_OPTIONS = [5, 10, 15, 20];

export function DevicesPage() {
  const [devices, setDevices] = useState<Device[]>(initialDevices);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortColumn, setSortColumn] = useState<SortColumn>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [filterCategory, setFilterCategory] = useState<FilterCategory>('all');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [showActionsMenu, setShowActionsMenu] = useState<number | null>(null);
  const [showMoreActions, setShowMoreActions] = useState(false);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // Add device form state
  const [newDevice, setNewDevice] = useState({
    name: '',
    type: 'laptop' as Device['type'],
    user: '',
    location: '',
    os: '',
    ip: '',
    macAddress: '',
    serialNumber: '',
  });

  // Separate devices by category
  const computers = devices.filter(d => d.type === 'laptop' || d.type === 'desktop');
  const mobiles = devices.filter(d => d.type === 'mobile' || d.type === 'tablet');

  // Handle column click for sorting
  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Get devices based on search and sorting
  const getFilteredDevices = () => {
    let filtered = devices;
    
    // Apply category filter (computers, mobiles, compliant)
    if (filterCategory === 'computers') {
      filtered = filtered.filter(d => d.type === 'laptop' || d.type === 'desktop');
    } else if (filterCategory === 'mobiles') {
      filtered = filtered.filter(d => d.type === 'mobile' || d.type === 'tablet');
    } else if (filterCategory === 'compliant') {
      filtered = filtered.filter(d => d.isCompliant === true);
    }
    
    // Apply type filter (only if no category filter is active)
    if (filterType !== 'all' && filterCategory === 'all') {
      filtered = filtered.filter(d => d.type === filterType);
    }

    // Apply status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(d => d.status === filterStatus);
    }

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(d => 
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.os.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.ip.toLowerCase().includes(searchQuery.toLowerCase())
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
      return 9999;
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
            comparison = a.status.localeCompare(b.status);
            break;
          case 'user':
            comparison = a.user.toLowerCase().localeCompare(b.user.toLowerCase());
            break;
          case 'location':
            const [cityA, countryA] = a.location.split(', ');
            const [cityB, countryB] = b.location.split(', ');
            comparison = (countryA || '').localeCompare(countryB || '') || (cityA || '').localeCompare(cityB || '');
            break;
          case 'lastSeen':
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

  // Pagination calculations
  const totalItems = filteredDevices.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedDevices = filteredDevices.slice(startIndex, endIndex);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  const showSuccessMessage = (message: string) => {
    setActionSuccess(message);
    setTimeout(() => setActionSuccess(null), 3000);
  };

  // Add new device
  const handleAddDevice = () => {
    if (!newDevice.name || !newDevice.user || !newDevice.os) {
      return;
    }

    const device: Device = {
      id: Math.max(...devices.map(d => d.id)) + 1,
      name: newDevice.name,
      type: newDevice.type,
      status: 'online',
      user: newDevice.user,
      location: newDevice.location || 'Unknown',
      lastSeen: 'Just now',
      os: newDevice.os,
      ip: newDevice.ip || `192.168.1.${117 + devices.length}`,
      battery: newDevice.type === 'desktop' ? 100 : Math.floor(Math.random() * 60) + 40,
      storage: Math.floor(Math.random() * 50) + 20,
      isCompliant: true,
      isEncrypted: true,
      macAddress: newDevice.macAddress || 'XX:XX:XX:XX:XX:XX',
      serialNumber: newDevice.serialNumber || `DEV${Date.now()}`,
    };

    setDevices([device, ...devices]);
    setNewDevice({ name: '', type: 'laptop', user: '', location: '', os: '', ip: '', macAddress: '', serialNumber: '' });
    setShowAddModal(false);
    showSuccessMessage('Device added successfully!');
  };

  // Delete device
  const handleDeleteDevice = (id: number) => {
    setDevices(devices.filter(d => d.id !== id));
    setShowActionsMenu(null);
    setShowDetailsModal(false);
    showSuccessMessage('Device removed successfully!');
  };

  // View device details
  const handleViewDetails = (device: Device) => {
    setSelectedDevice(device);
    setShowDetailsModal(true);
    setShowActionsMenu(null);
  };

  // Refresh device status
  const handleRefreshDevice = (id: number) => {
    setDevices(devices.map(d => 
      d.id === id ? { ...d, lastSeen: 'Just now', status: 'online' } : d
    ));
    showSuccessMessage('Device status refreshed!');
  };

  // Lock device
  const handleLockDevice = (id: number) => {
    showSuccessMessage('Device locked remotely!');
    setShowActionsMenu(null);
  };

  // Export devices
  const handleExportDevices = () => {
    showSuccessMessage('Devices exported successfully!');
    setShowMoreActions(false);
  };

  const stats = {
    total: devices.length,
    computers: computers.length,
    mobiles: mobiles.length,
    online: devices.filter(d => d.status === 'online').length,
    compliant: devices.filter(d => d.isCompliant).length,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Success Message */}
      {actionSuccess && (
        <div className="fixed top-4 right-4 z-50 px-4 py-3 bg-[rgba(0,255,102,0.1)] border border-[#00FF66]/30 rounded-lg flex items-center gap-2 animate-pulse">
          <Check size={16} className="text-[#00FF66]" />
          <span className="text-sm text-[#00FF66]">{actionSuccess}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: THEME.textPrimary }}>Devices</h1>
          <p className="text-sm mt-1" style={{ color: THEME.textMuted }}>Manage and monitor all connected devices</p>
        </div>
        <div className="flex items-center gap-3">
          {/* More Actions Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowMoreActions(!showMoreActions)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all hover:bg-[rgba(255,255,255,0.05)]"
              style={{ background: THEME.bgCard, border: `1px solid ${THEME.border}`, color: THEME.textMuted }}
            >
              <MoreVertical size={16} />
              More Actions
            </button>
            {showMoreActions && (
              <div 
                className="absolute right-0 top-full mt-2 w-48 rounded-xl overflow-hidden z-50"
                style={{ background: THEME.bgCard, border: `1px solid ${THEME.border}` }}
              >
                <button
                  onClick={handleExportDevices}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-[rgba(0,255,102,0.1)] transition-colors"
                  style={{ color: THEME.textPrimary }}
                >
                  <Download size={16} style={{ color: THEME.primary }} />
                  Export Devices
                </button>
                <button
                  onClick={() => { setDevices(initialDevices); setShowMoreActions(false); showSuccessMessage('Devices refreshed!'); }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-[rgba(0,255,102,0.1)] transition-colors"
                  style={{ color: THEME.textPrimary }}
                >
                  <RefreshCw size={16} style={{ color: THEME.info }} />
                  Refresh All
                </button>
              </div>
            )}
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all hover:scale-105"
            style={{ background: THEME.primary, color: THEME.bgDark }}
          >
            <Plus size={16} />
            Add Device
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-5 gap-4">
        {[
          { label: 'Total Devices', value: stats.total, icon: Monitor, color: THEME.primary, filter: 'all' as const },
          { label: 'Computers', value: stats.computers, icon: Laptop, color: '#60A5FA', filter: 'computers' as const },
          { label: 'Mobiles & Tablets', value: stats.mobiles, icon: Smartphone, color: '#A78BFA', filter: 'mobiles' as const },
          { label: 'Online Now', value: stats.online, icon: Wifi, color: THEME.online, filter: 'online' as const },
          { label: 'Compliant', value: stats.compliant, icon: Shield, color: THEME.warning, filter: 'compliant' as const },
        ].map((stat) => {
          const isActive = 
            (stat.filter === 'all' && filterCategory === 'all' && filterStatus === 'all') ||
            (stat.filter === 'computers' && filterCategory === 'computers') ||
            (stat.filter === 'mobiles' && filterCategory === 'mobiles') ||
            (stat.filter === 'online' && filterStatus === 'online' && filterCategory === 'all') ||
            (stat.filter === 'compliant' && filterCategory === 'compliant');
          
          return (
            <button
              key={stat.label}
              onClick={() => {
                if (stat.filter === 'all') {
                  setFilterCategory('all');
                  setFilterType('all');
                  setFilterStatus('all');
                } else if (stat.filter === 'computers') {
                  setFilterCategory('computers');
                  setFilterType('all');
                  setFilterStatus('all');
                } else if (stat.filter === 'mobiles') {
                  setFilterCategory('mobiles');
                  setFilterType('all');
                  setFilterStatus('all');
                } else if (stat.filter === 'online') {
                  setFilterCategory('all');
                  setFilterType('all');
                  setFilterStatus('online');
                } else if (stat.filter === 'compliant') {
                  setFilterCategory('compliant');
                  setFilterType('all');
                  setFilterStatus('all');
                }
                setCurrentPage(1);
              }}
              className={`p-4 rounded-xl transition-all hover:scale-[1.02] cursor-pointer text-left ${
                isActive ? 'ring-2 ring-offset-2 ring-offset-[#050505]' : ''
              }`}
              style={{ 
                background: isActive ? `${stat.color}15` : THEME.bgCard, 
                border: `1px solid ${isActive ? stat.color : THEME.border}`,
                ringColor: stat.color
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <stat.icon size={20} style={{ color: stat.color }} />
                <span className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</span>
              </div>
              <p className="text-xs" style={{ color: isActive ? stat.color : THEME.textMuted }}>{stat.label}</p>
              {isActive && stat.filter !== 'all' && (
                <p className="text-[10px] mt-1" style={{ color: stat.color }}>● Active Filter</p>
              )}
            </button>
          );
        })}
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
            placeholder="Search devices by name, user, location, OS, or IP..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ color: THEME.textPrimary }}
          />
        </div>
        <div className="relative">
          <button
            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all ${
              filterType !== 'all' || filterStatus !== 'all' || filterCategory !== 'all' ? 'ring-1 ring-[#00FF66]' : ''
            }`}
            style={{ background: THEME.bgCard, border: `1px solid ${THEME.border}`, color: THEME.textMuted }}
          >
            <Filter size={18} />
            <span className="text-sm">Filter</span>
            {(filterType !== 'all' || filterStatus !== 'all' || filterCategory !== 'all') && (
              <span className="w-2 h-2 rounded-full bg-[#00FF66]" />
            )}
          </button>
          {showFilterDropdown && (
            <div 
              className="absolute right-0 top-full mt-2 w-64 p-4 rounded-xl z-50"
              style={{ background: THEME.bgCard, border: `1px solid ${THEME.border}` }}
            >
              {/* Category Filter Info */}
              {filterCategory !== 'all' && (
                <div className="mb-4 p-2 rounded-lg bg-[rgba(0,255,102,0.1)] border border-[#00FF66]/30">
                  <p className="text-xs text-[#00FF66] flex items-center gap-2">
                    <span>Showing: {filterCategory === 'computers' ? 'Computers' : filterCategory === 'mobiles' ? 'Mobiles & Tablets' : 'Compliant Devices'}</span>
                  </p>
                </div>
              )}
              <div className="mb-4">
                <p className="text-xs font-medium mb-2" style={{ color: THEME.textMuted }}>DEVICE TYPE</p>
                <div className="flex flex-wrap gap-2">
                  {(['all', 'laptop', 'desktop', 'mobile', 'tablet'] as FilterType[]).map((type) => (
                    <button
                      key={type}
                      onClick={() => { setFilterType(type); setFilterCategory('all'); setCurrentPage(1); }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        filterType === type && filterCategory === 'all' ? 'bg-[#00FF66] text-[#050505]' : 'bg-[#1A1A1A] text-[#8F8F8F] hover:bg-[#2A2A2A]'
                      }`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium mb-2" style={{ color: THEME.textMuted }}>STATUS</p>
                <div className="flex gap-2">
                  {(['all', 'online', 'offline'] as FilterStatus[]).map((status) => (
                    <button
                      key={status}
                      onClick={() => { setFilterStatus(status); setCurrentPage(1); }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        filterStatus === status ? 'bg-[#00FF66] text-[#050505]' : 'bg-[#1A1A1A] text-[#8F8F8F] hover:bg-[#2A2A2A]'
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              {(filterType !== 'all' || filterStatus !== 'all' || filterCategory !== 'all') && (
                <button
                  onClick={() => { setFilterType('all'); setFilterStatus('all'); setFilterCategory('all'); }}
                  className="w-full mt-4 py-2 text-xs text-[#FF4444] hover:bg-[rgba(255,68,68,0.1)] rounded-lg transition-all"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Devices Table */}
      <div
        className="rounded-xl overflow-hidden"
        style={{ background: THEME.bgCard, border: `1px solid ${THEME.border}` }}
      >
        {/* Table Header */}
        <div
          className="grid grid-cols-[2fr,1fr,1fr,1.5fr,1fr,0.8fr,auto] gap-4 px-6 py-4"
          style={{ borderBottom: `1px solid ${THEME.border}` }}
        >
          {[
            { key: 'name', label: 'Device' },
            { key: 'status', label: 'Status' },
            { key: 'user', label: 'User' },
            { key: 'location', label: 'Location' },
            { key: 'lastSeen', label: 'Last Seen' },
            { key: null, label: 'Health' },
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
        {paginatedDevices.length > 0 ? (
          paginatedDevices.map((device, idx) => {
            const DeviceIcon = getDeviceIcon(device.type);
            const StatusIcon = getStatusIcon(device.status);
            const statusColor = getStatusColor(device.status);
            const BatteryIcon = getBatteryIcon(device.battery || 0, device.status);
            const batteryColor = getBatteryColor(device.battery || 0);

            return (
              <div
                key={device.id}
                className="grid grid-cols-[2fr,1fr,1fr,1.5fr,1fr,0.8fr,auto] gap-4 px-6 py-4 items-center hover:bg-[rgba(255,255,255,0.02)] transition-colors cursor-pointer"
                style={{ borderBottom: idx < paginatedDevices.length - 1 ? `1px solid ${THEME.border}` : 'none' }}
                onClick={() => handleViewDetails(device)}
              >
                {/* Device */}
                <div className="flex items-center gap-3">
                  <div
                    className="relative w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: `${statusColor}15`, border: `1px solid ${statusColor}30` }}
                  >
                    <DeviceIcon size={18} style={{ color: statusColor }} />
                    {device.isCompliant === false && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF4444] rounded-full flex items-center justify-center">
                        <AlertTriangle size={10} className="text-white" />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: THEME.textPrimary }}>{device.name}</p>
                    <p className="text-xs" style={{ color: THEME.textMuted }}>{device.os} • {device.ip}</p>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${device.status === 'online' ? 'bg-[#00FF66] shadow-[0_0_8px_rgba(0,255,102,0.6)]' : 'bg-gray-500'}`} />
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

                {/* Health - Battery & Compliance */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1" title={`Battery: ${device.battery}%`}>
                    <BatteryIcon size={16} style={{ color: batteryColor }} />
                    <span className="text-xs" style={{ color: batteryColor }}>{device.battery}%</span>
                  </div>
                  {device.isEncrypted ? (
                    <Lock size={14} style={{ color: THEME.online }} title="Encrypted" />
                  ) : (
                    <Unlock size={14} style={{ color: THEME.offline }} title="Not Encrypted" />
                  )}
                </div>

                {/* Actions */}
                <div className="relative">
                  <button
                    onClick={(e) => { e.stopPropagation(); setShowActionsMenu(showActionsMenu === device.id ? null : device.id); }}
                    className="p-2 rounded-lg hover:bg-[rgba(255,255,255,0.05)] transition-colors"
                    style={{ color: THEME.textMuted }}
                  >
                    <MoreVertical size={16} />
                  </button>
                  {showActionsMenu === device.id && (
                    <div 
                      className="absolute right-0 top-full mt-1 w-44 rounded-xl overflow-hidden z-50"
                      style={{ background: THEME.bgCard, border: `1px solid ${THEME.border}` }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => handleViewDetails(device)}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-[rgba(0,255,102,0.1)] transition-colors"
                        style={{ color: THEME.textPrimary }}
                      >
                        <Eye size={14} style={{ color: THEME.primary }} />
                        View Details
                      </button>
                      <button
                        onClick={() => handleRefreshDevice(device.id)}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-[rgba(0,255,102,0.1)] transition-colors"
                        style={{ color: THEME.textPrimary }}
                      >
                        <RefreshCw size={14} style={{ color: THEME.info }} />
                        Refresh Status
                      </button>
                      <button
                        onClick={() => handleLockDevice(device.id)}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-[rgba(0,255,102,0.1)] transition-colors"
                        style={{ color: THEME.textPrimary }}
                      >
                        <Lock size={14} style={{ color: THEME.warning }} />
                        Lock Device
                      </button>
                      <button
                        onClick={() => handleDeleteDevice(device.id)}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-[rgba(255,68,68,0.1)] transition-colors"
                        style={{ color: THEME.offline }}
                      >
                        <Trash2 size={14} />
                        Remove Device
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="px-6 py-12 text-center">
            <Monitor size={48} className="mx-auto mb-4" style={{ color: THEME.border }} />
            <p className="text-lg font-medium mb-1" style={{ color: THEME.textPrimary }}>No devices found</p>
            <p className="text-sm" style={{ color: THEME.textMuted }}>Try adjusting your search or filters</p>
          </div>
        )}

        {/* Pagination Controls */}
        {filteredDevices.length > 0 && (
          <div
            className="flex items-center justify-between px-6 py-4"
            style={{ borderTop: `1px solid ${THEME.border}` }}
          >
            {/* Left side - Items per page & showing info */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs" style={{ color: THEME.textMuted }}>Show</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                  className="px-2 py-1.5 rounded text-xs outline-none cursor-pointer appearance-none pr-6 bg-no-repeat"
                  style={{ 
                    background: `${THEME.bgCard} url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%238F8F8F' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E") no-repeat right 6px center`, 
                    color: THEME.textPrimary,
                    border: `1px solid ${THEME.border}`
                  }}
                >
                  {ITEMS_PER_PAGE_OPTIONS.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <span className="text-xs" style={{ color: THEME.textMuted }}>entries</span>
              </div>
              <span className="text-xs" style={{ color: THEME.textMuted }}>
                Showing {startIndex + 1}-{endIndex} of {totalItems}
              </span>
            </div>

            {/* Right side - Navigation */}
            <div className="flex items-center">
              {/* First & Previous */}
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center rounded-l border-r-0 transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[rgba(0,255,102,0.1)]"
                style={{ 
                  border: `1px solid ${THEME.border}`,
                  color: currentPage === 1 ? THEME.textMuted : THEME.textPrimary
                }}
                title="First"
              >
                <ChevronsLeft size={14} />
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center border-r-0 transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[rgba(0,255,102,0.1)]"
                style={{ 
                  border: `1px solid ${THEME.border}`,
                  color: currentPage === 1 ? THEME.textMuted : THEME.textPrimary
                }}
                title="Previous"
              >
                <ChevronLeft size={14} />
              </button>

              {/* Page Numbers */}
              {(() => {
                const pages: (number | string)[] = [];
                const showEllipsisStart = currentPage > 3;
                const showEllipsisEnd = currentPage < totalPages - 2;

                if (totalPages <= 5) {
                  for (let i = 1; i <= totalPages; i++) pages.push(i);
                } else {
                  pages.push(1);
                  if (showEllipsisStart) pages.push('...');
                  
                  const start = Math.max(2, currentPage - 1);
                  const end = Math.min(totalPages - 1, currentPage + 1);
                  for (let i = start; i <= end; i++) {
                    if (!pages.includes(i)) pages.push(i);
                  }
                  
                  if (showEllipsisEnd) pages.push('...');
                  if (!pages.includes(totalPages)) pages.push(totalPages);
                }

                return pages.map((page, idx) => (
                  page === '...' ? (
                    <span
                      key={`ellipsis-${idx}`}
                      className="w-8 h-8 flex items-center justify-center text-xs border-r-0"
                      style={{ 
                        border: `1px solid ${THEME.border}`,
                        color: THEME.textMuted,
                        background: THEME.bgCard
                      }}
                    >
                      •••
                    </span>
                  ) : (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page as number)}
                      className="w-8 h-8 flex items-center justify-center text-xs font-medium border-r-0 transition-all hover:bg-[rgba(0,255,102,0.1)]"
                      style={{ 
                        border: `1px solid ${currentPage === page ? THEME.primary : THEME.border}`,
                        background: currentPage === page ? `${THEME.primary}15` : 'transparent',
                        color: currentPage === page ? THEME.primary : THEME.textMuted
                      }}
                    >
                      {page}
                    </button>
                  )
                ));
              })()}

              {/* Next & Last */}
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="w-8 h-8 flex items-center justify-center border-r-0 transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[rgba(0,255,102,0.1)]"
                style={{ 
                  border: `1px solid ${THEME.border}`,
                  color: currentPage === totalPages ? THEME.textMuted : THEME.textPrimary
                }}
                title="Next"
              >
                <ChevronRight size={14} />
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="w-8 h-8 flex items-center justify-center rounded-r transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[rgba(0,255,102,0.1)]"
                style={{ 
                  border: `1px solid ${THEME.border}`,
                  color: currentPage === totalPages ? THEME.textMuted : THEME.textPrimary
                }}
                title="Last"
              >
                <ChevronsRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add Device Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setShowAddModal(false)}>
          <div 
            className="bg-[#0A0A0A] rounded-2xl w-full max-w-lg border border-[#1A1A1A] shadow-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-[#1A1A1A] bg-gradient-to-r from-[rgba(0,255,102,0.1)] to-transparent">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00FF66]/20 flex items-center justify-center">
                  <Plus size={20} className="text-[#00FF66]" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">Add New Device</h2>
                  <p className="text-xs text-[#8F8F8F]">Register a new device to the system</p>
                </div>
              </div>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-2 rounded-lg text-[#8F8F8F] hover:bg-[#1A1A1A] hover:text-white transition-all"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4">
              {/* Device Name */}
              <div>
                <label className="block text-xs text-[#8F8F8F] uppercase tracking-wider mb-2">Device Name *</label>
                <input
                  type="text"
                  placeholder="e.g. MacBook Pro"
                  value={newDevice.name}
                  onChange={(e) => setNewDevice({ ...newDevice, name: e.target.value })}
                  className="w-full bg-[#0F0F0F] border border-[#1A1A1A] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00FF66] transition-colors"
                />
              </div>

              {/* Device Type */}
              <div>
                <label className="block text-xs text-[#8F8F8F] uppercase tracking-wider mb-2">Device Type *</label>
                <div className="grid grid-cols-4 gap-2">
                  {(['laptop', 'desktop', 'mobile', 'tablet'] as Device['type'][]).map((type) => {
                    const Icon = getDeviceIcon(type);
                    return (
                      <button
                        key={type}
                        onClick={() => setNewDevice({ ...newDevice, type })}
                        className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
                          newDevice.type === type
                            ? 'bg-[#00FF66]/10 border-[#00FF66] text-[#00FF66]'
                            : 'bg-[#0F0F0F] border-[#1A1A1A] text-[#8F8F8F] hover:border-[#2A2A2A]'
                        }`}
                      >
                        <Icon size={20} />
                        <span className="text-xs capitalize">{type}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* User & Location */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#8F8F8F] uppercase tracking-wider mb-2">Assigned User *</label>
                  <input
                    type="text"
                    placeholder="e.g. John Doe"
                    value={newDevice.user}
                    onChange={(e) => setNewDevice({ ...newDevice, user: e.target.value })}
                    className="w-full bg-[#0F0F0F] border border-[#1A1A1A] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00FF66] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#8F8F8F] uppercase tracking-wider mb-2">Location</label>
                  <input
                    type="text"
                    placeholder="e.g. New York, USA"
                    value={newDevice.location}
                    onChange={(e) => setNewDevice({ ...newDevice, location: e.target.value })}
                    className="w-full bg-[#0F0F0F] border border-[#1A1A1A] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00FF66] transition-colors"
                  />
                </div>
              </div>

              {/* OS & IP */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#8F8F8F] uppercase tracking-wider mb-2">Operating System *</label>
                  <input
                    type="text"
                    placeholder="e.g. macOS 14.2"
                    value={newDevice.os}
                    onChange={(e) => setNewDevice({ ...newDevice, os: e.target.value })}
                    className="w-full bg-[#0F0F0F] border border-[#1A1A1A] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00FF66] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#8F8F8F] uppercase tracking-wider mb-2">IP Address</label>
                  <input
                    type="text"
                    placeholder="e.g. 192.168.1.100"
                    value={newDevice.ip}
                    onChange={(e) => setNewDevice({ ...newDevice, ip: e.target.value })}
                    className="w-full bg-[#0F0F0F] border border-[#1A1A1A] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00FF66] transition-colors"
                  />
                </div>
              </div>

              {/* MAC Address & Serial Number */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#8F8F8F] uppercase tracking-wider mb-2">MAC Address</label>
                  <input
                    type="text"
                    placeholder="e.g. XX:XX:XX:XX:XX:XX"
                    value={newDevice.macAddress}
                    onChange={(e) => setNewDevice({ ...newDevice, macAddress: e.target.value })}
                    className="w-full bg-[#0F0F0F] border border-[#1A1A1A] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00FF66] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#8F8F8F] uppercase tracking-wider mb-2">Serial Number</label>
                  <input
                    type="text"
                    placeholder="e.g. ABC123XYZ"
                    value={newDevice.serialNumber}
                    onChange={(e) => setNewDevice({ ...newDevice, serialNumber: e.target.value })}
                    className="w-full bg-[#0F0F0F] border border-[#1A1A1A] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00FF66] transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-5 border-t border-[#1A1A1A]">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-5 py-2.5 rounded-xl text-sm font-medium text-[#8F8F8F] hover:bg-[#1A1A1A] transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleAddDevice}
                disabled={!newDevice.name || !newDevice.user || !newDevice.os}
                className="px-5 py-2.5 rounded-xl text-sm font-medium bg-[#00FF66] text-[#050505] hover:bg-[#00DD55] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
              >
                <Plus size={16} />
                Add Device
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Device Details Modal */}
      {showDetailsModal && selectedDevice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setShowDetailsModal(false)}>
          <div 
            className="bg-[#0A0A0A] rounded-2xl w-full max-w-2xl border border-[#1A1A1A] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-[#1A1A1A] bg-gradient-to-r from-[rgba(0,255,102,0.1)] to-transparent">
              <div className="flex items-center gap-4">
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{ 
                    background: `${getStatusColor(selectedDevice.status)}15`, 
                    border: `1px solid ${getStatusColor(selectedDevice.status)}30` 
                  }}
                >
                  {(() => { const Icon = getDeviceIcon(selectedDevice.type); return <Icon size={28} style={{ color: getStatusColor(selectedDevice.status) }} />; })()}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">{selectedDevice.name}</h2>
                  <div className="flex items-center gap-3 mt-1">
                    <span className={`flex items-center gap-1.5 text-sm ${selectedDevice.status === 'online' ? 'text-[#00FF66]' : 'text-[#FF4444]'}`}>
                      <span className={`w-2 h-2 rounded-full ${selectedDevice.status === 'online' ? 'bg-[#00FF66] shadow-[0_0_8px_rgba(0,255,102,0.6)]' : 'bg-[#FF4444]'}`} />
                      {selectedDevice.status.charAt(0).toUpperCase() + selectedDevice.status.slice(1)}
                    </span>
                    <span className="text-[#5A5A5A]">•</span>
                    <span className="text-sm text-[#8F8F8F]">{selectedDevice.os}</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setShowDetailsModal(false)}
                className="p-2 rounded-lg text-[#8F8F8F] hover:bg-[#1A1A1A] hover:text-white transition-all"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5">
              {/* Quick Stats */}
              <div className="grid grid-cols-4 gap-3 mb-6">
                <div className="p-3 rounded-xl bg-[#0F0F0F] border border-[#1A1A1A]">
                  <div className="flex items-center gap-2 mb-1">
                    {(() => { const Icon = getBatteryIcon(selectedDevice.battery || 0, selectedDevice.status); return <Icon size={16} style={{ color: getBatteryColor(selectedDevice.battery || 0) }} />; })()}
                    <span className="text-xs text-[#8F8F8F]">Battery</span>
                  </div>
                  <p className="text-lg font-semibold" style={{ color: getBatteryColor(selectedDevice.battery || 0) }}>{selectedDevice.battery}%</p>
                </div>
                <div className="p-3 rounded-xl bg-[#0F0F0F] border border-[#1A1A1A]">
                  <div className="flex items-center gap-2 mb-1">
                    <HardDrive size={16} className="text-[#60A5FA]" />
                    <span className="text-xs text-[#8F8F8F]">Storage</span>
                  </div>
                  <p className="text-lg font-semibold text-[#60A5FA]">{selectedDevice.storage}%</p>
                </div>
                <div className="p-3 rounded-xl bg-[#0F0F0F] border border-[#1A1A1A]">
                  <div className="flex items-center gap-2 mb-1">
                    <Shield size={16} style={{ color: selectedDevice.isCompliant ? THEME.online : THEME.offline }} />
                    <span className="text-xs text-[#8F8F8F]">Compliance</span>
                  </div>
                  <p className="text-lg font-semibold" style={{ color: selectedDevice.isCompliant ? THEME.online : THEME.offline }}>
                    {selectedDevice.isCompliant ? 'Compliant' : 'Non-Compliant'}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-[#0F0F0F] border border-[#1A1A1A]">
                  <div className="flex items-center gap-2 mb-1">
                    {selectedDevice.isEncrypted ? <Lock size={16} className="text-[#00FF66]" /> : <Unlock size={16} className="text-[#FF4444]" />}
                    <span className="text-xs text-[#8F8F8F]">Encryption</span>
                  </div>
                  <p className="text-lg font-semibold" style={{ color: selectedDevice.isEncrypted ? THEME.online : THEME.offline }}>
                    {selectedDevice.isEncrypted ? 'Encrypted' : 'Not Encrypted'}
                  </p>
                </div>
              </div>

              {/* Device Information */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-[#00FF66] uppercase tracking-wider">Device Information</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Device Type', value: selectedDevice.type.charAt(0).toUpperCase() + selectedDevice.type.slice(1), icon: Monitor },
                      { label: 'Operating System', value: selectedDevice.os, icon: Cpu },
                      { label: 'IP Address', value: selectedDevice.ip, icon: Globe },
                      { label: 'MAC Address', value: selectedDevice.macAddress, icon: Activity },
                      { label: 'Serial Number', value: selectedDevice.serialNumber, icon: HardDrive },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-3 p-3 rounded-lg bg-[#0F0F0F] border border-[#1A1A1A]">
                        <item.icon size={16} className="text-[#8F8F8F]" />
                        <div>
                          <p className="text-xs text-[#5A5A5A]">{item.label}</p>
                          <p className="text-sm text-white">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-[#00FF66] uppercase tracking-wider">Assignment & Location</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Assigned User', value: selectedDevice.user, icon: Activity },
                      { label: 'Location', value: selectedDevice.location, icon: MapPin },
                      { label: 'Last Seen', value: selectedDevice.lastSeen, icon: Clock },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-3 p-3 rounded-lg bg-[#0F0F0F] border border-[#1A1A1A]">
                        <item.icon size={16} className="text-[#8F8F8F]" />
                        <div>
                          <p className="text-xs text-[#5A5A5A]">{item.label}</p>
                          <p className="text-sm text-white">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Quick Actions */}
                  <h3 className="text-sm font-semibold text-[#00FF66] uppercase tracking-wider pt-2">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleRefreshDevice(selectedDevice.id)}
                      className="flex items-center justify-center gap-2 p-3 rounded-lg bg-[#0F0F0F] border border-[#1A1A1A] text-sm text-white hover:bg-[rgba(0,255,102,0.1)] hover:border-[#00FF66]/30 transition-all"
                    >
                      <RefreshCw size={16} className="text-[#60A5FA]" />
                      Refresh
                    </button>
                    <button
                      onClick={() => handleLockDevice(selectedDevice.id)}
                      className="flex items-center justify-center gap-2 p-3 rounded-lg bg-[#0F0F0F] border border-[#1A1A1A] text-sm text-white hover:bg-[rgba(255,184,0,0.1)] hover:border-[#FFCC00]/30 transition-all"
                    >
                      <Lock size={16} className="text-[#FFCC00]" />
                      Lock
                    </button>
                    <button
                      className="flex items-center justify-center gap-2 p-3 rounded-lg bg-[#0F0F0F] border border-[#1A1A1A] text-sm text-white hover:bg-[rgba(0,255,102,0.1)] hover:border-[#00FF66]/30 transition-all"
                    >
                      <Power size={16} className="text-[#00FF66]" />
                      Restart
                    </button>
                    <button
                      onClick={() => handleDeleteDevice(selectedDevice.id)}
                      className="flex items-center justify-center gap-2 p-3 rounded-lg bg-[#0F0F0F] border border-[#1A1A1A] text-sm text-[#FF4444] hover:bg-[rgba(255,68,68,0.1)] hover:border-[#FF4444]/30 transition-all"
                    >
                      <Trash2 size={16} />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close dropdowns */}
      {(showActionsMenu || showFilterDropdown || showMoreActions) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => { setShowActionsMenu(null); setShowFilterDropdown(false); setShowMoreActions(false); }}
        />
      )}
    </div>
  );
}
