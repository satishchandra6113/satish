import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Users, Wifi, Clock, WifiOff } from 'lucide-react';

// =============================================================================
// THEME & CONFIGURATION
// =============================================================================

const THEME = {
  primary: '#00FF66',
  primaryDim: '#00CC52',
  primaryGlow: 'rgba(0, 255, 102, 0.15)',
  
  online: '#00FF66',
  away: '#FFCC00',
  offline: '#FF4444',

  bgDark: '#050505',
  bgCard: '#0F0F0F',
  border: '#1A1A1A',
  textPrimary: '#D5FFD6',
  textMuted: '#8F8F8F',
};

const CLUSTER_RADIUS = 3; // percentage distance to cluster

// =============================================================================
// DATA TYPES & MOCK DATA
// =============================================================================

interface DeviceLocation {
  id: number;
  x: number;
  y: number;
  emoji: string;
  name: string;
  status: 'online' | 'away' | 'offline';
  city: string;
  country: string;
  deviceType: string;
  lastSeen: string;
}

interface Cluster {
  id: string;
  x: number;
  y: number;
  devices: DeviceLocation[];
}

const DEVICE_LOCATIONS: DeviceLocation[] = [
  // North America
  { id: 1, x: 22, y: 35, emoji: '👨‍💻', name: 'Alex', status: 'online', city: 'New York', country: 'USA', deviceType: 'Laptop', lastSeen: 'Just now' },
  { id: 2, x: 12, y: 38, emoji: '👩‍💼', name: 'Sarah', status: 'online', city: 'Los Angeles', country: 'USA', deviceType: 'Mobile', lastSeen: '5 min ago' },
  { id: 3, x: 18, y: 32, emoji: '🧑‍🎨', name: 'Jordan', status: 'away', city: 'Chicago', country: 'USA', deviceType: 'Tablet', lastSeen: '1 hour ago' },
  { id: 4, x: 22.5, y: 35.5, emoji: '👨‍💻', name: 'Mike', status: 'online', city: 'New York', country: 'USA', deviceType: 'Desktop', lastSeen: 'Just now' },
  { id: 5, x: 12.5, y: 38.5, emoji: '👩‍🚀', name: 'Emma', status: 'online', city: 'Los Angeles', country: 'USA', deviceType: 'Laptop', lastSeen: '10 min ago' },
  { id: 6, x: 18.2, y: 32.3, emoji: '🧑‍💻', name: 'Carlos', status: 'offline', city: 'Chicago', country: 'USA', deviceType: 'Mobile', lastSeen: '2 days ago' },
  { id: 7, x: 22.8, y: 35.2, emoji: '👨‍🎤', name: 'David', status: 'online', city: 'New York', country: 'USA', deviceType: 'Laptop', lastSeen: 'Just now' },
  { id: 8, x: 23.1, y: 35.1, emoji: '👩‍🎤', name: 'Maria', status: 'online', city: 'New York', country: 'USA', deviceType: 'Desktop', lastSeen: 'Just now' },

  // South America
  { id: 9, x: 28, y: 65, emoji: '👩‍🎤', name: 'Lucas', status: 'online', city: 'São Paulo', country: 'Brazil', deviceType: 'Laptop', lastSeen: '30 min ago' },
  { id: 10, x: 26, y: 72, emoji: '🧔', name: 'Ana', status: 'away', city: 'Buenos Aires', country: 'Argentina', deviceType: 'Mobile', lastSeen: '2 hours ago' },

  // Europe
  { id: 11, x: 48, y: 30, emoji: '👨‍💼', name: 'James', status: 'online', city: 'London', country: 'UK', deviceType: 'Laptop', lastSeen: 'Just now' },
  { id: 12, x: 50, y: 32, emoji: '👩‍🎓', name: 'Sophie', status: 'online', city: 'Paris', country: 'France', deviceType: 'Desktop', lastSeen: '15 min ago' },
  { id: 13, x: 52, y: 29, emoji: '🧑‍🏫', name: 'Hans', status: 'away', city: 'Berlin', country: 'Germany', deviceType: 'Tablet', lastSeen: '3 hours ago' },
  { id: 14, x: 48.3, y: 30.5, emoji: '👨‍🍳', name: 'Marco', status: 'online', city: 'London', country: 'UK', deviceType: 'Mobile', lastSeen: 'Just now' },
  { id: 15, x: 48.6, y: 30.2, emoji: '👩‍⚕️', name: 'Elena', status: 'online', city: 'London', country: 'UK', deviceType: 'Laptop', lastSeen: 'Just now' },
  { id: 16, x: 48.9, y: 30.8, emoji: '🧑‍🚒', name: 'Erik', status: 'offline', city: 'London', country: 'UK', deviceType: 'Desktop', lastSeen: '1 day ago' },
  { id: 17, x: 49.2, y: 30.1, emoji: '👨‍✈️', name: 'Oleg', status: 'online', city: 'London', country: 'UK', deviceType: 'Laptop', lastSeen: 'Just now' },

  // Africa
  { id: 18, x: 50, y: 48, emoji: '👩‍⚖️', name: 'Amina', status: 'online', city: 'Lagos', country: 'Nigeria', deviceType: 'Laptop', lastSeen: '45 min ago' },
  { id: 19, x: 55, y: 55, emoji: '🧑‍🌾', name: 'Kwame', status: 'away', city: 'Nairobi', country: 'Kenya', deviceType: 'Mobile', lastSeen: '6 hours ago' },
  { id: 20, x: 53, y: 68, emoji: '👨‍🔧', name: 'Thabo', status: 'online', city: 'Johannesburg', country: 'South Africa', deviceType: 'Desktop', lastSeen: '1 hour ago' },

  // Asia
  { id: 21, x: 72, y: 38, emoji: '👨‍🎮', name: 'Raj', status: 'online', city: 'Mumbai', country: 'India', deviceType: 'Laptop', lastSeen: 'Just now' },
  { id: 22, x: 74, y: 32, emoji: '👩‍💻', name: 'Priya', status: 'away', city: 'Delhi', country: 'India', deviceType: 'Mobile', lastSeen: '2 hours ago' },
  { id: 23, x: 82, y: 36, emoji: '🧑‍🎨', name: 'Wei', status: 'online', city: 'Shanghai', country: 'China', deviceType: 'Desktop', lastSeen: '10 min ago' },
  { id: 24, x: 80, y: 32, emoji: '👨‍🏫', name: 'Chen', status: 'online', city: 'Beijing', country: 'China', deviceType: 'Laptop', lastSeen: '20 min ago' },
  { id: 25, x: 82.3, y: 36.5, emoji: '👩‍🔬', name: 'Yuki', status: 'online', city: 'Shanghai', country: 'China', deviceType: 'Mobile', lastSeen: 'Just now' },
  { id: 26, x: 82.6, y: 36.2, emoji: '🧔‍♂️', name: 'Kim', status: 'offline', city: 'Shanghai', country: 'China', deviceType: 'Tablet', lastSeen: '3 days ago' },
  { id: 27, x: 82.9, y: 36.8, emoji: '👨‍⚕️', name: 'Arun', status: 'online', city: 'Shanghai', country: 'China', deviceType: 'Laptop', lastSeen: 'Just now' },
  { id: 28, x: 76, y: 55, emoji: '👩‍🎤', name: 'Mei', status: 'online', city: 'Singapore', country: 'Singapore', deviceType: 'Desktop', lastSeen: '30 min ago' },
  { id: 29, x: 65, y: 40, emoji: '🧑‍💼', name: 'Ali', status: 'away', city: 'Dubai', country: 'UAE', deviceType: 'Mobile', lastSeen: '4 hours ago' },

  // Oceania
  { id: 30, x: 88, y: 70, emoji: '👨‍🦰', name: 'Jack', status: 'online', city: 'Sydney', country: 'Australia', deviceType: 'Laptop', lastSeen: 'Just now' },
  { id: 31, x: 90, y: 75, emoji: '👩‍🦱', name: 'Olivia', status: 'away', city: 'Melbourne', country: 'Australia', deviceType: 'Desktop', lastSeen: '5 hours ago' },
  { id: 32, x: 88.5, y: 70.3, emoji: '🧑‍🦲', name: 'Liam', status: 'online', city: 'Sydney', country: 'Australia', deviceType: 'Mobile', lastSeen: 'Just now' },
];

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

