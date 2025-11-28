import { useState } from 'react';
import { DashboardSidebar } from './DashboardSidebar';
import { DashboardTopNav } from './DashboardTopNav';
import { ClientMasterDashboard } from './ClientMasterDashboard';
import { UsersPageFigma } from './UsersPageFigma';
import { NewUserModal } from './NewUserModal';

export function DashboardLayout() {
  const [activeView, setActiveView] = useState('dashboard');
  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <ClientMasterDashboard />;
      case 'users':
        return <UsersPageFigma onNewUser={() => setShowNewUserModal(true)} />;
      default:
        return (
          <div className="bg-[#000000] min-h-screen p-[32px] flex items-center justify-center">
            <div className="text-center">
              <h2 className="font-semibold text-[#D5FFD6] text-[24px] mb-[8px]">
                {activeView.charAt(0).toUpperCase() + activeView.slice(1)}
              </h2>
              <p className="text-[#8F8F8F]">This page is under construction</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#000000]">
      {/* Sidebar */}
      <DashboardSidebar 
        activeItem={activeView} 
        onItemClick={setActiveView}
        isOpen={sidebarOpen}
      />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <DashboardTopNav 
          pageTitle={
            activeView === 'dashboard' 
              ? 'Client Master Dashboard' 
              : activeView.charAt(0).toUpperCase() + activeView.slice(1)
          }
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
        />
        
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {renderContent()}
        </div>
      </div>

      {/* New User Modal */}
      {showNewUserModal && (
        <NewUserModal onClose={() => setShowNewUserModal(false)} />
      )}
    </div>
  );
}