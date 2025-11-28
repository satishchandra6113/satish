import { useState, useRef, useCallback, useEffect } from 'react';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

// SVG path - served from public folder (URL encoded for space)
const BUBBLE_MAP_SVG = '/assets/Bubble%20Map.svg';

interface BubbleMapProps {
  title?: string;
  height?: number;
}

export function BubbleMap({ title = "Device Location (Global Distribution)", height = 500 }: BubbleMapProps) {
  const svgWidth = 2000;
  const svgHeight = 1500;
  
  const [scale, setScale] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [clarity, setClarity] = useState(100);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const mapWrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load SVG content on mount
  useEffect(() => {
    const loadSvg = async (path: string) => {
      try {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const text = await response.text();
        // Extract the content inside the SVG tag
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'image/svg+xml');
        const svgElement = doc.querySelector('svg');
        if (svgElement) {
          // Get all children of the SVG (including defs)
          const content = Array.from(svgElement.children)
            .map(child => child.outerHTML)
            .join('');
          setSvgContent(content);
          return true;
        }
      } catch (error) {
        console.error('Error loading SVG:', error);
        return false;
      }
      return false;
    };

    // Try with URL encoding first, then without
    loadSvg(BUBBLE_MAP_SVG).then(success => {
      if (!success) {
        loadSvg('/assets/Bubble Map.svg');
      }
    });
  }, []);

  const MIN_SCALE = 0.5;
  const MAX_SCALE = 5; // Increased max scale for pixel-level zoom

  // Handle zoom with mouse wheel - zoom towards mouse position
  const handleWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    // Prevent default and stop propagation to avoid page zoom
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    
    if (!mapWrapperRef.current || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Calculate zoom factor
    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
    const newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale * zoomFactor));
    
    // Calculate the point under the mouse in SVG coordinates before zoom
    const svgX = (mouseX - translateX) / scale;
    const svgY = (mouseY - translateY) / scale;
    
    // Calculate new translate to keep the same point under the mouse
    const newTranslateX = mouseX - svgX * newScale;
    const newTranslateY = mouseY - svgY * newScale;
    
    setScale(newScale);
    setTranslateX(newTranslateX);
    setTranslateY(newTranslateY);
    
    return false;
  }, [scale, translateX, translateY]);

  // Handle click to zoom - single click zooms in at clicked point
  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // Don't zoom if we just finished dragging
    if (isDragging) return;
    
    if (!containerRef.current) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Calculate zoom factor - zoom in if not at max, otherwise reset
    const zoomFactor = scale < MAX_SCALE ? 1.5 : 1;
    const newScale = scale < MAX_SCALE 
      ? Math.min(MAX_SCALE, scale * zoomFactor)
      : 1; // Reset to 1 if at max
    
    if (newScale === 1) {
      // Reset view
      setScale(1);
      setTranslateX(0);
      setTranslateY(0);
    } else {
      // Calculate the point under the mouse in SVG coordinates before zoom
      const svgX = (mouseX - translateX) / scale;
      const svgY = (mouseY - translateY) / scale;
      
      // Calculate new translate to keep the same point under the mouse
      const newTranslateX = mouseX - svgX * newScale;
      const newTranslateY = mouseY - svgY * newScale;
      
      setScale(newScale);
      setTranslateX(newTranslateX);
      setTranslateY(newTranslateY);
    }
  }, [scale, translateX, translateY, isDragging]);

  // Handle pan with mouse drag
  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button === 0) {
      e.preventDefault();
      setIsDragging(true);
      setDragStart({
        x: e.clientX - translateX,
        y: e.clientY - translateY,
      });
    }
  }, [translateX, translateY]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      e.preventDefault();
      setTranslateX(e.clientX - dragStart.x);
      setTranslateY(e.clientY - dragStart.y);
    }
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Reset zoom and pan
  const handleReset = useCallback(() => {
    setScale(1);
    setTranslateX(0);
    setTranslateY(0);
  }, []);

  // Zoom in/out buttons
  const handleZoomIn = useCallback(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const newScale = Math.min(MAX_SCALE, scale * 1.2);
      const svgX = (centerX - translateX) / scale;
      const svgY = (centerY - translateY) / scale;
      
      setTranslateX(centerX - svgX * newScale);
      setTranslateY(centerY - svgY * newScale);
      setScale(newScale);
    }
  }, [scale, translateX, translateY]);

  const handleZoomOut = useCallback(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const newScale = Math.max(MIN_SCALE, scale / 1.2);
      const svgX = (centerX - translateX) / scale;
      const svgY = (centerY - translateY) / scale;
      
      setTranslateX(centerX - svgX * newScale);
      setTranslateY(centerY - svgY * newScale);
      setScale(newScale);
    }
  }, [scale, translateX, translateY]);

  // Add event listener to prevent page zoom - capture phase to catch early
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheelPassive = (e: WheelEvent) => {
      // Always prevent default for wheel events in our container
      // This prevents page zoom when scrolling over the map
      const target = e.target as Node;
      if (container.contains(target) || container === target) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      }
    };

    // Use capture phase to catch the event before it bubbles to document/window
    // This is crucial to prevent page zoom
    container.addEventListener('wheel', handleWheelPassive, { passive: false, capture: true });
    
    return () => {
      container.removeEventListener('wheel', handleWheelPassive, { capture: true } as EventListenerOptions);
    };
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      {title && (
        <div className="flex items-center justify-between mb-[16px]">
          <h4 className="text-[12px] font-semibold text-[#D5FFD6]">{title}</h4>
          <div className="flex items-center gap-2">
            {/* Clarity Control */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-[#8F8F8F]">Clarity</span>
              <input
                type="range"
                min="0"
                max="100"
                value={clarity}
                onChange={(e) => setClarity(Number(e.target.value))}
                className="w-[80px] h-[4px] bg-[#1A1A1A] rounded-full appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #00FF66 0%, #00FF66 ${clarity}%, #1A1A1A ${clarity}%, #1A1A1A 100%)`
                }}
              />
              <span className="text-[10px] text-[#8F8F8F] w-[30px]">{clarity}%</span>
            </div>
          </div>
        </div>
      )}
      
      <div
        ref={containerRef}
        className="relative w-full bg-[#1E2125] rounded-[8px] border border-[#1A1A1A] overflow-hidden"
        style={{ 
          height: `${height}px`,
          touchAction: 'none', // Prevent browser zoom gestures
          userSelect: 'none', // Prevent text selection
        }}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        onContextMenu={(e) => e.preventDefault()} // Prevent right-click menu
        onDragStart={(e) => e.preventDefault()} // Prevent drag
      >
        <div
          ref={mapWrapperRef}
          style={{
            width: `${svgWidth}px`,
            height: `${svgHeight}px`,
            transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
            transformOrigin: '0 0',
            cursor: isDragging ? 'grabbing' : 'grab',
            position: 'relative',
          }}
        >
          {/* Grid overlay - rendered first so it appears behind the map */}
          {scale > 1 && (
            <svg
              width={svgWidth}
              height={svgHeight}
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="absolute inset-0 pointer-events-none"
              style={{ zIndex: 1 }}
            >
              <defs>
                {/* Grid pattern for zoomed views */}
                <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#4A4A4A" strokeWidth="0.8"/>
                </pattern>
                {/* Pixel grid pattern for full zoom */}
                <pattern id="pixelGrid" width="1" height="1" patternUnits="userSpaceOnUse">
                  <rect width="1" height="1" fill="none" stroke="#333333" strokeWidth="0.1"/>
                </pattern>
              </defs>
              <g id="grid-overlay" opacity={Math.min(0.7, 0.3 + (scale - 1) * 0.2)}>
                {scale >= MAX_SCALE * 0.8 ? (
                  // Pixel grid for full zoom - use pattern for performance
                  <>
                    <rect
                      width={svgWidth}
                      height={svgHeight}
                      fill="url(#pixelGrid)"
                    />
                    {/* Denser grid pattern for very high zoom */}
                    {scale >= MAX_SCALE * 0.9 && (
                      <>
                        {/* Vertical pixel lines - only every 10 pixels for performance */}
                        {Array.from({ length: Math.floor(svgWidth / 10) + 1 }).map((_, i) => (
                          <line
                            key={`pv-${i}`}
                            x1={i * 10}
                            y1={0}
                            x2={i * 10}
                            y2={svgHeight}
                            stroke="#333333"
                            strokeWidth="0.1"
                            opacity="0.4"
                          />
                        ))}
                        {/* Horizontal pixel lines - only every 10 pixels for performance */}
                        {Array.from({ length: Math.floor(svgHeight / 10) + 1 }).map((_, i) => (
                          <line
                            key={`ph-${i}`}
                            x1={0}
                            y1={i * 10}
                            x2={svgWidth}
                            y2={i * 10}
                            stroke="#333333"
                            strokeWidth="0.1"
                            opacity="0.4"
                          />
                        ))}
                      </>
                    )}
                  </>
                ) : (
                  // Regular grid for medium zoom
                  <>
                    <rect
                      width={svgWidth}
                      height={svgHeight}
                      fill="url(#grid)"
                    />
                    {/* Additional grid lines for better visibility at higher zoom */}
                    {scale > 1.3 && (
                      <>
                        {/* Vertical lines */}
                        {Array.from({ length: Math.floor(svgWidth / 50) + 1 }).map((_, i) => (
                          <line
                            key={`v-${i}`}
                            x1={i * 50}
                            y1={0}
                            x2={i * 50}
                            y2={svgHeight}
                            stroke="#4A4A4A"
                            strokeWidth="0.8"
                          />
                        ))}
                        {/* Horizontal lines */}
                        {Array.from({ length: Math.floor(svgHeight / 50) + 1 }).map((_, i) => (
                          <line
                            key={`h-${i}`}
                            x1={0}
                            y1={i * 50}
                            x2={svgWidth}
                            y2={i * 50}
                            stroke="#4A4A4A"
                            strokeWidth="0.8"
                          />
                        ))}
                      </>
                    )}
                  </>
                )}
              </g>
            </svg>
          )}

          {/* Full SVG Map - embedded content */}
          {svgContent ? (
            <div
              style={{
                width: `${svgWidth}px`,
                height: `${svgHeight}px`,
                opacity: clarity / 100,
                position: 'absolute',
                top: 0,
                left: 0,
                pointerEvents: 'none',
              }}
              dangerouslySetInnerHTML={{ __html: `<svg width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}" xmlns="http://www.w3.org/2000/svg" style="display: block;">${svgContent}</svg>` }}
            />
          ) : (
            // Fallback: use object tag while loading (better SVG support)
            <object
              data={BUBBLE_MAP_SVG}
              type="image/svg+xml"
              width={svgWidth}
              height={svgHeight}
              style={{
                opacity: clarity / 100,
                display: 'block',
                position: 'absolute',
                top: 0,
                left: 0,
                pointerEvents: 'none',
              }}
              onError={(e) => {
                // Try fallback path
                const target = e.target as HTMLObjectElement;
                if (target.data !== '/assets/Bubble Map.svg') {
                  target.data = '/assets/Bubble Map.svg';
                }
              }}
            >
              <img
                src={BUBBLE_MAP_SVG}
                alt="Bubble Map"
                width={svgWidth}
                height={svgHeight}
                style={{
                  opacity: clarity / 100,
                  display: 'block',
                }}
              />
            </object>
          )}
        </div>

        {/* Zoom Controls */}
        <div className="absolute top-[12px] right-[12px] flex flex-col gap-[8px] z-10">
          <button
            onClick={handleZoomIn}
            className="w-[32px] h-[32px] bg-[#0F0F0F] border border-[#1A1A1A] rounded-[6px] flex items-center justify-center hover:bg-[#1A1A1A] transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-[16px] h-[16px] text-[#00FF66]" />
          </button>
          <button
            onClick={handleZoomOut}
            className="w-[32px] h-[32px] bg-[#0F0F0F] border border-[#1A1A1A] rounded-[6px] flex items-center justify-center hover:bg-[#1A1A1A] transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-[16px] h-[16px] text-[#00FF66]" />
          </button>
          <button
            onClick={handleReset}
            className="w-[32px] h-[32px] bg-[#0F0F0F] border border-[#1A1A1A] rounded-[6px] flex items-center justify-center hover:bg-[#1A1A1A] transition-colors"
            title="Reset View"
          >
            <RotateCcw className="w-[16px] h-[16px] text-[#00FF66]" />
          </button>
        </div>

        {/* Zoom Level Indicator */}
        <div className="absolute bottom-[12px] right-[12px] bg-[#0F0F0F] border border-[#1A1A1A] rounded-[6px] px-[12px] py-[6px] z-10">
          <span className="text-[10px] text-[#8F8F8F]">
            {Math.round(scale * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
}
