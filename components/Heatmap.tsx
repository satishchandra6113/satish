import { MapPin } from 'lucide-react';

interface LocationData {
  name: string;
  count: number;
  lat: number;
  lng: number;
}

interface HeatmapProps {
  locations: LocationData[];
  height?: number;
}

export function Heatmap({ locations, height = 400 }: HeatmapProps) {
  const maxCount = Math.max(...locations.map(l => l.count));

  // Convert lat/lng to SVG coordinates (simplified projection)
  const getPosition = (lat: number, lng: number) => {
    const x = ((lng + 180) / 360) * 100;
    const y = ((90 - lat) / 180) * 100;
    return { x, y };
  };

  return (
    <div className="relative w-full bg-[#000000] rounded-[12px] overflow-hidden" style={{ height }}>
      {/* Simple world map background grid */}
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Grid lines */}
        <defs>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#1A1A1A" strokeWidth="0.1" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#grid)" />
        
        {/* Location markers */}
        {locations.map((location, index) => {
          const pos = getPosition(location.lat, location.lng);
          const size = Math.max(1.5, (location.count / maxCount) * 4);
          const opacity = Math.max(0.3, location.count / maxCount);
          
          return (
            <g key={index}>
              {/* Glow effect */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r={size * 1.5}
                fill="#00FF66"
                opacity={opacity * 0.2}
              />
              {/* Main dot */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r={size}
                fill="#00FF66"
                opacity={opacity}
              />
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="absolute bottom-[16px] left-[16px] bg-[#0F0F0F] border border-[#1A1A1A] rounded-[8px] p-[12px]">
        <h4 className="text-[#FFFFFF] text-[12px] font-semibold mb-[8px]">Device Locations</h4>
        <div className="space-y-[4px]">
          {locations.slice(0, 5).map((location, index) => (
            <div key={index} className="flex items-center gap-[8px]">
              <MapPin size={12} className="text-[#00FF66]" />
              <span className="text-[#8F8F8F] text-[11px]">
                {location.name}: {location.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
