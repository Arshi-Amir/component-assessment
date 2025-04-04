'use client';

import { User } from '../../types';
import styles from '../styles/Home.module.css';

interface UserCardProps {
  user: User;
  onViewProfile: (user: User) => void;
}

export default function UserCard({ user, onViewProfile }: UserCardProps) {
  return (
    <div className={styles.userCard}>
      <img src={user.avatar} alt={user.name} className={styles.avatar} />
      <div className={styles.userInfo}>
        <h3>{user.name}</h3>
        <p>{user.email}</p>
        <p>Role: {user.role}</p>
        <span className={`${styles.badge} ${user.isActive ? styles.active : styles.inactive}`}>
          {user.isActive ? 'Active' : 'Inactive'}
        </span>
      </div>
      <button onClick={() => onViewProfile(user)} className={styles.button}>
        View Profile
      </button>
    </div>
  );
}