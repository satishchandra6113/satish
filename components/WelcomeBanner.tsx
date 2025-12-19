import { Zap, TrendingUp, Shield } from 'lucide-react';

export function WelcomeBanner() {
  return (
    <div className="relative bg-gradient-to-br from-[#00FF66] via-[#00CC52] to-[#009944] rounded-[20px] p-[32px] overflow-hidden mb-[24px]">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-[12px] mb-[12px]">
            <div className="p-[8px] bg-[rgba(0,0,0,0.2)] rounded-[10px] backdrop-blur-sm">
              <Zap size={24} className="text-[#050505]" />
            </div>
            <h1 className="text-[32px] font-bold text-[#050505]">
              Welcome to Cybercyko
            </h1>
          </div>
          <p className="text-[16px] text-[#050505]/80 max-w-[600px] mb-[24px]">
            Your complete admin management platform for monitoring users, devices, applications, and security across your entire organization.
          </p>
          
          {/* Quick Stats */}
          <div className="flex items-center gap-[32px]">
            <div className="flex items-center gap-[12px]">
              <div className="p-[10px] bg-[rgba(0,0,0,0.15)] rounded-[10px] backdrop-blur-sm">
                <TrendingUp size={20} className="text-[#050505]" />
              </div>
              <div>
                <p className="text-[20px] font-bold text-[#050505]">+24%</p>
                <p className="text-[12px] text-[#050505]/70">Growth</p>
              </div>
            </div>
            
            <div className="flex items-center gap-[12px]">
              <div className="p-[10px] bg-[rgba(0,0,0,0.15)] rounded-[10px] backdrop-blur-sm">
                <Shield size={20} className="text-[#050505]" />
              </div>
              <div>
                <p className="text-[20px] font-bold text-[#050505]">99.8%</p>
                <p className="text-[12px] text-[#050505]/70">Uptime</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side decoration */}
        <div className="hidden lg:block">
          <div className="relative w-[200px] h-[200px]">
            {/* Animated circles */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute w-[160px] h-[160px] rounded-full border-4 border-[#050505]/10 animate-ping" style={{ animationDuration: '3s' }} />
              <div className="absolute w-[120px] h-[120px] rounded-full border-4 border-[#050505]/20 animate-ping" style={{ animationDuration: '2s' }} />
              <div className="absolute w-[80px] h-[80px] rounded-full bg-[#050505]/20 backdrop-blur-sm flex items-center justify-center">
                <Shield size={40} className="text-[#050505]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
