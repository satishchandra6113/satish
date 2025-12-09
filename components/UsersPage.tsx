import { useState, useMemo } from 'react';
import { Search, Filter, X, Users, Shield, Clock, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { Button } from './Button';
import { Dropdown } from './Dropdown';
import { UserTable } from './UserTable';
import { ImportUsersModal } from './ImportUsersModal';
import { NewUserModal } from './NewUserModal';
import { User } from '../types/user';

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alexa CSM',
    email: 'alexa@oneLogin.com',
    roles: ['Customer Success'],
    status: 'Verified',
    lastLogin: '30d ago',
    avatar: null
  },
  {
    id: '2',
    name: 'Alexa Sling',
    email: 'alexa@slinginc.com',
    roles: ['Sales', 'Admin'],
    status: 'Verified',
    lastLogin: 'Never logged in',
    avatar: null
  },
  {
    id: '3',
    name: 'Alicia Keys',
    email: 'alicia@engineers.com',
    roles: ['Engineers'],
    status: 'Verified',
    lastLogin: '400d ago',
    avatar: null
  },
  {
    id: '4',
    name: 'David Paul',
    email: 'david@cybercyko.com',
    roles: ['Admin'],
    status: 'Verified',
    lastLogin: '20m ago',
    avatar: null
  },
  {
    id: '5',
    name: 'Emma Watson',
    email: 'emma@cybercyko.com',
    roles: ['Engineers', 'Admin'],
    status: 'Verified',
    lastLogin: '2h ago',
    avatar: null
  },
  {
    id: '6',
    name: 'James Smith',
    email: 'james@cybercyko.com',
    roles: ['Sales'],
    status: 'Verified',
    lastLogin: '1d ago',
    avatar: null
  },
  {
    id: '7',
    name: 'Sarah Johnson',
    email: 'sarah@cybercyko.com',
    roles: ['Customer Success'],
    status: 'Pending',
    lastLogin: 'Never logged in',
    avatar: null
  },
  {
    id: '8',
    name: 'Michael Brown',
    email: 'michael@cybercyko.com',
    roles: ['Engineers'],
    status: 'Verified',
    lastLogin: '5h ago',
    avatar: null
  },
  {
    id: '9',
    name: 'Lisa Anderson',
    email: 'lisa@cybercyko.com',
    roles: ['Admin'],
    status: 'Verified',
    lastLogin: '10m ago',
    avatar: null
  },
  {
    id: '10',
    name: 'Robert Taylor',
    email: 'robert@cybercyko.com',
    roles: ['Sales', 'Customer Success'],
    status: 'Verified',
    lastLogin: '3d ago',
    avatar: null
  },
  {
    id: '11',
    name: 'Jennifer Martinez',
    email: 'jennifer@cybercyko.com',
    roles: ['Engineers'],
    status: 'Verified',
    lastLogin: '1h ago',
    avatar: null
  },
  {
    id: '12',
    name: 'William Garcia',
    email: 'william@cybercyko.com',
    roles: ['Admin'],
    status: 'Suspended',
    lastLogin: '60d ago',
    avatar: null
  },
  {
    id: '13',
    name: 'Patricia Lee',
    email: 'patricia@cybercyko.com',
    roles: ['Customer Success'],
    status: 'Verified',
    lastLogin: '4h ago',
    avatar: null
  },
  {
    id: '14',
    name: 'Christopher Wilson',
    email: 'chris@cybercyko.com',
    roles: ['Engineers', 'Sales'],
    status: 'Verified',
    lastLogin: '15m ago',
    avatar: null
  },
  {
    id: '15',
    name: 'Amanda Clark',
    email: 'amanda@cybercyko.com',
    roles: ['Admin'],
    status: 'Verified',
    lastLogin: '2d ago',
    avatar: null
  },
  {
    id: '16',
    name: 'Daniel Rodriguez',
    email: 'daniel@cybercyko.com',
    roles: ['Engineers'],
    status: 'Pending',
    lastLogin: 'Never logged in',
    avatar: null
  },
  {
    id: '17',
    name: 'Sophie Turner',
    email: 'sophie@cybercyko.com',
    roles: ['Sales'],
    status: 'Verified',
    lastLogin: '45m ago',
    avatar: null
  },
  {
    id: '18',
    name: 'Marcus Chen',
    email: 'marcus@cybercyko.com',
    roles: ['Engineers', 'Admin'],
    status: 'Verified',
    lastLogin: '5m ago',
    avatar: null
  },
  {
    id: '19',
    name: 'Olivia Williams',
    email: 'olivia@cybercyko.com',
    roles: ['Customer Success'],
    status: 'Verified',
    lastLogin: '3h ago',
    avatar: null
  },
  {
    id: '20',
    name: 'Ethan Miller',
    email: 'ethan@cybercyko.com',
    roles: ['Engineers'],
    status: 'Verified',
    lastLogin: '1d ago',
    avatar: null
  },
  {
    id: '21',
    name: 'Isabella Davis',
    email: 'isabella@cybercyko.com',
    roles: ['Admin'],
    status: 'Verified',
    lastLogin: '30m ago',
    avatar: null
  },
  {
    id: '22',
    name: 'Noah Thompson',
    email: 'noah@cybercyko.com',
    roles: ['Sales', 'Customer Success'],
    status: 'Pending',
    lastLogin: 'Never logged in',
    avatar: null
  },
  {
    id: '23',
    name: 'Ava Martinez',
    email: 'ava@cybercyko.com',
    roles: ['Engineers'],
    status: 'Verified',
    lastLogin: '2h ago',
    avatar: null
  },
  {
    id: '24',
    name: 'Liam Jackson',
    email: 'liam@cybercyko.com',
    roles: ['Admin', 'Engineers'],
    status: 'Verified',
    lastLogin: '15m ago',
    avatar: null
  },
  {
    id: '25',
    name: 'Mia Robinson',
    email: 'mia@cybercyko.com',
    roles: ['Customer Success'],
    status: 'Verified',
    lastLogin: '6h ago',
    avatar: null
  },
  {
    id: '26',
    name: 'Lucas White',
    email: 'lucas@cybercyko.com',
    roles: ['Sales'],
    status: 'Suspended',
    lastLogin: '90d ago',
    avatar: null
  },
  {
    id: '27',
    name: 'Charlotte Harris',
    email: 'charlotte@cybercyko.com',
    roles: ['Engineers'],
    status: 'Verified',
    lastLogin: '1h ago',
    avatar: null
  },
  {
    id: '28',
    name: 'Benjamin Lewis',
    email: 'benjamin@cybercyko.com',
    roles: ['Admin'],
    status: 'Verified',
    lastLogin: '8h ago',
    avatar: null
  },
  {
    id: '29',
    name: 'Amelia Walker',
    email: 'amelia@cybercyko.com',
    roles: ['Customer Success', 'Sales'],
    status: 'Verified',
    lastLogin: '4d ago',
    avatar: null
  },
  {
    id: '30',
    name: 'Henry Hall',
    email: 'henry@cybercyko.com',
    roles: ['Engineers'],
    status: 'Verified',
    lastLogin: '25m ago',
    avatar: null
  },
  {
    id: '31',
    name: 'Evelyn Allen',
    email: 'evelyn@cybercyko.com',
    roles: ['Admin'],
    status: 'Pending',
    lastLogin: 'Never logged in',
    avatar: null
  },
  {
    id: '32',
    name: 'Alexander Young',
    email: 'alex@cybercyko.com',
    roles: ['Engineers', 'Sales'],
    status: 'Verified',
    lastLogin: '12h ago',
    avatar: null
  },
  {
    id: '33',
    name: 'Harper King',
    email: 'harper@cybercyko.com',
    roles: ['Customer Success'],
    status: 'Verified',
    lastLogin: '2d ago',
    avatar: null
  },
  {
    id: '34',
    name: 'Sebastian Wright',
    email: 'sebastian@cybercyko.com',
    roles: ['Engineers'],
    status: 'Verified',
    lastLogin: '35m ago',
    avatar: null
  },
  {
    id: '35',
    name: 'Aria Scott',
    email: 'aria@cybercyko.com',
    roles: ['Sales', 'Admin'],
    status: 'Verified',
    lastLogin: '7h ago',
    avatar: null
  },
  {
    id: '36',
    name: 'Jack Green',
    email: 'jack@cybercyko.com',
    roles: ['Engineers'],
    status: 'Suspended',
    lastLogin: '45d ago',
    avatar: null
  },
  {
    id: '37',
    name: 'Scarlett Adams',
    email: 'scarlett@cybercyko.com',
    roles: ['Customer Success'],
    status: 'Verified',
    lastLogin: '50m ago',
    avatar: null
  },
  {
    id: '38',
    name: 'Owen Baker',
    email: 'owen@cybercyko.com',
    roles: ['Admin'],
    status: 'Verified',
    lastLogin: '3h ago',
    avatar: null
  },
  {
    id: '39',
    name: 'Luna Nelson',
    email: 'luna@cybercyko.com',
    roles: ['Engineers', 'Customer Success'],
    status: 'Verified',
    lastLogin: '1h ago',
    avatar: null
  },
  {
    id: '40',
    name: 'Aiden Carter',
    email: 'aiden@cybercyko.com',
    roles: ['Sales'],
    status: 'Verified',
    lastLogin: '5d ago',
    avatar: null
  },
  {
    id: '41',
    name: 'Chloe Mitchell',
    email: 'chloe@cybercyko.com',
    roles: ['Engineers'],
    status: 'Pending',
    lastLogin: 'Never logged in',
    avatar: null
  },
  {
    id: '42',
    name: 'Elijah Perez',
    email: 'elijah@cybercyko.com',
    roles: ['Admin', 'Sales'],
    status: 'Verified',
    lastLogin: '20m ago',
    avatar: null
  },
  {
    id: '43',
    name: 'Penelope Roberts',
    email: 'penelope@cybercyko.com',
    roles: ['Customer Success'],
    status: 'Verified',
    lastLogin: '9h ago',
    avatar: null
  },
  {
    id: '44',
    name: 'Mason Turner',
    email: 'mason@cybercyko.com',
    roles: ['Engineers'],
    status: 'Verified',
    lastLogin: '2h ago',
    avatar: null
  },
  {
    id: '45',
    name: 'Layla Phillips',
    email: 'layla@cybercyko.com',
    roles: ['Sales'],
    status: 'Verified',
    lastLogin: '4h ago',
    avatar: null
  },
  {
    id: '46',
    name: 'Logan Campbell',
    email: 'logan@cybercyko.com',
    roles: ['Engineers', 'Admin'],
    status: 'Verified',
    lastLogin: '40m ago',
    avatar: null
  },
  {
    id: '47',
    name: 'Riley Parker',
    email: 'riley@cybercyko.com',
    roles: ['Customer Success'],
    status: 'Suspended',
    lastLogin: '120d ago',
    avatar: null
  },
  {
    id: '48',
    name: 'Jacob Evans',
    email: 'jacob@cybercyko.com',
    roles: ['Admin'],
    status: 'Verified',
    lastLogin: '6h ago',
    avatar: null
  },
  {
    id: '49',
    name: 'Zoey Edwards',
    email: 'zoey@cybercyko.com',
    roles: ['Engineers'],
    status: 'Verified',
    lastLogin: '1d ago',
    avatar: null
  },
  {
    id: '50',
    name: 'Ryan Collins',
    email: 'ryan@cybercyko.com',
    roles: ['Sales', 'Customer Success'],
    status: 'Verified',
    lastLogin: '55m ago',
    avatar: null
  }
];

