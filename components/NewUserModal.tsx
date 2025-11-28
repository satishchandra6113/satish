import { useState } from 'react';
import { Button } from './Button';

interface NewUserModalProps {
  onClose: () => void;
}

export function NewUserModal({ onClose }: NewUserModalProps) {
  const [isActive, setIsActive] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    phone: '',
    manager: '',
    company: '',
    department: '',
    title: ''
  });
  const [customFields, setCustomFields] = useState([
    { id: 1, label: 'Custom Role', value: '' },
    { id: 2, label: 'Country Code', value: '' },
    { id: 3, label: 'Description', value: '' }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating user:', formData);
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addCustomField = () => {
    const newId = Math.max(...customFields.map(f => f.id), 0) + 1;
    setCustomFields([...customFields, { id: newId, label: '', value: '' }]);
  };

  const updateCustomField = (id: number, field: 'label' | 'value', value: string) => {
    setCustomFields(customFields.map(f => f.id === id ? { ...f, [field]: value } : f));
  };

  const removeCustomField = (id: number) => {
    setCustomFields(customFields.filter(f => f.id !== id));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-[#0F0F0F] rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl border border-[#1A1A1A]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#1A1A1A]">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-gray-400 border border-[#2A2A2A]">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <div>
              <div className="text-xs text-[#00FF66] font-medium uppercase tracking-wide">Users /</div>
              <h2 className="text-xl font-normal text-[#D5FFD6]">New User</h2>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-[#D5FFD6] font-medium text-sm transition-colors"
            >
              Cancel
            </button>
            <Button onClick={handleSubmit} variant="cybercyko">
              Create User
            </Button>
          </div>
        </div>

        <div className="flex min-h-[600px]">
          {/* Sidebar */}
          <div className="w-48 border-r border-[#1A1A1A] p-4">
            <div className="flex items-center gap-2 text-[#00FF66] border-l-2 border-[#00FF66] pl-3 font-medium text-sm">
              User Info
            </div>
          </div>

          {/* Form Content */}
          <div className="flex-1 py-10 pl-8 pr-10">
            <form onSubmit={handleSubmit}>
              {/* Avatar and Active Status */}
              <div className="mb-12">
                <div className="flex justify-center mb-8">
                  <div className="w-24 h-24 rounded-full bg-[#1A1A1A] flex items-center justify-center text-gray-500 border border-[#2A2A2A]">
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                </div>

                <div className="flex justify-end items-center gap-3">
                  <label className="text-gray-400 text-sm">Active</label>
                  <button
                    type="button"
                    onClick={() => setIsActive(!isActive)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${isActive ? 'bg-[#00FF66]' : 'bg-[#2A2A2A]'
                      }`}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform shadow-sm ${isActive ? 'translate-x-7' : 'translate-x-1'
                        }`}
                    />
                    {isActive && (
                      <svg className="absolute left-2 top-1.5 w-3 h-3 text-[#0F0F0F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Form Fields Grid */}
              <div className="grid grid-cols-3 gap-x-10 gap-y-10 mb-12">
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-1">First name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    placeholder="Required"
                    value={formData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-[#333] rounded-sm px-3 py-2 text-white focus:outline-none focus:border-[#00FF66] focus:ring-1 focus:ring-[#00FF66] transition-all placeholder-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-1">Last name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    placeholder="Required"
                    value={formData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-[#333] rounded-sm px-3 py-2 text-white focus:outline-none focus:border-[#00FF66] focus:ring-1 focus:ring-[#00FF66] transition-all placeholder-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-[#333] rounded-sm px-3 py-2 text-white focus:outline-none focus:border-[#00FF66] focus:ring-1 focus:ring-[#00FF66] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-1">Username</label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => handleChange('username', e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-[#333] rounded-sm px-3 py-2 text-white focus:outline-none focus:border-[#00FF66] focus:ring-1 focus:ring-[#00FF66] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-1">Phone number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-[#333] rounded-sm px-3 py-2 text-white focus:outline-none focus:border-[#00FF66] focus:ring-1 focus:ring-[#00FF66] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-1">Manager</label>
                  <select
                    value={formData.manager}
                    onChange={(e) => handleChange('manager', e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-[#333] rounded-sm px-3 py-2 text-gray-400 focus:outline-none focus:border-[#00FF66] focus:ring-1 focus:ring-[#00FF66] transition-all appearance-none"
                  >
                    <option value="">Choose a manager</option>
                    <option value="david">David Paul</option>
                    <option value="alexa">Alexa CSM</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-1">Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleChange('company', e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-[#333] rounded-sm px-3 py-2 text-white focus:outline-none focus:border-[#00FF66] focus:ring-1 focus:ring-[#00FF66] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-1">Department</label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => handleChange('department', e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-[#333] rounded-sm px-3 py-2 text-white focus:outline-none focus:border-[#00FF66] focus:ring-1 focus:ring-[#00FF66] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-1">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-[#333] rounded-sm px-3 py-2 text-white focus:outline-none focus:border-[#00FF66] focus:ring-1 focus:ring-[#00FF66] transition-all"
                  />
                </div>
              </div>

              {/* Custom Fields Section */}
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-[#D5FFD6] font-medium">Custom Fields</h3>
                  <button
                    type="button"
                    onClick={addCustomField}
                    className="flex items-center justify-center w-8 h-8 text-[#00FF66] hover:text-[#00CC52] transition-colors font-bold text-lg"
                    title="Add Custom Field"
                  >
                    +
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-x-10 gap-y-8">
                  {customFields.map((field) => (
                    <div key={field.id} className="relative group">
                      <label className="block text-gray-400 text-sm font-medium mb-1">
                        {field.label || 'Custom Field'}
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={field.value}
                          onChange={(e) => updateCustomField(field.id, 'value', e.target.value)}
                          placeholder={field.label || 'Enter value'}
                          className="w-full bg-[#1A1A1A] border border-[#333] rounded-sm px-3 py-2 pr-8 text-[#D5FFD6] focus:outline-none focus:border-[#00FF66] focus:ring-1 focus:ring-[#00FF66] transition-all placeholder-gray-600"
                        />
                        {/* Delete button - appears on hover in top right corner of input */}
                        <button
                          type="button"
                          onClick={() => removeCustomField(field.id)}
                          className="absolute top-1/2 right-2 -translate-y-1/2 w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                          title="Delete field"
                        >
                          <svg className="w-3 h-3 text-[#00FF66]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
