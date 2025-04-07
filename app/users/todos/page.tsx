// app/users/todos/page.tsx
'use client';

import { TodoApp } from '../.././components/TodoApp';
import Link from 'next/link';
import { useTheme } from '../.././context/ThemeContext';

export default function TodoPage() {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto p-4 pt-6">
        {/* Back button to return to User Management */}
        <Link 
          href="/users" 
          className={`mb-6 inline-block px-4 py-2 rounded-lg ${
            isDarkMode
              ? 'bg-gray-700 text-white hover:bg-gray-600'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          ← Back to User Management
        </Link>

        {/* Todo App Component */}
        <TodoApp />
      </div>
    </div>
  );
}