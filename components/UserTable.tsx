import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, X, Mail, Shield, Clock, User as UserIcon, Building, Edit, Trash2, Key, Send, Ban, CheckCircle, Activity, Save, Eye, EyeOff, Copy, Check, AlertTriangle } from 'lucide-react';
import { User } from '../types/user';

const THEME = {
  primary: '#00FF66',
  bgCard: '#0F0F0F',
  border: '#1A1A1A',
  textPrimary: '#D5FFD6',
  textMuted: '#8F8F8F',
  danger: '#FF4444',
  warning: '#FFCC00',
  info: '#60A5FA',
};

const ITEMS_PER_PAGE_OPTIONS = [5, 10, 15, 20];
const AVAILABLE_ROLES = ['Admin', 'Engineers', 'Sales', 'Customer Success'];

interface UserTableProps {
  users: User[];
}

// Extended user type for the modal
interface ExtendedUser extends User {
  isActive?: boolean;
  department?: string;
  phone?: string;
  location?: string;
  joinDate?: string;
}

type ModalView = 'details' | 'edit' | 'resetPassword' | 'delete' | 'activity';

export function UserTable({ users: initialUsers }: UserTableProps) {
  const [users, setUsers] = useState(initialUsers.map(user => ({
    ...user,
    isActive: user.isActive ?? true // Default to active
  })));
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedUser, setSelectedUser] = useState<ExtendedUser | null>(null);
  const [modalView, setModalView] = useState<ModalView>('details');
  
  // Edit form state
  const [editForm, setEditForm] = useState({ name: '', email: '', roles: [] as string[], status: '' });
  
  // Reset password state
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordCopied, setPasswordCopied] = useState(false);
  
  // Action states
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Update users when initialUsers changes
  useEffect(() => {
    setUsers(initialUsers.map(user => ({
      ...user,
      isActive: user.isActive ?? true
    })));
    setCurrentPage(1);
  }, [initialUsers]);

  const toggleUserActive = (userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, isActive: !user.isActive } : user
    ));
  };

  // Open user modal
  const openUserModal = (user: ExtendedUser) => {
    setSelectedUser(user);
    setModalView('details');
    setEditForm({ name: user.name, email: user.email, roles: [...user.roles], status: user.status });
    setNewPassword('');
    setPasswordCopied(false);
    setActionSuccess(null);
  };

  // Close modal
  const closeModal = () => {
    setSelectedUser(null);
    setModalView('details');
    setActionSuccess(null);
  };

  // Generate random password
  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 16; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewPassword(password);
    setPasswordCopied(false);
  };

  // Copy password to clipboard
  const copyPassword = () => {
    navigator.clipboard.writeText(newPassword);
    setPasswordCopied(true);
    setTimeout(() => setPasswordCopied(false), 2000);
  };

  // Save edited user
  const handleSaveUser = () => {
    if (!selectedUser) return;
    setActionLoading(true);
    setTimeout(() => {
      setUsers(prev => prev.map(user => 
        user.id === selectedUser.id 
          ? { ...user, name: editForm.name, email: editForm.email, roles: editForm.roles, status: editForm.status }
          : user
      ));
      setSelectedUser(prev => prev ? { ...prev, name: editForm.name, email: editForm.email, roles: editForm.roles, status: editForm.status } : null);
      setActionLoading(false);
      setActionSuccess('User updated successfully!');
      setTimeout(() => {
        setModalView('details');
        setActionSuccess(null);
      }, 1500);
    }, 800);
  };

  // Reset password
  const handleResetPassword = () => {
    if (!selectedUser || !newPassword) return;
    setActionLoading(true);
    setTimeout(() => {
      setActionLoading(false);
      setActionSuccess('Password reset successfully! User will receive an email.');
      setTimeout(() => {
        setModalView('details');
        setActionSuccess(null);
        setNewPassword('');
      }, 2000);
    }, 800);
  };

  // Delete user
  const handleDeleteUser = () => {
    if (!selectedUser) return;
    setActionLoading(true);
    setTimeout(() => {
      setUsers(prev => prev.filter(user => user.id !== selectedUser.id));
      setActionLoading(false);
      closeModal();
    }, 800);
  };

  // Toggle user role
  const toggleRole = (role: string) => {
    setEditForm(prev => ({
      ...prev,
      roles: prev.roles.includes(role) 
        ? prev.roles.filter(r => r !== role)
        : [...prev.roles, role]
    }));
  };

  // Send email to user
  const handleSendEmail = () => {
    if (!selectedUser) return;
    setActionSuccess('Email dialog opened!');
    setTimeout(() => setActionSuccess(null), 2000);
  };

  // Suspend/Activate user
  const handleToggleSuspend = () => {
    if (!selectedUser) return;
    const newStatus = selectedUser.status === 'Suspended' ? 'Verified' : 'Suspended';
    setUsers(prev => prev.map(user => 
      user.id === selectedUser.id ? { ...user, status: newStatus } : user
    ));
    setSelectedUser(prev => prev ? { ...prev, status: newStatus } : null);
    setActionSuccess(newStatus === 'Suspended' ? 'User suspended!' : 'User activated!');
    setTimeout(() => setActionSuccess(null), 2000);
  };

  // Mock activity data
  const userActivity = [
    { action: 'Logged in', time: '2 minutes ago', ip: '192.168.1.101' },
    { action: 'Updated profile', time: '1 hour ago', ip: '192.168.1.101' },
    { action: 'Changed password', time: '3 days ago', ip: '192.168.1.102' },
    { action: 'Logged in', time: '5 days ago', ip: '192.168.1.103' },
    { action: 'Created account', time: '30 days ago', ip: '192.168.1.100' },
  ];

  // Pagination calculations
  const totalItems = users.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedUsers = users.slice(startIndex, endIndex);

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  const getRoleStyle = (role: string) => {
    const styles: { [key: string]: string } = {
      'Customer Success': 'text-[#00FF66] border border-[#00FF66]/20 bg-[#00FF66]/5',
      'Sales': 'text-[#00FF66] border border-[#00FF66]/20 bg-[#00FF66]/5',
      'Admin': 'text-[#00FF66] border border-[#00FF66]/20 bg-[#00FF66]/5',
      'Engineers': 'text-[#00FF66] border border-[#00FF66]/20 bg-[#00FF66]/5',
    };
    return styles[role] || 'text-gray-400 border border-gray-700';
  };

  return (
    <div className="bg-[#0F0F0F] rounded-lg border border-[#1A1A1A] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#1A1A1A]">
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">User (Name & Email)</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Roles / Groups</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Last Login</th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">Active / Inactive</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user) => (
              <tr
                key={user.id}
                onClick={() => openUserModal(user)}
                className="border-b border-[#1A1A1A] hover:bg-[#1A1A1A] transition-colors cursor-pointer"
              >
                <td className="px-6 py-4 w-[30%]">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-gray-500 overflow-hidden border border-[#2A2A2A]">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-sm font-medium text-gray-400">{user.name.substring(0, 2).toUpperCase()}</span>
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">{user.name}</div>
                      <div className="text-sm text-gray-400">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    {user.roles.map((role, idx) => (
                      <span key={idx} className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleStyle(role)}`}>
                        {role}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[#00FF66] text-sm font-medium">
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-400 text-sm">
                    {user.lastLogin}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleUserActive(user.id);
                    }}
                    className={`relative w-14 h-7 rounded-full transition-all duration-300 inline-block ${
                      user.isActive 
                        ? 'bg-[#00FF66]' 
                        : 'bg-[#2A2A2A]'
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-transform duration-300 shadow-md ${
                        user.isActive ? 'translate-x-8' : 'translate-x-1'
                      }`}
                    />
                    {user.isActive && (
                      <svg className="absolute left-2 top-1.5 w-4 h-4 text-[#0F0F0F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalItems > 0 && (
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderTop: `1px solid ${THEME.border}` }}
        >
          {/* Left side - Items per page */}
          <div className="flex items-center gap-2">
            <span className="text-xs" style={{ color: THEME.textMuted }}>Show</span>
            <select
              value={itemsPerPage}
              onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
              className="px-2 py-1.5 rounded text-xs outline-none cursor-pointer appearance-none pr-6 bg-no-repeat"
              style={{ 
                background: `${THEME.bgCard} url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%238F8F8F' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E") no-repeat right 6px center`, 
                color: THEME.textPrimary,
                border: `1px solid ${THEME.border}`
              }}
            >
              {ITEMS_PER_PAGE_OPTIONS.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <span className="text-xs" style={{ color: THEME.textMuted }}>entries</span>
            <span className="text-xs ml-4" style={{ color: THEME.textMuted }}>
              Showing {startIndex + 1}-{endIndex} of {totalItems}
            </span>
          </div>

          {/* Right side - Navigation */}
          <div className="flex items-center">
            {/* First & Previous */}
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="w-8 h-8 flex items-center justify-center rounded-l border-r-0 transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[rgba(0,255,102,0.1)]"
              style={{ 
                border: `1px solid ${THEME.border}`,
                color: currentPage === 1 ? THEME.textMuted : THEME.textPrimary
              }}
              title="First"
            >
              <ChevronsLeft size={14} />
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 flex items-center justify-center border-r-0 transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[rgba(0,255,102,0.1)]"
              style={{ 
                border: `1px solid ${THEME.border}`,
                color: currentPage === 1 ? THEME.textMuted : THEME.textPrimary
              }}
              title="Previous"
            >
              <ChevronLeft size={14} />
            </button>

            {/* Page Numbers */}
            {(() => {
              const pages: (number | string)[] = [];
              const showEllipsisStart = currentPage > 3;
              const showEllipsisEnd = currentPage < totalPages - 2;

              if (totalPages <= 5) {
                // Show all pages
                for (let i = 1; i <= totalPages; i++) pages.push(i);
              } else {
                pages.push(1);
                if (showEllipsisStart) pages.push('...');
                
                const start = Math.max(2, currentPage - 1);
                const end = Math.min(totalPages - 1, currentPage + 1);
                for (let i = start; i <= end; i++) {
                  if (!pages.includes(i)) pages.push(i);
                }
                
                if (showEllipsisEnd) pages.push('...');
                if (!pages.includes(totalPages)) pages.push(totalPages);
              }

              return pages.map((page, idx) => (
                page === '...' ? (
                  <span
                    key={`ellipsis-${idx}`}
                    className="w-8 h-8 flex items-center justify-center text-xs border-r-0"
                    style={{ 
                      border: `1px solid ${THEME.border}`,
                      color: THEME.textMuted,
                      background: THEME.bgCard
                    }}
                  >
                    •••
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page as number)}
                    className="w-8 h-8 flex items-center justify-center text-xs font-medium border-r-0 transition-all hover:bg-[rgba(0,255,102,0.1)]"
                    style={{ 
                      border: `1px solid ${currentPage === page ? THEME.primary : THEME.border}`,
                      background: currentPage === page ? `${THEME.primary}15` : 'transparent',
                      color: currentPage === page ? THEME.primary : THEME.textMuted
                    }}
                  >
                    {page}
                  </button>
                )
              ));
            })()}

            {/* Next & Last */}
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="w-8 h-8 flex items-center justify-center border-r-0 transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[rgba(0,255,102,0.1)]"
              style={{ 
                border: `1px solid ${THEME.border}`,
                color: currentPage === totalPages ? THEME.textMuted : THEME.textPrimary
              }}
              title="Next"
            >
              <ChevronRight size={14} />
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages || totalPages === 0}
              className="w-8 h-8 flex items-center justify-center rounded-r transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[rgba(0,255,102,0.1)]"
              style={{ 
                border: `1px solid ${THEME.border}`,
                color: currentPage === totalPages ? THEME.textMuted : THEME.textPrimary
              }}
              title="Last"
            >
              <ChevronsRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* User Details Modal */}
      {selectedUser && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div 
            className="bg-[#0F0F0F] rounded-[20px] w-full max-w-xl border border-[#1A1A1A] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: 'fadeInUp 0.2s ease-out' }}
          >
            {/* Header with Avatar */}
            <div className="relative p-[24px] bg-gradient-to-br from-[rgba(0,255,102,0.15)] via-[rgba(0,255,102,0.05)] to-transparent border-b border-[#1A1A1A]">
              <button
                onClick={closeModal}
                className="absolute top-[16px] right-[16px] p-[8px] rounded-[8px] text-[#8F8F8F] hover:bg-[rgba(255,255,255,0.1)] hover:text-white transition-all"
              >
                <X size={20} />
              </button>
              
              <div className="flex items-center gap-[16px]">
                <div className="w-[72px] h-[72px] rounded-[16px] bg-gradient-to-br from-[#00FF66] to-[#00CC52] flex items-center justify-center shadow-[0_8px_32px_rgba(0,255,102,0.3)]">
                  {selectedUser.avatar ? (
                    <img src={selectedUser.avatar} alt={selectedUser.name} className="w-full h-full object-cover rounded-[16px]" />
                  ) : (
                    <span className="text-[24px] font-bold text-[#050505]">{selectedUser.name.substring(0, 2).toUpperCase()}</span>
                  )}
                </div>
                <div>
                  <h2 className="text-[20px] font-bold text-white mb-[4px]">{selectedUser.name}</h2>
                  <p className="text-[14px] text-[#8F8F8F] mb-[8px]">{selectedUser.email}</p>
                  <div className="flex items-center gap-[8px]">
                    <span className={`px-[10px] py-[4px] rounded-full text-[11px] font-semibold ${
                      selectedUser.status === 'Verified' 
                        ? 'bg-[rgba(0,255,102,0.15)] text-[#00FF66]' 
                        : selectedUser.status === 'Pending'
                        ? 'bg-[rgba(255,204,0,0.15)] text-[#FFCC00]'
                        : 'bg-[rgba(255,68,68,0.15)] text-[#FF4444]'
                    }`}>
                      {selectedUser.status}
                    </span>
                    <span className={`px-[10px] py-[4px] rounded-full text-[11px] font-semibold ${
                      selectedUser.isActive 
                        ? 'bg-[rgba(0,255,102,0.15)] text-[#00FF66]' 
                        : 'bg-[rgba(255,68,68,0.15)] text-[#FF4444]'
                    }`}>
                      {selectedUser.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Success Message */}
            {actionSuccess && (
              <div className="mx-[24px] mt-[16px] p-[12px] bg-[rgba(0,255,102,0.1)] border border-[#00FF66]/30 rounded-[10px] flex items-center gap-[10px]">
                <CheckCircle size={18} className="text-[#00FF66]" />
                <span className="text-[13px] text-[#00FF66] font-medium">{actionSuccess}</span>
              </div>
            )}

            {/* Details View */}
            {modalView === 'details' && (
              <div className="p-[24px] space-y-[20px]">
                {/* Quick Actions */}
                <div className="flex gap-[8px] flex-wrap">
                  <button
                    onClick={handleSendEmail}
                    className="flex items-center gap-[6px] px-[12px] py-[8px] bg-[rgba(96,165,250,0.1)] border border-[#60A5FA]/30 text-[#60A5FA] text-[12px] font-medium rounded-[8px] hover:bg-[rgba(96,165,250,0.2)] transition-all"
                  >
                    <Send size={14} />
                    Send Email
                  </button>
                  <button
                    onClick={handleToggleSuspend}
                    className={`flex items-center gap-[6px] px-[12px] py-[8px] text-[12px] font-medium rounded-[8px] transition-all ${
                      selectedUser.status === 'Suspended'
                        ? 'bg-[rgba(0,255,102,0.1)] border border-[#00FF66]/30 text-[#00FF66] hover:bg-[rgba(0,255,102,0.2)]'
                        : 'bg-[rgba(255,184,0,0.1)] border border-[#FFB800]/30 text-[#FFB800] hover:bg-[rgba(255,184,0,0.2)]'
                    }`}
                  >
                    {selectedUser.status === 'Suspended' ? <CheckCircle size={14} /> : <Ban size={14} />}
                    {selectedUser.status === 'Suspended' ? 'Activate' : 'Suspend'}
                  </button>
                  <button
                    onClick={() => setModalView('activity')}
                    className="flex items-center gap-[6px] px-[12px] py-[8px] bg-[rgba(255,255,255,0.05)] border border-[#2A2A2A] text-white text-[12px] font-medium rounded-[8px] hover:bg-[rgba(255,255,255,0.1)] transition-all"
                  >
                    <Activity size={14} />
                    View Activity
                  </button>
                </div>

                {/* Roles */}
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-wider text-[#8F8F8F] mb-[8px]">Roles / Groups</p>
                  <div className="flex flex-wrap gap-[8px]">
                    {selectedUser.roles.map((role, idx) => (
                      <span 
                        key={idx} 
                        className="flex items-center gap-[6px] px-[12px] py-[6px] rounded-[8px] text-[12px] font-medium bg-[rgba(0,255,102,0.1)] text-[#00FF66] border border-[#00FF66]/20"
                      >
                        <Shield size={12} />
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-[12px]">
                  <div className="p-[14px] rounded-[10px] bg-[rgba(255,255,255,0.02)] border border-[#1A1A1A]">
                    <div className="flex items-center gap-[6px] mb-[6px]">
                      <Mail size={12} className="text-[#8F8F8F]" />
                      <span className="text-[10px] text-[#8F8F8F] uppercase">Email</span>
                    </div>
                    <p className="text-[12px] text-white truncate">{selectedUser.email}</p>
                  </div>
                  <div className="p-[14px] rounded-[10px] bg-[rgba(255,255,255,0.02)] border border-[#1A1A1A]">
                    <div className="flex items-center gap-[6px] mb-[6px]">
                      <Clock size={12} className="text-[#8F8F8F]" />
                      <span className="text-[10px] text-[#8F8F8F] uppercase">Last Login</span>
                    </div>
                    <p className="text-[12px] text-white">{selectedUser.lastLogin}</p>
                  </div>
                  <div className="p-[14px] rounded-[10px] bg-[rgba(255,255,255,0.02)] border border-[#1A1A1A]">
                    <div className="flex items-center gap-[6px] mb-[6px]">
                      <Building size={12} className="text-[#8F8F8F]" />
                      <span className="text-[10px] text-[#8F8F8F] uppercase">Department</span>
                    </div>
                    <p className="text-[12px] text-white">{selectedUser.roles[0] || 'Not assigned'}</p>
                  </div>
                  <div className="p-[14px] rounded-[10px] bg-[rgba(255,255,255,0.02)] border border-[#1A1A1A]">
                    <div className="flex items-center gap-[6px] mb-[6px]">
                      <UserIcon size={12} className="text-[#8F8F8F]" />
                      <span className="text-[10px] text-[#8F8F8F] uppercase">User ID</span>
                    </div>
                    <p className="text-[12px] text-white font-mono">#{selectedUser.id}</p>
                  </div>
                </div>

                {/* Main Action Buttons */}
                <div className="flex gap-[10px] pt-[8px]">
                  <button
                    onClick={() => setModalView('edit')}
                    className="flex-1 flex items-center justify-center gap-[8px] py-[12px] bg-[rgba(0,255,102,0.1)] border border-[#00FF66] text-[#00FF66] font-medium text-[13px] rounded-[10px] hover:bg-[rgba(0,255,102,0.2)] transition-all"
                  >
                    <Edit size={16} />
                    Edit User
                  </button>
                  <button
                    onClick={() => { setModalView('resetPassword'); generatePassword(); }}
                    className="flex items-center justify-center gap-[8px] px-[14px] py-[12px] bg-[rgba(255,255,255,0.05)] border border-[#2A2A2A] text-white font-medium text-[13px] rounded-[10px] hover:bg-[rgba(255,255,255,0.1)] transition-all"
                  >
                    <Key size={16} />
                    Reset Password
                  </button>
                  <button
                    onClick={() => setModalView('delete')}
                    className="flex items-center justify-center p-[12px] bg-[rgba(255,68,68,0.1)] border border-[#FF4444]/30 text-[#FF4444] rounded-[10px] hover:bg-[rgba(255,68,68,0.2)] transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Edit View */}
            {modalView === 'edit' && (
              <div className="p-[24px] space-y-[20px]">
                <div className="flex items-center gap-[10px] mb-[8px]">
                  <button onClick={() => setModalView('details')} className="p-[6px] rounded-[6px] hover:bg-[rgba(255,255,255,0.1)] text-[#8F8F8F]">
                    <ChevronLeft size={18} />
                  </button>
                  <h3 className="text-[16px] font-semibold text-white">Edit User</h3>
                </div>

                <div className="space-y-[16px]">
                  <div>
                    <label className="block text-[11px] text-[#8F8F8F] uppercase mb-[8px]">Full Name</label>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-[10px] px-[14px] py-[12px] text-white text-[14px] focus:outline-none focus:border-[#00FF66] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#8F8F8F] uppercase mb-[8px]">Email Address</label>
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-[10px] px-[14px] py-[12px] text-white text-[14px] focus:outline-none focus:border-[#00FF66] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#8F8F8F] uppercase mb-[8px]">Status</label>
                    <select
                      value={editForm.status}
                      onChange={(e) => setEditForm(prev => ({ ...prev, status: e.target.value }))}
                      className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-[10px] px-[14px] py-[12px] text-white text-[14px] focus:outline-none focus:border-[#00FF66] transition-all"
                    >
                      <option value="Verified">Verified</option>
                      <option value="Pending">Pending</option>
                      <option value="Suspended">Suspended</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#8F8F8F] uppercase mb-[8px]">Roles</label>
                    <div className="flex flex-wrap gap-[8px]">
                      {AVAILABLE_ROLES.map((role) => (
                        <button
                          key={role}
                          onClick={() => toggleRole(role)}
                          className={`px-[12px] py-[8px] rounded-[8px] text-[12px] font-medium transition-all ${
                            editForm.roles.includes(role)
                              ? 'bg-[rgba(0,255,102,0.2)] border border-[#00FF66] text-[#00FF66]'
                              : 'bg-[rgba(255,255,255,0.05)] border border-[#2A2A2A] text-[#8F8F8F] hover:border-[#00FF66]/50'
                          }`}
                        >
                          {role}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-[12px] pt-[8px]">
                  <button
                    onClick={() => setModalView('details')}
                    className="flex-1 py-[12px] bg-[rgba(255,255,255,0.05)] border border-[#2A2A2A] text-white font-medium text-[13px] rounded-[10px] hover:bg-[rgba(255,255,255,0.1)] transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveUser}
                    disabled={actionLoading || !editForm.name || !editForm.email || editForm.roles.length === 0}
                    className="flex-1 flex items-center justify-center gap-[8px] py-[12px] bg-gradient-to-r from-[#00FF66] to-[#00CC52] text-[#050505] font-semibold text-[13px] rounded-[10px] hover:opacity-90 transition-all disabled:opacity-50"
                  >
                    {actionLoading ? (
                      <div className="w-[18px] h-[18px] border-2 border-[#050505]/30 border-t-[#050505] rounded-full animate-spin" />
                    ) : (
                      <>
                        <Save size={16} />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Reset Password View */}
            {modalView === 'resetPassword' && (
              <div className="p-[24px] space-y-[20px]">
                <div className="flex items-center gap-[10px] mb-[8px]">
                  <button onClick={() => setModalView('details')} className="p-[6px] rounded-[6px] hover:bg-[rgba(255,255,255,0.1)] text-[#8F8F8F]">
                    <ChevronLeft size={18} />
                  </button>
                  <h3 className="text-[16px] font-semibold text-white">Reset Password</h3>
                </div>

                <p className="text-[13px] text-[#8F8F8F]">
                  Generate a new password for <span className="text-white font-medium">{selectedUser.name}</span>. 
                  The user will receive an email with instructions.
                </p>

                <div>
                  <label className="block text-[11px] text-[#8F8F8F] uppercase mb-[8px]">New Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-[10px] px-[14px] py-[12px] pr-[90px] text-white text-[14px] font-mono focus:outline-none focus:border-[#00FF66] transition-all"
                      placeholder="Enter or generate password"
                    />
                    <div className="absolute right-[8px] top-1/2 -translate-y-1/2 flex items-center gap-[4px]">
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="p-[6px] rounded-[6px] hover:bg-[rgba(255,255,255,0.1)] text-[#8F8F8F]"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                      <button
                        onClick={copyPassword}
                        disabled={!newPassword}
                        className="p-[6px] rounded-[6px] hover:bg-[rgba(255,255,255,0.1)] text-[#8F8F8F] disabled:opacity-50"
                      >
                        {passwordCopied ? <Check size={16} className="text-[#00FF66]" /> : <Copy size={16} />}
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={generatePassword}
                  className="w-full py-[10px] bg-[rgba(255,255,255,0.05)] border border-[#2A2A2A] text-[#8F8F8F] font-medium text-[12px] rounded-[8px] hover:bg-[rgba(255,255,255,0.1)] hover:text-white transition-all"
                >
                  🎲 Generate Strong Password
                </button>

                <div className="flex gap-[12px] pt-[8px]">
                  <button
                    onClick={() => setModalView('details')}
                    className="flex-1 py-[12px] bg-[rgba(255,255,255,0.05)] border border-[#2A2A2A] text-white font-medium text-[13px] rounded-[10px] hover:bg-[rgba(255,255,255,0.1)] transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleResetPassword}
                    disabled={actionLoading || !newPassword}
                    className="flex-1 flex items-center justify-center gap-[8px] py-[12px] bg-gradient-to-r from-[#00FF66] to-[#00CC52] text-[#050505] font-semibold text-[13px] rounded-[10px] hover:opacity-90 transition-all disabled:opacity-50"
                  >
                    {actionLoading ? (
                      <div className="w-[18px] h-[18px] border-2 border-[#050505]/30 border-t-[#050505] rounded-full animate-spin" />
                    ) : (
                      <>
                        <Key size={16} />
                        Reset Password
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Delete Confirmation View */}
            {modalView === 'delete' && (
              <div className="p-[24px] space-y-[20px]">
                <div className="flex items-center gap-[10px] mb-[8px]">
                  <button onClick={() => setModalView('details')} className="p-[6px] rounded-[6px] hover:bg-[rgba(255,255,255,0.1)] text-[#8F8F8F]">
                    <ChevronLeft size={18} />
                  </button>
                  <h3 className="text-[16px] font-semibold text-[#FF4444]">Delete User</h3>
                </div>

                <div className="p-[16px] bg-[rgba(255,68,68,0.1)] border border-[#FF4444]/30 rounded-[12px]">
                  <div className="flex items-start gap-[12px]">
                    <AlertTriangle size={24} className="text-[#FF4444] flex-shrink-0" />
                    <div>
                      <p className="text-[14px] font-medium text-white mb-[4px]">Are you sure you want to delete this user?</p>
                      <p className="text-[13px] text-[#8F8F8F]">
                        This action cannot be undone. All data associated with <span className="text-white font-medium">{selectedUser.name}</span> will be permanently removed.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-[14px] bg-[rgba(255,255,255,0.02)] border border-[#1A1A1A] rounded-[10px]">
                  <p className="text-[12px] text-[#8F8F8F] mb-[8px]">User to be deleted:</p>
                  <div className="flex items-center gap-[12px]">
                    <div className="w-[40px] h-[40px] rounded-[10px] bg-gradient-to-br from-[#FF4444] to-[#CC3333] flex items-center justify-center">
                      <span className="text-[14px] font-bold text-white">{selectedUser.name.substring(0, 2).toUpperCase()}</span>
                    </div>
                    <div>
                      <p className="text-[14px] font-medium text-white">{selectedUser.name}</p>
                      <p className="text-[12px] text-[#8F8F8F]">{selectedUser.email}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-[12px] pt-[8px]">
                  <button
                    onClick={() => setModalView('details')}
                    className="flex-1 py-[12px] bg-[rgba(255,255,255,0.05)] border border-[#2A2A2A] text-white font-medium text-[13px] rounded-[10px] hover:bg-[rgba(255,255,255,0.1)] transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteUser}
                    disabled={actionLoading}
                    className="flex-1 flex items-center justify-center gap-[8px] py-[12px] bg-[#FF4444] text-white font-semibold text-[13px] rounded-[10px] hover:bg-[#EE3333] transition-all disabled:opacity-50"
                  >
                    {actionLoading ? (
                      <div className="w-[18px] h-[18px] border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Trash2 size={16} />
                        Delete User
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Activity View */}
            {modalView === 'activity' && (
              <div className="p-[24px] space-y-[20px]">
                <div className="flex items-center gap-[10px] mb-[8px]">
                  <button onClick={() => setModalView('details')} className="p-[6px] rounded-[6px] hover:bg-[rgba(255,255,255,0.1)] text-[#8F8F8F]">
                    <ChevronLeft size={18} />
                  </button>
                  <h3 className="text-[16px] font-semibold text-white">User Activity</h3>
                </div>

                <div className="space-y-[12px]">
                  {userActivity.map((activity, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-[14px] bg-[rgba(255,255,255,0.02)] border border-[#1A1A1A] rounded-[10px] hover:border-[#2A2A2A] transition-all"
                    >
                      <div className="flex items-center gap-[12px]">
                        <div className="w-[36px] h-[36px] rounded-[8px] bg-[rgba(0,255,102,0.1)] border border-[#00FF66]/20 flex items-center justify-center">
                          <Activity size={16} className="text-[#00FF66]" />
                        </div>
                        <div>
                          <p className="text-[13px] font-medium text-white">{activity.action}</p>
                          <p className="text-[11px] text-[#8F8F8F]">IP: {activity.ip}</p>
                        </div>
                      </div>
                      <span className="text-[11px] text-[#8F8F8F]">{activity.time}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setModalView('details')}
                  className="w-full py-[12px] bg-[rgba(255,255,255,0.05)] border border-[#2A2A2A] text-white font-medium text-[13px] rounded-[10px] hover:bg-[rgba(255,255,255,0.1)] transition-all"
                >
                  Back to Details
                </button>
              </div>
            )}
          </div>

          <style>{`
            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>
        </div>
      )}
    </div>
  );
}
