// app/users/layout.tsx
'use client';

import { ReactNode } from 'react';
import ProtectedRoute from '.././components/ProtectedRoute';
import Navbar from '.././components/Navbar';

export default function UsersLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute requiredRole="user">
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        {children}
      </div>
    </ProtectedRoute>
  );
}