function createClusters(devices: DeviceLocation[], scale: number): (Cluster | DeviceLocation)[] {
  const adjustedRadius = CLUSTER_RADIUS / scale;
  const used = new Set<number>();
  const result: (Cluster | DeviceLocation)[] = [];
  
  for (const device of devices) {
    if (used.has(device.id)) continue;
    
    const nearby = devices.filter(d => {
      if (used.has(d.id) || d.id === device.id) return false;
      const dx = d.x - device.x;
      const dy = d.y - device.y;
      return Math.sqrt(dx * dx + dy * dy) < adjustedRadius;
    });
    
    if (nearby.length > 0) {
      const clusterDevices = [device, ...nearby];
      clusterDevices.forEach(d => used.add(d.id));
      
      const avgX = clusterDevices.reduce((sum, d) => sum + d.x, 0) / clusterDevices.length;
      const avgY = clusterDevices.reduce((sum, d) => sum + d.y, 0) / clusterDevices.length;
      
      result.push({
        id: `cluster-${device.id}`,
        x: avgX,
        y: avgY,
        devices: clusterDevices,
      });
    } else {
      used.add(device.id);
      result.push(device);
    }
  }
  
  return result;
}

function isCluster(item: Cluster | DeviceLocation): item is Cluster {
  return 'devices' in item;
}

