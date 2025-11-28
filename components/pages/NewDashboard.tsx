import { TrendingUp, Activity, Users, Zap, Globe, BarChart3, PieChart as PieChartIcon, Apple, Monitor, UserCheck, BookOpen } from 'lucide-react';
import { EnhancedPieChart } from '../charts/EnhancedPieChart';
import { RadialBarChartComponent } from '../charts/RadialBarChartComponent';
import { StackedAreaChart } from '../charts/StackedAreaChart';
import { WaffleChart } from '../charts/WaffleChart';
import { BubbleMap } from '../charts/BubbleMap';
import { HorizontalBarChart } from '../charts/HorizontalBarChart';
import { ButterflyChart } from '../charts/ButterflyChart';
import { EnhancedDonutChart } from '../charts/EnhancedDonutChart';
import { BarChart } from '../charts/BarChart';
import { IconStatCard } from '../IconStatCard';
import { AppleIcon, MonitorIcon, PeopleIcon, TrainingIcon } from '../icons/CustomIcons';

export function NewDashboard() {
  // Chart data
  const pieData = [
    { name: 'Active Users', value: 40, color: '#00FF66' },
    { name: 'Inactive', value: 25, color: '#00CC52' },
    { name: 'Pending', value: 20, color: '#66FF99' },
    { name: 'Blocked', value: 15, color: '#33DD77' },
  ];

  const radialData = [
    { name: 'Active', value: 85, fill: '#00FF66' },
    { name: 'Processing', value: 65, fill: '#00CC52' },
    { name: 'Pending', value: 45, fill: '#66FF99' },
    { name: 'Error', value: 25, fill: '#33DD77' },
  ];

  const stackedAreaData = [
    { name: 'Jan', series1: 2000, series2: 1800, series3: 1500 },
    { name: 'Feb', series1: 2400, series2: 2200, series3: 1800 },
    { name: 'Mar', series1: 2800, series2: 2400, series3: 2100 },
    { name: 'Apr', series1: 3200, series2: 2800, series3: 2400 },
    { name: 'May', series1: 3600, series2: 3200, series3: 2800 },
    { name: 'Jun', series1: 4000, series2: 3600, series3: 3200 },
  ];

  const stackedAreaKeys = [
    { key: 'series1', color: '#00FF66', name: 'Primary' },
    { key: 'series2', color: '#00CC52', name: 'Secondary' },
    { key: 'series3', color: '#66FF99', name: 'Tertiary' },
  ];

  const horizontalBarData = [
    { name: 'Module A', value: 850 },
    { name: 'Module B', value: 720 },
    { name: 'Module C', value: 650 },
    { name: 'Module D', value: 580 },
    { name: 'Module E', value: 450 },
  ];

  const butterflyData = [
    { category: 'Q1', left: 450, right: 520 },
    { category: 'Q2', left: 380, right: 420 },
    { category: 'Q3', left: 520, right: 480 },
    { category: 'Q4', left: 410, right: 590 },
  ];

  const donutData = [
    { name: 'Complete', value: 55, color: '#00FF66' },
    { name: 'In Progress', value: 25, color: '#00CC52' },
    { name: 'Pending', value: 20, color: '#66FF99' },
  ];

  const barChartData = [
    { name: 'Mon', value: 850 },
    { name: 'Tue', value: 920 },
    { name: 'Wed', value: 780 },
    { name: 'Thu', value: 1100 },
    { name: 'Fri', value: 980 },
    { name: 'Sat', value: 650 },
    { name: 'Sun', value: 720 },
  ];

  return (
    <div className="p-[24px] bg-[#050505] min-h-screen">
      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[16px] mb-[24px]">
        <div className="bg-gradient-to-br from-[#0F0F0F] to-[#0A0A0A] border border-[#1A1A1A] rounded-[16px] p-[20px] hover:border-[#00FF66] transition-all">
          <div className="flex items-center justify-between mb-[12px]">
            <div className="p-[10px] rounded-[10px] bg-[rgba(0,255,102,0.1)] border border-[#00FF66]">
              <Users size={20} className="text-[#00FF66]" />
            </div>
            <span className="text-[12px] text-[#00FF66] font-medium">+12%</span>
          </div>
          <p className="text-[28px] font-bold text-[#D5FFD6] mb-[4px]">2,543</p>
          <p className="text-[12px] text-[#8F8F8F]">Total Users</p>
        </div>

        <div className="bg-gradient-to-br from-[#0F0F0F] to-[#0A0A0A] border border-[#1A1A1A] rounded-[16px] p-[20px] hover:border-[#00FF66] transition-all">
          <div className="flex items-center justify-between mb-[12px]">
            <div className="p-[10px] rounded-[10px] bg-[rgba(0,255,102,0.1)] border border-[#00FF66]">
              <Activity size={20} className="text-[#00FF66]" />
            </div>
            <span className="text-[12px] text-[#00FF66] font-medium">+8%</span>
          </div>
          <p className="text-[28px] font-bold text-[#D5FFD6] mb-[4px]">1,842</p>
          <p className="text-[12px] text-[#8F8F8F]">Active Sessions</p>
        </div>

        <div className="bg-gradient-to-br from-[#0F0F0F] to-[#0A0A0A] border border-[#1A1A1A] rounded-[16px] p-[20px] hover:border-[#00FF66] transition-all">
          <div className="flex items-center justify-between mb-[12px]">
            <div className="p-[10px] rounded-[10px] bg-[rgba(0,255,102,0.1)] border border-[#00FF66]">
              <Zap size={20} className="text-[#00FF66]" />
            </div>
            <span className="text-[12px] text-[#00FF66] font-medium">+24%</span>
          </div>
          <p className="text-[28px] font-bold text-[#D5FFD6] mb-[4px]">98.5%</p>
          <p className="text-[12px] text-[#8F8F8F]">System Uptime</p>
        </div>

        <div className="bg-gradient-to-br from-[#0F0F0F] to-[#0A0A0A] border border-[#1A1A1A] rounded-[16px] p-[20px] hover:border-[#00FF66] transition-all">
          <div className="flex items-center justify-between mb-[12px]">
            <div className="p-[10px] rounded-[10px] bg-[rgba(0,255,102,0.1)] border border-[#00FF66]">
              <TrendingUp size={20} className="text-[#00FF66]" />
            </div>
            <span className="text-[12px] text-[#00FF66] font-medium">+16%</span>
          </div>
          <p className="text-[28px] font-bold text-[#D5FFD6] mb-[4px]">$45.2K</p>
          <p className="text-[12px] text-[#8F8F8F]">Revenue</p>
        </div>
      </div>

      {/* Charts Grid - Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px] mb-[16px]">
        {/* Pie Chart */}
        <div className="bg-gradient-to-br from-[#0F0F0F] to-[#0A0A0A] border border-[#1A1A1A] rounded-[16px] p-[20px] h-[350px]">
          <EnhancedPieChart data={pieData} title="Pie Chart" />
        </div>

        {/* Radial Bar Chart */}
        <div className="bg-gradient-to-br from-[#0F0F0F] to-[#0A0A0A] border border-[#1A1A1A] rounded-[16px] p-[20px] h-[350px]">
          <RadialBarChartComponent data={radialData} title="Radial Bar Chart" />
        </div>

        {/* Area Chart */}
        <div className="bg-gradient-to-br from-[#0F0F0F] to-[#0A0A0A] border border-[#1A1A1A] rounded-[16px] p-[20px] h-[350px]">
          <BarChart data={barChartData} title="Area Chart" color="#00FF66" />
        </div>
      </div>

      {/* Charts Grid - Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px] mb-[16px]">
        {/* Stacked Area Chart */}
        <div className="bg-gradient-to-br from-[#0F0F0F] to-[#0A0A0A] border border-[#1A1A1A] rounded-[16px] p-[20px] h-[350px]">
          <StackedAreaChart data={stackedAreaData} title="Stacked Area Chart" dataKeys={stackedAreaKeys} />
        </div>

        {/* Bubble Chart Placeholder */}
        <div className="bg-gradient-to-br from-[#0F0F0F] to-[#0A0A0A] border border-[#1A1A1A] rounded-[16px] p-[20px] h-[350px] flex items-center justify-center">
          <div className="text-center">
            <div className="relative w-[200px] h-[200px] mx-auto mb-[16px]">
              {[60, 100, 140].map((size, i) => (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#00FF66] animate-ping"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    animationDelay: `${i * 0.2}s`,
                    opacity: 0.6 - i * 0.2,
                  }}
                />
              ))}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80px] h-[80px] rounded-full bg-gradient-to-br from-[#00FF66] to-[#00CC52] flex items-center justify-center">
                <Globe size={32} className="text-[#050505]" />
              </div>
            </div>
            <h4 className="text-[14px] font-medium text-[#D5FFD6]">Bubble Chart</h4>
          </div>
        </div>

        {/* Waffle Chart */}
        <div className="bg-gradient-to-br from-[#0F0F0F] to-[#0A0A0A] border border-[#1A1A1A] rounded-[16px] p-[20px] h-[350px]">
          <WaffleChart percentage={66.5} title="Waffle Chart" />
        </div>
      </div>

      {/* Charts Grid - Row 3 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px] mb-[16px]">
        {/* Bubble Map */}
        <div className="bg-gradient-to-br from-[#0F0F0F] to-[#0A0A0A] border border-[#1A1A1A] rounded-[16px] p-[20px]">
          <BubbleMap title="Device Location (Global Distribution)" height={350} />
        </div>

        {/* Horizontal Bar Chart */}
        <div className="bg-gradient-to-br from-[#0F0F0F] to-[#0A0A0A] border border-[#1A1A1A] rounded-[16px] p-[20px] h-[350px]">
          <HorizontalBarChart data={horizontalBarData} title="Horizontal Bar Chart" />
        </div>

        {/* Pareto Chart (Bar with line) */}
        <div className="bg-gradient-to-br from-[#0F0F0F] to-[#0A0A0A] border border-[#1A1A1A] rounded-[16px] p-[20px] h-[350px]">
          <BarChart data={barChartData} title="Pareto Chart" color="#00FF66" />
        </div>
      </div>

      {/* Charts Grid - Row 4 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px]">
        {/* Bar Chart variations */}
        <div className="bg-gradient-to-br from-[#0F0F0F] to-[#0A0A0A] border border-[#1A1A1A] rounded-[16px] p-[20px] h-[350px]">
          <BarChart data={barChartData} title="Bar Chart" color="#00FF66" />
        </div>

        {/* Butterfly Chart */}
        <div className="bg-gradient-to-br from-[#0F0F0F] to-[#0A0A0A] border border-[#1A1A1A] rounded-[16px] p-[20px] h-[350px]">
          <ButterflyChart data={butterflyData} title="Butterfly Chart" leftLabel="2023" rightLabel="2024" />
        </div>

        {/* Donut Chart */}
        <div className="bg-gradient-to-br from-[#0F0F0F] to-[#0A0A0A] border border-[#1A1A1A] rounded-[16px] p-[20px] h-[350px]">
          <EnhancedDonutChart data={donutData} title="Donut Chart" />
        </div>
      </div>
    </div>
  );
}