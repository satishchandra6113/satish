import { useState, useEffect } from 'react';
import { X, CheckCircle, Mail, Clock, Building, User as UserIcon, Edit, Key, Trash2, Send, Ban, Activity, Eye, EyeOff, Copy, Check, ChevronLeft, Save, AlertTriangle, Shield, Phone, Tag } from 'lucide-react';
import { User } from '../types/user';

interface UserDetailsModalProps {
    user: User;
    onClose: () => void;
    onUpdate: (updatedUser: User) => void;
    onDelete: (userId: string) => void;
}

type ModalView = 'details' | 'edit' | 'resetPassword' | 'delete' | 'activity';

const AVAILABLE_ROLES = ['Admin', 'Engineers', 'Sales', 'Customer Success', 'User'];

export function UserDetailsModal({ user: initialUser, onClose, onUpdate, onDelete }: UserDetailsModalProps) {
    const [user, setUser] = useState(initialUser);
    const [modalView, setModalView] = useState<ModalView>('details');

    // Edit form state
    const [editForm, setEditForm] = useState({
        name: initialUser.name,
        email: initialUser.email,
        roles: [...initialUser.roles],
        status: initialUser.status,
        phone: initialUser.phone || '',
        department: initialUser.department || '',
        customFields: initialUser.customFields ? [...initialUser.customFields] : [] as { id: number; label: string; value: string }[]
    });

    // Reset password state
    const [newPassword, setNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordCopied, setPasswordCopied] = useState(false);

    // Action states
    const [actionSuccess, setActionSuccess] = useState<string | null>(null);
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        setUser(initialUser);
        setEditForm({
            name: initialUser.name,
            email: initialUser.email,
            roles: [...initialUser.roles],
            status: initialUser.status,
            phone: initialUser.phone || '',
            department: initialUser.department || '',
            customFields: initialUser.customFields ? [...initialUser.customFields] : []
        });
    }, [initialUser]);

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
        setActionLoading(true);
        setTimeout(() => {
            const updatedUser = {
                ...user,
                name: editForm.name,
                email: editForm.email,
                roles: editForm.roles,
                status: editForm.status as 'Verified' | 'Pending' | 'Suspended',
                phone: editForm.phone,
                department: editForm.department,
                customFields: editForm.customFields
            };
            setUser(updatedUser);
            onUpdate(updatedUser);
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
        if (!newPassword) return;
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
        setActionLoading(true);
        setTimeout(() => {
            onDelete(user.id);
            setActionLoading(false);
            onClose();
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
        setActionSuccess('Email dialog opened!');
        setTimeout(() => setActionSuccess(null), 2000);
    };

    // Suspend/Activate user
    const handleToggleSuspend = () => {
        const newStatus = user.status === 'Suspended' ? 'Verified' : 'Suspended';
        const updatedUser = { ...user, status: newStatus };
        setUser(updatedUser);
        onUpdate(updatedUser);
        setActionSuccess(newStatus === 'Suspended' ? 'User suspended!' : 'User activated!');
        setTimeout(() => setActionSuccess(null), 2000);
    };

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="bg-[#0F0F0F] rounded-[20px] w-full max-w-xl border border-[#1A1A1A] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
                style={{ animation: 'fadeInUp 0.2s ease-out' }}
            >
                {/* Header with Avatar */}
                <div className="relative p-[24px] bg-gradient-to-br from-[rgba(0,255,102,0.15)] via-[rgba(0,255,102,0.05)] to-transparent border-b border-[#1A1A1A]">
                    <button
                        onClick={onClose}
                        className="absolute top-[16px] right-[16px] p-[8px] rounded-[8px] text-[#8F8F8F] hover:bg-[rgba(255,255,255,0.1)] hover:text-white transition-all"
                    >
                        <X size={20} />
                    </button>

                    <div className="flex items-center gap-[16px]">
                        <div className="w-[72px] h-[72px] rounded-[16px] bg-gradient-to-br from-[#00FF66] to-[#00CC52] flex items-center justify-center shadow-[0_8px_32px_rgba(0,255,102,0.3)]">
                            {user.avatar ? (
                                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-[16px]" />
                            ) : (
                                <span className="text-[24px] font-bold text-[#050505]">{user.name.substring(0, 2).toUpperCase()}</span>
                            )}
                        </div>
                        <div>
                            <h2 className="text-[20px] font-bold text-white mb-[4px]">{user.name}</h2>
                            <p className="text-[14px] text-[#8F8F8F] mb-[8px]">{user.email}</p>
                            <div className="flex items-center gap-[8px]">
                                <span className={`px-[10px] py-[4px] rounded-full text-[11px] font-semibold ${user.status === 'Verified'
                                        ? 'bg-[rgba(0,255,102,0.15)] text-[#00FF66]'
                                        : user.status === 'Pending'
                                            ? 'bg-[rgba(255,204,0,0.15)] text-[#FFCC00]'
                                            : 'bg-[rgba(255,68,68,0.15)] text-[#FF4444]'
                                    }`}>
                                    {user.status}
                                </span>
                                <span className={`px-[10px] py-[4px] rounded-full text-[11px] font-semibold ${user.isActive !== false
                                        ? 'bg-[rgba(0,255,102,0.15)] text-[#00FF66]'
                                        : 'bg-[rgba(255,68,68,0.15)] text-[#FF4444]'
                                    }`}>
                                    {user.isActive !== false ? 'Active' : 'Inactive'}
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
                                className={`flex items-center gap-[6px] px-[12px] py-[8px] text-[12px] font-medium rounded-[8px] transition-all ${user.status === 'Suspended'
                                        ? 'bg-[rgba(0,255,102,0.1)] border border-[#00FF66]/30 text-[#00FF66] hover:bg-[rgba(0,255,102,0.2)]'
                                        : 'bg-[rgba(255,184,0,0.1)] border border-[#FFB800]/30 text-[#FFB800] hover:bg-[rgba(255,184,0,0.2)]'
                                    }`}
                            >
                                {user.status === 'Suspended' ? <CheckCircle size={14} /> : <Ban size={14} />}
                                {user.status === 'Suspended' ? 'Activate' : 'Suspend'}
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
                                {user.roles.map((role, idx) => (
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
                                <p className="text-[12px] text-white truncate">{user.email}</p>
                            </div>
                            <div className="p-[14px] rounded-[10px] bg-[rgba(255,255,255,0.02)] border border-[#1A1A1A]">
                                <div className="flex items-center gap-[6px] mb-[6px]">
                                    <Clock size={12} className="text-[#8F8F8F]" />
                                    <span className="text-[10px] text-[#8F8F8F] uppercase">Last Login</span>
                                </div>
                                <p className="text-[12px] text-white">{user.lastLogin}</p>
                            </div>
                            <div className="p-[14px] rounded-[10px] bg-[rgba(255,255,255,0.02)] border border-[#1A1A1A]">
                                <div className="flex items-center gap-[6px] mb-[6px]">
                                    <Building size={12} className="text-[#8F8F8F]" />
                                    <span className="text-[10px] text-[#8F8F8F] uppercase">Department</span>
                                </div>
                                <p className="text-[12px] text-white">{user.department || 'Not assigned'}</p>
                            </div>
                            <div className="p-[14px] rounded-[10px] bg-[rgba(255,255,255,0.02)] border border-[#1A1A1A]">
                                <div className="flex items-center gap-[6px] mb-[6px]">
                                    <UserIcon size={12} className="text-[#8F8F8F]" />
                                    <span className="text-[10px] text-[#8F8F8F] uppercase">User ID</span>
                                </div>
                                <p className="text-[12px] text-white font-mono">#{user.id}</p>
                            </div>

                            {/* Extended Details */}
                            {user.phone && (
                                <div className="p-[14px] rounded-[10px] bg-[rgba(255,255,255,0.02)] border border-[#1A1A1A]">
                                    <div className="flex items-center gap-[6px] mb-[6px]">
                                        <Phone size={12} className="text-[#8F8F8F]" />
                                        <span className="text-[10px] text-[#8F8F8F] uppercase">Phone</span>
                                    </div>
                                    <p className="text-[12px] text-white">
                                        {user.countryCode} {user.phone}
                                    </p>
                                </div>
                            )}

                            {user.customFields && user.customFields.map(field => (
                                <div key={field.id} className="p-[14px] rounded-[10px] bg-[rgba(255,255,255,0.02)] border border-[#1A1A1A]">
                                    <div className="flex items-center gap-[6px] mb-[6px]">
                                        <Tag size={12} className="text-[#8F8F8F]" />
                                        <span className="text-[10px] text-[#8F8F8F] uppercase">{field.label}</span>
                                    </div>
                                    <p className="text-[12px] text-white">{field.value}</p>
                                </div>
                            ))}
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
                                <label className="block text-[11px] text-[#8F8F8F] uppercase mb-[8px]">Phone</label>
                                <input
                                    type="text"
                                    value={editForm.phone}
                                    onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                                    className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-[10px] px-[14px] py-[12px] text-white text-[14px] focus:outline-none focus:border-[#00FF66] transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] text-[#8F8F8F] uppercase mb-[8px]">Department</label>
                                <input
                                    type="text"
                                    value={editForm.department}
                                    onChange={(e) => setEditForm(prev => ({ ...prev, department: e.target.value }))}
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
                                            className={`px-[12px] py-[8px] rounded-[8px] text-[12px] font-medium transition-all ${editForm.roles.includes(role)
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
                            Generate a new password for <span className="text-white font-medium">{user.name}</span>.
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
                                        This action cannot be undone. All data associated with <span className="text-white font-medium">{user.name}</span> will be permanently removed.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-[14px] bg-[rgba(255,255,255,0.02)] border border-[#1A1A1A] rounded-[10px]">
                            <p className="text-[12px] text-[#8F8F8F] mb-[8px]">User to be deleted:</p>
                            <div className="flex items-center gap-[12px]">
                                <div className="w-[40px] h-[40px] rounded-[10px] bg-gradient-to-br from-[#FF4444] to-[#CC3333] flex items-center justify-center">
                                    <span className="text-[14px] font-bold text-white">{user.name.substring(0, 2).toUpperCase()}</span>
                                </div>
                                <div>
                                    <p className="text-[14px] font-medium text-white">{user.name}</p>
                                    <p className="text-[12px] text-[#8F8F8F]">{user.email}</p>
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
                                className="flex-1 flex items-center justify-center gap-[8px] py-[12px] bg-[rgba(255,68,68,0.1)] border border-[#FF4444]/30 text-[#FF4444] font-medium text-[13px] rounded-[10px] hover:bg-[rgba(255,68,68,0.2)] transition-all disabled:opacity-50"
                            >
                                {actionLoading ? (
                                    <div className="w-[18px] h-[18px] border-2 border-[#FF4444]/30 border-t-[#FF4444] rounded-full animate-spin" />
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
            </div>
        </div>
    );
}