// =============================================================================
// CLUSTER MARKER COMPONENT
// =============================================================================

interface ClusterMarkerProps {
  cluster: Cluster;
  isHovered: boolean;
  isSelected: boolean;
  onHover: (id: string | null) => void;
  onSelect: (id: string | null) => void;
  scale: number;
}

const ClusterMarker = ({ cluster, isHovered, isSelected, onHover, onSelect, scale }: ClusterMarkerProps) => {
  const isHoveredOnly = isHovered && !isSelected;
  const clusterIndex = parseInt(cluster.id.replace('cluster-', ''));
  const personEmoji = clusterIndex % 2 === 0 ? '👨‍💻' : '👩‍💻';
  
  // Hover scale effect only (parent container handles zoom scaling)
  const hoverScale = isHovered || isSelected ? 1.1 : 1;
  
  return (
    <div
      className="absolute transition-all duration-300 ease-out cursor-pointer"
      style={{
        left: `${cluster.x}%`,
        top: `${cluster.y}%`,
        transform: `translate(-50%, -50%) scale(${hoverScale})`,
        transformOrigin: 'center center',
        zIndex: isHovered || isSelected ? 100 : 20,
      }}
      onMouseEnter={() => onHover(cluster.id)}
      onMouseLeave={() => onHover(null)}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(isSelected ? null : cluster.id);
      }}
    >
      {/* Pulse ring */}
      <div
        className="absolute rounded-full"
        style={{
          width: '60px',
          height: '60px',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle, ${THEME.primaryGlow} 0%, transparent 70%)`,
          animation: 'pulse 2s ease-out infinite',
        }}
      />

      {/* Cluster circle */}
      <div
        className="relative flex items-center justify-center gap-1 transition-all duration-300"
        style={{
          width: '52px',
          height: '52px',
          background: `linear-gradient(135deg, ${THEME.bgCard} 0%, ${THEME.bgDark} 100%)`,
          borderRadius: '50%',
          border: `2px solid ${isSelected ? THEME.primary : THEME.border}`,
          boxShadow: isSelected 
            ? `0 0 24px ${THEME.primaryGlow}, 0 4px 16px rgba(0,0,0,0.5)` 
            : '0 4px 12px rgba(0,0,0,0.4)',
        }}
      >
        <span className="text-base">{personEmoji}</span>
        <span className="text-base font-bold" style={{ color: THEME.primary }}>{cluster.devices.length}</span>
      </div>

      {/* Hover tooltip (only when not selected) */}
      {isHoveredOnly && (
        <div
          className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none"
          style={{ bottom: 'calc(100% + 8px)', animation: 'fadeIn 0.2s ease-out' }}
        >
          <div
            className="px-3 py-2 rounded-lg"
            style={{
              background: THEME.bgCard,
              border: `1px solid ${THEME.border}`,
              boxShadow: `0 0 20px ${THEME.primaryGlow}, 0 8px 24px rgba(0,0,0,0.5)`,
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-3.5 h-3.5" style={{ color: THEME.primary }} />
              <span className="text-xs font-semibold" style={{ color: THEME.textPrimary }}>
                {cluster.devices.length} users in {cluster.devices[0].city}
              </span>
            </div>
            <div className="text-[10px]" style={{ color: THEME.textMuted }}>
              {cluster.devices.slice(0, 3).map(d => d.name).join(', ')}
              {cluster.devices.length > 3 ? ` +${cluster.devices.length - 3} more` : ''}
            </div>
          </div>
          <div
            className="absolute left-1/2 -translate-x-1/2 -bottom-1"
            style={{ width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: `5px solid ${THEME.border}` }}
          />
        </div>
      )}
    </div>
  );
};

// =============================================================================
// DEVICE MARKER COMPONENT
// =============================================================================

interface DeviceMarkerProps {
  device: DeviceLocation;
  isHovered: boolean;
  isSelected: boolean;
  onHover: (id: number | null) => void;
  onSelect: (id: number | null) => void;
  scale: number;
}

const DeviceMarker = ({ device, isHovered, isSelected, onHover, onSelect, scale }: DeviceMarkerProps) => {
  const isHoveredOnly = isHovered && !isSelected;
  const statusColor = device.status === 'online' ? THEME.online : device.status === 'away' ? THEME.away : THEME.offline;

  // Hover scale effect only (parent container handles zoom scaling)
  const hoverScale = isHovered || isSelected ? 1.15 : 1;

  return (
    <div
      className="absolute transition-all duration-300 ease-out cursor-pointer"
      style={{
        left: `${device.x}%`,
        top: `${device.y}%`,
        transform: `translate(-50%, -100%) scale(${hoverScale})`,
        transformOrigin: 'center bottom',
        zIndex: isHovered || isSelected ? 100 : 10,
      }}
      onMouseEnter={() => onHover(device.id)}
      onMouseLeave={() => onHover(null)}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(isSelected ? null : device.id);
      }}
    >
      {/* Pulse for online */}
      {device.status === 'online' && (
        <div
          className="absolute rounded-full"
          style={{
            width: '40px',
            height: '40px',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            background: `radial-gradient(circle, ${THEME.primaryGlow} 0%, transparent 70%)`,
            animation: 'pulse 2s ease-out infinite',
          }}
        />
      )}

      {/* Marker */}
      <div
        className="relative flex items-center justify-center transition-all duration-300"
        style={{
          width: '36px',
          height: '36px',
          background: THEME.bgCard,
          borderRadius: '12px 12px 12px 2px',
          border: `1.5px solid ${isSelected ? statusColor : THEME.border}`,
          boxShadow: isSelected 
            ? `0 0 20px ${statusColor}40, 0 4px 12px rgba(0,0,0,0.5)` 
            : '0 2px 8px rgba(0,0,0,0.4)',
        }}
      >
        <div
          className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2"
          style={{
            background: statusColor,
            borderColor: THEME.bgCard,
            boxShadow: `0 0 6px ${statusColor}`,
          }}
        />
        <span className="text-lg select-none">{device.emoji}</span>
      </div>

      {/* Tooltip (only when not selected) */}
      {isHoveredOnly && (
        <div
          className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none"
          style={{ bottom: 'calc(100% + 8px)', animation: 'fadeIn 0.2s ease-out' }}
        >
          <div
            className="px-3 py-2 rounded-lg"
            style={{
              background: THEME.bgCard,
              border: `1px solid ${THEME.border}`,
              boxShadow: `0 0 20px ${THEME.primaryGlow}, 0 8px 24px rgba(0,0,0,0.5)`,
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full" style={{ background: statusColor, boxShadow: `0 0 4px ${statusColor}` }} />
              <span className="text-xs font-semibold" style={{ color: THEME.textPrimary }}>{device.name}</span>
            </div>
            <div className="text-[10px]" style={{ color: THEME.textMuted }}>{device.city}, {device.country}</div>
          </div>
          <div
            className="absolute left-1/2 -translate-x-1/2 -bottom-1"
            style={{ width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: `5px solid ${THEME.border}` }}
          />
        </div>
      )}
    </div>
  );
};

// =============================================================================
// POPUP PANEL COMPONENT - Stays within map bounds
// =============================================================================

interface PopupPanelProps {
  selectedData: { type: 'cluster'; data: Cluster } | { type: 'device'; data: DeviceLocation };
  containerRef: React.RefObject<HTMLDivElement>;
}

const PopupPanel = ({ selectedData, containerRef }: PopupPanelProps) => {
  const [popupStyle, setPopupStyle] = useState<React.CSSProperties>({});
  const [arrowPosition, setArrowPosition] = useState<'bottom' | 'top' | 'left' | 'right'>('bottom');
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !popupRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const popup = popupRef.current.getBoundingClientRect();
    
    // Calculate marker position in pixels
    const markerX = (selectedData.data.x / 100) * container.width;
    const markerY = (selectedData.data.y / 100) * container.height;
    
    const popupWidth = popup.width || 300;
    const popupHeight = popup.height || 200;
    const padding = 16;
    const arrowSize = 8;

    let left = markerX - popupWidth / 2;
    let top = markerY - popupHeight - arrowSize - 20; // Default: above marker
    let arrow: 'bottom' | 'top' | 'left' | 'right' = 'bottom';

    // Check if popup goes outside left
    if (left < padding) {
      left = padding;
    }
    // Check if popup goes outside right
    if (left + popupWidth > container.width - padding) {
      left = container.width - popupWidth - padding;
    }
    // Check if popup goes outside top - show below marker instead
    if (top < padding) {
      top = markerY + 60; // Below marker
      arrow = 'top';
    }
    // Check if popup goes outside bottom
    if (top + popupHeight > container.height - padding) {
      top = container.height - popupHeight - padding;
    }

    setPopupStyle({
      position: 'absolute',
      left: `${left}px`,
      top: `${top}px`,
      zIndex: 1000,
    });
    setArrowPosition(arrow);
  }, [selectedData, containerRef]);

  const isDevice = selectedData.type === 'device';
  const data = selectedData.data;

  return (
    <div
      ref={popupRef}
      style={{
        ...popupStyle,
        animation: 'fadeIn 0.2s ease-out',
        minWidth: isDevice ? '280px' : '300px',
        maxWidth: isDevice ? '320px' : '360px',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${THEME.bgCard} 0%, ${THEME.bgDark} 100%)`,
          border: `1px solid ${THEME.border}`,
          boxShadow: `0 0 30px ${THEME.primaryGlow}, 0 8px 32px rgba(0,0,0,0.6)`,
        }}
      >
        {isDevice ? (
          // Device Details
          <div className="p-4">
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: THEME.bgDark,
                  border: `2px solid ${(data as DeviceLocation).status === 'online' ? THEME.online : (data as DeviceLocation).status === 'away' ? THEME.away : THEME.offline}`,
                  boxShadow: `0 0 12px ${(data as DeviceLocation).status === 'online' ? THEME.online : (data as DeviceLocation).status === 'away' ? THEME.away : THEME.offline}40`,
                }}
              >
                <span className="text-2xl">{(data as DeviceLocation).emoji}</span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm font-semibold truncate" style={{ color: THEME.textPrimary }}>{(data as DeviceLocation).name}</h4>
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{
                      background: (data as DeviceLocation).status === 'online' ? THEME.online : (data as DeviceLocation).status === 'away' ? THEME.away : THEME.offline,
                      boxShadow: `0 0 6px ${(data as DeviceLocation).status === 'online' ? THEME.online : (data as DeviceLocation).status === 'away' ? THEME.away : THEME.offline}`,
                    }}
                  />
                </div>
                <p className="text-xs" style={{ color: THEME.textMuted }}>{(data as DeviceLocation).city}, {(data as DeviceLocation).country}</p>
                <p className="text-[10px] mt-1" style={{ color: THEME.textMuted }}>{(data as DeviceLocation).deviceType}</p>
              </div>

              <div className="text-right flex-shrink-0">
                <div
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold capitalize"
                  style={{
                    background: `${(data as DeviceLocation).status === 'online' ? THEME.online : (data as DeviceLocation).status === 'away' ? THEME.away : THEME.offline}15`,
                    color: (data as DeviceLocation).status === 'online' ? THEME.online : (data as DeviceLocation).status === 'away' ? THEME.away : THEME.offline,
                    border: `1px solid ${(data as DeviceLocation).status === 'online' ? THEME.online : (data as DeviceLocation).status === 'away' ? THEME.away : THEME.offline}30`,
                  }}
                >
                  {(data as DeviceLocation).status}
                </div>
                <p className="text-[10px] mt-1" style={{ color: THEME.textMuted }}>{(data as DeviceLocation).lastSeen}</p>
              </div>
            </div>
          </div>
        ) : (
          // Cluster Details
          <>
            <div className="px-4 py-3 flex items-center gap-3" style={{ background: THEME.primaryGlow, borderBottom: `1px solid ${THEME.border}` }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: THEME.bgDark, border: `2px solid ${THEME.primary}` }}>
                <span className="text-lg font-bold" style={{ color: THEME.primary }}>{(data as Cluster).devices.length}</span>
              </div>
              <div>
                <h4 className="text-sm font-semibold" style={{ color: THEME.textPrimary }}>{(data as Cluster).devices[0].city}</h4>
                <p className="text-[10px]" style={{ color: THEME.textMuted }}>{(data as Cluster).devices.length} users in this area</p>
              </div>
            </div>

            <div 
              className="max-h-[150px] overflow-y-auto popup-scroll"
              style={{ touchAction: 'pan-y pinch-zoom' }}
              onTouchStart={(e) => {
                // Allow scrolling only with two fingers
                if (e.touches.length < 2) {
                  const target = e.currentTarget;
                  const isScrollable = target.scrollHeight > target.clientHeight;
                  if (!isScrollable) return;
                  // Single finger - don't prevent, let it pass through for page scroll
                }
              }}
            >
              {(data as Cluster).devices.map((device, idx) => (
                <div 
                  key={device.id}
                  className="px-4 py-2.5 flex items-center gap-3"
                  style={{ borderBottom: idx < (data as Cluster).devices.length - 1 ? `1px solid ${THEME.border}` : 'none' }}
                >
                  <span className="text-xl">{device.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate" style={{ color: THEME.textPrimary }}>{device.name}</p>
                    <p className="text-[10px]" style={{ color: THEME.textMuted }}>{device.deviceType}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px]" style={{ color: THEME.textMuted }}>{device.lastSeen}</span>
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{
                        background: device.status === 'online' ? THEME.online : device.status === 'away' ? THEME.away : THEME.offline,
                        boxShadow: `0 0 4px ${device.status === 'online' ? THEME.online : device.status === 'away' ? THEME.away : THEME.offline}`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      
      {/* Arrow */}
      {arrowPosition === 'bottom' && (
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{ 
            bottom: '-6px',
            width: 0, 
            height: 0, 
            borderLeft: '6px solid transparent', 
            borderRight: '6px solid transparent', 
            borderTop: `6px solid ${THEME.border}` 
          }}
        />
      )}
      {arrowPosition === 'top' && (
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{ 
            top: '-6px',
            width: 0, 
            height: 0, 
            borderLeft: '6px solid transparent', 
            borderRight: '6px solid transparent', 
            borderBottom: `6px solid ${THEME.border}` 
          }}
        />
      )}
    </div>
  );
};

