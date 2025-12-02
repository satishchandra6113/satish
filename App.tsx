import { useState } from 'react';
import { CybercykoSidebar } from './components/CybercykoSidebar';
import { CybercykoTopBar } from './components/CybercykoTopBar';
import { CybercykoDashboard } from './components/pages/CybercykoDashboard';
import { UsersPage } from './components/UsersPage';
import { BillingPage } from './components/pages/BillingPage';
import { ProfilePage } from './components/pages/ProfilePage';
import { DevicesPage } from './components/pages/DevicesPage';
import { PoliciesPage } from './components/pages/PoliciesPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const pageConfig = {
    dashboard: { title: 'Dashboard', component: CybercykoDashboard },
    devices: { title: 'Devices', component: DevicesPage },
    policies: { title: 'Policies', component: PoliciesPage },
    users: { title: 'Users Management', component: UsersPage },
    billing: { title: 'Billing', component: BillingPage },
    profile: { title: 'Profile Settings', component: ProfilePage },
    security: { title: 'Security', component: CybercykoDashboard },
    activity: { title: 'Activity Logs', component: CybercykoDashboard },
    notifications: { title: 'Notifications', component: CybercykoDashboard },
  };

  const CurrentPageComponent = pageConfig[currentPage as keyof typeof pageConfig]?.component || CybercykoDashboard;
  const currentPageTitle = pageConfig[currentPage as keyof typeof pageConfig]?.title || 'Dashboard';

  return (
    <div className="min-h-screen bg-[#050505] text-[#D5FFD6]">
      {/* Sidebar */}
      <CybercykoSidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        isOpen={false}
        onToggle={() => {}}
      />

      {/* Main Content */}
      <div 
        className="main-content ml-[80px]"
        style={{ transition: 'margin-left 0.18s cubic-bezier(0.4, 0, 0.2, 1)' }}
      >
        {/* Top Bar */}
        <CybercykoTopBar
          currentPageTitle={currentPageTitle}
        />

        {/* Page Content */}
        <div className="p-[0px]">
          <CurrentPageComponent />
        </div>
      </div>
    </div>
  );
}