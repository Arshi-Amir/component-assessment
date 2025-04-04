'use client';

import { User } from '../../types';
import styles from '../styles/Home.module.css';

interface UserProfileProps {
  user: User;
  onEdit: (user: User) => void;
  onBack: () => void;
}

export default function UserProfile({ user, onEdit, onBack }: UserProfileProps) {
  return (
    <div className={styles.userProfile}>
      <button onClick={onBack} className={styles.backButton}>
        Back to List
      </button>
      
      <div className={styles.profileHeader}>
        <img src={user.avatar} alt={user.name} className={styles.profileAvatar} />
        <div>
          <h2>{user.name}</h2>
          <span className={`${styles.badge} ${user.isActive ? styles.active : styles.inactive}`}>
            {user.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>
      
      <div className={styles.profileDetails}>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Email:</span>
          <span>{user.email}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Role:</span>
          <span>{user.role}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Department:</span>
          <span>{user.department}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Location:</span>
          <span>{user.location}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Join Date:</span>
          <span>{user.joinDate}</span>
        </div>
      </div>
      
      <button onClick={() => onEdit(user)} className={styles.editButton}>
        Edit Profile
      </button>
    </div>
  );
}