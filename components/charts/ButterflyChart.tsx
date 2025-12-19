interface ButterflyChartProps {
  data: { category: string; left: number; right: number }[];
  title?: string;
  leftLabel?: string;
  rightLabel?: string;
}

export function ButterflyChart({ data, title, leftLabel = 'Left', rightLabel = 'Right' }: ButterflyChartProps) {
  const maxValue = Math.max(...data.map(d => Math.max(d.left, d.right)));

  return (
    <div className="w-full h-full flex flex-col">
      {title && (
        <h4 className="text-[14px] font-medium text-white mb-[16px] text-center">{title}</h4>
      )}
      
      {/* Labels */}
      <div className="flex justify-between mb-[12px] px-[8px]">
        <span className="text-[11px] text-[#8F8F8F]">{leftLabel}</span>
        <span className="text-[11px] text-[#8F8F8F]">{rightLabel}</span>
      </div>

      <div className="space-y-[8px]">
        {data.map((item, index) => {
          const leftWidth = (item.left / maxValue) * 100;
          const rightWidth = (item.right / maxValue) * 100;

          return (
            <div key={index} className="relative">
              {/* Category label in center */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <span className="text-[11px] font-medium text-white bg-[#0D0D0D] px-[8px] py-[2px] rounded-[4px] whitespace-nowrap">
                  {item.category}
                </span>
              </div>

              <div className="flex items-center gap-[8px]">
                {/* Left bar */}
                <div className="flex-1 flex justify-end">
                  <div
                    className="h-[32px] bg-gradient-to-l from-[#00FF66] to-[#00CC52] rounded-l-[6px] transition-all duration-300 flex items-center justify-start px-[8px]"
                    style={{ width: `${leftWidth}%` }}
                  >
                    <span className="text-[11px] font-medium text-[#050505]">{item.left}</span>
                  </div>
                </div>

                {/* Right bar */}
                <div className="flex-1 flex justify-start">
                  <div
                    className="h-[32px] bg-gradient-to-r from-[#00FF66] to-[#00CC52] rounded-r-[6px] transition-all duration-300 flex items-center justify-end px-[8px]"
                    style={{ width: `${rightWidth}%` }}
                  >
                    <span className="text-[11px] font-medium text-[#050505]">{item.right}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
