'use client';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LoginButton() {
  const { user, logout, isLoading, error, setError } = useAuth();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogin = () => {
    router.push('/login');
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setError(null);
    try {
      await logout();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Logout failed');
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <span className="welcome-message">
          Welcome, {user.name}
        </span>
        <button
          onClick={handleLogout}
          disabled={isLoading || isLoggingOut}
          className="logout-button"
        >
          {isLoggingOut ? (
            <>
              <svg className="spinner h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Logging out...
            </>
          ) : 'Logout'}
        </button>
      </div>
    );
  }

  return (
    <button onClick={handleLogin} className="login-button">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
      </svg>
      Login
    </button>
  );
}