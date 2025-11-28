import { CreditCard, Plus, Download, MoreVertical, Check } from 'lucide-react';

export function BillingPage() {
  const paymentMethods = [
    { id: 1, type: 'Visa', last4: '7852', expiry: '04/25', default: true },
    { id: 2, type: 'Mastercard', last4: '3421', expiry: '08/26', default: false },
  ];

  const invoices = [
    { id: 1, date: 'March 25, 2024', amount: '$2,500', status: 'Paid' },
    { id: 2, date: 'February 25, 2024', amount: '$2,500', status: 'Paid' },
    { id: 3, date: 'January 25, 2024', amount: '$2,500', status: 'Paid' },
  ];

  const transactions = [
    { id: 1, name: 'Stripe', date: 'March 26, 2024 at 13:45 PM', amount: '+$800', type: 'income' },
    { id: 2, name: 'HubSpot', date: 'March 26, 2024 at 12:30 PM', amount: '+$1,700', type: 'income' },
    { id: 3, name: 'Netflix', date: 'March 27, 2024 at 12:30 PM', amount: '-$25', type: 'expense' },
    { id: 4, name: 'Apple', date: 'March 27, 2024 at 12:30 PM', amount: '+$2,500', type: 'income' },
  ];

  return (
    <div className="p-[24px] space-y-[24px] bg-[#050505] min-h-screen">
      {/* Credit Balance Card */}
      <div className="relative bg-gradient-to-br from-[#00FF66] to-[#00CC52] rounded-[20px] p-[32px] overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
        <div className="relative z-10">
          <p className="text-[12px] text-[#050505]/70 font-medium mb-[8px]">Credit Balance</p>
          <p className="text-[42px] font-bold text-[#050505] mb-[16px]">$25,215</p>
          <div className="flex items-center gap-[8px]">
            <div className="flex items-center gap-[4px]">
              <div className="w-[4px] h-[20px] bg-[#050505]/30 rounded-full" />
              <div className="w-[4px] h-[28px] bg-[#050505]/50 rounded-full" />
              <div className="w-[4px] h-[24px] bg-[#050505]/40 rounded-full" />
              <div className="w-[4px] h-[32px] bg-[#050505] rounded-full" />
              <div className="w-[4px] h-[26px] bg-[#050505]/60 rounded-full" />
            </div>
            <p className="text-[12px] text-[#050505]/70 ml-[8px]">+12.5% from last month</p>
          </div>
        </div>
      </div>

      {/* Payment Methods & Invoices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[24px]">
        {/* Payment Methods */}
        <div className="bg-gradient-to-br from-[#0F0F0F] to-[#0A0A0A] border border-[#1A1A1A] rounded-[20px] p-[24px]">
          <div className="flex items-center justify-between mb-[24px]">
            <h3 className="text-[18px] font-semibold text-white">Payment Methods</h3>
            <button className="p-[8px] rounded-[8px] bg-[rgba(0,255,102,0.1)] border border-[#00FF66] text-[#00FF66] hover:bg-[rgba(0,255,102,0.2)] transition-all">
              <Plus size={18} />
            </button>
          </div>
          
          <div className="space-y-[16px]">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className="relative bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] border border-[#1A1A1A] rounded-[16px] p-[20px] hover:border-[#00FF66] transition-all"
              >
                {method.default && (
                  <div className="absolute top-[16px] right-[16px] flex items-center gap-[4px] bg-[#00FF66] text-[#050505] px-[8px] py-[4px] rounded-[6px] text-[10px] font-medium">
                    <Check size={12} />
                    Default
                  </div>
                )}
                <div className="flex items-center gap-[16px]">
                  <div className="w-[48px] h-[32px] bg-gradient-to-br from-[#00FF66] to-[#00CC52] rounded-[8px] flex items-center justify-center">
                    <CreditCard size={20} className="text-[#050505]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[14px] font-medium text-white">{method.type} •••• {method.last4}</p>
                    <p className="text-[12px] text-[#8F8F8F]">Expires {method.expiry}</p>
                  </div>
                  <button className="p-[8px] rounded-[8px] hover:bg-[rgba(255,255,255,0.05)] text-[#8F8F8F] hover:text-white transition-all">
                    <MoreVertical size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Latest Invoices */}
        <div className="bg-gradient-to-br from-[#0F0F0F] to-[#0A0A0A] border border-[#1A1A1A] rounded-[20px] p-[24px]">
          <div className="flex items-center justify-between mb-[24px]">
            <h3 className="text-[18px] font-semibold text-white">Latest Invoices</h3>
            <button className="text-[12px] text-[#00FF66] hover:text-[#00FF66]/80 font-medium">
              View All
            </button>
          </div>
          
          <div className="space-y-[16px]">
            {invoices.map((invoice) => (
              <div
                key={invoice.id}
                className="flex items-center justify-between p-[16px] bg-[rgba(255,255,255,0.02)] border border-[#1A1A1A] rounded-[12px] hover:border-[#00FF66] transition-all"
              >
                <div>
                  <p className="text-[14px] font-medium text-white">{invoice.date}</p>
                  <p className="text-[12px] text-[#8F8F8F]">Invoice #{invoice.id}</p>
                </div>
                <div className="flex items-center gap-[12px]">
                  <p className="text-[14px] font-medium text-white">{invoice.amount}</p>
                  <button className="p-[8px] rounded-[8px] bg-[rgba(0,255,102,0.1)] border border-[#00FF66] text-[#00FF66] hover:bg-[rgba(0,255,102,0.2)] transition-all">
                    <Download size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transactions */}
      <div className="bg-gradient-to-br from-[#0F0F0F] to-[#0A0A0A] border border-[#1A1A1A] rounded-[20px] p-[24px]">
        <div className="flex items-center justify-between mb-[24px]">
          <h3 className="text-[18px] font-semibold text-white">Recent Transactions</h3>
          <p className="text-[12px] text-[#8F8F8F]">Last 30 days</p>
        </div>
        
        <div className="space-y-[12px]">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-[16px] bg-[rgba(255,255,255,0.02)] border border-[#1A1A1A] rounded-[12px] hover:border-[#00FF66] transition-all"
            >
              <div className="flex items-center gap-[16px]">
                <div className={`w-[40px] h-[40px] rounded-[10px] flex items-center justify-center ${
                  transaction.type === 'income' 
                    ? 'bg-[rgba(0,255,102,0.1)] border border-[#00FF66]' 
                    : 'bg-[rgba(255,68,68,0.1)] border border-[#FF4444]'
                }`}>
                  <CreditCard size={20} className={transaction.type === 'income' ? 'text-[#00FF66]' : 'text-[#FF4444]'} />
                </div>
                <div>
                  <p className="text-[14px] font-medium text-white">{transaction.name}</p>
                  <p className="text-[12px] text-[#8F8F8F]">{transaction.date}</p>
                </div>
              </div>
              <p className={`text-[16px] font-semibold ${
                transaction.type === 'income' ? 'text-[#00FF66]' : 'text-[#FF4444]'
              }`}>
                {transaction.amount}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}