import { useState } from 'react';
import { Users, Monitor, Activity, Shield, Clock, Globe } from 'lucide-react';
import { KpiCard } from './ui/KpiCard';
import { ChartCard } from './ui/ChartCard';
import { AlertCard } from './ui/AlertCard';
import { Tag } from './ui/Tag';
import { LineChart } from './charts/LineChart';
import { BarChart } from './charts/BarChart';
import { PieChart } from './charts/PieChart';
import { DonutChart } from './charts/DonutChart';
import { RadialGauge } from './charts/RadialGauge';
import { Heatmap } from './Heatmap';
import { Globe3D } from './Globe3D';
import { WelcomeBanner } from './WelcomeBanner';
import { EnhancedHorizontalBarChart } from './charts/EnhancedHorizontalBarChart';
import { EnhancedSSOAppsChart } from './charts/EnhancedSSOAppsChart';

export function ClientMasterDashboard() {
  const [timeRange, setTimeRange] = useState('24h');

  // Mock data
  const networkTrafficData = [
    { name: '00:00', inbound: 4.2, outbound: 2.4 },
    { name: '04:00', inbound: 3.8, outbound: 2.1 },
    { name: '08:00', inbound: 5.1, outbound: 3.2 },
    { name: '12:00', inbound: 4.7, outbound: 2.8 },
    { name: '16:00', inbound: 5.4, outbound: 3.5 },
    { name: '20:00', inbound: 4.9, outbound: 2.9 },
    { name: '24:00', inbound: 4.3, outbound: 2.5 }
  ];

  const topSitesData = [
    { name: 'github.com', traffic: 1420 },
    { name: 'microsoft.com', traffic: 1180 },
    { name: 'amazon.com', traffic: 950 },
    { name: 'slack.com', traffic: 820 },
    { name: 'docker.com', traffic: 640 }
  ];

  const ssoAppsData = [
    { name: 'Okta', usage: 850 },
    { name: 'Salesforce', usage: 720 },
    { name: 'Jira', usage: 680 },
    { name: 'GitHub', usage: 590 },
    { name: 'Datadog', usage: 450 }
  ];

  const platformData = [
    { name: 'macOS', value: 2180 },
    { name: 'Windows', value: 4250 },
    { name: 'Linux', value: 620 },
    { name: 'Android', value: 890 },
    { name: 'iOS', value: 1540 }
  ];

  const deviceHealthData = [
    { name: 'Healthy', value: 5840 },
    { name: 'Warning', value: 350 },
    { name: 'Critical', value: 127 }
  ];

  const complianceData = [
    { name: 'Compliant', value: 268 },
    { name: 'Non-Compliant', value: 19 }
  ];

  const threatData = [
    { name: 'Jan', threats: 12 },
    { name: 'Feb', threats: 19 },
    { name: 'Mar', threats: 15 },
    { name: 'Apr', threats: 22 },
    { name: 'May', threats: 18 },
    { name: 'Jun', threats: 8 }
  ];

  const locationData = [
    { name: 'San Francisco', count: 1250, lat: 37.7749, lng: -122.4194 },
    { name: 'New York', count: 980, lat: 40.7128, lng: -74.0060 },
    { name: 'London', count: 750, lat: 51.5074, lng: -0.1278 },
    { name: 'Tokyo', count: 620, lat: 35.6762, lng: 139.6503 },
    { name: 'Sydney', count: 440, lat: -33.8688, lng: 151.2093 },
    { name: 'Mumbai', count: 380, lat: 19.0760, lng: 72.8777 }
  ];

  const recentThreats = [
    { id: 1, type: 'Malware', device: 'DESKTOP-A8X9K2', severity: 'critical', time: '5 min ago' },
    { id: 2, type: 'Phishing Attempt', device: 'MACBOOK-PRO-15', severity: 'warning', time: '23 min ago' },
    { id: 3, type: 'Unauthorized Access', device: 'LAPTOP-DEV-04', severity: 'critical', time: '1 hour ago' }
  ];

  return (
    <div className="bg-[#000000] min-h-screen p-[24px] lg:p-[32px]">
      <div className="max-w-[1600px] mx-auto space-y-[24px]">
        {/* Summary Cards Row - Pie chart on right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[16px]">
          {/* Left: Users and Active Devices stacked */}
          <div className="space-y-[16px]">
            {/* Combined Users Card - Enhanced */}
            <div className="bg-gradient-to-br from-[#0F0F0F] to-[#0A0A0A] border border-[#1A1A1A] rounded-[12px] p-[24px] hover:border-[#00FF66] transition-all duration-300 hover:shadow-lg hover:shadow-[#00FF66]/10">
              <div className="flex items-start justify-between mb-[20px]">
                <h3 className="font-medium text-[#8F8F8F] text-[14px]">Users Overview</h3>
                <div className="text-[#00FF66] bg-[rgba(0,255,102,0.1)] p-[10px] rounded-[8px]">
                  <Users size={20} />
                </div>
              </div>
              
              {/* Total Users */}
              <div className="mb-[24px]">
                <div className="flex items-end gap-[12px] mb-[8px]">
                  <p className="font-semibold text-[#D5FFD6] text-[32px] leading-none">8.7K</p>
                  <div className="flex items-center gap-[4px] pb-[4px] text-[#00FF66]">
                    <Activity size={16} />
                    <span className="text-[14px] font-medium">+10%</span>
                  </div>
                </div>
                <p className="text-[#8F8F8F] text-[12px]">Total Users • <span className="text-[#00FF66]">vs prev period 7.9K</span></p>
              </div>
              
              {/* Active Users */}
              <div className="pt-[24px] border-t border-[#1A1A1A]">
                <div className="flex items-end gap-[12px] mb-[8px]">
                  <p className="font-semibold text-[#00FF66] text-[28px] leading-none">6.2K</p>
                  <div className="flex items-center gap-[4px] pb-[4px] text-[#00FF66]">
                    <Activity size={14} />
                    <span className="text-[12px] font-medium">+7%</span>
                  </div>
                </div>
                <p className="text-[#8F8F8F] text-[12px]">Active Users • <span className="text-[#00FF66]">71% of total users</span></p>
              </div>
            </div>
            
            {/* Active Devices Gauge - Enhanced */}
            <div className="bg-gradient-to-br from-[#0F0F0F] to-[#0A0A0A] border border-[#1A1A1A] rounded-[12px] p-[24px] hover:border-[#00FF66] transition-all duration-300 hover:shadow-lg hover:shadow-[#00FF66]/10">
              <div className="flex items-start justify-between mb-[12px]">
                <h3 className="font-medium text-[#8F8F8F] text-[14px]">Active Devices</h3>
                <div className="text-[#00FF66] bg-[rgba(0,255,102,0.1)] p-[10px] rounded-[8px]">
                  <Monitor size={20} />
                </div>
              </div>
              <div className="mt-[12px]">
                <RadialGauge 
                  value={12400}
                  maxValue={15000}
                  label="Devices"
                  height={140}
                />
                <div className="flex items-center justify-center gap-[8px] mt-[12px]">
                  <div className="w-[8px] h-[8px] bg-[#00FF66] rounded-full animate-pulse"></div>
                  <p className="text-[#8F8F8F] text-[12px]">
                    Last contact: <span className="text-[#00FF66]">2 mins ago</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right: Platform Pie Chart - Enhanced */}
          <div className="bg-gradient-to-br from-[#0F0F0F] to-[#0A0A0A] border border-[#1A1A1A] rounded-[12px] p-[24px] hover:border-[#00FF66] transition-all hover:shadow-lg hover:shadow-[#00FF66]/10">
            <div className="flex items-start justify-between mb-[8px]">
              <div>
                <h3 className="font-medium text-[#8F8F8F] text-[14px]">Total Devices by Platform</h3>
                <p className="text-[#00FF66] text-[24px] font-semibold mt-[8px]">
                  {platformData.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
                </p>
                <p className="text-[#8F8F8F] text-[11px]">devices across all platforms</p>
              </div>
              <div className="text-[#00FF66] bg-[rgba(0,255,102,0.1)] p-[10px] rounded-[8px]">
                <Monitor size={20} />
              </div>
            </div>
            <div className="mt-[8px]">
              <PieChart 
                data={platformData}
                dataKey="value"
                nameKey="name"
                height={320}
              />
            </div>
          </div>
        </div>

        {/* Network + Sites + Apps Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[16px]">
          <ChartCard 
            title="Network Traffic Overview"
            subtitle="Inbound vs Outbound"
            actions={
              <div className="flex gap-[8px]">
                <button
                  onClick={() => setTimeRange('24h')}
                  className={`px-[12px] py-[6px] rounded-[6px] text-[12px] font-medium transition-colors ${
                    timeRange === '24h' 
                      ? 'bg-[#00FF66] text-[#000000]' 
                      : 'bg-[#1A1A1A] text-[#8F8F8F] hover:text-[#D5FFD6]'
                  }`}
                >
                  24h
                </button>
                <button
                  onClick={() => setTimeRange('7d')}
                  className={`px-[12px] py-[6px] rounded-[6px] text-[12px] font-medium transition-colors ${
                    timeRange === '7d' 
                      ? 'bg-[#00FF66] text-[#000000]' 
                      : 'bg-[#1A1A1A] text-[#8F8F8F] hover:text-[#D5FFD6]'
                  }`}
                >
                  7d
                </button>
              </div>
            }
          >
            <LineChart 
              data={networkTrafficData}
              dataKeys={[
                { key: 'inbound', color: '#00FF66', name: 'Inbound' },
                { key: 'outbound', color: '#0099FF', name: 'Outbound' }
              ]}
              height={250}
            />
          </ChartCard>

          <ChartCard title="Top Sites by Traffic" subtitle="Last 24 hours">
            <EnhancedHorizontalBarChart 
              data={topSitesData.map(item => ({ name: item.name, value: item.traffic }))}
              title=""
              subtitle=""
              showIcons={true}
            />
          </ChartCard>

          <ChartCard title="All SSO Apps Traffic" subtitle="Usage volume">
            <EnhancedSSOAppsChart 
              data={ssoAppsData.map(item => ({ name: item.name, value: item.usage }))}
              title=""
              subtitle=""
            />
          </ChartCard>
        </div>

        {/* Device Monitoring Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[16px]">
          <ChartCard title="Device Health Overview" subtitle="Overall system status">
            <DonutChart 
              data={deviceHealthData}
              dataKey="value"
              nameKey="name"
              colors={['#00FF66', '#FFCC00', '#FF4444']}
              centerText="93%"
              centerSubtext="Healthy"
            />
            <div className="grid grid-cols-3 gap-[12px] mt-[16px]">
              <div className="text-center">
                <p className="text-[#00FF66] text-[20px] font-semibold">5,840</p>
                <p className="text-[#8F8F8F] text-[11px]">Healthy</p>
              </div>
              <div className="text-center">
                <p className="text-[#FFCC00] text-[20px] font-semibold">350</p>
                <p className="text-[#8F8F8F] text-[11px]">Warning</p>
              </div>
              <div className="text-center">
                <p className="text-[#FF4444] text-[20px] font-semibold">127</p>
                <p className="text-[#8F8F8F] text-[11px]">Critical</p>
              </div>
            </div>
          </ChartCard>

          <AlertCard title="Malicious Activity Detected" severity="critical" count={127}>
            <div className="mb-[16px]">
              <LineChart 
                data={threatData}
                dataKeys={[{ key: 'threats', color: '#FF4444', name: 'Threats' }]}
                height={150}
              />
            </div>
            <div className="space-y-[8px]">
              <h4 className="text-[#8F8F8F] text-[12px] font-semibold">Recent Events</h4>
              {recentThreats.map((threat) => (
                <div key={threat.id} className="flex items-start justify-between p-[8px] bg-[#0F0F0F] rounded-[6px]">
                  <div>
                    <p className="text-[#D5FFD6] text-[12px] font-medium">{threat.type}</p>
                    <p className="text-[#8F8F8F] text-[11px]">{threat.device}</p>
                  </div>
                  <div className="text-right">
                    <Tag variant={threat.severity as any}>{threat.severity}</Tag>
                    <p className="text-[#8F8F8F] text-[10px] mt-[4px]">{threat.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </AlertCard>

          <ChartCard title="Device Compliance" subtitle="Policy adherence">
            <DonutChart 
              data={complianceData}
              dataKey="value"
              nameKey="name"
              colors={['#00FF66', '#FF4444']}
              centerText="93%"
              centerSubtext="Compliant"
            />
            <div className="grid grid-cols-2 gap-[12px] mt-[16px]">
              <div className="bg-[rgba(0,255,102,0.1)] border border-[#00FF66] rounded-[8px] p-[12px] text-center">
                <p className="text-[#00FF66] text-[24px] font-semibold">268</p>
                <p className="text-[#8F8F8F] text-[11px]">Compliant</p>
              </div>
              <div className="bg-[rgba(255,68,68,0.1)] border border-[#FF4444] rounded-[8px] p-[12px] text-center">
                <p className="text-[#FF4444] text-[24px] font-semibold">19</p>
                <p className="text-[#8F8F8F] text-[11px]">Non-Compliant</p>
              </div>
            </div>
          </ChartCard>
        </div>

        {/* Device Location Row */}
        <ChartCard title="Device Location Heatmap" subtitle="Global distribution">
          <Heatmap locations={locationData} height={400} />
        </ChartCard>
      </div>
    </div>
  );
}