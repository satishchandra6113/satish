import { FileCheck, Shield, Lock, Eye, Users, Clock, CheckCircle, XCircle, AlertTriangle, Search, Filter, Plus, MoreVertical } from 'lucide-react';

const THEME = {
  primary: '#00FF66',
  warning: '#FFCC00',
  danger: '#FF4444',
  info: '#4A9EFF',
  bgDark: '#050505',
  bgCard: '#0F0F0F',
  border: '#1A1A1A',
  textPrimary: '#D5FFD6',
  textMuted: '#8F8F8F',
};

interface Policy {
  id: number;
  name: string;
  description: string;
  type: 'security' | 'access' | 'compliance' | 'privacy';
  status: 'active' | 'inactive' | 'draft';
  appliedTo: number;
  lastModified: string;
  createdBy: string;
}

const policies: Policy[] = [
  { id: 1, name: 'Multi-Factor Authentication', description: 'Require MFA for all user logins', type: 'security', status: 'active', appliedTo: 156, lastModified: '2 hours ago', createdBy: 'Admin' },
  { id: 2, name: 'Password Complexity', description: 'Enforce strong password requirements', type: 'security', status: 'active', appliedTo: 156, lastModified: '1 day ago', createdBy: 'Admin' },
  { id: 3, name: 'Device Encryption', description: 'Require full disk encryption on all devices', type: 'security', status: 'active', appliedTo: 32, lastModified: '3 days ago', createdBy: 'Admin' },
  { id: 4, name: 'Remote Access Control', description: 'Restrict remote access to approved locations', type: 'access', status: 'active', appliedTo: 89, lastModified: '1 week ago', createdBy: 'Security Team' },
  { id: 5, name: 'Data Retention', description: 'Auto-delete data after 90 days', type: 'compliance', status: 'active', appliedTo: 45, lastModified: '2 weeks ago', createdBy: 'Compliance' },
  { id: 6, name: 'GDPR Compliance', description: 'Ensure data handling meets GDPR requirements', type: 'privacy', status: 'active', appliedTo: 156, lastModified: '1 month ago', createdBy: 'Legal' },
  { id: 7, name: 'Session Timeout', description: 'Auto-logout after 30 minutes of inactivity', type: 'security', status: 'active', appliedTo: 156, lastModified: '2 months ago', createdBy: 'Admin' },
  { id: 8, name: 'IP Whitelisting', description: 'Allow access only from approved IP ranges', type: 'access', status: 'inactive', appliedTo: 0, lastModified: '3 months ago', createdBy: 'Network Team' },
  { id: 9, name: 'Audit Logging', description: 'Log all user actions for compliance', type: 'compliance', status: 'active', appliedTo: 156, lastModified: '1 month ago', createdBy: 'Compliance' },
  { id: 10, name: 'Data Anonymization', description: 'Anonymize PII in analytics', type: 'privacy', status: 'draft', appliedTo: 0, lastModified: '1 week ago', createdBy: 'Data Team' },
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'security': return Shield;
    case 'access': return Lock;
    case 'compliance': return FileCheck;
    case 'privacy': return Eye;
    default: return FileCheck;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'security': return THEME.primary;
    case 'access': return THEME.info;
    case 'compliance': return THEME.warning;
    case 'privacy': return '#A855F7';
    default: return THEME.textMuted;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'active': return CheckCircle;
    case 'inactive': return XCircle;
    case 'draft': return AlertTriangle;
    default: return CheckCircle;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return THEME.primary;
    case 'inactive': return THEME.danger;
    case 'draft': return THEME.warning;
    default: return THEME.textMuted;
  }
};

