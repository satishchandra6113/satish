import { User, Mail, MapPin, Phone, Shield, Bell, Volume2, MessageSquare, Upload } from 'lucide-react';

export function ProfilePage() {
  const platformSettings = [
    { id: 1, title: 'Email notifications', description: 'Receive email updates', enabled: true },
    { id: 2, title: 'Push notifications', description: 'Get push notifications on mobile', enabled: true },
    { id: 3, title: 'SMS notifications', description: 'Receive SMS alerts', enabled: false },
    { id: 4, title: 'Marketing emails', description: 'Get product updates', enabled: true },
  ];

  return (
    <div className="p-[24px] space-y-[24px] bg-[#050505] min-h-screen">{/* Welcome Card */}
      <div className="relative bg-gradient-to-br from-[#00FF66] to-[#00CC52] rounded-[20px] p-[32px] overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
        <div className="relative z-10">
          <h2 className="text-[28px] font-bold text-[#050505] mb-[8px]">Welcome back, Admin!</h2>
          <p className="text-[14px] text-[#050505]/70">
            Glad to see you again! Here's your profile overview and settings.
          </p>
        </div>
      </div>

      {/* Profile Info & Platform Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[24px]">
        {/* Profile Information */}
        <div className="bg-gradient-to-br from-[#0F0F0F] to-[#0A0A0A] border border-[#1A1A1A] rounded-[20px] p-[24px]">
          <h3 className="text-[18px] font-semibold text-white mb-[24px]">Profile Information</h3>
          
          {/* Avatar Upload */}
          <div className="flex items-center gap-[16px] mb-[24px] pb-[24px] border-b border-[#1A1A1A]">
            <div className="w-[80px] h-[80px] rounded-[16px] bg-gradient-to-br from-[#00FF66] to-[#00CC52] flex items-center justify-center text-[#050505] font-bold text-[32px]">
              A
            </div>
            <div className="flex-1">
              <p className="text-[16px] font-semibold text-white mb-[4px]">Admin User</p>
              <p className="text-[12px] text-[#8F8F8F] mb-[12px]">Super Administrator</p>
              <button className="flex items-center gap-[8px] px-[12px] py-[8px] bg-[rgba(0,255,102,0.1)] border border-[#00FF66] text-[#00FF66] rounded-[8px] text-[12px] font-medium hover:bg-[rgba(0,255,102,0.2)] transition-all">
                <Upload size={14} />
                Upload new photo
              </button>
            </div>
          </div>

          {/* Info Fields */}
          <div className="space-y-[20px]">
            <div className="flex items-start gap-[16px]">
              <div className="p-[10px] rounded-[10px] bg-[rgba(0,255,102,0.1)] border border-[#00FF66] text-[#00FF66]">
                <User size={18} />
              </div>
              <div className="flex-1">
                <p className="text-[12px] text-[#8F8F8F] mb-[4px]">Full Name</p>
                <p className="text-[14px] font-medium text-white">Administrator User</p>
              </div>
            </div>

            <div className="flex items-start gap-[16px]">
              <div className="p-[10px] rounded-[10px] bg-[rgba(0,255,102,0.1)] border border-[#00FF66] text-[#00FF66]">
                <Mail size={18} />
              </div>
              <div className="flex-1">
                <p className="text-[12px] text-[#8F8F8F] mb-[4px]">Email Address</p>
                <p className="text-[14px] font-medium text-white">admin@cybercyko.com</p>
              </div>
            </div>

            <div className="flex items-start gap-[16px]">
              <div className="p-[10px] rounded-[10px] bg-[rgba(0,255,102,0.1)] border border-[#00FF66] text-[#00FF66]">
                <Phone size={18} />
              </div>
              <div className="flex-1">
                <p className="text-[12px] text-[#8F8F8F] mb-[4px]">Phone Number</p>
                <p className="text-[14px] font-medium text-white">+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="flex items-start gap-[16px]">
              <div className="p-[10px] rounded-[10px] bg-[rgba(0,255,102,0.1)] border border-[#00FF66] text-[#00FF66]">
                <MapPin size={18} />
              </div>
              <div className="flex-1">
                <p className="text-[12px] text-[#8F8F8F] mb-[4px]">Location</p>
                <p className="text-[14px] font-medium text-white">San Francisco, CA</p>
              </div>
            </div>

            <div className="flex items-start gap-[16px]">
              <div className="p-[10px] rounded-[10px] bg-[rgba(0,255,102,0.1)] border border-[#00FF66] text-[#00FF66]">
                <Shield size={18} />
              </div>
              <div className="flex-1">
                <p className="text-[12px] text-[#8F8F8F] mb-[4px]">Role & Permissions</p>
                <p className="text-[14px] font-medium text-white">Super Admin - Full Access</p>
              </div>
            </div>
          </div>

          <button className="w-full mt-[24px] py-[12px] bg-gradient-to-r from-[#00FF66] to-[#00CC52] text-[#050505] font-semibold rounded-[12px] hover:opacity-90 transition-all">
            Edit Profile
          </button>
        </div>

        {/* Platform Settings */}
        <div className="bg-gradient-to-br from-[#0F0F0F] to-[#0A0A0A] border border-[#1A1A1A] rounded-[20px] p-[24px]">
          <h3 className="text-[18px] font-semibold text-white mb-[24px]">Platform Settings</h3>
          
          <div className="space-y-[16px]">
            {platformSettings.map((setting) => (
              <div
                key={setting.id}
                className="flex items-center justify-between p-[16px] bg-[rgba(255,255,255,0.02)] border border-[#1A1A1A] rounded-[12px] hover:border-[#00FF66] transition-all"
              >
                <div className="flex items-center gap-[12px]">
                  <div className="p-[10px] rounded-[10px] bg-[rgba(0,255,102,0.1)] border border-[#00FF66] text-[#00FF66]">
                    {setting.id === 1 && <Mail size={18} />}
                    {setting.id === 2 && <Bell size={18} />}
                    {setting.id === 3 && <MessageSquare size={18} />}
                    {setting.id === 4 && <Volume2 size={18} />}
                  </div>
                  <div>
                    <p className="text-[14px] font-medium text-white">{setting.title}</p>
                    <p className="text-[12px] text-[#8F8F8F]">{setting.description}</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked={setting.enabled} />
                  <div className="w-[48px] h-[24px] bg-[#1A1A1A] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-[24px] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-[20px] after:w-[20px] after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#00FF66] peer-checked:to-[#00CC52]" />
                </label>
              </div>
            ))}
          </div>

          {/* Account Actions */}
          <div className="mt-[24px] pt-[24px] border-t border-[#1A1A1A] space-y-[12px]">
            <button className="w-full py-[12px] bg-[rgba(0,255,102,0.1)] border border-[#00FF66] text-[#00FF66] font-medium rounded-[12px] hover:bg-[rgba(0,255,102,0.2)] transition-all">
              Change Password
            </button>
            <button className="w-full py-[12px] bg-[rgba(255,68,68,0.1)] border border-[#FF4444] text-[#FF4444] font-medium rounded-[12px] hover:bg-[rgba(255,68,68,0.2)] transition-all">
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gradient-to-br from-[#0F0F0F] to-[#0A0A0A] border border-[#1A1A1A] rounded-[20px] p-[24px]">
        <h3 className="text-[18px] font-semibold text-white mb-[24px]">Recent Activity</h3>
        
        <div className="space-y-[16px]">
          {[
            { action: 'Login from new device', time: '2 hours ago', type: 'security' },
            { action: 'Profile information updated', time: '1 day ago', type: 'info' },
            { action: 'Password changed successfully', time: '3 days ago', type: 'security' },
            { action: 'New notification settings saved', time: '5 days ago', type: 'info' },
          ].map((activity, index) => (
            <div
              key={index}
              className="flex items-center gap-[16px] p-[16px] bg-[rgba(255,255,255,0.02)] border border-[#1A1A1A] rounded-[12px]"
            >
              <div className={`p-[10px] rounded-[10px] ${
                activity.type === 'security'
                  ? 'bg-[rgba(255,204,0,0.1)] border border-[#FFCC00] text-[#FFCC00]'
                  : 'bg-[rgba(0,255,102,0.1)] border border-[#00FF66] text-[#00FF66]'
              }`}>
                {activity.type === 'security' ? <Shield size={18} /> : <Bell size={18} />}
              </div>
              <div className="flex-1">
                <p className="text-[14px] font-medium text-white">{activity.action}</p>
                <p className="text-[12px] text-[#8F8F8F]">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}