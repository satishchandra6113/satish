import { useState } from 'react';
import { SearchBar } from './SearchBar';
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

export function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showNewUserModal, setShowNewUserModal] = useState(false);

  const handleCreateUser = (newUser: User) => {
    setUsers(prevUsers => [newUser, ...prevUsers]);
  };

  const handleImportUsers = () => {
    setShowImportModal(true);
  };

  const handleExportUsers = () => {
    console.log('Exporting users...');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-6">Users</h1>

        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 max-w-md">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search users..."
              variant="dark"
            />
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
      </div>

      <UserTable users={users} />

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
