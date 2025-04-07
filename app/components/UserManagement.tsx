'use client';
import { useState } from 'react';
import UserList from './UserList';
import UserForm from './UserForm';
import UserProfile from './UserProfile';
import { initialUsers } from '../utils/users';
import { User, UserFormData } from '../../types';

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleViewProfile = (user: User) => {
    setSelectedUser(user);
    setIsEditing(false);
    setIsAdding(false);
    setError(null);
  };

  const handleEditProfile = (user: User) => {
    setSelectedUser(user);
    setIsEditing(true);
    setIsAdding(false);
    setError(null);
  };

  const handleBackToList = () => {
    setSelectedUser(null);
    setIsEditing(false);
    setIsAdding(false);
    setError(null);
  };

  const handleAddUser = () => {
    setSelectedUser(null);
    setIsEditing(false);
    setIsAdding(true);
    setError(null);
  };

  const handleSubmit = async (formData: UserFormData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      if (isEditing && selectedUser) {
        const updatedUser: User = {
          ...selectedUser,
          ...formData,
          id: selectedUser.id,
          avatar: selectedUser.avatar,
        };

        setUsers(users.map(user => user.id === selectedUser.id ? updatedUser : user));
        setSelectedUser(updatedUser);
        setIsEditing(false);
      } else if (isAdding) {
        const newUser: User = {
          ...formData,
          id: Math.max(0, ...users.map(u => Number(u.id))) + 1,
          avatar: `https://randomuser.me/api/portraits/${
            Math.random() > 0.5 ? 'men' : 'women'
          }/${Math.floor(Math.random() * 50)}.jpg`
        };
        setUsers([...users, newUser]);
        setIsAdding(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submission failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;

    setIsLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setUsers(users.filter(user => user.id !== userToDelete.id));
      if (selectedUser?.id === userToDelete.id) {
        setSelectedUser(null);
      }
      setShowDeleteDialog(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Deletion failed');
    } finally {
      setIsLoading(false);
      setUserToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
    setUserToDelete(null);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-md shadow-md">
      {!selectedUser && !isAdding ? (
        <UserList 
          users={users}
          onView={handleViewProfile}
          onAdd={handleAddUser}
          onEdit={handleEditProfile}
          onDelete={handleDeleteClick}
          isLoading={isLoading}
          error={error}
        />
      ) : isAdding ? (
        <div className="space-y-4">
          <h1 className="text-2xl font-bold dark:text-white">Add New User</h1>
          <UserForm 
            onSubmit={handleSubmit}
            onCancel={handleBackToList}
            isSubmitting={isLoading}
          />
        </div>
      ) : isEditing && selectedUser ? (
        <div className="space-y-4">
          <h1 className="text-2xl font-bold dark:text-white">Edit User</h1>
          <UserForm 
            initialData={{
              name: selectedUser.name,
              email: selectedUser.email,
              role: selectedUser.role,
              isActive: selectedUser.isActive,
              department: selectedUser.department,
              location: selectedUser.location,
              joinDate: selectedUser.joinDate
            }}
            onSubmit={handleSubmit}
            onCancel={() => {
              setIsEditing(false);
              setSelectedUser(users.find(u => u.id === selectedUser.id) || null);
            }}
            isSubmitting={isLoading}
          />
          <button
            onClick={() => handleDeleteClick(selectedUser)}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Delete User'}
          </button>
        </div>
      ) : selectedUser ? (
        <UserProfile 
          user={selectedUser}
          onEdit={() => handleEditProfile(selectedUser)}
          onBack={handleBackToList}
          onDelete={() => handleDeleteClick(selectedUser)}
        />
      ) : null}

      {showDeleteDialog && userToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded shadow-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Confirm Deletion</h3>
            <p className="mb-4 dark:text-gray-300">
              Are you sure you want to delete <strong>{userToDelete.name}</strong>? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCancelDelete}
                className="bg-gray-300 text-gray-800 dark:bg-gray-600 dark:text-white px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}