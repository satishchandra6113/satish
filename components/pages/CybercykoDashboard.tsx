import { Users, Monitor, Activity, Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import { EnhancedPieChart } from '../charts/EnhancedPieChart';
import { RadialBarChartComponent } from '../charts/RadialBarChartComponent';


import { WaffleChart } from '../charts/WaffleChart';
import { EnhancedHorizontalBarChart } from '../charts/EnhancedHorizontalBarChart';
import { EnhancedSSOAppsChart } from '../charts/EnhancedSSOAppsChart';

import { EnhancedActiveUsersChart } from '../charts/EnhancedActiveUsersChart';
import { EnhancedDeviceHealthChart } from '../charts/EnhancedDeviceHealthChart';
import { EnhancedDeviceComplianceChart } from '../charts/EnhancedDeviceComplianceChart';
import { LeafletMap } from '../charts/LeafletMap';

interface CybercykoDashboardProps {
  onNavigate?: (page: string) => void;
}

export function CybercykoDashboard({ onNavigate }: CybercykoDashboardProps) {
  // Total Users Data
  const totalUsersData = {
    total: 2543,
    active: 1842,
    inactive: 701,
    growth: '+12%'
  };

  // Total devices by platform
  const devicePlatformData = [
    { name: 'Windows', value: 4500, color: '#FF4444' }, // Red
    { name: 'macOS', value: 2500, color: '#114A28' },   // Dark Green
    { name: 'iOS', value: 1200, color: '#36C9FF' },     // Light Blue
    { name: 'Android', value: 800, color: '#FFCC00' },  // Yellow
    { name: 'Linux', value: 460, color: '#00FF66' },    // Light Green
  ];

  // Active vs Inactive Users
  const activeInactiveUsersData = [
    { name: 'Active', value: totalUsersData.active, color: 'var(--chart-online)' },
    { name: 'Inactive', value: totalUsersData.inactive, color: 'var(--chart-offline)' },
  ];

  // Active Devices and Last Contact Time
  const activeDevicesData = [
    { name: 'Online Now', value: 85, fill: '#00FF66' },
    { name: '< 1 hour', value: 70, fill: '#36C9FF' },
    { name: '< 24 hours', value: 50, fill: '#E6FF47' },
    { name: '> 24 hours', value: 25, fill: '#FF4444' },
  ];



  // Active Users
  const activeUsersData = [
    { name: 'Mon', value: 1650 },
    { name: 'Tue', value: 1720 },
    { name: 'Wed', value: 1680 },
    { name: 'Thu', value: 1840 },
    { name: 'Fri', value: 1790 },
    { name: 'Sat', value: 980 },
    { name: 'Sun', value: 1120 },
  ];

  // Total Policies and Active Policies
  const policiesData = {
    total: 245,
    active: 187,
    inactive: 58,
    percentage: 76.3
  };



  // Top N Sites (based on traffic)
  const topSitesData = [
    { name: 'github.com', value: 14200 },
    { name: 'microsoft.com', value: 11800 },
    { name: 'amazon.com', value: 9500 },
    { name: 'slack.com', value: 8200 },
    { name: 'docker.com', value: 6400 },
    { name: 'stackoverflow.com', value: 5800 },
  ];

  // All SSO Apps (based on traffic)
  const ssoAppsData = [
    { name: 'Okta', value: 8500 },
    { name: 'Salesforce', value: 7200 },
    { name: 'Jira', value: 6800 },
    { name: 'GitHub', value: 5900 },
    { name: 'Datadog', value: 4500 },
    { name: 'Confluence', value: 3800 },
  ];

  // Device Health
  const deviceHealthData = [
    { name: 'Healthy', value: 72, color: '#00FF66' },
    { name: 'Warning', value: 18, color: '#FFCC00' },
    { name: 'Critical', value: 10, color: '#FF4444' },
  ];

  // Malicious Activity and Threat Detection
  const threatDetectionData = {
    totalThreats: 47,
    blocked: 42,
    inProgress: 5,
    resolved: 38,
    percentage: 89.4
  };

  // Device Compliance
  const deviceComplianceData = [
    { name: 'Compliant', value: 85, color: '#00FF66' },
    { name: 'Non-Compliant', value: 12, color: '#FF4444' },
    { name: 'Pending Review', value: 3, color: '#FFCC00' },
  ];

  return (
    <div className="p-[24px] bg-[#050505] min-h-screen">
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[16px] mb-[24px]">
        {/* Total Users */}
        <div
          onClick={() => onNavigate?.('users')}
          className="bg-gradient-to-br from-[#0F0F0F] to-[#0A0A0A] border border-[#1A1A1A] rounded-[16px] p-[20px] hover:border-[#00FF66] transition-all duration-300 hover:shadow-lg hover:shadow-[#00FF66]/10 cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-[12px]">
            <div className="p-[10px] rounded-[10px] bg-[rgba(0,255,102,0.1)] border border-[#00FF66] group-hover:scale-110 transition-transform">
              <Users size={20} className="text-[#00FF66]" />
            </div>
            <span className="text-[12px] text-[#00FF66] font-medium">{totalUsersData.growth}</span>
          </div>
          <p className="text-[28px] font-bold text-[#D5FFD6] mb-[4px]">{totalUsersData.total.toLocaleString()}</p>
          <p className="text-[12px] text-[#8F8F8F] mb-[8px]">Total Users</p>
          <div className="flex items-center gap-[12px] text-[11px]">
            <span className="text-[#00FF66]">Active: {totalUsersData.active}</span>
            <span className="text-[#8F8F8F]">Inactive: {totalUsersData.inactive}</span>
          </div>
        </div>

        {/* Total Devices */}
        <div
          onClick={() => onNavigate?.('devices')}
          className="bg-gradient-to-br from-[#0F0F0F] to-[#0A0A0A] border border-[#1A1A1A] rounded-[16px] p-[20px] hover:border-[#00FF66] transition-all duration-300 hover:shadow-lg hover:shadow-[#00FF66]/10 cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-[12px]">
            <div className="p-[10px] rounded-[10px] bg-[rgba(0,255,102,0.1)] border border-[#00FF66] group-hover:scale-110 transition-transform">
              <Monitor size={20} className="text-[#00FF66]" />
            </div>
            <span className="text-[12px] text-[#00FF66] font-medium">+8%</span>
          </div>
          <p className="text-[28px] font-bold text-[#D5FFD6] mb-[4px]">
            {devicePlatformData.reduce((sum, d) => sum + d.value, 0).toLocaleString()}
          </p>
          <p className="text-[12px] text-[#8F8F8F]">Total Devices</p>
        </div>

        {/* Total Policies */}
        <div
          onClick={() => onNavigate?.('policies')}
          className="bg-gradient-to-br from-[#0F0F0F] to-[#0A0A0A] border border-[#1A1A1A] rounded-[16px] p-[20px] hover:border-[#00FF66] transition-all duration-300 hover:shadow-lg hover:shadow-[#00FF66]/10 cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-[12px]">
            <div className="p-[10px] rounded-[10px] bg-[rgba(0,255,102,0.1)] border border-[#00FF66] group-hover:scale-110 transition-transform">
              <Shield size={20} className="text-[#00FF66]" />
            </div>
            <span className="text-[12px] text-[#00FF66] font-medium">{policiesData.percentage}%</span>
          </div>
          <p className="text-[28px] font-bold text-[#D5FFD6] mb-[4px]">{policiesData.total}</p>
          <p className="text-[12px] text-[#8F8F8F] mb-[8px]">Total Policies</p>
          <div className="flex items-center gap-[12px] text-[11px]">
            <span className="text-[#00FF66]">Active: {policiesData.active}</span>
            <span className="text-[#8F8F8F]">Inactive: {policiesData.inactive}</span>
          </div>
        </div>

        {/* Threat Detection */}
        <div
          onClick={() => onNavigate?.('threats')}
          className="bg-gradient-to-br from-[#0F0F0F] to-[#0A0A0A] border border-[#1A1A1A] rounded-[16px] p-[20px] hover:border-[#FF4444] transition-all duration-300 hover:shadow-lg hover:shadow-[#FF4444]/10 cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-[12px]">
            <div className="p-[10px] rounded-[10px] bg-[rgba(255,68,68,0.1)] border border-[#FF4444] group-hover:scale-110 transition-transform">
              <AlertTriangle size={20} className="text-[#FF4444]" />
            </div>
            <span className="text-[12px] text-[#00FF66] font-medium">{threatDetectionData.percentage}%</span>
          </div>
          <p className="text-[28px] font-bold text-[#D5FFD6] mb-[4px]">{threatDetectionData.totalThreats}</p>
          <p className="text-[12px] text-[#8F8F8F] mb-[8px]">Threats Detected</p>
          <div className="flex items-center gap-[12px] text-[11px]">
            <span className="text-[#00FF66]">Blocked: {threatDetectionData.blocked}</span>
            <span className="text-[#FFCC00]">Active: {threatDetectionData.inProgress}</span>
          </div>
        </div>
      </div>

      {/* Row 2: Device Platform, Active Devices, Network Traffic */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px] mb-[16px]">
        {/* Total Devices by Platform */}
        <div className="bg-gradient-to-br from-[#0F0F0F] to-[#0A0A0A] border border-[#1A1A1A] rounded-[16px] p-[12px] aspect-[3/4] flex flex-col hover:border-[#00FF66] transition-all duration-300 hover:shadow-lg hover:shadow-[#00FF66]/10">
          <EnhancedPieChart data={devicePlatformData} title="Total Devices by Platform" />
        </div>

        {/* Active vs Inactive Users */}
        <div className="bg-gradient-to-br from-[#0F0F0F] to-[#0A0A0A] border border-[#1A1A1A] rounded-[16px] p-[12px] aspect-[3/4] flex flex-col hover:border-[#00FF66] transition-all duration-300 hover:shadow-lg hover:shadow-[#00FF66]/10">
          <EnhancedPieChart data={activeInactiveUsersData} title="Active vs Inactive Users" />
        </div>

        {/* Active Devices and Last Contact Time */}
        <div className="bg-gradient-to-br from-[#0F0F0F] to-[#0A0A0A] border border-[#1A1A1A] rounded-[16px] p-[20px] aspect-[3/4] flex flex-col hover:border-[#00FF66] transition-all duration-300 hover:shadow-lg hover:shadow-[#00FF66]/10">
          <RadialBarChartComponent data={activeDevicesData} title="Active Devices & Last Contact Time" />
        </div>
      </div>

      {/* Row 3: Active Users, Device Health, Device Compliance */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px] mb-[16px]">
        {/* Active Users */}
        <div className="bg-gradient-to-br from-[#0F0F0F] to-[#0A0A0A] border border-[#1A1A1A] rounded-[16px] p-[20px] aspect-[3/4] flex flex-col hover:border-[#00FF66] transition-all duration-300 hover:shadow-lg hover:shadow-[#00FF66]/10">
          <EnhancedActiveUsersChart data={activeUsersData} title="Active Users (Last 7 Days)" color="#00FF66" />
        </div>

        {/* Device Health */}
        <div className="bg-gradient-to-br from-[#0F0F0F] to-[#0A0A0A] border border-[#1A1A1A] rounded-[16px] p-[20px] aspect-[3/4] flex flex-col hover:border-[#00FF66] transition-all duration-300 hover:shadow-lg hover:shadow-[#00FF66]/10">
          <EnhancedDeviceHealthChart data={deviceHealthData} title="Device Health Status" />
        </div>

        {/* Device Compliance */}
        <div className="bg-gradient-to-br from-[#0F0F0F] to-[#0A0A0A] border border-[#1A1A1A] rounded-[16px] p-[20px] aspect-[3/4] flex flex-col hover:border-[#00FF66] transition-all duration-300 hover:shadow-lg hover:shadow-[#00FF66]/10">
          <EnhancedDeviceComplianceChart data={deviceComplianceData} title="Device Compliance" />
        </div>
      </div>



      {/* Row 4: Top Sites, SSO Apps, Policies */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px] mb-[16px]">
        {/* Top N Sites (based on traffic) */}
        <div className="bg-gradient-to-br from-[#0F0F0F] to-[#0A0A0A] border border-[#1A1A1A] rounded-[16px] p-[20px] aspect-[3/4] flex flex-col hover:border-[#00FF66] transition-all duration-300 hover:shadow-lg hover:shadow-[#00FF66]/10">
          <EnhancedHorizontalBarChart
            data={topSitesData}
            title="Top Sites (based on traffic)"
            subtitle="Last 24 hours"
            showIcons={true}
          />
        </div>

        {/* All SSO Apps (based on traffic) */}
        <div className="bg-gradient-to-br from-[#0F0F0F] to-[#0A0A0A] border border-[#1A1A1A] rounded-[16px] p-[20px] aspect-[3/4] flex flex-col hover:border-[#00FF66] transition-all duration-300 hover:shadow-lg hover:shadow-[#00FF66]/10">
          <EnhancedSSOAppsChart
            data={ssoAppsData}
            title="All SSO Apps (based on traffic)"
            subtitle="Usage volume"
          />
        </div>

        {/* Active Policies Waffle Chart */}
        <div className="bg-gradient-to-br from-[#0F0F0F] to-[#0A0A0A] border border-[#1A1A1A] rounded-[16px] p-[20px] aspect-[3/4] flex flex-col hover:border-[#00FF66] transition-all duration-300 hover:shadow-lg hover:shadow-[#00FF66]/10">
          <WaffleChart percentage={policiesData.percentage} title="Active Policies" />
        </div>
      </div>

      {/* Row 5: Device Location */}
      <div className="grid grid-cols-1 gap-[16px] mb-[16px]">
        {/* Device Location */}
        <div className="bg-gradient-to-br from-[#0F0F0F] to-[#0A0A0A] border border-[#1A1A1A] rounded-[16px] p-[20px] aspect-[5/3] hover:border-[#00FF66] transition-all duration-300 hover:shadow-lg hover:shadow-[#00FF66]/10">
          <h4 className="text-[14px] font-medium text-[#D5FFD6] mb-[16px]">Device Location (Global Distribution)</h4>
          <div className="h-[calc(100%-40px)]">
            <LeafletMap />
          </div>
        </div>
      </div>

      {/* Row 6: Malicious Activity & Threat Detection */}
      <div className="grid grid-cols-1 gap-[16px]">
        {/* Malicious Activity and Threat Detection */}
        <div className="bg-gradient-to-br from-[#0F0F0F] to-[#0A0A0A] border border-[#1A1A1A] rounded-[16px] p-[20px] aspect-[9/5] hover:border-[#00FF66] transition-all duration-300 hover:shadow-lg hover:shadow-[#00FF66]/10">
          <h4 className="text-[14px] font-medium text-[#D5FFD6] mb-[20px]">Malicious Activity & Threat Detection</h4>

          <div className="grid grid-cols-2 gap-[12px] mb-[32px]">
            <div className="p-[16px] bg-[rgba(255,68,68,0.05)] border border-[#FF4444] rounded-[12px]">
              <div className="flex items-center gap-[8px] mb-[8px]">
                <AlertTriangle size={16} className="text-[#FF4444]" />
                <span className="text-[10px] text-[#8F8F8F] uppercase">Total Threats</span>
              </div>
              <p className="text-[24px] font-bold text-[#FF4444]">{threatDetectionData.totalThreats}</p>
            </div>

            <div className="p-[16px] bg-[rgba(0,255,102,0.05)] border border-[#00FF66] rounded-[12px]">
              <div className="flex items-center gap-[8px] mb-[8px]">
                <CheckCircle size={16} className="text-[#00FF66]" />
                <span className="text-[10px] text-[#8F8F8F] uppercase">Blocked</span>
              </div>
              <p className="text-[24px] font-bold text-[#00FF66]">{threatDetectionData.blocked}</p>
            </div>

            <div className="p-[16px] bg-[rgba(255,204,0,0.05)] border border-[#FFCC00] rounded-[12px]">
              <div className="flex items-center gap-[8px] mb-[8px]">
                <Activity size={16} className="text-[#FFCC00]" />
                <span className="text-[10px] text-[#8F8F8F] uppercase">In Progress</span>
              </div>
              <p className="text-[24px] font-bold text-[#FFCC00]">{threatDetectionData.inProgress}</p>
            </div>

            <div className="p-[16px] bg-[rgba(0,255,102,0.05)] border border-[#00FF66] rounded-[12px]">
              <div className="flex items-center gap-[8px] mb-[8px]">
                <Shield size={16} className="text-[#00FF66]" />
                <span className="text-[10px] text-[#8F8F8F] uppercase">Resolved</span>
              </div>
              <p className="text-[24px] font-bold text-[#00FF66]">{threatDetectionData.resolved}</p>
            </div>
          </div>

          {/* Recent Threats List */}
          <div className="space-y-[10px]">
            <p className="text-[12px] font-medium text-[#8F8F8F] uppercase mb-[12px]">Recent Threats</p>
            {[
              { type: 'Malware', device: 'DEVICE-1234', status: 'Blocked', time: '2 min ago' },
              { type: 'Phishing', device: 'DEVICE-5678', status: 'Blocked', time: '15 min ago' },
              { type: 'Suspicious Activity', device: 'DEVICE-9012', status: 'Investigating', time: '1 hour ago' },
            ].map((threat, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-[12px] bg-[rgba(255,255,255,0.02)] border border-[#1A1A1A] rounded-[8px] hover:border-[#FF4444] transition-all"
              >
                <div className="flex items-center gap-[12px]">
                  <div className="w-[8px] h-[8px] rounded-full bg-[#FF4444]" />
                  <div>
                    <p className="text-[12px] font-medium text-[#D5FFD6]">{threat.type}</p>
                    <p className="text-[10px] text-[#8F8F8F]">{threat.device}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-[10px] font-medium ${threat.status === 'Blocked' ? 'text-[#00FF66]' : 'text-[#FFCC00]'
                    }`}>
                    {threat.status}
                  </p>
                  <p className="text-[10px] text-[#8F8F8F]">{threat.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}