// =============================================================================
// MAIN BUBBLE MAP COMPONENT
// =============================================================================

interface BubbleMapProps {
  title?: string;
  height?: number;
}

export function BubbleMap({ title, height = 500 }: BubbleMapProps) {
  const [hoveredItem, setHoveredItem] = useState<number | string | null>(null);
  const [selectedItem, setSelectedItem] = useState<number | string | null>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [mapLoaded, setMapLoaded] = useState(false);
  const [cleanedSvg, setCleanedSvg] = useState<string>('');
  const containerRef = useRef<HTMLDivElement>(null);

  // Create clusters based on zoom level
  const clusteredItems = useMemo(() => createClusters(DEVICE_LOCATIONS, scale), [scale]);

  // Load and clean the original SVG map
  useEffect(() => {
    const loadMap = async () => {
      try {
        const response = await fetch('/assets/Bubble%20Map.svg');
        const svgText = await response.text();
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(svgText, 'image/svg+xml');
        const svg = doc.querySelector('svg');
        
        if (svg) {
          // Remove bubble elements
          const bubbles = svg.querySelectorAll('path[fill*="13F88B"], circle[fill*="13F88B"], [fill="var(--fill-0, #13F88B)"]');
          bubbles.forEach(el => el.remove());
          
          const glowElements = svg.querySelectorAll('[opacity="0.15"], [opacity="0.3"]');
          glowElements.forEach(el => {
            const fill = el.getAttribute('fill') || '';
            if (fill.includes('13F88B')) el.remove();
          });
          
          // Change land color to green
          const landElements = svg.querySelectorAll('[fill="#447703"], [fill="var(--fill-0, #447703)"]');
          landElements.forEach(el => {
            el.setAttribute('fill', '#0f5f3c');
          });
          
          svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
          svg.setAttribute('width', '100%');
          svg.setAttribute('height', '100%');
          
          setCleanedSvg(svg.outerHTML);
          setMapLoaded(true);
        }
      } catch (err) {
        console.error('Failed to load map:', err);
        setMapLoaded(true);
      }
    };
    
    loadMap();
  }, []);

  const stats = useMemo(() => ({
    online: DEVICE_LOCATIONS.filter(d => d.status === 'online').length,
    away: DEVICE_LOCATIONS.filter(d => d.status === 'away').length,
    offline: DEVICE_LOCATIONS.filter(d => d.status === 'offline').length,
    total: DEVICE_LOCATIONS.length,
  }), []);

  // Get selected device/cluster data
  const selectedData = useMemo(() => {
    if (!selectedItem) return null;
    if (typeof selectedItem === 'string') {
      const cluster = clusteredItems.find(item => isCluster(item) && item.id === selectedItem) as Cluster | undefined;
      return cluster ? { type: 'cluster' as const, data: cluster } : null;
    } else {
      const device = DEVICE_LOCATIONS.find(d => d.id === selectedItem);
      return device ? { type: 'device' as const, data: device } : null;
    }
  }, [selectedItem, clusteredItems]);

  // Zoom limits: 0.3x to 5x for more range
  const MIN_ZOOM = 0.3;
  const MAX_ZOOM = 5;
  
  const handleZoomIn = useCallback(() => setScale(s => Math.min(s * 1.3, MAX_ZOOM)), []);
  const handleZoomOut = useCallback(() => setScale(s => Math.max(s / 1.3, MIN_ZOOM)), []);
  const handleReset = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setSelectedItem(null);
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  }, [position]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging) setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  // Pinch-to-zoom with two fingers
  const [initialPinchDistance, setInitialPinchDistance] = useState<number | null>(null);
  const [initialPinchScale, setInitialPinchScale] = useState<number>(1);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
    e.preventDefault();
    e.stopPropagation();
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
      setInitialPinchDistance(distance);
      setInitialPinchScale(scale);
    }
  }, [scale]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2 && initialPinchDistance !== null) {
      e.preventDefault();
      e.stopPropagation();
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
      const newScale = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, initialPinchScale * (distance / initialPinchDistance)));
      setScale(newScale);
    }
  }, [initialPinchDistance, initialPinchScale]);

  const handleTouchEnd = useCallback(() => {
    setInitialPinchDistance(null);
  }, []);

  // Handle wheel zoom on map - smooth zooming with scroll wheel
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Smoother zoom with smaller increments for buttery feel
    const zoomFactor = e.deltaY > 0 ? 0.95 : 1.05;
    setScale(s => Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, s * zoomFactor)));
  }, []);

  // Prevent browser's default pinch-zoom on the map container
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const preventBrowserZoom = (e: TouchEvent) => {
      // Prevent browser zoom only for two-finger gestures on the map
      if (e.touches.length >= 2) {
        e.preventDefault();
      }
    };

    const preventWheelZoom = (e: WheelEvent) => {
      // Prevent browser zoom only for Ctrl+wheel (trackpad pinch)
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };

    container.addEventListener('touchstart', preventBrowserZoom, { passive: false });
    container.addEventListener('touchmove', preventBrowserZoom, { passive: false });
    container.addEventListener('wheel', preventWheelZoom, { passive: false });
    
    return () => {
      container.removeEventListener('touchstart', preventBrowserZoom);
      container.removeEventListener('touchmove', preventBrowserZoom);
      container.removeEventListener('wheel', preventWheelZoom);
    };
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      {title && (
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-semibold" style={{ color: THEME.textPrimary }}>{title}</h4>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg" style={{ background: 'rgba(0, 255, 102, 0.1)', border: '1px solid rgba(0, 255, 102, 0.2)' }}>
              <Wifi className="w-3 h-3" style={{ color: THEME.online }} />
              <span className="text-xs font-semibold" style={{ color: THEME.online }}>{stats.online}</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg" style={{ background: 'rgba(255, 204, 0, 0.1)', border: '1px solid rgba(255, 204, 0, 0.2)' }}>
              <Clock className="w-3 h-3" style={{ color: THEME.away }} />
              <span className="text-xs font-semibold" style={{ color: THEME.away }}>{stats.away}</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg" style={{ background: 'rgba(255, 68, 68, 0.1)', border: '1px solid rgba(255, 68, 68, 0.2)' }}>
              <WifiOff className="w-3 h-3" style={{ color: THEME.offline }} />
              <span className="text-xs font-semibold" style={{ color: THEME.offline }}>{stats.offline}</span>
            </div>
          </div>
        </div>
      )}
      
      <div
        ref={containerRef}
        className="relative flex-1 rounded-2xl overflow-hidden"
        style={{ 
          height: `${height}px`,
          background: '#1E2125',
          border: `1px solid ${THEME.border}`,
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
        onClick={() => setSelectedItem(null)}
      >
        {/* Map Layer - contains SVG and markers, all scale together */}
        <div
          className="absolute inset-0"
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transformOrigin: 'center center',
            transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        >
          {/* SVG Map */}
          {cleanedSvg ? (
            <div 
              className="absolute inset-0 w-full h-full"
              style={{ pointerEvents: 'none' }}
              dangerouslySetInnerHTML={{ __html: cleanedSvg }}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: `${THEME.primary} transparent transparent transparent` }} />
            </div>
          )}

          {/* Markers */}
          {mapLoaded && clusteredItems.map(item => 
            isCluster(item) ? (
              <ClusterMarker
                key={item.id}
                cluster={item}
                isHovered={hoveredItem === item.id}
                isSelected={selectedItem === item.id}
                onHover={setHoveredItem}
                onSelect={setSelectedItem}
                scale={scale}
            />
          ) : (
              <DeviceMarker
                key={item.id}
                device={item}
                isHovered={hoveredItem === item.id}
                isSelected={selectedItem === item.id}
                onHover={setHoveredItem}
                onSelect={setSelectedItem}
                scale={scale}
              />
            )
          )}
        </div>

        {/* Popup Panel - Rendered outside the transform layer */}
        {selectedData && (
          <PopupPanel selectedData={selectedData} containerRef={containerRef} />
        )}

        {/* Zoom Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
          <button
            onClick={(e) => { e.stopPropagation(); handleZoomIn(); }}
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ease-out hover:scale-110 active:scale-95 group"
            style={{ background: THEME.bgCard, border: `1px solid ${THEME.border}` }}
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4 transition-colors duration-200 group-hover:text-[#00FF66]" style={{ color: THEME.textMuted }} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleZoomOut(); }}
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ease-out hover:scale-110 active:scale-95 group"
            style={{ background: THEME.bgCard, border: `1px solid ${THEME.border}` }}
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4 transition-colors duration-200 group-hover:text-[#00FF66]" style={{ color: THEME.textMuted }} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleReset(); }}
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ease-out hover:scale-110 active:scale-95 group"
            style={{ background: THEME.bgCard, border: `1px solid ${THEME.border}` }}
            title="Reset View"
          >
            <RotateCcw className="w-4 h-4 transition-colors duration-200 group-hover:text-[#00FF66]" style={{ color: THEME.textMuted }} />
          </button>
        </div>

        {/* Scale Indicator */}
        <div
          className="absolute bottom-4 right-4 px-4 py-2 rounded-xl text-sm font-semibold z-20 transition-all duration-300"
          style={{ 
            background: THEME.bgCard, 
            border: `1px solid ${scale !== 1 ? 'rgba(0,255,102,0.3)' : THEME.border}`, 
            color: scale !== 1 ? '#00FF66' : THEME.textMuted,
            boxShadow: scale !== 1 ? '0 0 20px rgba(0,255,102,0.1)' : 'none'
          }}
        >
          {Math.round(scale * 100)}%
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
          50% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
