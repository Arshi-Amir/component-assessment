'use client';
import { User } from '../../types';
import styles from './UserCard.module.css';

interface UserCardProps {
  user: User;
  onView: (user: User) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export default function UserCard({ user, onView, onEdit, onDelete }: UserCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <img 
          src={user.avatar} 
          alt={user.name} 
          className={styles.avatar}
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${user.name.replace(' ', '+')}&background=random`;
          }}
        />
        <div className={styles.info}>
          <h3 className={styles.name}>{user.name}</h3>
          <p className={styles.email}>{user.email}</p>
          <div className={styles.meta}>
            <span className={`${styles.badge} ${user.isActive ? styles.active : styles.inactive}`}>
              {user.isActive ? 'Active' : 'Inactive'}
            </span>
            <span className={styles.role}>{user.role}</span>
          </div>
        </div>
      </div>
      <div className={styles.actions}>
        <button 
          onClick={() => onView(user)} 
          className={styles.viewBtn}
          aria-label={`View ${user.name}`}
        >
          View
        </button>
        <button 
          onClick={() => onEdit(user)} 
          className={styles.editBtn}
          aria-label={`Edit ${user.name}`}
        >
          Edit
        </button>
        <button 
          onClick={() => onDelete(user)} 
          className={styles.deleteBtn}
          aria-label={`Delete ${user.name}`}
        >
          Delete
        </button>
      </div>
    </div>
  );
}