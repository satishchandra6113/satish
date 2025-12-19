import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface HorizontalBarChartProps {
  data: any[];
  title?: string;
  dataKey?: string;
  categoryKey?: string;
}

export function HorizontalBarChart({ 
  data, 
  title, 
  dataKey = 'value', 
  categoryKey = 'name' 
}: HorizontalBarChartProps) {
  return (
    <div className="w-full h-full flex flex-col">
      {title && (
        <h4 className="text-[14px] font-medium text-white mb-[16px] flex-shrink-0">{title}</h4>
      )}
      <div className="flex-1 w-full min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%" minHeight={200}>
          <BarChart
            data={data}
            layout="horizontal"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <defs>
              <linearGradient id="horizontalGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="5%" stopColor="#00FF66" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#00CC52" stopOpacity={0.7} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1A1A1A" horizontal={false} />
            <XAxis
              type="number"
              stroke="#8F8F8F"
              tick={{ fill: '#8F8F8F', fontSize: 11 }}
            />
            <YAxis
              type="category"
              dataKey={categoryKey}
              stroke="#8F8F8F"
              tick={{ fill: '#8F8F8F', fontSize: 11 }}
              width={100}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0D0D0D',
                border: '1px solid #1A1A1A',
                borderRadius: '8px',
                fontSize: '12px',
              }}
              cursor={{ fill: 'rgba(0, 255, 102, 0.1)' }}
            />
            <Bar
              dataKey={dataKey}
              fill="url(#horizontalGradient)"
              radius={[0, 8, 8, 0]}
              maxBarSize={30}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}