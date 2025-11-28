interface WaffleChartProps {
  percentage: number;
  title?: string;
}

export function WaffleChart({ percentage, title }: WaffleChartProps) {
  const totalSquares = 100;
  const filledSquares = Math.round(percentage);

  return (
    <div className="w-full h-full flex flex-col">
      {title && (
        <h4 className="text-[14px] font-medium text-white mb-[16px] flex-shrink-0">{title}</h4>
      )}
      <div className="flex-1 flex items-center justify-center min-h-0">
        <div className="grid grid-cols-10 gap-[4px] w-full max-w-[280px] aspect-square">
          {Array.from({ length: totalSquares }).map((_, index) => (
            <div
              key={index}
              className={`rounded-[2px] transition-all ${
                index < filledSquares
                  ? 'bg-[#00FF66] border border-[#00FF66]'
                  : 'bg-[#1A1A1A] border border-[#2A2A2A]'
              }`}
              style={{ aspectRatio: '1' }}
            />
          ))}
        </div>
      </div>
      <div className="mt-[16px] text-center flex-shrink-0">
        <p className="text-[32px] font-bold text-[#00FF66]">{percentage.toFixed(1)}%</p>
        <p className="text-[12px] text-[#8F8F8F]">Completion Rate</p>
      </div>
    </div>
  );
}