export function PoliciesPage() {
  const stats = {
    total: policies.length,
    active: policies.filter(p => p.status === 'active').length,
    inactive: policies.filter(p => p.status === 'inactive').length,
    draft: policies.filter(p => p.status === 'draft').length,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: THEME.textPrimary }}>Policies</h1>
          <p className="text-sm mt-1" style={{ color: THEME.textMuted }}>Manage security and compliance policies</p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all hover:scale-105"
          style={{ background: THEME.primary, color: THEME.bgDark }}
        >
          <Plus size={16} />
          Create Policy
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Policies', value: stats.total, icon: FileCheck, color: THEME.primary },
          { label: 'Active', value: stats.active, icon: CheckCircle, color: THEME.primary },
          { label: 'Inactive', value: stats.inactive, icon: XCircle, color: THEME.danger },
          { label: 'Draft', value: stats.draft, icon: AlertTriangle, color: THEME.warning },
        ].map((stat) => (
          <div
            key={stat.label}
            className="p-4 rounded-xl"
            style={{ background: THEME.bgCard, border: `1px solid ${THEME.border}` }}
          >
            <div className="flex items-center justify-between mb-3">
              <stat.icon size={20} style={{ color: stat.color }} />
              <span className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</span>
            </div>
            <p className="text-xs" style={{ color: THEME.textMuted }}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div
          className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl"
          style={{ background: THEME.bgCard, border: `1px solid ${THEME.border}` }}
        >
          <Search size={18} style={{ color: THEME.textMuted }} />
          <input
            type="text"
            placeholder="Search policies..."
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ color: THEME.textPrimary }}
          />
        </div>
        <button
          className="flex items-center gap-2 px-4 py-3 rounded-xl transition-all hover:bg-opacity-80"
          style={{ background: THEME.bgCard, border: `1px solid ${THEME.border}`, color: THEME.textMuted }}
        >
          <Filter size={18} />
          <span className="text-sm">Filter</span>
        </button>
      </div>

      {/* Policies Grid */}
      <div className="grid grid-cols-2 gap-4">
        {policies.map((policy) => {
          const TypeIcon = getTypeIcon(policy.type);
          const StatusIcon = getStatusIcon(policy.status);
          const typeColor = getTypeColor(policy.type);
          const statusColor = getStatusColor(policy.status);

          return (
            <div
              key={policy.id}
              className="p-5 rounded-xl hover:border-[#00FF66] transition-all cursor-pointer group"
              style={{ background: THEME.bgCard, border: `1px solid ${THEME.border}` }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: `${typeColor}15`, border: `1px solid ${typeColor}30` }}
                  >
                    <TypeIcon size={18} style={{ color: typeColor }} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold" style={{ color: THEME.textPrimary }}>{policy.name}</h3>
                    <span
                      className="text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full"
                      style={{ background: `${typeColor}15`, color: typeColor }}
                    >
                      {policy.type}
                    </span>
                  </div>
                </div>
                <button
                  className="p-2 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-[rgba(255,255,255,0.05)] transition-all"
                  style={{ color: THEME.textMuted }}
                >
                  <MoreVertical size={16} />
                </button>
              </div>

              {/* Description */}
              <p className="text-xs mb-4 line-clamp-2" style={{ color: THEME.textMuted }}>
                {policy.description}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4" style={{ borderTop: `1px solid ${THEME.border}` }}>
                <div className="flex items-center gap-4">
                  {/* Status */}
                  <div className="flex items-center gap-1.5">
                    <StatusIcon size={12} style={{ color: statusColor }} />
                    <span className="text-xs capitalize" style={{ color: statusColor }}>{policy.status}</span>
                  </div>
                  {/* Applied To */}
                  <div className="flex items-center gap-1.5">
                    <Users size={12} style={{ color: THEME.textMuted }} />
                    <span className="text-xs" style={{ color: THEME.textMuted }}>{policy.appliedTo} users</span>
                  </div>
                </div>
                {/* Last Modified */}
                <div className="flex items-center gap-1.5">
                  <Clock size={12} style={{ color: THEME.textMuted }} />
                  <span className="text-xs" style={{ color: THEME.textMuted }}>{policy.lastModified}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


