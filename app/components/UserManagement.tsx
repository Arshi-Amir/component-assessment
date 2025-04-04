'use client';

import { useState } from 'react';
import UserList from './UserList';
import UserForm from './UserForm';
import UserProfile from './UserProfile';
import ConfirmationDialog from './ConfirmationDialog';
import styles from '../styles/Home.module.css';
import { initialUsers } from '../utils/users';
import { User, UserFormData } from '../../types';

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);

  const handleViewProfile = (user: User) => {
    setSelectedUser(user);
    setIsEditing(false);
    setIsAdding(false);
  };

  const handleEditProfile = (user: User) => {
    setSelectedUser(user);
    setIsEditing(true);
    setIsAdding(false);
  };

  const handleBackToList = () => {
    setSelectedUser(null);
    setIsEditing(false);
    setIsAdding(false);
  };

  const handleAddUser = () => {
    setSelectedUser(null);
    setIsEditing(false);
    setIsAdding(true);
  };

  const handleSubmit = (formData: UserFormData) => {
    if (isEditing && selectedUser) {
      setUsers(users.map(user => 
        user.id === selectedUser.id ? { ...user, ...formData } as User : user
      ));
      setSelectedUser({ ...selectedUser, ...formData } as User);
      setIsEditing(false);
    } else if (isAdding) {
      const newUser: User = {
        ...formData,
        id: Math.max(...users.map(u => u.id)) + 1,
        avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 50)}.jpg`
      };
      setUsers([...users, newUser]);
      setIsAdding(false);
    }
  };

  const handleDeleteClick = (userId: number) => {
    setUserToDelete(userId);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (userToDelete) {
      setUsers(users.filter(user => user.id !== userToDelete));
      if (selectedUser && selectedUser.id === userToDelete) {
        setSelectedUser(null);
      }
      setShowDeleteDialog(false);
      setUserToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
    setUserToDelete(null);
  };

  return (
    <div className={styles.userManagement}>
      {!selectedUser && !isAdding ? (
        <>
          <div className={styles.header}>
            <h1>User Management</h1>
            <button onClick={handleAddUser} className={styles.addButton}>
              Add New User
            </button>
          </div>
          <UserList users={users} onViewProfile={handleViewProfile} />
        </>
      ) : isAdding ? (
        <>
          <h1>Add New User</h1>
          <UserForm 
            onSubmit={handleSubmit} 
            onCancel={handleBackToList} 
          />
        </>
      ) : isEditing && selectedUser ? (
        <>
          <h1>Edit User</h1>
          <UserForm 
            initialData={selectedUser} 
            onSubmit={handleSubmit} 
            onCancel={() => {
              setIsEditing(false);
              const originalUser = users.find(u => u.id === selectedUser.id);
              if (originalUser) setSelectedUser(originalUser);
            }} 
          />
          <button 
            onClick={() => handleDeleteClick(selectedUser.id)} 
            className={styles.deleteButton}
          >
            Delete User
          </button>
        </>
      ) : selectedUser ? (
        <UserProfile 
          user={selectedUser} 
          onEdit={handleEditProfile} 
          onBack={handleBackToList} 
        />
      ) : null}

      <ConfirmationDialog
        isOpen={showDeleteDialog}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        message="Are you sure you want to delete this user? This action cannot be undone."
      />
    </div>
  );
}