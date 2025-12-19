import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface BarChartProps {
  data: any[];
  title?: string;
  dataKey?: string;
  xAxisKey?: string;
  color?: string;
  layout?: 'horizontal' | 'vertical';
}

export function BarChart({ 
  data, 
  title,
  dataKey = 'value', 
  xAxisKey = 'name', 
  color = '#00FF66', 
  layout = 'vertical' 
}: BarChartProps) {
  return (
    <div className="w-full h-full flex flex-col">
      {title && (
        <h4 className="text-[14px] font-medium text-white mb-[16px] flex-shrink-0">{title}</h4>
      )}
      <div className="flex-1 w-full min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%" minHeight={200}>
          <RechartsBarChart 
            data={data} 
            layout={layout}
            margin={{ top: 5, right: 5, left: layout === 'horizontal' ? 80 : -20, bottom: 5 }}
          >
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.9} />
                <stop offset="95%" stopColor={color} stopOpacity={0.6} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1A1A1A" />
            {layout === 'vertical' ? (
              <>
                <XAxis 
                  type="category"
                  dataKey={xAxisKey} 
                  stroke="#8F8F8F" 
                  tick={{ fill: '#8F8F8F', fontSize: 11 }}
                  axisLine={{ stroke: '#1A1A1A' }}
                />
                <YAxis 
                  type="number"
                  stroke="#8F8F8F" 
                  tick={{ fill: '#8F8F8F', fontSize: 11 }}
                  axisLine={{ stroke: '#1A1A1A' }}
                />
              </>
            ) : (
              <>
                <XAxis 
                  type="number"
                  stroke="#8F8F8F" 
                  tick={{ fill: '#8F8F8F', fontSize: 11 }}
                  axisLine={{ stroke: '#1A1A1A' }}
                />
                <YAxis 
                  type="category"
                  dataKey={xAxisKey} 
                  stroke="#8F8F8F" 
                  tick={{ fill: '#8F8F8F', fontSize: 11 }}
                  axisLine={{ stroke: '#1A1A1A' }}
                  width={80}
                />
              </>
            )}
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#0F0F0F', 
                border: '1px solid #1A1A1A',
                borderRadius: '8px',
                color: '#FFFFFF',
                fontSize: '12px'
              }}
              labelStyle={{ color: '#8F8F8F' }}
              cursor={{ fill: 'rgba(0, 255, 102, 0.1)' }}
            />
            <Bar 
              dataKey={dataKey} 
              fill="url(#barGradient)" 
              radius={[4, 4, 4, 4]}
              maxBarSize={40}
            />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}