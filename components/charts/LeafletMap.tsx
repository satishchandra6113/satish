import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// =============================================================================
// THEME & CONFIGURATION
// =============================================================================

const THEME = {
    primary: '#00FF66',
    online: '#00FF66',
    away: '#FFCC00',
    offline: '#FF4444',
    bgDark: '#050505',
    bgCard: '#0F0F0F',
    border: '#1A1A1A',
    textPrimary: '#D5FFD6',
    textMuted: '#8F8F8F',
};

// =============================================================================
// DATA TYPES & MOCK DATA
// =============================================================================

interface DeviceLocation {
    id: number;
    lat: number;
    lng: number;
    emoji: string;
    name: string;
    status: 'online' | 'away' | 'offline';
    city: string;
    country: string;
    deviceType: string;
    lastSeen: string;
}

// Device locations converted to lat/lng coordinates
const DEVICE_LOCATIONS: DeviceLocation[] = [
    // North America
    { id: 1, lat: 40.7128, lng: -74.0060, emoji: '👨‍💻', name: 'Alex', status: 'online', city: 'New York', country: 'USA', deviceType: 'Laptop', lastSeen: 'Just now' },
    { id: 2, lat: 34.0522, lng: -118.2437, emoji: '👩‍💼', name: 'Sarah', status: 'online', city: 'Los Angeles', country: 'USA', deviceType: 'Mobile', lastSeen: '5 min ago' },
    { id: 3, lat: 41.8781, lng: -87.6298, emoji: '🧑‍🎨', name: 'Jordan', status: 'away', city: 'Chicago', country: 'USA', deviceType: 'Tablet', lastSeen: '1 hour ago' },
    { id: 4, lat: 40.7580, lng: -73.9855, emoji: '👨‍💻', name: 'Mike', status: 'online', city: 'New York', country: 'USA', deviceType: 'Desktop', lastSeen: 'Just now' },
    { id: 5, lat: 34.0195, lng: -118.4912, emoji: '👩‍🚀', name: 'Emma', status: 'online', city: 'Los Angeles', country: 'USA', deviceType: 'Laptop', lastSeen: '10 min ago' },
    { id: 6, lat: 41.8500, lng: -87.6500, emoji: '🧑‍💻', name: 'Carlos', status: 'offline', city: 'Chicago', country: 'USA', deviceType: 'Mobile', lastSeen: '2 days ago' },
    { id: 7, lat: 40.7489, lng: -73.9680, emoji: '👨‍🎤', name: 'David', status: 'online', city: 'New York', country: 'USA', deviceType: 'Laptop', lastSeen: 'Just now' },
    { id: 8, lat: 40.7306, lng: -73.9352, emoji: '👩‍🎤', name: 'Maria', status: 'online', city: 'New York', country: 'USA', deviceType: 'Desktop', lastSeen: 'Just now' },

    // South America
    { id: 9, lat: -23.5505, lng: -46.6333, emoji: '👩‍🎤', name: 'Lucas', status: 'online', city: 'São Paulo', country: 'Brazil', deviceType: 'Laptop', lastSeen: '30 min ago' },
    { id: 10, lat: -34.6037, lng: -58.3816, emoji: '🧔', name: 'Ana', status: 'away', city: 'Buenos Aires', country: 'Argentina', deviceType: 'Mobile', lastSeen: '2 hours ago' },

    // Europe
    { id: 11, lat: 51.5074, lng: -0.1278, emoji: '👨‍💼', name: 'James', status: 'online', city: 'London', country: 'UK', deviceType: 'Laptop', lastSeen: 'Just now' },
    { id: 12, lat: 48.8566, lng: 2.3522, emoji: '👩‍🎓', name: 'Sophie', status: 'online', city: 'Paris', country: 'France', deviceType: 'Desktop', lastSeen: '15 min ago' },
    { id: 13, lat: 52.5200, lng: 13.4050, emoji: '🧑‍🏫', name: 'Hans', status: 'away', city: 'Berlin', country: 'Germany', deviceType: 'Tablet', lastSeen: '3 hours ago' },
    { id: 14, lat: 51.5155, lng: -0.0922, emoji: '👨‍🍳', name: 'Marco', status: 'online', city: 'London', country: 'UK', deviceType: 'Mobile', lastSeen: 'Just now' },
    { id: 15, lat: 51.5033, lng: -0.1195, emoji: '👩‍⚕️', name: 'Elena', status: 'online', city: 'London', country: 'UK', deviceType: 'Laptop', lastSeen: 'Just now' },
    { id: 16, lat: 51.5085, lng: -0.0759, emoji: '🧑‍🚒', name: 'Erik', status: 'offline', city: 'London', country: 'UK', deviceType: 'Desktop', lastSeen: '1 day ago' },
    { id: 17, lat: 51.4975, lng: -0.1357, emoji: '👨‍✈️', name: 'Oleg', status: 'online', city: 'London', country: 'UK', deviceType: 'Laptop', lastSeen: 'Just now' },

    // Africa
    { id: 18, lat: 6.5244, lng: 3.3792, emoji: '👩‍⚖️', name: 'Amina', status: 'online', city: 'Lagos', country: 'Nigeria', deviceType: 'Laptop', lastSeen: '45 min ago' },
    { id: 19, lat: -1.2921, lng: 36.8219, emoji: '🧑‍🌾', name: 'Kwame', status: 'away', city: 'Nairobi', country: 'Kenya', deviceType: 'Mobile', lastSeen: '6 hours ago' },
    { id: 20, lat: -26.2041, lng: 28.0473, emoji: '👨‍🔧', name: 'Thabo', status: 'online', city: 'Johannesburg', country: 'South Africa', deviceType: 'Desktop', lastSeen: '1 hour ago' },

    // Asia
    { id: 21, lat: 19.0760, lng: 72.8777, emoji: '👨‍🎮', name: 'Raj', status: 'online', city: 'Mumbai', country: 'India', deviceType: 'Laptop', lastSeen: 'Just now' },
    { id: 22, lat: 28.6139, lng: 77.2090, emoji: '👩‍💻', name: 'Priya', status: 'away', city: 'Delhi', country: 'India', deviceType: 'Mobile', lastSeen: '2 hours ago' },
    { id: 23, lat: 31.2304, lng: 121.4737, emoji: '🧑‍🎨', name: 'Wei', status: 'online', city: 'Shanghai', country: 'China', deviceType: 'Desktop', lastSeen: '10 min ago' },
    { id: 24, lat: 39.9042, lng: 116.4074, emoji: '👨‍🏫', name: 'Chen', status: 'online', city: 'Beijing', country: 'China', deviceType: 'Laptop', lastSeen: '20 min ago' },
    { id: 25, lat: 31.2397, lng: 121.4912, emoji: '👩‍🔬', name: 'Yuki', status: 'online', city: 'Shanghai', country: 'China', deviceType: 'Mobile', lastSeen: 'Just now' },
    { id: 26, lat: 31.2222, lng: 121.4581, emoji: '🧔‍♂️', name: 'Kim', status: 'offline', city: 'Shanghai', country: 'China', deviceType: 'Tablet', lastSeen: '3 days ago' },
    { id: 27, lat: 31.2165, lng: 121.4365, emoji: '👨‍⚕️', name: 'Arun', status: 'online', city: 'Shanghai', country: 'China', deviceType: 'Laptop', lastSeen: 'Just now' },
    { id: 28, lat: 1.3521, lng: 103.8198, emoji: '👩‍🎤', name: 'Mei', status: 'online', city: 'Singapore', country: 'Singapore', deviceType: 'Desktop', lastSeen: '30 min ago' },
    { id: 29, lat: 25.2048, lng: 55.2708, emoji: '🧑‍💼', name: 'Ali', status: 'away', city: 'Dubai', country: 'UAE', deviceType: 'Mobile', lastSeen: '4 hours ago' },

    // Oceania
    { id: 30, lat: -33.8688, lng: 151.2093, emoji: '👨‍🦰', name: 'Jack', status: 'online', city: 'Sydney', country: 'Australia', deviceType: 'Laptop', lastSeen: 'Just now' },
    { id: 31, lat: -37.8136, lng: 144.9631, emoji: '👩‍🦱', name: 'Olivia', status: 'away', city: 'Melbourne', country: 'Australia', deviceType: 'Desktop', lastSeen: '5 hours ago' },
    { id: 32, lat: -33.8650, lng: 151.2094, emoji: '🧑‍🦲', name: 'Liam', status: 'online', city: 'Sydney', country: 'Australia', deviceType: 'Mobile', lastSeen: 'Just now' },
];

