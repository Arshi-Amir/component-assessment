// types.ts
export interface User {
    id: number;
    name: string;
    email: string;
    avatar: string;
    role: 'Admin' | 'Editor' | 'Viewer';
    department: string;
    location: string;
    joinDate: string;
    isActive: boolean;
  }
  
  export type UserFormData = Omit<User, 'id' | 'avatar'> & {
    id?: number;
  };
  
  export interface ThemeContextType {
    isDarkMode: boolean;
    toggleTheme: () => void;
  }