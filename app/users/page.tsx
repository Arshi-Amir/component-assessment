// app/users/page.tsx
'use client';

import Link from 'next/link';
import UserManagement from '../components/UserManagement';
import { useTheme } from '../context/ThemeContext';

export default function UserManagementPage() {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto p-4 pt-6">
        {/* Todo Button that links to separate page */}
        <div className="mb-6">
          <Link 
            href="/users/todos"
            className={`inline-block px-6 py-3 rounded-lg text-lg font-medium ${
              isDarkMode
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            } transition-colors shadow-md`}
          >
            Todo App
          </Link>
        </div>

        {/* User Management Content (remains same) */}
        <UserManagement />
      </div>
    </div>
  );
}