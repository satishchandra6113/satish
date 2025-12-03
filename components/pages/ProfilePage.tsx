import { useState } from 'react';
import { 
  User, Mail, MapPin, Phone, Shield, Bell, Volume2, MessageSquare, 
  Camera, Edit3, Calendar, Clock, Activity, Award, 
  Lock, Eye, EyeOff, Check, X, ChevronRight, Zap, Globe, Briefcase, AlertCircle,
  AlertTriangle, Trash2, Power, LogOut, Smartphone
} from 'lucide-react';

// Password validation rules
const PASSWORD_RULES = [
  { id: 'length', label: 'At least 8 characters', test: (p: string) => p.length >= 8 },
  { id: 'uppercase', label: 'One uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
  { id: 'lowercase', label: 'One lowercase letter', test: (p: string) => /[a-z]/.test(p) },
  { id: 'number', label: 'One number', test: (p: string) => /[0-9]/.test(p) },
  { id: 'special', label: 'One special character (!@#$%)', test: (p: string) => /[!@#$%^&*(),.?":{}|<>]/.test(p) },
];

// Confirmation Modal Types
type ConfirmModalType = 'delete' | 'deactivate' | 'logout-all' | 'remove-session' | '2fa' | null;

export function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  // Confirmation modal state
  const [confirmModal, setConfirmModal] = useState<ConfirmModalType>(null);
  const [confirmInput, setConfirmInput] = useState('');
  const [sessionToRemove, setSessionToRemove] = useState<number | null>(null);

  // Profile form state
  const [profileData, setProfileData] = useState({
    fullName: 'Administrator User',
    email: 'admin@cybercyko.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    company: 'Cybercyko Inc.',
    timezone: 'Pacific Time (PT)',
    bio: 'System administrator with full access to all platform features.'
  });
  const [profileErrors, setProfileErrors] = useState<{ [key: string]: string }>({});

  // Password state
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [passwordError, setPasswordError] = useState('');

  // Security state
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [sessions, setSessions] = useState([
    { id: 1, device: 'Chrome on Windows', location: 'San Francisco, CA', current: true, time: 'Current session' },
    { id: 2, device: 'Safari on iPhone', location: 'San Francisco, CA', current: false, time: '2 hours ago' },
  ]);

  // Notifications state
  const [notificationSettings, setNotificationSettings] = useState([
    { id: 1, title: 'Email notifications', description: 'Receive email updates', icon: Mail, enabled: true },
    { id: 2, title: 'Push notifications', description: 'Get push notifications', icon: Bell, enabled: true },
    { id: 3, title: 'SMS notifications', description: 'Receive SMS alerts', icon: MessageSquare, enabled: false },
    { id: 4, title: 'Marketing updates', description: 'Product news and features', icon: Volume2, enabled: true },
  ]);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'activity', label: 'Activity', icon: Activity },
  ];

  const stats = [
    { label: 'Days Active', value: '365', icon: Calendar, color: '#00FF66' },
    { label: 'Login Streak', value: '28', icon: Zap, color: '#FFB800' },
    { label: 'Tasks Done', value: '142', icon: Check, color: '#60A5FA' },
    { label: 'Team Rank', value: '#1', icon: Award, color: '#A78BFA' },
  ];

  const activities = [
    { action: 'Logged in from Chrome on Windows', time: '2 minutes ago', type: 'login', location: 'San Francisco, CA' },
    { action: 'Updated profile information', time: '2 hours ago', type: 'update', location: 'San Francisco, CA' },
    { action: 'Changed account password', time: '3 days ago', type: 'security', location: 'San Francisco, CA' },
    { action: 'Added new device to account', time: '1 week ago', type: 'device', location: 'New York, NY' },
  ];

  // Validate profile fields
  const validateProfile = (): boolean => {
    const errors: { [key: string]: string } = {};

    if (!profileData.fullName.trim()) {
      errors.fullName = 'Name is required';
    } else if (profileData.fullName.trim().length < 2) {
      errors.fullName = 'Name must be at least 2 characters';
    }

    if (!profileData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileData.email)) {
      errors.email = 'Invalid email format';
    }

    if (profileData.phone && !/^[\d\s\-+()]+$/.test(profileData.phone)) {
      errors.phone = 'Invalid phone format';
    }

    setProfileErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Save profile
  const handleSaveProfile = () => {
    if (validateProfile()) {
      setSaveSuccess(true);
      setIsEditing(false);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  // Validate and update password
  const handleUpdatePassword = () => {
    setPasswordError('');

    if (!passwords.current) {
      setPasswordError('Current password is required');
      return;
    }

    if (!passwords.new) {
      setPasswordError('New password is required');
      return;
    }

    const failedRules = PASSWORD_RULES.filter(rule => !rule.test(passwords.new));
    if (failedRules.length > 0) {
      setPasswordError('Password does not meet requirements');
      return;
    }

    if (passwords.new !== passwords.confirm) {
      setPasswordError('Passwords do not match');
      return;
    }

    // Success
    setPasswordSuccess(true);
    setPasswords({ current: '', new: '', confirm: '' });
    setTimeout(() => setPasswordSuccess(false), 3000);
  };

  // Toggle notification
  const toggleNotification = (id: number) => {
    setNotificationSettings(prev =>
      prev.map(n => n.id === id ? { ...n, enabled: !n.enabled } : n)
    );
  };

  // Request to remove session (show confirmation)
  const requestRemoveSession = (id: number) => {
    setSessionToRemove(id);
    setConfirmModal('remove-session');
  };

  // Confirm remove session
  const confirmRemoveSession = () => {
    if (sessionToRemove) {
      setSessions(prev => prev.filter(s => s.id !== sessionToRemove));
    }
    closeConfirmModal();
  };

  // Request logout all sessions (show confirmation)
  const requestLogoutAll = () => {
    setConfirmModal('logout-all');
  };

  // Confirm logout all sessions
  const confirmLogoutAll = () => {
    setSessions(prev => prev.filter(s => s.current));
    closeConfirmModal();
  };

  // Request 2FA toggle (show confirmation)
  const request2FAToggle = () => {
    setConfirmModal('2fa');
  };

  // Confirm 2FA toggle
  const confirm2FAToggle = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    closeConfirmModal();
  };

  // Request delete account
  const requestDeleteAccount = () => {
    setConfirmInput('');
    setConfirmModal('delete');
  };

  // Confirm delete account
  const confirmDeleteAccount = () => {
    if (confirmInput === 'DELETE') {
      // In real app, this would call an API
      alert('Account deletion requested. You will receive an email confirmation.');
      closeConfirmModal();
    }
  };

  // Request deactivate account
  const requestDeactivateAccount = () => {
    setConfirmModal('deactivate');
  };

  // Confirm deactivate account
  const confirmDeactivateAccount = () => {
    // In real app, this would call an API
    alert('Account has been deactivated.');
    closeConfirmModal();
  };

  // Close confirmation modal
  const closeConfirmModal = () => {
    setConfirmModal(null);
    setConfirmInput('');
    setSessionToRemove(null);
  };

  // Get password strength
  const getPasswordStrength = () => {
    const passed = PASSWORD_RULES.filter(rule => rule.test(passwords.new)).length;
    if (passed === 0) return { label: '', color: '' };
    if (passed <= 2) return { label: 'Weak', color: '#FF4444' };
    if (passed <= 4) return { label: 'Medium', color: '#FFB800' };
    return { label: 'Strong', color: '#00FF66' };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Success Toast */}
      {saveSuccess && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-[#00FF66] text-[#050505] rounded-xl shadow-lg animate-pulse">
          <Check size={20} />
          <span className="font-medium">Profile saved successfully!</span>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative h-[280px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00FF66]/20 via-[#050505] to-[#00CC52]/10" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#00FF66]/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#00CC52]/20 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />
        </div>
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(0,255,102,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,102,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
        <button className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 bg-[#0F0F0F]/80 backdrop-blur-xl border border-[#1A1A1A] rounded-xl text-[#8F8F8F] hover:text-[#00FF66] hover:border-[#00FF66] transition-all text-sm">
          <Camera size={16} />
          Edit Cover
        </button>
      </div>

      {/* Profile Content */}
      <div className="relative px-8 -mt-32">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Sidebar */}
            <div className="lg:w-80">
              <div className="bg-[#0F0F0F]/90 backdrop-blur-xl border border-[#1A1A1A] rounded-2xl p-6 text-center">
                <div className="relative inline-block mb-4">
                  <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-[#00FF66] to-[#00CC52] flex items-center justify-center text-[#050505] font-bold text-5xl shadow-[0_0_60px_rgba(0,255,102,0.3)]">
                    {profileData.fullName.charAt(0).toUpperCase()}
                  </div>
                  <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#00FF66] rounded-xl flex items-center justify-center text-[#050505] hover:scale-110 transition-transform shadow-lg">
                    <Camera size={18} />
                  </button>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#00FF66] rounded-full border-4 border-[#0F0F0F]" />
                </div>

                <h1 className="text-2xl font-bold text-white mb-1">{profileData.fullName}</h1>
                <p className="text-[#8F8F8F] text-sm mb-4">{profileData.email}</p>
                
                <div className="flex items-center justify-center gap-2 mb-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#00FF66]/15 text-[#00FF66] text-xs font-semibold rounded-full border border-[#00FF66]/30">
                    <Shield size={12} />
                    Super Admin
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FFB800]/15 text-[#FFB800] text-xs font-semibold rounded-full border border-[#FFB800]/30">
                    <Award size={12} />
                    Pro
                  </span>
            </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  {stats.map((stat, idx) => (
                    <div key={idx} className="p-3 bg-[#1A1A1A]/50 rounded-xl border border-[#1A1A1A]">
                      <stat.icon size={18} style={{ color: stat.color }} className="mx-auto mb-2" />
                      <p className="text-xl font-bold text-white">{stat.value}</p>
                      <p className="text-[10px] text-[#8F8F8F]">{stat.label}</p>
            </div>
                  ))}
          </div>

                <div className="space-y-2">
                  <button className="w-full py-3 bg-gradient-to-r from-[#00FF66] to-[#00CC52] text-[#050505] font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(0,255,102,0.3)] transition-all">
                    View Public Profile
                  </button>
                  <button className="w-full py-3 bg-[#1A1A1A] text-[#8F8F8F] font-medium rounded-xl hover:bg-[#2A2A2A] hover:text-white transition-all">
                    Share Profile
                  </button>
              </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Tabs */}
              <div className="bg-[#0F0F0F]/90 backdrop-blur-xl border border-[#1A1A1A] rounded-2xl p-2 mb-6">
                <div className="flex gap-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium text-sm transition-all ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-[#00FF66] to-[#00CC52] text-[#050505]'
                          : 'text-[#8F8F8F] hover:text-white hover:bg-[#1A1A1A]'
                      }`}
                    >
                      <tab.icon size={18} />
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="bg-[#0F0F0F]/90 backdrop-blur-xl border border-[#1A1A1A] rounded-2xl overflow-hidden">
                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-xl font-bold text-white">Personal Information</h2>
                        <p className="text-sm text-[#8F8F8F]">Update your personal details here</p>
                      </div>
                      <button
                        onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                          isEditing
                            ? 'bg-[#00FF66] text-[#050505]'
                            : 'bg-[#1A1A1A] text-[#8F8F8F] hover:text-white'
                        }`}
                      >
                        {isEditing ? <Check size={16} /> : <Edit3 size={16} />}
                        {isEditing ? 'Save Changes' : 'Edit Profile'}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { key: 'fullName', label: 'Full Name', icon: User, required: true },
                        { key: 'email', label: 'Email Address', icon: Mail, required: true },
                        { key: 'phone', label: 'Phone Number', icon: Phone },
                        { key: 'location', label: 'Location', icon: MapPin },
                        { key: 'company', label: 'Company', icon: Briefcase },
                        { key: 'timezone', label: 'Timezone', icon: Globe },
                      ].map((field) => (
                        <div key={field.key}>
                          <label className="block text-xs text-[#8F8F8F] mb-2 flex items-center gap-2">
                            <field.icon size={12} />
                            {field.label}
                            {field.required && <span className="text-[#FF4444]">*</span>}
                          </label>
                          <input
                            type="text"
                            value={profileData[field.key as keyof typeof profileData]}
                            onChange={(e) => {
                              setProfileData(prev => ({ ...prev, [field.key]: e.target.value }));
                              if (profileErrors[field.key]) {
                                setProfileErrors(prev => ({ ...prev, [field.key]: '' }));
                              }
                            }}
                            disabled={!isEditing}
                            className={`w-full px-4 py-3 rounded-xl text-sm transition-all ${
                              isEditing
                                ? profileErrors[field.key]
                                  ? 'bg-[#1A1A1A] border-2 border-[#FF4444] text-white'
                                  : 'bg-[#1A1A1A] border-2 border-[#2A2A2A] text-white focus:border-[#00FF66] focus:outline-none'
                                : 'bg-[#0A0A0A] border border-[#1A1A1A] text-[#D5FFD6] cursor-default'
                            }`}
                          />
                          {profileErrors[field.key] && (
                            <p className="text-[#FF4444] text-xs mt-1 flex items-center gap-1">
                              <AlertCircle size={12} />
                              {profileErrors[field.key]}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="mt-6">
                      <label className="block text-xs text-[#8F8F8F] mb-2">Bio</label>
                      <textarea
                        disabled={!isEditing}
                        value={profileData.bio}
                        onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                        rows={3}
                        className={`w-full px-4 py-3 rounded-xl text-sm resize-none transition-all ${
                          isEditing
                            ? 'bg-[#1A1A1A] border-2 border-[#2A2A2A] text-white focus:border-[#00FF66] focus:outline-none'
                            : 'bg-[#0A0A0A] border border-[#1A1A1A] text-[#D5FFD6] cursor-default'
                        }`}
                      />
                    </div>

                    {isEditing && (
                      <button
                        onClick={() => { setIsEditing(false); setProfileErrors({}); }}
                        className="mt-4 text-[#8F8F8F] text-sm hover:text-white"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                )}

                {/* Security Tab */}
                {activeTab === 'security' && (
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-white mb-2">Security Settings</h2>
                    <p className="text-sm text-[#8F8F8F] mb-6">Manage your account security</p>

                    {/* Password Section */}
                    <div className="p-5 bg-[#0A0A0A] rounded-xl border border-[#1A1A1A] mb-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#00FF66]/15 flex items-center justify-center text-[#00FF66]">
                            <Lock size={20} />
                          </div>
                          <div>
                            <p className="font-medium text-white">Change Password</p>
                            <p className="text-xs text-[#8F8F8F]">Update your password</p>
              </div>
            </div>
                        {passwordSuccess && (
                          <span className="px-3 py-1 bg-[#00FF66]/15 text-[#00FF66] text-xs font-medium rounded-full flex items-center gap-1">
                            <Check size={12} /> Updated
                          </span>
                        )}
                      </div>
                      
                      <div className="space-y-3">
                        <div className="relative">
                          <input
                            type={showCurrentPassword ? 'text' : 'password'}
                            placeholder="Current Password *"
                            value={passwords.current}
                            onChange={(e) => setPasswords(prev => ({ ...prev, current: e.target.value }))}
                            className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl text-sm text-white focus:border-[#00FF66] focus:outline-none pr-12"
                          />
                          <button
                            type="button"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8F8F8F] hover:text-white"
                          >
                            {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>

                        <div className="relative">
                          <input
                            type={showNewPassword ? 'text' : 'password'}
                            placeholder="New Password *"
                            value={passwords.new}
                            onChange={(e) => setPasswords(prev => ({ ...prev, new: e.target.value }))}
                            className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl text-sm text-white focus:border-[#00FF66] focus:outline-none pr-12"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8F8F8F] hover:text-white"
                          >
                            {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>

                        {/* Password Strength */}
                        {passwords.new && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-[#8F8F8F]">Password strength:</span>
                              <span className="text-xs font-medium" style={{ color: passwordStrength.color }}>
                                {passwordStrength.label}
                              </span>
                            </div>
                            <div className="grid grid-cols-5 gap-1">
                              {PASSWORD_RULES.map((rule) => (
                                <div
                                  key={rule.id}
                                  className={`h-1 rounded-full transition-all ${
                                    rule.test(passwords.new) ? 'bg-[#00FF66]' : 'bg-[#2A2A2A]'
                                  }`}
                                />
                              ))}
                            </div>
                            <div className="grid grid-cols-1 gap-1 mt-2">
                              {PASSWORD_RULES.map((rule) => (
                                <div key={rule.id} className="flex items-center gap-2 text-xs">
                                  {rule.test(passwords.new) ? (
                                    <Check size={12} className="text-[#00FF66]" />
                                  ) : (
                                    <X size={12} className="text-[#8F8F8F]" />
                                  )}
                                  <span className={rule.test(passwords.new) ? 'text-[#00FF66]' : 'text-[#8F8F8F]'}>
                                    {rule.label}
                                  </span>
                                </div>
                              ))}
                            </div>
              </div>
                        )}

                        <input
                          type="password"
                          placeholder="Confirm New Password *"
                          value={passwords.confirm}
                          onChange={(e) => setPasswords(prev => ({ ...prev, confirm: e.target.value }))}
                          className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl text-sm text-white focus:border-[#00FF66] focus:outline-none"
                        />

                        {passwordError && (
                          <p className="text-[#FF4444] text-xs flex items-center gap-1">
                            <AlertCircle size={12} />
                            {passwordError}
                          </p>
                        )}

                        <button 
                          onClick={handleUpdatePassword}
                          className="w-full py-3 bg-gradient-to-r from-[#00FF66] to-[#00CC52] text-[#050505] font-semibold rounded-xl hover:shadow-[0_0_20px_rgba(0,255,102,0.3)] transition-all"
                        >
                          Update Password
                        </button>
              </div>
            </div>

                    {/* 2FA */}
                    <div className="p-5 bg-[#0A0A0A] rounded-xl border border-[#1A1A1A] mb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#FFB800]/15 flex items-center justify-center text-[#FFB800]">
                            <Shield size={20} />
                          </div>
                          <div>
                            <p className="font-medium text-white">Two-Factor Authentication</p>
                            <p className="text-xs text-[#8F8F8F]">
                              {twoFactorEnabled ? 'Enabled - Extra security active' : 'Disabled - Enable for better security'}
                            </p>
                          </div>
              </div>
                        <button
                          onClick={request2FAToggle}
                          className={`relative w-12 h-6 rounded-full transition-all ${
                            twoFactorEnabled ? 'bg-gradient-to-r from-[#00FF66] to-[#00CC52]' : 'bg-[#1A1A1A]'
                          }`}
                        >
                          <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                            twoFactorEnabled ? 'translate-x-6' : 'translate-x-0.5'
                          }`} />
                        </button>
              </div>
            </div>

                    {/* Sessions */}
                    <div className="p-5 bg-[#0A0A0A] rounded-xl border border-[#1A1A1A]">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#60A5FA]/15 flex items-center justify-center text-[#60A5FA]">
                            <Globe size={20} />
                          </div>
                          <div>
                            <p className="font-medium text-white">Active Sessions ({sessions.length})</p>
                            <p className="text-xs text-[#8F8F8F]">Manage logged in devices</p>
                          </div>
                        </div>
                        {sessions.length > 1 && (
                          <button 
                            onClick={requestLogoutAll}
                            className="text-[#FF4444] text-sm font-medium hover:text-[#FF6666]"
                          >
                            Logout Others
                          </button>
                        )}
                      </div>
                      <div className="space-y-3">
                        {sessions.map((session) => (
                          <div key={session.id} className="flex items-center justify-between p-3 bg-[#1A1A1A] rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className={`w-2 h-2 rounded-full ${session.current ? 'bg-[#00FF66]' : 'bg-[#8F8F8F]'}`} />
                              <div>
                                <p className="text-sm text-white">{session.device}</p>
                                <p className="text-xs text-[#8F8F8F]">{session.location} • {session.time}</p>
                              </div>
                            </div>
                            {!session.current && (
                              <button 
                                onClick={() => requestRemoveSession(session.id)}
                                className="text-[#FF4444] text-xs font-medium hover:text-[#FF6666]"
                              >
                                Remove
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Notifications Tab */}
                {activeTab === 'notifications' && (
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-white mb-2">Notification Preferences</h2>
                    <p className="text-sm text-[#8F8F8F] mb-6">Choose how you want to be notified</p>

                    <div className="space-y-3">
                      {notificationSettings.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-4 bg-[#0A0A0A] rounded-xl border border-[#1A1A1A] hover:border-[#2A2A2A] transition-all group"
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                              item.enabled ? 'bg-[#00FF66]/15 text-[#00FF66]' : 'bg-[#1A1A1A] text-[#8F8F8F]'
                            }`}>
                              <item.icon size={22} />
                            </div>
                            <div>
                              <p className="font-medium text-white">{item.title}</p>
                              <p className="text-sm text-[#8F8F8F]">{item.description}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => toggleNotification(item.id)}
                            className={`relative w-12 h-6 rounded-full transition-all ${
                              item.enabled ? 'bg-gradient-to-r from-[#00FF66] to-[#00CC52]' : 'bg-[#1A1A1A]'
                            }`}
                          >
                            <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                              item.enabled ? 'translate-x-6' : 'translate-x-0.5'
                            }`} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Activity Tab */}
                {activeTab === 'activity' && (
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-white mb-2">Recent Activity</h2>
                    <p className="text-sm text-[#8F8F8F] mb-6">Your account activity log</p>

                    <div className="relative">
                      <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-[#00FF66] via-[#1A1A1A] to-transparent" />
                      
                      <div className="space-y-4">
                        {activities.map((activity, idx) => (
                          <div key={idx} className="relative flex gap-4 pl-12">
                            <div className={`absolute left-3 w-4 h-4 rounded-full border-2 border-[#0F0F0F] ${
                              idx === 0 ? 'bg-[#00FF66]' : 'bg-[#1A1A1A]'
                            }`} />
                            
                            <div className="flex-1 p-4 bg-[#0A0A0A] rounded-xl border border-[#1A1A1A]">
                              <div className="flex items-start justify-between">
                                <div>
                                  <p className="font-medium text-white">{activity.action}</p>
                                  <div className="flex items-center gap-3 mt-1">
                                    <span className="flex items-center gap-1 text-xs text-[#8F8F8F]">
                                      <Clock size={12} />
                                      {activity.time}
                                    </span>
                                    <span className="flex items-center gap-1 text-xs text-[#8F8F8F]">
                                      <MapPin size={12} />
                                      {activity.location}
                                    </span>
                                  </div>
                                </div>
                                <span className={`px-2 py-1 text-xs font-medium rounded-md ${
                                  activity.type === 'security' 
                                    ? 'bg-[#FFB800]/15 text-[#FFB800]'
                                    : activity.type === 'login'
                                    ? 'bg-[#00FF66]/15 text-[#00FF66]'
                                    : 'bg-[#60A5FA]/15 text-[#60A5FA]'
                                }`}>
                                  {activity.type}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Danger Zone */}
              {activeTab === 'security' && (
                <div className="mt-6 p-6 bg-[#0F0F0F]/90 backdrop-blur-xl border border-[#FF4444]/30 rounded-2xl">
                  <h3 className="text-lg font-bold text-[#FF4444] mb-2">Danger Zone</h3>
                  <p className="text-sm text-[#8F8F8F] mb-4">These actions are irreversible</p>
                  <div className="flex gap-3">
                    <button 
                      onClick={requestDeactivateAccount}
                      className="px-4 py-2 bg-[#FF4444]/15 border border-[#FF4444]/30 text-[#FF4444] font-medium rounded-xl hover:bg-[#FF4444]/25 transition-all text-sm"
                    >
                      Deactivate Account
                    </button>
                    <button 
                      onClick={requestDeleteAccount}
                      className="px-4 py-2 bg-[#FF4444] text-white font-medium rounded-xl hover:bg-[#FF5555] transition-all text-sm"
                    >
                      Delete Account
                    </button>
                  </div>
              </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modals */}
      {confirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-[#0F0F0F] rounded-2xl w-full max-w-md border border-[#1A1A1A] shadow-2xl overflow-hidden animate-pulse">
            {/* Delete Account Modal */}
            {confirmModal === 'delete' && (
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-[#FF4444]/20 flex items-center justify-center">
                    <Trash2 size={28} className="text-[#FF4444]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Delete Account</h3>
                    <p className="text-sm text-[#8F8F8F]">This action cannot be undone</p>
                  </div>
                </div>
                
                <div className="p-4 bg-[#FF4444]/10 border border-[#FF4444]/30 rounded-xl mb-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle size={20} className="text-[#FF4444] mt-0.5" />
                    <div className="text-sm text-[#FF4444]">
                      <p className="font-medium mb-1">Warning: This will permanently delete:</p>
                      <ul className="list-disc list-inside text-xs space-y-1 text-[#FF6666]">
                        <li>All your profile data</li>
                        <li>All connected devices</li>
                        <li>All activity history</li>
                        <li>All settings and preferences</li>
                      </ul>
                    </div>
                  </div>
        </div>

                <div className="mb-6">
                  <label className="block text-sm text-[#8F8F8F] mb-2">
                    Type <span className="text-[#FF4444] font-bold">DELETE</span> to confirm
                  </label>
                  <input
                    type="text"
                    value={confirmInput}
                    onChange={(e) => setConfirmInput(e.target.value.toUpperCase())}
                    placeholder="Type DELETE"
                    className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl text-white text-sm focus:border-[#FF4444] focus:outline-none"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={closeConfirmModal}
                    className="flex-1 py-3 bg-[#1A1A1A] text-[#8F8F8F] font-medium rounded-xl hover:bg-[#2A2A2A] transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDeleteAccount}
                    disabled={confirmInput !== 'DELETE'}
                    className={`flex-1 py-3 font-semibold rounded-xl transition-all ${
                      confirmInput === 'DELETE'
                        ? 'bg-[#FF4444] text-white hover:bg-[#FF5555]'
                        : 'bg-[#2A2A2A] text-[#5A5A5A] cursor-not-allowed'
                    }`}
                  >
                    Delete Forever
                  </button>
                </div>
              </div>
            )}

            {/* Deactivate Account Modal */}
            {confirmModal === 'deactivate' && (
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-[#FFB800]/20 flex items-center justify-center">
                    <Power size={28} className="text-[#FFB800]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Deactivate Account</h3>
                    <p className="text-sm text-[#8F8F8F]">You can reactivate anytime</p>
                  </div>
                </div>
                
                <p className="text-sm text-[#8F8F8F] mb-6">
                  Deactivating your account will hide your profile and disable all notifications. 
                  You can reactivate by logging in again.
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={closeConfirmModal}
                    className="flex-1 py-3 bg-[#1A1A1A] text-[#8F8F8F] font-medium rounded-xl hover:bg-[#2A2A2A] transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDeactivateAccount}
                    className="flex-1 py-3 bg-[#FFB800] text-[#050505] font-semibold rounded-xl hover:bg-[#FFCC00] transition-all"
                  >
                    Deactivate
                  </button>
                </div>
              </div>
            )}

            {/* Logout All Sessions Modal */}
            {confirmModal === 'logout-all' && (
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-[#60A5FA]/20 flex items-center justify-center">
                    <LogOut size={28} className="text-[#60A5FA]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Logout Other Sessions</h3>
                    <p className="text-sm text-[#8F8F8F]">Sign out from other devices</p>
                  </div>
          </div>

                <p className="text-sm text-[#8F8F8F] mb-6">
                  This will sign you out from all other devices and sessions. 
                  Your current session will remain active.
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={closeConfirmModal}
                    className="flex-1 py-3 bg-[#1A1A1A] text-[#8F8F8F] font-medium rounded-xl hover:bg-[#2A2A2A] transition-all"
                  >
                    Cancel
            </button>
                  <button
                    onClick={confirmLogoutAll}
                    className="flex-1 py-3 bg-[#60A5FA] text-white font-semibold rounded-xl hover:bg-[#7BB5FF] transition-all"
                  >
                    Logout Others
            </button>
          </div>
              </div>
            )}

            {/* Remove Session Modal */}
            {confirmModal === 'remove-session' && (
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-[#FF4444]/20 flex items-center justify-center">
                    <Smartphone size={28} className="text-[#FF4444]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Remove Session</h3>
                    <p className="text-sm text-[#8F8F8F]">Sign out this device</p>
        </div>
      </div>

                <p className="text-sm text-[#8F8F8F] mb-6">
                  This device will be signed out immediately. 
                  The user will need to log in again to access the account.
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={closeConfirmModal}
                    className="flex-1 py-3 bg-[#1A1A1A] text-[#8F8F8F] font-medium rounded-xl hover:bg-[#2A2A2A] transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmRemoveSession}
                    className="flex-1 py-3 bg-[#FF4444] text-white font-semibold rounded-xl hover:bg-[#FF5555] transition-all"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}

            {/* 2FA Toggle Modal */}
            {confirmModal === '2fa' && (
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                    twoFactorEnabled ? 'bg-[#FF4444]/20' : 'bg-[#00FF66]/20'
                  }`}>
                    <Shield size={28} className={twoFactorEnabled ? 'text-[#FF4444]' : 'text-[#00FF66]'} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {twoFactorEnabled ? 'Disable' : 'Enable'} 2FA
                    </h3>
                    <p className="text-sm text-[#8F8F8F]">
                      {twoFactorEnabled ? 'This will reduce security' : 'Add extra layer of security'}
                    </p>
                  </div>
                </div>
                
                {twoFactorEnabled ? (
                  <div className="p-4 bg-[#FF4444]/10 border border-[#FF4444]/30 rounded-xl mb-6">
                    <div className="flex items-start gap-3">
                      <AlertTriangle size={20} className="text-[#FF4444] mt-0.5" />
                      <p className="text-sm text-[#FF4444]">
                        Disabling 2FA will make your account less secure. 
                        Anyone with your password will be able to access your account.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-[#00FF66]/10 border border-[#00FF66]/30 rounded-xl mb-6">
                    <div className="flex items-start gap-3">
                      <Check size={20} className="text-[#00FF66] mt-0.5" />
                      <p className="text-sm text-[#00FF66]">
                        Enabling 2FA adds an extra layer of security. 
                        You'll need to verify your identity when logging in from new devices.
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={closeConfirmModal}
                    className="flex-1 py-3 bg-[#1A1A1A] text-[#8F8F8F] font-medium rounded-xl hover:bg-[#2A2A2A] transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirm2FAToggle}
                    className={`flex-1 py-3 font-semibold rounded-xl transition-all ${
                      twoFactorEnabled
                        ? 'bg-[#FF4444] text-white hover:bg-[#FF5555]'
                        : 'bg-[#00FF66] text-[#050505] hover:bg-[#00CC52]'
                    }`}
                  >
                    {twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA'}
                  </button>
                </div>
              </div>
            )}
            </div>
        </div>
      )}
    </div>
  );
}