// =============================================================================
// CUSTOM MARKER ICON CREATION
// =============================================================================

function createCustomIcon(device: DeviceLocation): L.DivIcon {
    const statusColor = device.status === 'online' ? THEME.online : device.status === 'away' ? THEME.away : THEME.offline;

    return L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
      <div class="leaflet-marker-wrapper" style="animation-delay: ${(device.id * 0.3) % 2}s;">
        <div class="marker-container" style="
          position: relative;
          width: 36px;
          height: 36px;
          background: ${THEME.bgCard};
          border-radius: 12px 12px 12px 2px;
          border: 1.5px solid ${THEME.border};
          box-shadow: 0 2px 8px rgba(0,0,0,0.4), 0 0 0 0 ${statusColor};
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        ">
          <div class="status-dot" style="
            position: absolute;
            top: -4px;
            right: -4px;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: ${statusColor};
            border: 2px solid ${THEME.bgCard};
            box-shadow: 0 0 6px ${statusColor};
          "></div>
          <span style="font-size: 18px; user-select: none;">${device.emoji}</span>
        </div>
      </div>
    `,
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -36],
    });
}

// =============================================================================
// MAP EFFECTS COMPONENT - Handles click-to-zoom activation
// =============================================================================

function MapEffects() {
    const map = useMap();

    useEffect(() => {
        // Disable scroll wheel zoom initially
        map.scrollWheelZoom.disable();

        // Prevent markers, icons, and UI from scaling on zoom
        const preventScaling = () => {
            const container = map.getContainer();
            // Reset scale on all marker icons - preserve translation, remove scale
            const markerIcons = container.querySelectorAll('.leaflet-marker-icon');
            markerIcons.forEach((icon: Element) => {
                const htmlIcon = icon as HTMLElement;
                const currentTransform = htmlIcon.style.transform || '';
                // Remove any scale() from transform, keep translation
                const newTransform = currentTransform
                    .replace(/\s*scale\([^)]+\)/g, '')
                    .replace(/\s*scale3d\([^)]+\)/g, '')
                    .trim();
                if (newTransform !== currentTransform) {
                    htmlIcon.style.transform = newTransform || 'translate3d(0, 0, 0)';
                }
            });
            // Reset scale on popups
            const popups = container.querySelectorAll('.leaflet-popup');
            popups.forEach((popup: Element) => {
                const htmlPopup = popup as HTMLElement;
                const currentTransform = htmlPopup.style.transform || '';
                const newTransform = currentTransform
                    .replace(/\s*scale\([^)]+\)/g, '')
                    .replace(/\s*scale3d\([^)]+\)/g, '')
                    .trim();
                if (newTransform !== currentTransform) {
                    htmlPopup.style.transform = newTransform || 'translate3d(0, 0, 0)';
                }
            });
            // Reset scale on controls
            const controls = container.querySelectorAll('.leaflet-control');
            controls.forEach((control: Element) => {
                const htmlControl = control as HTMLElement;
                const currentTransform = htmlControl.style.transform || '';
                const newTransform = currentTransform
                    .replace(/\s*scale\([^)]+\)/g, '')
                    .replace(/\s*scale3d\([^)]+\)/g, '')
                    .trim();
                if (newTransform !== currentTransform) {
                    htmlControl.style.transform = newTransform || 'translate3d(0, 0, 0)';
                }
            });
        };

        // Prevent scaling on zoom events
        map.on('zoom', preventScaling);
        map.on('zoomend', preventScaling);

        // Adjust popup position when near edges (without panning map)
        const adjustPopupPosition = (e?: any) => {
            // Use setTimeout to ensure popup is fully rendered
            setTimeout(() => {
                const container = map.getContainer();
                const popups = container.querySelectorAll('.leaflet-popup');
                popups.forEach((popup: Element) => {
                    const htmlPopup = popup as HTMLElement;
                    if (htmlPopup.style.display === 'none') return;
                    
                    const popupContent = htmlPopup.querySelector('.leaflet-popup-content-wrapper') as HTMLElement;
                    if (!popupContent) return;
                    
                    const popupRect = popupContent.getBoundingClientRect();
                    const mapRect = container.getBoundingClientRect();
                    const padding = 10;
                    
                    const relativeTop = popupRect.top - mapRect.top;
                    const relativeLeft = popupRect.left - mapRect.left;
                    const popupHeight = popupRect.height;
                    const popupWidth = popupRect.width;
                    
                    let adjustY = 0;
                    let adjustX = 0;
                    
                    // If popup is near top edge, adjust downward
                    if (relativeTop < padding) {
                        adjustY = padding - relativeTop;
                    }
                    
                    // If popup is near bottom edge, adjust upward
                    if (relativeTop + popupHeight > mapRect.height - padding) {
                        adjustY = (mapRect.height - padding - popupHeight) - relativeTop;
                    }
                    
                    // If popup is near left edge, adjust rightward
                    if (relativeLeft < padding) {
                        adjustX = padding - relativeLeft;
                    }
                    
                    // If popup is near right edge, adjust leftward
                    if (relativeLeft + popupWidth > mapRect.width - padding) {
                        adjustX = (mapRect.width - padding - popupWidth) - relativeLeft;
                    }
                    
                    // Apply adjustment using CSS transform
                    if (adjustX !== 0 || adjustY !== 0) {
                        const currentTransform = htmlPopup.style.transform || 'translate3d(0px, 0px, 0px)';
                        const match = currentTransform.match(/translate3d\(([^)]+)\)/);
                        if (match) {
                            const parts = match[1].split(',').map(v => parseFloat(v.trim()));
                            const newX = (parts[0] || 0) + adjustX;
                            const newY = (parts[1] || 0) + adjustY;
                            htmlPopup.style.transform = `translate3d(${newX}px, ${newY}px, 0px)`;
                        }
                    }
                });
            }, 10);
        };

        // Adjust popup position on popup open and map events
        map.on('popupopen', adjustPopupPosition);
        map.on('moveend', adjustPopupPosition);
        map.on('resize', adjustPopupPosition);

        // Create overlay hint element
        const container = map.getContainer();
        const hint = document.createElement('div');
        hint.className = 'map-scroll-hint';
        hint.innerHTML = 'Click to enable zoom';
        hint.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(15, 15, 15, 0.95);
            color: #00FF66;
            padding: 12px 24px;
            border-radius: 8px;
            border: 1px solid #00FF66;
            font-size: 14px;
            font-weight: 600;
            pointer-events: none;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
            box-shadow: 0 0 20px rgba(0, 255, 102, 0.3);
        `;
        container.appendChild(hint);

        // Show hint on hover, hide when scrolling is enabled
        let isScrollEnabled = false;

        const handleMouseEnter = () => {
            if (!isScrollEnabled) {
                hint.style.opacity = '1';
            }
        };

        const handleMouseLeave = () => {
            hint.style.opacity = '0';
            if (isScrollEnabled) {
                map.scrollWheelZoom.disable();
                isScrollEnabled = false;
            }
        };

        const handleClick = () => {
            if (!isScrollEnabled) {
                map.scrollWheelZoom.enable();
                isScrollEnabled = true;
                hint.style.opacity = '0';
            }
        };

        container.addEventListener('mouseenter', handleMouseEnter);
        container.addEventListener('mouseleave', handleMouseLeave);
        container.addEventListener('click', handleClick);

        // Invalidate size
        map.invalidateSize();

        // Cleanup
        return () => {
            map.off('zoom', preventScaling);
            map.off('zoomend', preventScaling);
            map.off('popupopen', adjustPopupPosition);
            map.off('moveend', adjustPopupPosition);
            map.off('resize', adjustPopupPosition);
            container.removeEventListener('mouseenter', handleMouseEnter);
            container.removeEventListener('mouseleave', handleMouseLeave);
            container.removeEventListener('click', handleClick);
            if (hint.parentNode) {
                hint.parentNode.removeChild(hint);
            }
        };
    }, [map]);

    return null;
}

