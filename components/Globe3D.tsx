import { useEffect, useRef } from 'react';

export function Globe3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let rotation = 0;

    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.35;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Draw outer glow
      const gradient = ctx.createRadialGradient(centerX, centerY, radius * 0.8, centerX, centerY, radius * 1.4);
      gradient.addColorStop(0, 'rgba(0, 255, 102, 0.2)');
      gradient.addColorStop(0.5, 'rgba(0, 255, 102, 0.05)');
      gradient.addColorStop(1, 'rgba(0, 255, 102, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw main sphere with gradient
      const sphereGradient = ctx.createRadialGradient(
        centerX - radius * 0.3,
        centerY - radius * 0.3,
        radius * 0.1,
        centerX,
        centerY,
        radius
      );
      sphereGradient.addColorStop(0, 'rgba(0, 255, 102, 0.4)');
      sphereGradient.addColorStop(0.6, 'rgba(0, 204, 82, 0.2)');
      sphereGradient.addColorStop(1, 'rgba(0, 153, 61, 0.1)');
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fillStyle = sphereGradient;
      ctx.fill();

      // Draw latitude lines
      ctx.strokeStyle = 'rgba(0, 255, 102, 0.3)';
      ctx.lineWidth = 1;
      
      for (let i = -3; i <= 3; i++) {
        const y = centerY + (i * radius / 3);
        const width = Math.sqrt(radius * radius - Math.pow(i * radius / 3, 2)) * 2;
        
        ctx.beginPath();
        ctx.ellipse(centerX, y, width / 2, width / 10, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw longitude lines (rotating)
      for (let i = 0; i < 12; i++) {
        const angle = (i * Math.PI / 6) + rotation;
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(angle);
        
        ctx.beginPath();
        ctx.ellipse(0, 0, radius * 0.3, radius, 0, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.restore();
      }

      // Draw connection dots (simulating network nodes)
      const dots = 30;
      for (let i = 0; i < dots; i++) {
        const angle = (i / dots) * Math.PI * 2 + rotation * 0.5;
        const z = Math.sin(rotation + i) * radius;
        const scale = (z + radius) / (2 * radius);
        
        if (scale > 0.5) {
          const x = centerX + Math.cos(angle) * radius * 0.8 * scale;
          const y = centerY + Math.sin(angle) * radius * 0.6 * scale;
          
          const size = 2 + scale * 3;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 255, 102, ${scale})`;
          ctx.fill();
          
          // Draw connecting lines between nearby dots
          for (let j = i + 1; j < Math.min(i + 3, dots); j++) {
            const angle2 = (j / dots) * Math.PI * 2 + rotation * 0.5;
            const z2 = Math.sin(rotation + j) * radius;
            const scale2 = (z2 + radius) / (2 * radius);
            
            if (scale2 > 0.5) {
              const x2 = centerX + Math.cos(angle2) * radius * 0.8 * scale2;
              const y2 = centerY + Math.sin(angle2) * radius * 0.6 * scale2;
              
              ctx.beginPath();
              ctx.moveTo(x, y);
              ctx.lineTo(x2, y2);
              ctx.strokeStyle = `rgba(0, 255, 102, ${Math.min(scale, scale2) * 0.2})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        }
      }

      // Draw bright rim highlight
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 255, 102, 0.4)';
      ctx.lineWidth = 2;
      ctx.stroke();

      rotation += 0.005;
      animationId = requestAnimationFrame(draw);
    };

    // Set canvas size
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ minHeight: '400px' }}
      />
      
      {/* Stats overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <p className="text-[48px] font-bold text-[#00FF66] mb-[8px]">12.4K</p>
          <p className="text-[14px] text-[#8F8F8F]">Active Connections</p>
        </div>
      </div>
    </div>
  );
}
