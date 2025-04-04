import UserManagement from "./components/UserManagement";
import ThemeToggle from "./components/ThemeToggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      {/* Simple Header */}
      <div className="flex justify-between items-center mb-8">
        <ThemeToggle />
      </div>

      {/* User Management Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <UserManagement />
      </div>
    </div>
  );
}