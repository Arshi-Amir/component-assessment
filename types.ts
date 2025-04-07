// types.ts

export interface User {
  id: number | string;
  name: string;
  email: string;
  avatar: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  department: string;
  location: string;
  joinDate: string;
  isActive: boolean;
}

export interface UserFormData extends Omit<User, 'id' | 'avatar'> {
  id?: number | string;
  avatar?: string;
}

export interface UserListProps {
  users: User[];
  onView: (user: User) => void;
  onAdd: () => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  isLoading?: boolean;      
  error?: string | null; 
}

export interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}
