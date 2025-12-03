import { useState } from 'react';
import { Shield, Lock, Key, Smartphone, Globe, AlertTriangle, CheckCircle, Eye, EyeOff, RefreshCw, Trash2, Plus, Clock, MapPin } from 'lucide-react';

const THEME = {
  primary: '#00FF66',
  danger: '#FF4444',
  warning: '#FFCC00',
  info: '#4A9EFF',
  bgCard: '#0F0F0F',
  border: '#1A1A1A',
  textPrimary: '#D5FFD6',
  textMuted: '#8F8F8F',
};

export function SecurityPage() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState('30');
  const [showPassword, setShowPassword] = useState(false);
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  
  const [activeSessions] = useState([
    { id: 1, device: 'MacBook Pro', browser: 'Chrome 120', location: 'San Francisco, CA', ip: '192.168.1.101', lastActive: 'Now', current: true },
    { id: 2, device: 'iPhone 15 Pro', browser: 'Safari Mobile', location: 'San Francisco, CA', ip: '192.168.1.102', lastActive: '2 hours ago', current: false },
    { id: 3, device: 'Windows PC', browser: 'Firefox 121', location: 'New York, NY', ip: '203.45.67.89', lastActive: '3 days ago', current: false },
  ]);

  const [trustedDevices] = useState([
    { id: 1, name: 'MacBook Pro', addedOn: '2024-01-15', lastUsed: 'Today' },
    { id: 2, name: 'iPhone 15 Pro', addedOn: '2024-02-20', lastUsed: 'Yesterday' },
  ]);

  const [securityLogs] = useState([
    { id: 1, event: 'Successful login', time: '2 minutes ago', ip: '192.168.1.101', status: 'success' },
    { id: 2, event: 'Password changed', time: '5 days ago', ip: '192.168.1.101', status: 'success' },
    { id: 3, event: 'Failed login attempt', time: '1 week ago', ip: '203.45.67.89', status: 'warning' },
    { id: 4, event: '2FA enabled', time: '2 weeks ago', ip: '192.168.1.101', status: 'success' },
  ]);

  const securityScore = 85;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: THEME.textPrimary }}>Security Settings</h1>
          <p className="text-sm mt-1" style={{ color: THEME.textMuted }}>Manage your account security and privacy</p>
        </div>
      </div>

      {/* Security Score */}
      <div className="p-6 rounded-xl" style={{ background: THEME.bgCard, border: `1px solid ${THEME.border}` }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl" style={{ background: `${THEME.primary}15` }}>
              <Shield size={24} style={{ color: THEME.primary }} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Security Score</h3>
              <p className="text-sm" style={{ color: THEME.textMuted }}>Your account security status</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-4xl font-bold" style={{ color: THEME.primary }}>{securityScore}</span>
            <span className="text-lg" style={{ color: THEME.textMuted }}>/100</span>
          </div>
        </div>
        <div className="w-full h-2 rounded-full" style={{ background: THEME.border }}>
          <div 
            className="h-full rounded-full transition-all" 
            style={{ width: `${securityScore}%`, background: THEME.primary }}
          />
        </div>
        <div className="flex items-center gap-2 mt-3">
          <CheckCircle size={14} style={{ color: THEME.primary }} />
          <span className="text-sm" style={{ color: THEME.textMuted }}>Your account is well protected</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Two-Factor Authentication */}
        <div className="p-5 rounded-xl" style={{ background: THEME.bgCard, border: `1px solid ${THEME.border}` }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Lock size={20} style={{ color: THEME.primary }} />
              <div>
                <h3 className="font-semibold text-white">Two-Factor Authentication</h3>
                <p className="text-xs" style={{ color: THEME.textMuted }}>Add extra security to your account</p>
              </div>
            </div>
            <button
              onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
              className={`relative w-12 h-6 rounded-full transition-all ${twoFactorEnabled ? 'bg-[#00FF66]' : 'bg-[#2A2A2A]'}`}
            >
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${twoFactorEnabled ? 'translate-x-7' : 'translate-x-1'}`} />
            </button>
          </div>
          {twoFactorEnabled && (
            <div className="p-3 rounded-lg" style={{ background: `${THEME.primary}10`, border: `1px solid ${THEME.primary}30` }}>
              <p className="text-xs" style={{ color: THEME.primary }}>✓ 2FA is enabled using Authenticator App</p>
            </div>
          )}
        </div>

        {/* Login Alerts */}
        <div className="p-5 rounded-xl" style={{ background: THEME.bgCard, border: `1px solid ${THEME.border}` }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <AlertTriangle size={20} style={{ color: THEME.warning }} />
              <div>
                <h3 className="font-semibold text-white">Login Alerts</h3>
                <p className="text-xs" style={{ color: THEME.textMuted }}>Get notified of new logins</p>
              </div>
            </div>
            <button
              onClick={() => setLoginAlerts(!loginAlerts)}
              className={`relative w-12 h-6 rounded-full transition-all ${loginAlerts ? 'bg-[#00FF66]' : 'bg-[#2A2A2A]'}`}
            >
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${loginAlerts ? 'translate-x-7' : 'translate-x-1'}`} />
            </button>
          </div>
          <p className="text-xs" style={{ color: THEME.textMuted }}>Receive email alerts when someone logs into your account from a new device</p>
        </div>

        {/* Session Timeout */}
        <div className="p-5 rounded-xl" style={{ background: THEME.bgCard, border: `1px solid ${THEME.border}` }}>
          <div className="flex items-center gap-3 mb-4">
            <Clock size={20} style={{ color: THEME.info }} />
            <div>
              <h3 className="font-semibold text-white">Session Timeout</h3>
              <p className="text-xs" style={{ color: THEME.textMuted }}>Auto-logout after inactivity</p>
            </div>
          </div>
          <select
            value={sessionTimeout}
            onChange={(e) => setSessionTimeout(e.target.value)}
            className="w-full p-3 rounded-lg text-sm outline-none"
            style={{ background: '#1A1A1A', border: `1px solid ${THEME.border}`, color: THEME.textPrimary }}
          >
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
            <option value="120">2 hours</option>
            <option value="never">Never</option>
          </select>
        </div>

        {/* Change Password */}
        <div className="p-5 rounded-xl" style={{ background: THEME.bgCard, border: `1px solid ${THEME.border}` }}>
          <div className="flex items-center gap-3 mb-4">
            <Key size={20} style={{ color: THEME.primary }} />
            <div>
              <h3 className="font-semibold text-white">Change Password</h3>
              <p className="text-xs" style={{ color: THEME.textMuted }}>Update your password</p>
            </div>
          </div>
          <div className="space-y-3">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Current password"
              value={passwords.current}
              onChange={(e) => setPasswords(p => ({ ...p, current: e.target.value }))}
              className="w-full p-2.5 rounded-lg text-sm outline-none"
              style={{ background: '#1A1A1A', border: `1px solid ${THEME.border}`, color: THEME.textPrimary }}
            />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="New password"
              value={passwords.new}
              onChange={(e) => setPasswords(p => ({ ...p, new: e.target.value }))}
              className="w-full p-2.5 rounded-lg text-sm outline-none"
              style={{ background: '#1A1A1A', border: `1px solid ${THEME.border}`, color: THEME.textPrimary }}
            />
            <div className="flex gap-2">
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="p-2.5 rounded-lg"
                style={{ background: '#1A1A1A', border: `1px solid ${THEME.border}`, color: THEME.textMuted }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
              <button
                className="flex-1 py-2.5 rounded-lg text-sm font-medium"
                style={{ background: THEME.primary, color: '#050505' }}
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="p-5 rounded-xl" style={{ background: THEME.bgCard, border: `1px solid ${THEME.border}` }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Globe size={20} style={{ color: THEME.primary }} />
            <h3 className="font-semibold text-white">Active Sessions</h3>
          </div>
          <button className="text-xs px-3 py-1.5 rounded-lg" style={{ color: THEME.danger, background: `${THEME.danger}15` }}>
            Sign out all other sessions
          </button>
        </div>
        <div className="space-y-3">
          {activeSessions.map((session) => (
            <div 
              key={session.id} 
              className="flex items-center justify-between p-3 rounded-lg"
              style={{ background: session.current ? `${THEME.primary}10` : '#1A1A1A', border: `1px solid ${session.current ? `${THEME.primary}30` : THEME.border}` }}
            >
              <div className="flex items-center gap-3">
                <Smartphone size={18} style={{ color: session.current ? THEME.primary : THEME.textMuted }} />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-white">{session.device}</p>
                    {session.current && <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: `${THEME.primary}20`, color: THEME.primary }}>Current</span>}
                  </div>
                  <p className="text-xs" style={{ color: THEME.textMuted }}>{session.browser} • {session.location}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs" style={{ color: THEME.textMuted }}>{session.lastActive}</p>
                {!session.current && (
                  <button className="text-xs mt-1" style={{ color: THEME.danger }}>Revoke</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trusted Devices & Security Log */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trusted Devices */}
        <div className="p-5 rounded-xl" style={{ background: THEME.bgCard, border: `1px solid ${THEME.border}` }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Smartphone size={20} style={{ color: THEME.primary }} />
              <h3 className="font-semibold text-white">Trusted Devices</h3>
            </div>
            <button className="p-1.5 rounded-lg" style={{ background: `${THEME.primary}15`, color: THEME.primary }}>
              <Plus size={16} />
            </button>
          </div>
          <div className="space-y-2">
            {trustedDevices.map((device) => (
              <div key={device.id} className="flex items-center justify-between p-3 rounded-lg" style={{ background: '#1A1A1A' }}>
                <div>
                  <p className="text-sm font-medium text-white">{device.name}</p>
                  <p className="text-xs" style={{ color: THEME.textMuted }}>Added {device.addedOn} • Last used {device.lastUsed}</p>
                </div>
                <button className="p-1.5 rounded" style={{ color: THEME.danger }}>
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Security Log */}
        <div className="p-5 rounded-xl" style={{ background: THEME.bgCard, border: `1px solid ${THEME.border}` }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <RefreshCw size={20} style={{ color: THEME.primary }} />
              <h3 className="font-semibold text-white">Recent Security Events</h3>
            </div>
          </div>
          <div className="space-y-2">
            {securityLogs.map((log) => (
              <div key={log.id} className="flex items-center justify-between p-3 rounded-lg" style={{ background: '#1A1A1A' }}>
                <div className="flex items-center gap-3">
                  {log.status === 'success' ? (
                    <CheckCircle size={14} style={{ color: THEME.primary }} />
                  ) : (
                    <AlertTriangle size={14} style={{ color: THEME.warning }} />
                  )}
                  <div>
                    <p className="text-sm text-white">{log.event}</p>
                    <p className="text-xs" style={{ color: THEME.textMuted }}>{log.ip}</p>
                  </div>
                </div>
                <p className="text-xs" style={{ color: THEME.textMuted }}>{log.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

