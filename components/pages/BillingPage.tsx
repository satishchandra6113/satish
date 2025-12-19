import { useState } from 'react';
import { Shield, FileText, Clock, CheckCircle, AlertTriangle, ChevronRight, Download, Calendar, Users, Building2, Car, Heart, Home, Briefcase, Plus, Eye, RefreshCw } from 'lucide-react';

interface Policy {
  id: number;
  name: string;
  type: 'health' | 'auto' | 'home' | 'business';
  policyNumber: string;
  premium: string;
  coverage: string;
  status: 'active' | 'pending' | 'expiring';
  nextPayment: string;
  expiryDate: string;
}

export function BillingPage() {
  const [selectedPolicy, setSelectedPolicy] = useState<number | null>(null);

  const policies: Policy[] = [
    { id: 1, name: 'Premium Health Cover', type: 'health', policyNumber: 'HLT-2024-78542', premium: '$450/mo', coverage: '$500,000', status: 'active', nextPayment: 'Apr 15, 2024', expiryDate: 'Mar 25, 2025' },
    { id: 2, name: 'Auto Protection Plus', type: 'auto', policyNumber: 'AUT-2024-34521', premium: '$180/mo', coverage: '$100,000', status: 'active', nextPayment: 'Apr 20, 2024', expiryDate: 'Jun 12, 2025' },
    { id: 3, name: 'Home Shield Pro', type: 'home', policyNumber: 'HOM-2024-92145', premium: '$320/mo', coverage: '$750,000', status: 'expiring', nextPayment: 'Apr 10, 2024', expiryDate: 'Apr 30, 2024' },
    { id: 4, name: 'Business Liability', type: 'business', policyNumber: 'BUS-2024-15478', premium: '$890/mo', coverage: '$2,000,000', status: 'active', nextPayment: 'May 1, 2024', expiryDate: 'Dec 31, 2024' },
  ];

  const claims = [
    { id: 1, type: 'Auto Repair', date: 'Mar 15, 2024', amount: '$2,450', status: 'approved', policyType: 'auto' },
    { id: 2, type: 'Medical Checkup', date: 'Mar 10, 2024', amount: '$380', status: 'processing', policyType: 'health' },
    { id: 3, type: 'Property Damage', date: 'Feb 28, 2024', amount: '$5,200', status: 'approved', policyType: 'home' },
    { id: 4, type: 'Equipment Loss', date: 'Feb 20, 2024', amount: '$12,000', status: 'under_review', policyType: 'business' },
  ];

  const getPolicyIcon = (type: Policy['type']) => {
    switch (type) {
      case 'health': return <Heart size={20} />;
      case 'auto': return <Car size={20} />;
      case 'home': return <Home size={20} />;
      case 'business': return <Briefcase size={20} />;
    }
  };

  const getPolicyColor = (type: Policy['type']) => {
    switch (type) {
      case 'health': return { bg: 'from-[#FF6B6B] to-[#EE5A5A]', light: 'rgba(255,107,107,0.1)', border: '#FF6B6B' };
      case 'auto': return { bg: 'from-[#4ECDC4] to-[#3DB9B1]', light: 'rgba(78,205,196,0.1)', border: '#4ECDC4' };
      case 'home': return { bg: 'from-[#FFE66D] to-[#F4D35E]', light: 'rgba(255,230,109,0.1)', border: '#FFE66D' };
      case 'business': return { bg: 'from-[#A78BFA] to-[#8B5CF6]', light: 'rgba(167,139,250,0.1)', border: '#A78BFA' };
    }
  };

  const getStatusBadge = (status: Policy['status']) => {
    switch (status) {
      case 'active':
        return <span className="flex items-center gap-[4px] px-[10px] py-[4px] bg-[rgba(0,255,102,0.15)] text-[#00FF66] text-[11px] font-semibold rounded-full"><CheckCircle size={12} /> Active</span>;
      case 'pending':
        return <span className="flex items-center gap-[4px] px-[10px] py-[4px] bg-[rgba(255,184,0,0.15)] text-[#FFB800] text-[11px] font-semibold rounded-full"><Clock size={12} /> Pending</span>;
      case 'expiring':
        return <span className="flex items-center gap-[4px] px-[10px] py-[4px] bg-[rgba(255,68,68,0.15)] text-[#FF4444] text-[11px] font-semibold rounded-full"><AlertTriangle size={12} /> Expiring Soon</span>;
    }
  };

  const getClaimStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <span className="px-[10px] py-[4px] bg-[rgba(0,255,102,0.15)] text-[#00FF66] text-[11px] font-semibold rounded-full">Approved</span>;
      case 'processing':
        return <span className="px-[10px] py-[4px] bg-[rgba(96,165,250,0.15)] text-[#60A5FA] text-[11px] font-semibold rounded-full">Processing</span>;
      case 'under_review':
        return <span className="px-[10px] py-[4px] bg-[rgba(255,184,0,0.15)] text-[#FFB800] text-[11px] font-semibold rounded-full">Under Review</span>;
      default:
        return null;
    }
  };

  const totalCoverage = policies.reduce((sum, p) => sum + parseInt(p.coverage.replace(/[$,]/g, '')), 0);
  const totalPremium = policies.reduce((sum, p) => sum + parseInt(p.premium.replace(/[$\/mo,]/g, '')), 0);
  const activePolicies = policies.filter(p => p.status === 'active').length;

  return (
    <div className="p-[24px] space-y-[24px] bg-[#050505] min-h-screen">
      {/* Insurance Policy Overview Card */}
      <div className="relative bg-gradient-to-br from-[#0F0F0F] to-[#0A0A0A] rounded-[24px] p-[32px] overflow-hidden border border-[#1A1A1A]">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[50%] -right-[10%] w-[500px] h-[500px] bg-gradient-to-br from-[#00FF66]/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute -bottom-[30%] -left-[10%] w-[400px] h-[400px] bg-gradient-to-tr from-[#A78BFA]/10 to-transparent rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-[24px]">
            <div>
              <div className="flex items-center gap-[12px] mb-[16px]">
                <div className="p-[12px] rounded-[16px] bg-gradient-to-br from-[#00FF66] to-[#00CC52] shadow-[0_8px_32px_rgba(0,255,102,0.3)]">
                  <Shield size={28} className="text-[#050505]" />
                </div>
                <div>
                  <h2 className="text-[24px] font-bold text-white">Insurance Portfolio</h2>
                  <p className="text-[14px] text-[#8F8F8F]">Your complete coverage overview</p>
                </div>
              </div>
              
              <div className="flex items-baseline gap-[8px] mb-[8px]">
                <span className="text-[48px] font-bold bg-gradient-to-r from-[#00FF66] to-[#4ECDC4] bg-clip-text text-transparent">
                  ${totalCoverage.toLocaleString()}
                </span>
                <span className="text-[16px] text-[#8F8F8F]">total coverage</span>
              </div>
              <p className="text-[14px] text-[#8F8F8F]">
                <span className="text-[#00FF66] font-semibold">{activePolicies} active policies</span> protecting your assets
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-[16px]">
              <div className="bg-[rgba(255,255,255,0.03)] backdrop-blur-sm border border-[#1A1A1A] rounded-[16px] p-[20px]">
                <div className="flex items-center gap-[8px] mb-[8px]">
                  <FileText size={16} className="text-[#00FF66]" />
                  <span className="text-[12px] text-[#8F8F8F]">Policies</span>
                </div>
                <p className="text-[28px] font-bold text-white">{policies.length}</p>
              </div>
              <div className="bg-[rgba(255,255,255,0.03)] backdrop-blur-sm border border-[#1A1A1A] rounded-[16px] p-[20px]">
                <div className="flex items-center gap-[8px] mb-[8px]">
                  <Calendar size={16} className="text-[#4ECDC4]" />
                  <span className="text-[12px] text-[#8F8F8F]">Monthly</span>
                </div>
                <p className="text-[28px] font-bold text-white">${totalPremium}</p>
              </div>
              <div className="bg-[rgba(255,255,255,0.03)] backdrop-blur-sm border border-[#1A1A1A] rounded-[16px] p-[20px] col-span-2 sm:col-span-1">
                <div className="flex items-center gap-[8px] mb-[8px]">
                  <Users size={16} className="text-[#A78BFA]" />
                  <span className="text-[12px] text-[#8F8F8F]">Beneficiaries</span>
                </div>
                <p className="text-[28px] font-bold text-white">4</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Policies Grid */}
      <div>
        <div className="flex items-center justify-between mb-[20px]">
          <h3 className="text-[20px] font-bold text-white">Your Policies</h3>
          <button className="flex items-center gap-[8px] px-[16px] py-[10px] bg-gradient-to-r from-[#00FF66] to-[#00CC52] text-[#050505] font-semibold text-[13px] rounded-[12px] hover:shadow-[0_8px_32px_rgba(0,255,102,0.3)] transition-all">
            <Plus size={16} />
            Add Policy
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
          {policies.map((policy) => {
            const colors = getPolicyColor(policy.type);
            const isSelected = selectedPolicy === policy.id;
            return (
              <div
                key={policy.id}
                onClick={() => setSelectedPolicy(isSelected ? null : policy.id)}
                className={`relative bg-gradient-to-br from-[#0F0F0F] to-[#0A0A0A] border rounded-[20px] p-[24px] cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                  isSelected ? `border-[${colors.border}] shadow-[0_8px_32px_${colors.light}]` : 'border-[#1A1A1A] hover:border-[#2A2A2A]'
                }`}
              >
                {/* Policy Type Indicator */}
                <div className="absolute top-0 right-0 w-[100px] h-[100px] overflow-hidden rounded-tr-[20px]">
                  <div className={`absolute top-[12px] right-[-35px] w-[120px] text-center py-[4px] text-[10px] font-bold uppercase tracking-wider rotate-45 bg-gradient-to-r ${colors.bg} text-[#050505]`}>
                    {policy.type}
                  </div>
                </div>

                <div className="flex items-start gap-[16px]">
                  <div className={`p-[14px] rounded-[14px] bg-gradient-to-br ${colors.bg} shadow-lg`}>
                    {getPolicyIcon(policy.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-[4px]">
                      <h4 className="text-[16px] font-semibold text-white">{policy.name}</h4>
                    </div>
                    <p className="text-[12px] text-[#8F8F8F] mb-[12px]">{policy.policyNumber}</p>
                    {getStatusBadge(policy.status)}
                  </div>
                </div>

                <div className="mt-[20px] pt-[16px] border-t border-[#1A1A1A]">
                  <div className="grid grid-cols-2 gap-[16px]">
                    <div>
                      <p className="text-[11px] text-[#5A5A5A] uppercase tracking-wider mb-[4px]">Coverage</p>
                      <p className="text-[18px] font-bold text-white">{policy.coverage}</p>
                    </div>
                    <div>
                      <p className="text-[11px] text-[#5A5A5A] uppercase tracking-wider mb-[4px]">Premium</p>
                      <p className="text-[18px] font-bold text-[#00FF66]">{policy.premium}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-[16px] flex items-center justify-between">
                  <div className="flex items-center gap-[6px] text-[12px] text-[#8F8F8F]">
                    <Clock size={14} />
                    <span>Next payment: {policy.nextPayment}</span>
                  </div>
                  <button className="flex items-center gap-[4px] text-[12px] font-medium text-[#00FF66] hover:text-[#00FF66]/80 transition-colors">
                    View Details <ChevronRight size={14} />
                  </button>
                </div>

                {/* Expanded Details */}
                {isSelected && (
                  <div className="mt-[16px] pt-[16px] border-t border-[#1A1A1A] space-y-[12px] animate-fadeIn">
                    <div className="flex items-center justify-between text-[13px]">
                      <span className="text-[#8F8F8F]">Policy Expiry</span>
                      <span className="text-white font-medium">{policy.expiryDate}</span>
                    </div>
                    <div className="flex gap-[8px]">
                      <button className="flex-1 flex items-center justify-center gap-[6px] py-[10px] bg-[rgba(0,255,102,0.1)] border border-[#00FF66] text-[#00FF66] text-[12px] font-medium rounded-[10px] hover:bg-[rgba(0,255,102,0.2)] transition-all">
                        <RefreshCw size={14} /> Renew
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-[6px] py-[10px] bg-[rgba(255,255,255,0.05)] border border-[#2A2A2A] text-white text-[12px] font-medium rounded-[10px] hover:bg-[rgba(255,255,255,0.1)] transition-all">
                        <Eye size={14} /> Full Details
                      </button>
                      <button className="flex items-center justify-center p-[10px] bg-[rgba(255,255,255,0.05)] border border-[#2A2A2A] text-white rounded-[10px] hover:bg-[rgba(255,255,255,0.1)] transition-all">
                        <Download size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Claims */}
      <div className="bg-gradient-to-br from-[#0F0F0F] to-[#0A0A0A] border border-[#1A1A1A] rounded-[24px] p-[24px]">
        <div className="flex items-center justify-between mb-[24px]">
          <div>
            <h3 className="text-[20px] font-bold text-white">Recent Claims</h3>
            <p className="text-[13px] text-[#8F8F8F]">Track your insurance claims status</p>
          </div>
          <button className="px-[16px] py-[10px] bg-[rgba(255,255,255,0.05)] border border-[#2A2A2A] text-white font-medium text-[13px] rounded-[12px] hover:bg-[rgba(255,255,255,0.1)] transition-all">
            File New Claim
          </button>
        </div>

        <div className="space-y-[12px]">
          {claims.map((claim) => {
            const policyColors = getPolicyColor(claim.policyType as Policy['type']);
            return (
              <div
                key={claim.id}
                className="flex items-center justify-between p-[20px] bg-[rgba(255,255,255,0.02)] border border-[#1A1A1A] rounded-[16px] hover:border-[#2A2A2A] transition-all group"
              >
                <div className="flex items-center gap-[16px]">
                  <div className={`w-[48px] h-[48px] rounded-[12px] bg-gradient-to-br ${policyColors.bg} flex items-center justify-center shadow-lg`}>
                    {getPolicyIcon(claim.policyType as Policy['type'])}
                  </div>
                  <div>
                    <p className="text-[15px] font-semibold text-white">{claim.type}</p>
                    <p className="text-[12px] text-[#8F8F8F]">{claim.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-[24px]">
                  <div className="text-right">
                    <p className="text-[18px] font-bold text-white">{claim.amount}</p>
                    <p className="text-[11px] text-[#5A5A5A]">Claim Amount</p>
                  </div>
                  {getClaimStatusBadge(claim.status)}
                  <button className="opacity-0 group-hover:opacity-100 p-[8px] rounded-[8px] bg-[rgba(0,255,102,0.1)] text-[#00FF66] transition-all">
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-[16px]">
        {[
          { icon: FileText, label: 'Download Documents', color: '#00FF66' },
          { icon: Building2, label: 'Find Provider', color: '#4ECDC4' },
          { icon: Calendar, label: 'Schedule Call', color: '#FFE66D' },
          { icon: Shield, label: 'Coverage Calculator', color: '#A78BFA' },
        ].map((action, idx) => (
          <button
            key={idx}
            className="flex flex-col items-center gap-[12px] p-[24px] bg-gradient-to-br from-[#0F0F0F] to-[#0A0A0A] border border-[#1A1A1A] rounded-[16px] hover:border-[#2A2A2A] hover:scale-[1.02] transition-all group"
          >
            <div 
              className="p-[14px] rounded-[14px] transition-all group-hover:scale-110"
              style={{ backgroundColor: `${action.color}15`, boxShadow: `0 0 0 1px ${action.color}30` }}
            >
              <action.icon size={24} style={{ color: action.color }} />
            </div>
            <span className="text-[13px] font-medium text-[#8F8F8F] group-hover:text-white transition-colors">{action.label}</span>
          </button>
        ))}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}
