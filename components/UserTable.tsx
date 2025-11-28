import { User } from '../types/user';

interface UserTableProps {
  users: User[];
}

export function UserTable({ users }: UserTableProps) {
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
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-[#1A1A1A] hover:bg-[#1A1A1A] transition-colors cursor-pointer"
              >
                <td className="px-6 py-4 w-[35%]">
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
