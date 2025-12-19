import { Mail, Edit, Trash2, MoreVertical } from 'lucide-react';

export function TablesPage() {
  const authors = [
    { id: 1, name: 'Esthera Jackson', email: 'alexa@simmmple.com', role: 'Manager', company: 'Organization', status: 'Online' },
    { id: 2, name: 'Alexa Liras', email: 'laurent@simmmple.com', role: 'Developer', company: 'Developer', status: 'Online' },
    { id: 3, name: 'Laurent Michael', email: 'laurent@simmmple.com', role: 'Executive', company: 'Projects', status: 'Offline' },
    { id: 4, name: 'Freduardo Hill', email: 'freduardo@simmmple.com', role: 'Manager', company: 'Organization', status: 'Online' },
    { id: 5, name: 'Daniel Thomas', email: 'daniel@simmmple.com', role: 'Developer', company: 'Developer', status: 'Offline' },
  ];

  const projects = [
    { id: 1, name: 'Cybercyko Admin', budget: '$14,000', status: 'Working', completion: 75 },
    { id: 2, name: 'Add Progress Track', budget: '$3,000', status: 'Working', completion: 45 },
    { id: 3, name: 'Fix Platform Errors', budget: '$2,300', status: 'Done', completion: 100 },
    { id: 4, name: 'Launch Mobile App', budget: '$32,000', status: 'Canceled', completion: 30 },
    { id: 5, name: 'Add New Dashboard', budget: '$7,600', status: 'Working', completion: 60 },
  ];

  return (
    <div className="p-[24px] space-y-[24px] bg-[#050505] min-h-screen">{/* Authors Table */}
      <div className="bg-gradient-to-br from-[#0F0F0F] to-[#0A0A0A] border border-[#1A1A1A] rounded-[20px] p-[24px]">
        <div className="mb-[24px]">
          <h3 className="text-[18px] font-semibold text-white">Authors Table</h3>
          <p className="text-[12px] text-[#8F8F8F] mt-[4px]">Team members and their information</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1A1A1A]">
                <th className="text-left py-[16px] px-[16px] text-[10px] font-medium text-[#8F8F8F] uppercase tracking-wider">
                  Author
                </th>
                <th className="text-left py-[16px] px-[16px] text-[10px] font-medium text-[#8F8F8F] uppercase tracking-wider">
                  Function
                </th>
                <th className="text-left py-[16px] px-[16px] text-[10px] font-medium text-[#8F8F8F] uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left py-[16px] px-[16px] text-[10px] font-medium text-[#8F8F8F] uppercase tracking-wider">
                  Employed
                </th>
                <th className="text-center py-[16px] px-[16px] text-[10px] font-medium text-[#8F8F8F] uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {authors.map((author) => (
                <tr key={author.id} className="border-b border-[#1A1A1A] hover:bg-[rgba(0,255,102,0.02)] transition-all">
                  <td className="py-[20px] px-[16px]">
                    <div className="flex items-center gap-[12px]">
                      <div className="w-[40px] h-[40px] rounded-[12px] bg-gradient-to-br from-[#00FF66] to-[#00CC52] flex items-center justify-center text-[#050505] font-semibold text-[14px]">
                        {author.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-[14px] font-medium text-white">{author.name}</p>
                        <p className="text-[12px] text-[#8F8F8F]">{author.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-[20px] px-[16px]">
                    <div>
                      <p className="text-[14px] font-medium text-white">{author.role}</p>
                      <p className="text-[12px] text-[#8F8F8F]">{author.company}</p>
                    </div>
                  </td>
                  <td className="py-[20px] px-[16px]">
                    <span className={`inline-flex items-center gap-[6px] px-[12px] py-[6px] rounded-[8px] text-[12px] font-medium ${
                      author.status === 'Online'
                        ? 'bg-[rgba(0,255,102,0.1)] text-[#00FF66] border border-[#00FF66]'
                        : 'bg-[rgba(143,143,143,0.1)] text-[#8F8F8F] border border-[#8F8F8F]'
                    }`}>
                      <div className={`w-[6px] h-[6px] rounded-full ${
                        author.status === 'Online' ? 'bg-[#00FF66]' : 'bg-[#8F8F8F]'
                      }`} />
                      {author.status}
                    </span>
                  </td>
                  <td className="py-[20px] px-[16px]">
                    <p className="text-[14px] text-[#8F8F8F]">23/04/18</p>
                  </td>
                  <td className="py-[20px] px-[16px]">
                    <div className="flex items-center justify-center gap-[8px]">
                      <button className="p-[8px] rounded-[8px] hover:bg-[rgba(0,255,102,0.1)] text-[#8F8F8F] hover:text-[#00FF66] transition-all">
                        <Edit size={16} />
                      </button>
                      <button className="p-[8px] rounded-[8px] hover:bg-[rgba(255,68,68,0.1)] text-[#8F8F8F] hover:text-[#FF4444] transition-all">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-gradient-to-br from-[#0F0F0F] to-[#0A0A0A] border border-[#1A1A1A] rounded-[20px] p-[24px]">
        <div className="mb-[24px]">
          <h3 className="text-[18px] font-semibold text-white">Projects Table</h3>
          <p className="text-[12px] text-[#8F8F8F] mt-[4px]">Active projects and their progress</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1A1A1A]">
                <th className="text-left py-[16px] px-[16px] text-[10px] font-medium text-[#8F8F8F] uppercase tracking-wider">
                  Project
                </th>
                <th className="text-left py-[16px] px-[16px] text-[10px] font-medium text-[#8F8F8F] uppercase tracking-wider">
                  Budget
                </th>
                <th className="text-left py-[16px] px-[16px] text-[10px] font-medium text-[#8F8F8F] uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left py-[16px] px-[16px] text-[10px] font-medium text-[#8F8F8F] uppercase tracking-wider">
                  Completion
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b border-[#1A1A1A] hover:bg-[rgba(0,255,102,0.02)] transition-all">
                  <td className="py-[20px] px-[16px]">
                    <p className="text-[14px] font-medium text-white">{project.name}</p>
                  </td>
                  <td className="py-[20px] px-[16px]">
                    <p className="text-[14px] text-[#8F8F8F]">{project.budget}</p>
                  </td>
                  <td className="py-[20px] px-[16px]">
                    <span className={`inline-flex items-center px-[12px] py-[6px] rounded-[8px] text-[12px] font-medium ${
                      project.status === 'Done'
                        ? 'bg-[rgba(0,255,102,0.1)] text-[#00FF66] border border-[#00FF66]'
                        : project.status === 'Working'
                        ? 'bg-[rgba(0,153,255,0.1)] text-[#0099FF] border border-[#0099FF]'
                        : 'bg-[rgba(255,68,68,0.1)] text-[#FF4444] border border-[#FF4444]'
                    }`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="py-[20px] px-[16px]">
                    <div className="flex items-center gap-[12px]">
                      <div className="flex-1 h-[6px] bg-[#1A1A1A] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#00FF66] to-[#00CC52] rounded-full transition-all"
                          style={{ width: `${project.completion}%` }}
                        />
                      </div>
                      <p className="text-[12px] font-medium text-[#00FF66] min-w-[40px]">{project.completion}%</p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}