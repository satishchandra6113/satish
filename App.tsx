import { useState } from 'react';
import { CybercykoSidebar } from './components/CybercykoSidebar';
import { CybercykoTopBar } from './components/CybercykoTopBar';
import { CybercykoDashboard } from './components/pages/CybercykoDashboard';
import { UsersPage } from './components/UsersPage';
import { BillingPage } from './components/pages/BillingPage';
import { ProfilePage } from './components/pages/ProfilePage';
import { DevicesPage } from './components/pages/DevicesPage';
import { PoliciesPage } from './components/pages/PoliciesPage';
import { SecurityPage } from './components/pages/SecurityPage';
import { ActivityPage } from './components/pages/ActivityPage';
import { ThreatsPage } from './components/pages/ThreatsPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const pageConfig = {
    dashboard: { title: 'Dashboard', component: CybercykoDashboard, passNavigate: true },
    devices: { title: 'Devices', component: DevicesPage },
    policies: { title: 'Policies', component: PoliciesPage },
    users: { title: 'Users Management', component: UsersPage },
    billing: { title: 'Billing', component: BillingPage },
    profile: { title: 'Profile Settings', component: ProfilePage },
    threats: { title: 'Threats', component: ThreatsPage },
    security: { title: 'Security', component: SecurityPage },
    activity: { title: 'Activity Logs', component: ActivityPage },
    notifications: { title: 'Notifications', component: CybercykoDashboard },
  };

  const currentPageConfig = pageConfig[currentPage as keyof typeof pageConfig];
  const CurrentPageComponent = currentPageConfig?.component || CybercykoDashboard;
  const currentPageTitle = currentPageConfig?.title || 'Dashboard';
  const passNavigate = (currentPageConfig as any)?.passNavigate || false;

  return (
    <div className="min-h-screen h-screen overflow-hidden bg-[#050505] text-[#D5FFD6]">
      {/* Sidebar */}
      <CybercykoSidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        isOpen={false}
        onToggle={() => {}}
      />

      {/* Main Content */}
      <div 
        className="main-content ml-[80px] h-screen flex flex-col"
        style={{ transition: 'margin-left 0.18s cubic-bezier(0.4, 0, 0.2, 1)' }}
      >
        {/* Top Bar */}
        <CybercykoTopBar
          currentPageTitle={currentPageTitle}
          onNavigate={setCurrentPage}
        />

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          {passNavigate ? (
            <CurrentPageComponent onNavigate={setCurrentPage} />
          ) : (
            <CurrentPageComponent />
          )}
        </div>
      </div>
    </div>
  );
}