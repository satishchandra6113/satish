interface WorldMapChartProps {
  title?: string;
  markers?: { x: number; y: number; value: string; label: string }[];
}

export function WorldMapChart({ title, markers = [] }: WorldMapChartProps) {
  return (
    <div className="w-full h-full flex flex-col">
      {title && (
        <h4 className="text-[14px] font-medium text-white mb-[16px]">{title}</h4>
      )}
      <div className="relative w-full bg-[#0A0A0A] rounded-[8px] border border-[#1A1A1A]" style={{ height: '320px' }}>
        {/* World Map SVG Simplified */}
        <svg
          viewBox="0 0 1000 500"
          className="w-full h-full"
          style={{ opacity: 0.3 }}
        >
          {/* Simplified continents */}
          <path
            d="M100,150 L200,120 L280,140 L320,180 L300,220 L220,200 Z"
            fill="#447703"
            stroke="#00FF66"
            strokeWidth="1"
          />
          <path
            d="M400,100 L550,90 L650,130 L680,200 L620,250 L500,240 L450,180 Z"
            fill="#447703"
            stroke="#00FF66"
            strokeWidth="1"
          />
          <path
            d="M700,200 L850,180 L920,220 L900,300 L800,320 L750,280 Z"
            fill="#447703"
            stroke="#00FF66"
            strokeWidth="1"
          />
          <path
            d="M150,300 L250,280 L300,320 L280,380 L200,400 L140,360 Z"
            fill="#447703"
            stroke="#00FF66"
            strokeWidth="1"
          />
          <path
            d="M400,280 L500,270 L550,310 L520,370 L450,380 L410,340 Z"
            fill="#447703"
            stroke="#00FF66"
            strokeWidth="1"
          />
        </svg>

        {/* Markers */}
        {markers.map((marker, index) => (
          <div
            key={index}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
            style={{
              left: `${marker.x}%`,
              top: `${marker.y}%`,
            }}
          >
            {/* Pulse animation */}
            <div className="absolute w-[20px] h-[20px] bg-[#00FF66] rounded-full opacity-30 animate-ping" />
            
            {/* Main marker */}
            <div className="relative w-[12px] h-[12px] bg-[#00FF66] rounded-full border-2 border-[#050505] shadow-lg shadow-[#00FF66]/50" />
            
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-[8px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              <div className="bg-[#0F0F0F] border border-[#00FF66] rounded-[8px] px-[12px] py-[8px] shadow-lg">
                <p className="text-[12px] font-bold text-[#00FF66]">{marker.value}</p>
                <p className="text-[10px] text-[#8F8F8F]">{marker.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
