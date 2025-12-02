export interface User {
    id: string;
    name: string;
    email: string;
    roles: string[];
    status: 'Verified' | 'Pending' | 'Suspended';
    lastLogin: string;
    avatar?: string | null;
    isActive?: boolean;
}
