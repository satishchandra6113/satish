import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
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

interface UserTableProps {
  users: User[];
  onUserClick: (user: User) => void;
  onToggleActive: (userId: string) => void;
}

export function UserTable({ users: initialUsers, onUserClick, onToggleActive }: UserTableProps) {
  const [users, setUsers] = useState(initialUsers.map((user, index) => ({
    ...user,
    isActive: user.isActive ?? true, // Default to active
    isOnline: index % 3 !== 2 // Mock: 2/3 users are online
  })));
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Update users when initialUsers changes
  useEffect(() => {
    setUsers(initialUsers.map((user, index) => ({
      ...user,
      isActive: user.isActive ?? true,
      isOnline: index % 3 !== 2 // Mock: 2/3 users are online
    })));
    setCurrentPage(1);
  }, [initialUsers]);

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
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">Online Status</th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">Active / Inactive</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user) => (
              <tr
                key={user.id}
                onClick={() => onUserClick(user)}
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
                  <div className="flex items-center justify-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${user.isOnline ? 'bg-[#00FF66] shadow-[0_0_8px_rgba(0,255,102,0.6)]' : 'bg-gray-500'}`} />
                    <span className={`text-sm font-medium ${user.isOnline ? 'text-[#00FF66]' : 'text-gray-500'}`}>
                      {user.isOnline ? 'Online' : 'Offline'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleActive(user.id);
                    }}
                    className={`relative w-14 h-7 rounded-full transition-all duration-300 inline-block ${user.isActive
                      ? 'bg-[#00FF66]'
                      : 'bg-[#2A2A2A]'
                      }`}
                  >
                    <div
                      className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-transform duration-300 shadow-md ${user.isActive ? 'translate-x-8' : 'translate-x-1'
                        }`}
                    />
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
    </div>
  );
}
