'use client';
import { User } from '../../types';
import styles from '@/app/styles/Home.module.css';

interface UserProfileProps {
  user: User;
  onEdit: () => void;
  onBack: () => void;
  onDelete: () => void;
}

export default function UserProfile({ user, onEdit, onBack, onDelete }: UserProfileProps) {
  return (
    <div className={styles.profileCard}>
      <button onClick={onBack} className={styles.backButton}>
        Back to List
      </button>
      
      <div className={styles.profileHeader}>
        <img 
          src={user.avatar} 
          alt={user.name} 
          className={styles.profileAvatar}
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${user.name.replace(' ', '+')}&background=random`;
          }}
        />
        <div>
          <h2 className={styles.userName}>{user.name}</h2>
          <span className={`${styles.badge} ${user.isActive ? styles.active : styles.inactive}`}>
            {user.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>
      
      <div className={styles.profileDetails}>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Email:</span>
          <span className={styles.detailValue}>{user.email}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Role:</span>
          <span className={styles.detailValue}>{user.role}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Department:</span>
          <span className={styles.detailValue}>{user.department}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Location:</span>
          <span className={styles.detailValue}>{user.location}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Join Date:</span>
          <span className={styles.detailValue}>{user.joinDate}</span>
        </div>
      </div>
      
      <div className={styles.profileActions}>
        <button onClick={onEdit} className={styles.editButton}>
          Edit Profile
        </button>
        <button onClick={onDelete} className={styles.deleteButton}>
          Delete Profile
        </button>
      </div>
    </div>
  );
}