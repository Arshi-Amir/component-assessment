'use client';

import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme(); // Now this will work
  
  return (
    <button onClick={toggleTheme}>
      {isDarkMode ? '☀️' : '🌙'}
    </button>
  );
}