// =============================================================================
// MAIN LEAFLET MAP COMPONENT
// =============================================================================

interface LeafletMapProps {
    title?: string;
    height?: number;
}

export function LeafletMap({ title, height = 500 }: LeafletMapProps) {
    const stats = {
        online: DEVICE_LOCATIONS.filter(d => d.status === 'online').length,
        away: DEVICE_LOCATIONS.filter(d => d.status === 'away').length,
        offline: DEVICE_LOCATIONS.filter(d => d.status === 'offline').length,
    };

    return (
        <div className="w-full h-full flex flex-col">
            {title && (
                <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-semibold" style={{ color: THEME.textPrimary }}>{title}</h4>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg" style={{ background: 'rgba(0, 255, 102, 0.1)', border: '1px solid rgba(0, 255, 102, 0.2)' }}>
                            <div className="w-2 h-2 rounded-full" style={{ background: THEME.online }} />
                            <span className="text-xs font-semibold" style={{ color: THEME.online }}>{stats.online}</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg" style={{ background: 'rgba(255, 204, 0, 0.1)', border: '1px solid rgba(255, 204, 0, 0.2)' }}>
                            <div className="w-2 h-2 rounded-full" style={{ background: THEME.away }} />
                            <span className="text-xs font-semibold" style={{ color: THEME.away }}>{stats.away}</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg" style={{ background: 'rgba(255, 68, 68, 0.1)', border: '1px solid rgba(255, 68, 68, 0.2)' }}>
                            <div className="w-2 h-2 rounded-full" style={{ background: THEME.offline }} />
                            <span className="text-xs font-semibold" style={{ color: THEME.offline }}>{stats.offline}</span>
                        </div>
                    </div>
                </div>
            )}

            <div
                className="relative flex-1 rounded-2xl overflow-hidden leaflet-map-container"
                style={{
                    height: `${height}px`,
                    border: `1px solid ${THEME.border}`,
                }}
            >
                <MapContainer
                    center={[20, 0]}
                    zoom={2}
                    minZoom={2}
                    maxZoom={18}
                    style={{ height: '100%', width: '100%', background: '#1a1d23' }}
                    zoomControl={true}
                    zoomAnimation={true}
                    zoomAnimationThreshold={4}
                    fadeAnimation={true}
                    markerZoomAnimation={true}
                    scrollWheelZoom={false}
                    zoomDelta={0.5}
                    zoomSnap={0.5}
                    wheelDebounceTime={40}
                    wheelPxPerZoomLevel={60}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    />
                    <MapEffects />

                    {DEVICE_LOCATIONS.map((device) => (
                        <Marker
                            key={device.id}
                            position={[device.lat, device.lng]}
                            icon={createCustomIcon(device)}
                        >
                            <Popup
                                className="custom-leaflet-popup"
                                autoPan={false}
                                keepInView={true}
                                offset={[0, -36]}
                            >
                                <div style={{
                                    background: THEME.bgCard,
                                    color: THEME.textPrimary,
                                    padding: '12px',
                                    borderRadius: '8px',
                                    minWidth: '200px',
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                        <div style={{
                                            width: '48px',
                                            height: '48px',
                                            borderRadius: '8px',
                                            background: THEME.bgDark,
                                            border: `2px solid ${device.status === 'online' ? THEME.online : device.status === 'away' ? THEME.away : THEME.offline}`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '24px',
                                        }}>
                                            {device.emoji}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                                <h4 style={{ fontSize: '14px', fontWeight: 600, margin: 0 }}>{device.name}</h4>
                                                <span style={{
                                                    width: '8px',
                                                    height: '8px',
                                                    borderRadius: '50%',
                                                    background: device.status === 'online' ? THEME.online : device.status === 'away' ? THEME.away : THEME.offline,
                                                    boxShadow: `0 0 6px ${device.status === 'online' ? THEME.online : device.status === 'away' ? THEME.away : THEME.offline}`,
                                                }} />
                                            </div>
                                            <p style={{ fontSize: '12px', color: THEME.textMuted, margin: 0 }}>{device.city}, {device.country}</p>
                                        </div>
                                    </div>
                                    <div style={{
                                        padding: '8px',
                                        background: 'rgba(255,255,255,0.02)',
                                        borderRadius: '4px',
                                        border: `1px solid ${THEME.border}`,
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                            <span style={{ fontSize: '11px', color: THEME.textMuted }}>Device Type:</span>
                                            <span style={{ fontSize: '11px', color: THEME.textPrimary }}>{device.deviceType}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                            <span style={{ fontSize: '11px', color: THEME.textMuted }}>Status:</span>
                                            <span style={{
                                                fontSize: '11px',
                                                color: device.status === 'online' ? THEME.online : device.status === 'away' ? THEME.away : THEME.offline,
                                                textTransform: 'capitalize',
                                            }}>{device.status}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ fontSize: '11px', color: THEME.textMuted }}>Last Seen:</span>
                                            <span style={{ fontSize: '11px', color: THEME.textPrimary }}>{device.lastSeen}</span>
                                        </div>
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
}
