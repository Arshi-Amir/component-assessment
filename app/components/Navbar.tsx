'use client';
import Link from 'next/link';
import LoginButton from './LoginButton';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/" className="navbar-title">
          User Management
        </Link>
        <div className="navbar-actions">
          <ThemeToggle />
          <LoginButton />
        </div>
      </div>
    </nav>
  );
}