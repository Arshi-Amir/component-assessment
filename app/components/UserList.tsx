'use client';

import { useState } from 'react';
import { User } from '../../types';
import UserCard from './UserCard';
import styles from '../styles/Home.module.css';

interface UserListProps {
  users: User[];
  onViewProfile: (user: User) => void;
}

export default function UserList({ users, onViewProfile }: UserListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'active') return matchesSearch && user.isActive;
    if (filter === 'inactive') return matchesSearch && !user.isActive;
    return matchesSearch;
  });

  return (
    <div className={styles.userList}>
      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as 'all' | 'active' | 'inactive')}
          className={styles.filterSelect}
        >
          <option value="all">All Users</option>
          <option value="active">Active Users</option>
          <option value="inactive">Inactive Users</option>
        </select>
      </div>
      
      {filteredUsers.length > 0 ? (
        <div className={styles.cardsContainer}>
          {filteredUsers.map(user => (
            <UserCard key={user.id} user={user} onViewProfile={onViewProfile} />
          ))}
        </div>
      ) : (
        <p className={styles.noResults}>No users match your search criteria.</p>
      )}
    </div>
  );
}