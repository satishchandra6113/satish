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
  }
];

interface UsersPageProps {
  onNewUser: () => void;
}

export function UsersPage({ onNewUser }: UsersPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [users] = useState<User[]>(mockUsers);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showNewUserModal, setShowNewUserModal] = useState(false);

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
        <NewUserModal onClose={() => setShowNewUserModal(false)} />
      )}

      {showImportModal && (
        <ImportUsersModal onClose={() => setShowImportModal(false)} />
      )}
    </div>
  );
}