type FilterRole = 'all' | 'Admin' | 'Engineers' | 'Sales' | 'Customer Success';
type FilterStatus = 'all' | 'Verified' | 'Pending' | 'Suspended';

export function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const [filterRole, setFilterRole] = useState<FilterRole>('all');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(['Admin', 'Engineers', 'Pending']);

  // Filter users based on search and filters
  const filteredUsers = useMemo(() => {
    let result = users;

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(user =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.roles.some(role => role.toLowerCase().includes(query))
      );
    }

    // Role filter
    if (filterRole !== 'all') {
      result = result.filter(user => user.roles.includes(filterRole));
    }

    // Status filter
    if (filterStatus !== 'all') {
      result = result.filter(user => user.status === filterStatus);
    }

    return result;
  }, [users, searchQuery, filterRole, filterStatus]);

  // Search suggestions based on current query
  const searchSuggestions = useMemo(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) return [];
    const query = searchQuery.toLowerCase();
    const suggestions: { type: 'user' | 'role' | 'email'; value: string; label: string }[] = [];
    
    // User name suggestions
    users.forEach(user => {
      if (user.name.toLowerCase().includes(query) && suggestions.length < 5) {
        suggestions.push({ type: 'user', value: user.name, label: user.name });
      }
    });
    
    // Role suggestions
    ['Admin', 'Engineers', 'Sales', 'Customer Success'].forEach(role => {
      if (role.toLowerCase().includes(query) && !suggestions.find(s => s.value === role)) {
        suggestions.push({ type: 'role', value: role, label: role });
      }
    });
    
    // Email suggestions
    users.forEach(user => {
      if (user.email.toLowerCase().includes(query) && suggestions.length < 8) {
        if (!suggestions.find(s => s.value === user.email)) {
          suggestions.push({ type: 'email', value: user.email, label: user.email });
        }
      }
    });
    
    return suggestions.slice(0, 6);
  }, [searchQuery, users]);

  // Handle search selection
  const handleSearchSelect = (value: string) => {
    setSearchQuery(value);
    setShowSearchDropdown(false);
    // Add to recent searches
    setRecentSearches(prev => {
      const filtered = prev.filter(s => s !== value);
      return [value, ...filtered].slice(0, 5);
    });
  };

  // Clear recent searches
  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  // Stats
  const stats = useMemo(() => ({
    total: users.length,
    verified: users.filter(u => u.status === 'Verified').length,
    pending: users.filter(u => u.status === 'Pending').length,
    suspended: users.filter(u => u.status === 'Suspended').length,
  }), [users]);

  const handleCreateUser = (newUser: User) => {
    setUsers(prevUsers => [newUser, ...prevUsers]);
  };

  const handleImportUsers = () => {
    setShowImportModal(true);
  };

  const handleExportUsers = () => {
    console.log('Exporting users...');
  };

  const clearFilters = () => {
    setSearchQuery('');
    setFilterRole('all');
    setFilterStatus('all');
  };

  const hasActiveFilters = searchQuery || filterRole !== 'all' || filterStatus !== 'all';

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Users</h1>
            <p className="text-sm text-[#8F8F8F] mt-1">{stats.total} total users</p>
          </div>
          <div className="flex items-center gap-3">
            <Dropdown
              label="More Actions"
              variant="dark"
              items={[
                { label: 'Import users', onClick: handleImportUsers },
                { label: 'Export users', onClick: handleExportUsers },
              ]}
            />
            <Button variant="cybercyko" onClick={() => setShowNewUserModal(true)}>
              Create User
            </Button>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex items-center gap-4">
          {/* Enhanced Search Input with History Icon */}
          <div className="flex-1 max-w-xl relative">
            <div 
              className={`flex items-center gap-3 bg-[#0F0F0F] border rounded-xl px-4 py-3 transition-all duration-300 ${
                isSearchFocused 
                  ? 'border-[#00FF66] shadow-[0_0_20px_rgba(0,255,102,0.15)]' 
                  : 'border-[#1A1A1A] hover:border-[#2A2A2A]'
              }`}
            >
              <Search size={18} className={`transition-colors ${isSearchFocused ? 'text-[#00FF66]' : 'text-[#8F8F8F]'}`} />
              <input
                type="text"
                placeholder="Search by name, email, or role..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchDropdown(true);
                }}
                onFocus={() => {
                  setIsSearchFocused(true);
                  if (searchQuery) setShowSearchDropdown(true);
                }}
                onBlur={() => {
                  setIsSearchFocused(false);
                  setTimeout(() => setShowSearchDropdown(false), 200);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') setShowSearchDropdown(false);
                  if (e.key === 'Enter' && searchQuery.trim()) handleSearchSelect(searchQuery.trim());
                }}
                className="flex-1 bg-transparent outline-none text-sm text-[#D5FFD6] placeholder:text-[#5A5A5A]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 rounded-md text-[#5A5A5A] hover:text-[#8F8F8F] hover:bg-[#1A1A1A] transition-all"
                >
                  <X size={16} />
                </button>
              )}
              {/* History Icon */}
              <div className="relative">
                <button
                  onClick={() => setShowSearchDropdown(!showSearchDropdown)}
                  className={`p-1.5 rounded-lg transition-all duration-200 ${
                    showSearchDropdown && !searchQuery
                      ? 'bg-[#00FF66] text-[#050505]' 
                      : 'text-[#5A5A5A] hover:text-[#00FF66] hover:bg-[#1A1A1A]'
                  }`}
                  title="Search history"
                >
                  <Clock size={16} />
                </button>
                {recentSearches.length > 0 && !showSearchDropdown && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#00FF66] rounded-full" />
                )}
              </div>
            </div>

            {/* Search Dropdown */}
            {showSearchDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl shadow-2xl overflow-hidden z-50" style={{ animation: 'fadeInDown 0.2s ease-out' }}>
                {/* Suggestions when typing */}
                {searchQuery && searchSuggestions.length > 0 && (
                  <div className="p-2">
                    <p className="px-3 py-2 text-xs font-semibold text-[#5A5A5A] uppercase tracking-wider">Suggestions</p>
                    {searchSuggestions.map((suggestion, idx) => (
                      <button key={idx} onClick={() => handleSearchSelect(suggestion.value)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#1A1A1A] transition-all group">
                        <span className={`w-6 h-6 rounded-md flex items-center justify-center ${suggestion.type === 'user' ? 'bg-[rgba(0,255,102,0.1)]' : suggestion.type === 'role' ? 'bg-[rgba(96,165,250,0.1)]' : 'bg-[rgba(167,139,250,0.1)]'}`}>
                          {suggestion.type === 'user' ? <Users size={12} className="text-[#00FF66]" /> : suggestion.type === 'role' ? <Shield size={12} className="text-[#60A5FA]" /> : <span className="text-[10px] text-[#A78BFA]">@</span>}
                        </span>
                        <span className="text-sm text-[#D5FFD6] group-hover:text-white">{suggestion.label}</span>
                        <span className="ml-auto text-xs text-[#5A5A5A] capitalize">{suggestion.type}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Recent Searches - shown when clicking history icon */}
                {!searchQuery && recentSearches.length > 0 && (
                  <div className="p-2">
                    <div className="flex items-center justify-between px-3 py-2">
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-[#00FF66]" />
                        <p className="text-xs font-semibold text-[#8F8F8F] uppercase tracking-wider">Recent Searches</p>
                      </div>
                      <button onClick={clearRecentSearches} className="text-xs text-[#5A5A5A] hover:text-[#FF4444] transition-colors">Clear all</button>
                    </div>
                    {recentSearches.map((search, idx) => (
                      <button key={idx} onClick={() => handleSearchSelect(search)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#1A1A1A] transition-all group">
                        <span className="w-6 h-6 rounded-md bg-[#1A1A1A] flex items-center justify-center">
                          <Search size={12} className="text-[#5A5A5A]" />
                        </span>
                        <span className="text-sm text-[#8F8F8F] group-hover:text-white">{search}</span>
                        <X size={14} className="ml-auto text-[#5A5A5A] hover:text-[#FF4444] transition-colors opacity-0 group-hover:opacity-100" onClick={(e) => { e.stopPropagation(); setRecentSearches(prev => prev.filter(s => s !== search)); }} />
                      </button>
                    ))}
                  </div>
                )}

                {/* Quick Filters - shown when clicking history icon */}
                {!searchQuery && (
                  <div className="p-2 border-t border-[#1A1A1A]">
                    <p className="px-3 py-2 text-xs font-semibold text-[#5A5A5A] uppercase tracking-wider">Quick Filters</p>
                    <div className="flex flex-wrap gap-2 px-3 pb-2">
                      {[
                        { label: 'Admins', query: 'Admin', icon: Shield, color: '#00FF66' },
                        { label: 'Pending', query: 'Pending', icon: Clock, color: '#FFCC00' },
                        { label: 'Engineers', query: 'Engineers', icon: Users, color: '#60A5FA' },
                        { label: 'Sales', query: 'Sales', icon: Users, color: '#A78BFA' },
                      ].map((filter) => (
                        <button key={filter.label} onClick={() => handleSearchSelect(filter.query)} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1A1A1A] hover:bg-[#2A2A2A] transition-all text-xs">
                          <filter.icon size={12} style={{ color: filter.color }} />
                          <span className="text-[#8F8F8F]">{filter.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* No history message */}
                {!searchQuery && recentSearches.length === 0 && (
                  <div className="p-4 text-center border-b border-[#1A1A1A]">
                    <Clock size={20} className="mx-auto mb-2 text-[#3A3A3A]" />
                    <p className="text-sm text-[#5A5A5A]">No recent searches</p>
                  </div>
                )}

                {/* No suggestions message */}
                {searchQuery && searchSuggestions.length === 0 && (
                  <div className="p-6 text-center">
                    <AlertCircle size={24} className="mx-auto mb-2 text-[#5A5A5A]" />
                    <p className="text-sm text-[#5A5A5A]">No suggestions for "{searchQuery}"</p>
                    <p className="text-xs text-[#3A3A3A] mt-1">Press Enter to search</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 ${
              showFilters || hasActiveFilters
                ? 'bg-[rgba(0,255,102,0.1)] border-[#00FF66] text-[#00FF66]'
                : 'bg-[#0F0F0F] border-[#1A1A1A] text-[#8F8F8F] hover:border-[#2A2A2A]'
            } border`}
          >
            <Filter size={18} />
            <span className="text-sm font-medium">Filters</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-[#00FF66]" />
            )}
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div 
            className="mt-4 p-4 bg-[#0F0F0F] border border-[#1A1A1A] rounded-xl"
            style={{ animation: 'fadeIn 0.2s ease-out' }}
          >
            <div className="flex items-start gap-8">
              {/* Role Filter */}
              <div>
                <p className="text-xs font-semibold text-[#8F8F8F] uppercase tracking-wider mb-3">Role</p>
                <div className="flex flex-wrap gap-2">
                  {(['all', 'Admin', 'Engineers', 'Sales', 'Customer Success'] as FilterRole[]).map((role) => (
                    <button
                      key={role}
                      onClick={() => setFilterRole(role)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                        filterRole === role
                          ? 'bg-[#00FF66] text-[#050505]'
                          : 'bg-[#1A1A1A] text-[#8F8F8F] hover:bg-[#2A2A2A]'
                      }`}
                    >
                      {role === 'all' ? 'All Roles' : role}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <p className="text-xs font-semibold text-[#8F8F8F] uppercase tracking-wider mb-3">Status</p>
                <div className="flex gap-2">
                  {[
                    { value: 'all', label: 'All', icon: Users, color: '#8F8F8F' },
                    { value: 'Verified', label: 'Verified', icon: CheckCircle, color: '#00FF66' },
                    { value: 'Pending', label: 'Pending', icon: Clock, color: '#FFCC00' },
                    { value: 'Suspended', label: 'Suspended', icon: XCircle, color: '#FF4444' },
                  ].map((status) => (
                    <button
                      key={status.value}
                      onClick={() => setFilterStatus(status.value as FilterStatus)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                        filterStatus === status.value
                          ? 'bg-[#00FF66] text-[#050505]'
                          : 'bg-[#1A1A1A] text-[#8F8F8F] hover:bg-[#2A2A2A]'
                      }`}
                    >
                      <status.icon size={14} style={{ color: filterStatus === status.value ? '#050505' : status.color }} />
                      {status.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="ml-auto flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-[#FF4444] bg-[rgba(255,68,68,0.1)] hover:bg-[rgba(255,68,68,0.2)] transition-all"
                >
                  <X size={14} />
                  Clear All
                </button>
              )}
            </div>
          </div>
        )}

        {/* Search Results Info */}
        {hasActiveFilters && (
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="text-[#8F8F8F]">Showing</span>
            <span className="text-[#00FF66] font-semibold">{filteredUsers.length}</span>
            <span className="text-[#8F8F8F]">of {users.length} users</span>
            {searchQuery && (
              <span className="text-[#8F8F8F]">
                matching "<span className="text-[#D5FFD6]">{searchQuery}</span>"
              </span>
            )}
          </div>
        )}
      </div>

      <UserTable users={filteredUsers} />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {showNewUserModal && (
        <NewUserModal 
          onClose={() => setShowNewUserModal(false)} 
          onCreateUser={handleCreateUser}
        />
      )}

      {showImportModal && (
        <ImportUsersModal onClose={() => setShowImportModal(false)} />
      )}
    </div>
  );
}
