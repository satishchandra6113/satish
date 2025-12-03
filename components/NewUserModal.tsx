import { useState, useEffect } from 'react';
import { Button } from './Button';
import { User } from '../types/user';

// Country codes list with phone number length
const COUNTRY_CODES = [
  { code: '+1', country: 'America', flag: '🇺🇸', digits: 10 },
  { code: '+1', country: 'Canada', flag: '🇨🇦', digits: 10 },
  { code: '+44', country: 'UK', flag: '🇬🇧', digits: 10 },
  { code: '+91', country: 'India', flag: '🇮🇳', digits: 10 },
  { code: '+86', country: 'China', flag: '🇨🇳', digits: 11 },
  { code: '+81', country: 'Japan', flag: '🇯🇵', digits: 10 },
  { code: '+49', country: 'Germany', flag: '🇩🇪', digits: 11 },
  { code: '+33', country: 'France', flag: '🇫🇷', digits: 9 },
  { code: '+39', country: 'Italy', flag: '🇮🇹', digits: 10 },
  { code: '+34', country: 'Spain', flag: '🇪🇸', digits: 9 },
  { code: '+55', country: 'Brazil', flag: '🇧🇷', digits: 11 },
  { code: '+52', country: 'Mexico', flag: '🇲🇽', digits: 10 },
  { code: '+54', country: 'Argentina', flag: '🇦🇷', digits: 10 },
  { code: '+61', country: 'Australia', flag: '🇦🇺', digits: 9 },
  { code: '+64', country: 'New Zealand', flag: '🇳🇿', digits: 9 },
  { code: '+82', country: 'Korea', flag: '🇰🇷', digits: 10 },
  { code: '+65', country: 'Singapore', flag: '🇸🇬', digits: 8 },
  { code: '+60', country: 'Malaysia', flag: '🇲🇾', digits: 10 },
  { code: '+66', country: 'Thailand', flag: '🇹🇭', digits: 9 },
  { code: '+84', country: 'Vietnam', flag: '🇻🇳', digits: 10 },
  { code: '+62', country: 'Indonesia', flag: '🇮🇩', digits: 11 },
  { code: '+63', country: 'Philippines', flag: '🇵🇭', digits: 10 },
  { code: '+971', country: 'UAE', flag: '🇦🇪', digits: 9 },
  { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦', digits: 9 },
  { code: '+972', country: 'Israel', flag: '🇮🇱', digits: 9 },
  { code: '+90', country: 'Turkey', flag: '🇹🇷', digits: 10 },
  { code: '+7', country: 'Russia', flag: '🇷🇺', digits: 10 },
  { code: '+380', country: 'Ukraine', flag: '🇺🇦', digits: 9 },
  { code: '+48', country: 'Poland', flag: '🇵🇱', digits: 9 },
  { code: '+31', country: 'Netherlands', flag: '🇳🇱', digits: 9 },
  { code: '+32', country: 'Belgium', flag: '🇧🇪', digits: 9 },
  { code: '+41', country: 'Switzerland', flag: '🇨🇭', digits: 9 },
  { code: '+43', country: 'Austria', flag: '🇦🇹', digits: 10 },
  { code: '+46', country: 'Sweden', flag: '🇸🇪', digits: 9 },
  { code: '+47', country: 'Norway', flag: '🇳🇴', digits: 8 },
  { code: '+45', country: 'Denmark', flag: '🇩🇰', digits: 8 },
  { code: '+358', country: 'Finland', flag: '🇫🇮', digits: 10 },
  { code: '+353', country: 'Ireland', flag: '🇮🇪', digits: 9 },
  { code: '+351', country: 'Portugal', flag: '🇵🇹', digits: 9 },
  { code: '+30', country: 'Greece', flag: '🇬🇷', digits: 10 },
  { code: '+20', country: 'Egypt', flag: '🇪🇬', digits: 10 },
  { code: '+27', country: 'South Africa', flag: '🇿🇦', digits: 9 },
  { code: '+234', country: 'Nigeria', flag: '🇳🇬', digits: 10 },
  { code: '+254', country: 'Kenya', flag: '🇰🇪', digits: 9 },
  { code: '+212', country: 'Morocco', flag: '🇲🇦', digits: 9 },
  { code: '+92', country: 'Pakistan', flag: '🇵🇰', digits: 10 },
  { code: '+880', country: 'Bangladesh', flag: '🇧🇩', digits: 10 },
  { code: '+94', country: 'Sri Lanka', flag: '🇱🇰', digits: 9 },
  { code: '+977', country: 'Nepal', flag: '🇳🇵', digits: 10 },
  { code: '+56', country: 'Chile', flag: '🇨🇱', digits: 9 },
  { code: '+57', country: 'Colombia', flag: '🇨🇴', digits: 10 },
  { code: '+51', country: 'Peru', flag: '🇵🇪', digits: 9 },
  { code: '+58', country: 'Venezuela', flag: '🇻🇪', digits: 10 },
];

interface NewUserModalProps {
  onClose: () => void;
  onCreateUser: (user: User) => void;
}

export function NewUserModal({ onClose, onCreateUser }: NewUserModalProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '+1',
    phone: '',
    department: '',
    designation: '',
    role: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [customFields, setCustomFields] = useState([
    { id: 1, label: 'Custom Role', value: '' },
    { id: 2, label: 'Country Code', value: '' },
    { id: 3, label: 'Description', value: '' }
  ]);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const [confirmDialog, setConfirmDialog] = useState<{
    show: boolean;
    type: 'delete' | 'modify';
    fieldId: number | null;
    fieldLabel: string;
    pendingValue?: string;
  }>({ show: false, type: 'delete', fieldId: null, fieldLabel: '' });

  const selectedCountry = COUNTRY_CODES.find(c => c.code === formData.countryCode) || COUNTRY_CODES[0];
  
  const filteredCountries = countrySearch 
    ? COUNTRY_CODES.filter(country => 
        country.country.toLowerCase().includes(countrySearch.toLowerCase()) ||
        country.code.includes(countrySearch.replace('+', '')) ||
        country.code.includes(countrySearch)
      )
    : COUNTRY_CODES;

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
      email: formData.email.trim(),
      roles: formData.role.trim() ? [formData.role.trim()] : ['User'],
      status: 'Pending',
      lastLogin: 'Never logged in',
      avatar: null
    };

    onCreateUser(newUser);
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

  const confirmLabelChange = (id: number, newLabel: string) => {
    const field = customFields.find(f => f.id === id);
    if (field && field.label && field.label !== newLabel) {
      setConfirmDialog({
        show: true,
        type: 'modify',
        fieldId: id,
        fieldLabel: field.label,
        pendingValue: newLabel
      });
    } else {
      updateCustomField(id, 'label', newLabel);
    }
  };

  const handleConfirmAction = () => {
    if (confirmDialog.type === 'delete' && confirmDialog.fieldId) {
      setCustomFields(customFields.filter(f => f.id !== confirmDialog.fieldId));
    } else if (confirmDialog.type === 'modify' && confirmDialog.fieldId && confirmDialog.pendingValue !== undefined) {
      updateCustomField(confirmDialog.fieldId, 'label', confirmDialog.pendingValue);
    }
    setConfirmDialog({ show: false, type: 'delete', fieldId: null, fieldLabel: '' });
  };

  const handleCancelAction = () => {
    setConfirmDialog({ show: false, type: 'delete', fieldId: null, fieldLabel: '' });
  };

  // Handle keyboard events for confirmation dialog
  useEffect(() => {
    if (!confirmDialog.show) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        e.stopPropagation();
        handleConfirmAction();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        handleCancelAction();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [confirmDialog.show, confirmDialog.fieldId, confirmDialog.type, confirmDialog.pendingValue]);

  const requestDeleteField = (id: number) => {
    const field = customFields.find(f => f.id === id);
    if (field) {
      setConfirmDialog({
        show: true,
        type: 'delete',
        fieldId: id,
        fieldLabel: field.label || 'Custom Field'
      });
    }
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
              {/* Avatar */}
              <div className="mb-12">
                <div className="flex justify-center">
                  <div className="w-24 h-24 rounded-full bg-[#1A1A1A] flex items-center justify-center text-gray-500 border border-[#2A2A2A]">
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
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
                    onChange={(e) => {
                      handleChange('firstName', e.target.value);
                      if (errors.firstName) setErrors(prev => ({ ...prev, firstName: '' }));
                    }}
                    className={`w-full bg-[#1A1A1A] border rounded-sm px-3 py-2 text-white focus:outline-none transition-all placeholder-gray-600 ${
                      errors.firstName ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-[#333] focus:border-[#00FF66] focus:ring-1 focus:ring-[#00FF66]'
                    }`}
                  />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-1">Last name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    placeholder="Required"
                    value={formData.lastName}
                    onChange={(e) => {
                      handleChange('lastName', e.target.value);
                      if (errors.lastName) setErrors(prev => ({ ...prev, lastName: '' }));
                    }}
                    className={`w-full bg-[#1A1A1A] border rounded-sm px-3 py-2 text-white focus:outline-none transition-all placeholder-gray-600 ${
                      errors.lastName ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-[#333] focus:border-[#00FF66] focus:ring-1 focus:ring-[#00FF66]'
                    }`}
                  />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                </div>
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-1">Email <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    placeholder="user@example.com"
                    value={formData.email}
                    onChange={(e) => {
                      handleChange('email', e.target.value);
                      if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                    }}
                    className={`w-full bg-[#1A1A1A] border rounded-sm px-3 py-2 text-white focus:outline-none transition-all placeholder-gray-600 ${
                      errors.email ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-[#333] focus:border-[#00FF66] focus:ring-1 focus:ring-[#00FF66]'
                    }`}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-1">Phone number</label>
                  <div className="flex gap-2">
                    {/* Custom Country Code Dropdown */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                        className="w-[70px] h-[38px] bg-[#1A1A1A] border border-[#333] rounded-sm px-2 py-2 text-white focus:outline-none focus:border-[#00FF66] focus:ring-1 focus:ring-[#00FF66] transition-all cursor-pointer flex items-center justify-between gap-1"
                      >
                        <span className="text-sm">{selectedCountry.code}</span>
                        <svg className={`w-3 h-3 text-gray-400 transition-transform ${showCountryDropdown ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {/* Dropdown Panel */}
                      {showCountryDropdown && (
                        <div 
                          className="absolute top-full left-0 mt-1 w-[180px] bg-[#1A1A1A] border border-[#333] rounded-lg shadow-2xl z-50 overflow-hidden"
                          onKeyDown={(e) => {
                            if (e.key === 'Backspace') {
                              setCountrySearch(prev => prev.slice(0, -1));
                            } else if (e.key === 'Escape') {
                              setShowCountryDropdown(false);
                              setCountrySearch('');
                            } else if (e.key === 'Enter') {
                              e.preventDefault();
                              // Auto-select first matching country on Enter
                              if (filteredCountries.length > 0) {
                                handleChange('countryCode', filteredCountries[0].code);
                                handleChange('phone', '');
                                setShowCountryDropdown(false);
                                setCountrySearch('');
                              }
                            } else if (e.key.length === 1 && e.key.match(/[a-zA-Z0-9\s+]/)) {
                              setCountrySearch(prev => prev + e.key);
                            }
                          }}
                          tabIndex={0}
                          ref={(el) => el?.focus()}
                        >
                          {/* Hidden search indicator */}
                          {countrySearch && (
                            <div className="px-3 py-2 border-b border-[#333] text-xs text-[#00FF66]">
                              Searching: "{countrySearch}"
                            </div>
                          )}
                          {/* Country List */}
                          <div className="max-h-[250px] overflow-y-auto">
                            {filteredCountries.map((country, idx) => (
                              <button
                                key={`${country.code}-${idx}`}
                                type="button"
                                onClick={() => {
                                  handleChange('countryCode', country.code);
                                  handleChange('phone', ''); // Clear phone when country changes
                                  setShowCountryDropdown(false);
                                  setCountrySearch('');
                                }}
                                className={`w-full px-3 py-2 text-left text-sm hover:bg-[#00FF66]/10 transition-colors ${
                                  formData.countryCode === country.code ? 'bg-[#00FF66]/20 text-[#00FF66]' : 'text-white'
                                }`}
                              >
                                {country.country}
                              </button>
                            ))}
                            {filteredCountries.length === 0 && (
                              <div className="px-3 py-4 text-center text-gray-500 text-sm">No countries found</div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <input
                      type="tel"
                      placeholder={`${selectedCountry.digits} digits`}
                      value={formData.phone}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, ''); // Only allow digits
                        if (value.length <= selectedCountry.digits) {
                          handleChange('phone', value);
                        }
                      }}
                      maxLength={selectedCountry.digits}
                      className="w-[120px] bg-[#1A1A1A] border border-[#333] rounded-sm px-3 py-2 text-white focus:outline-none focus:border-[#00FF66] focus:ring-1 focus:ring-[#00FF66] transition-all placeholder-gray-600"
                      onClick={() => { setShowCountryDropdown(false); setCountrySearch(''); }}
                    />
                  </div>
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
                  <label className="block text-gray-400 text-sm font-medium mb-1">Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => handleChange('role', e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-[#333] rounded-sm px-3 py-2 text-white focus:outline-none focus:border-[#00FF66] focus:ring-1 focus:ring-[#00FF66] transition-all"
                  >
                    <option value="">Select role</option>
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                    <option value="Sales">Sales</option>
                    <option value="Engineers">Engineers</option>
                    <option value="Customer Success">Customer Success</option>
                  </select>
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
                      {/* Editable Label */}
                      <div className="flex items-center gap-2 mb-1">
                        <input
                          type="text"
                          defaultValue={field.label}
                          onBlur={(e) => {
                            if (e.target.value !== field.label) {
                              confirmLabelChange(field.id, e.target.value);
                            }
                          }}
                          placeholder="Field name"
                          className="bg-transparent text-gray-400 text-sm font-medium focus:outline-none focus:text-[#00FF66] border-b border-transparent focus:border-[#00FF66] transition-all placeholder-gray-600 w-full"
                        />
                        {/* Delete button */}
                        <button
                          type="button"
                          onClick={() => requestDeleteField(field.id)}
                          className="w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                          title="Delete field"
                        >
                          <svg className="w-3 h-3 text-red-500 hover:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      {/* Value Input */}
                      <input
                        type="text"
                        value={field.value}
                        onChange={(e) => updateCustomField(field.id, 'value', e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            (e.target as HTMLInputElement).blur();
                          }
                        }}
                        placeholder={field.label ? `Enter ${field.label.toLowerCase()}` : 'Enter value'}
                        className="w-full bg-[#1A1A1A] border border-[#333] rounded-sm px-3 py-2 text-[#D5FFD6] focus:outline-none focus:border-[#00FF66] focus:ring-1 focus:ring-[#00FF66] transition-all placeholder-gray-600"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {confirmDialog.show && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70">
          <div className="bg-[#1A1A1A] rounded-lg p-6 max-w-sm w-full mx-4 border border-[#333] shadow-2xl">
            <div className="text-center">
              {/* Icon */}
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#FF4444]/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#FF4444]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              
              {/* Title */}
              <h3 className="text-lg font-semibold text-white mb-2">
                {confirmDialog.type === 'delete' ? 'Delete Field?' : 'Modify Field?'}
              </h3>
              
              {/* Message */}
              <p className="text-gray-400 text-sm mb-4">
                {confirmDialog.type === 'delete' 
                  ? `Are you sure you want to delete "${confirmDialog.fieldLabel}"?`
                  : `Are you sure you want to modify "${confirmDialog.fieldLabel}"?`
                }
              </p>

              <p className="text-gray-500 text-xs mb-6">Press Enter to confirm, Escape to cancel</p>
              
              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleCancelAction}
                  className="flex-1 px-4 py-2 rounded-lg bg-[#2A2A2A] text-gray-300 hover:bg-[#333] transition-colors font-medium text-sm"
                >
                  Cancel (Esc)
                </button>
                <button
                  type="button"
                  onClick={handleConfirmAction}
                  autoFocus
                  className={`flex-1 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                    confirmDialog.type === 'delete'
                      ? 'bg-[#FF4444] text-white hover:bg-[#FF5555]'
                      : 'bg-[#00FF66] text-[#0F0F0F] hover:bg-[#00CC52]'
                  }`}
                >
                  {confirmDialog.type === 'delete' ? 'Delete (Enter)' : 'Modify (Enter)'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
