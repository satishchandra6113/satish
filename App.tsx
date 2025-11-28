import { useState } from 'react';
import { CybercykoSidebar } from './components/CybercykoSidebar';
import { CybercykoTopBar } from './components/CybercykoTopBar';
import { CybercykoDashboard } from './components/pages/CybercykoDashboard';
import { UsersPage } from './components/UsersPage';
import { BillingPage } from './components/pages/BillingPage';
import { ProfilePage } from './components/pages/ProfilePage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const pageConfig = {
    dashboard: { title: 'Dashboard', component: CybercykoDashboard },
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
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          sidebarOpen ? 'ml-[240px]' : 'ml-[80px]'
        }`}
        onClick={() => {
          // Close sidebar when clicking on main content if it's open
          if (sidebarOpen) {
            setSidebarOpen(false);
          }
        }}
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