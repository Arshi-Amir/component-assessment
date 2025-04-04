'use client';

import styles from '../styles/Home.module.css';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
}

export default function ConfirmationDialog({ 
  isOpen, 
  onConfirm, 
  onCancel, 
  message 
}: ConfirmationDialogProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.dialogOverlay}>
      <div className={styles.dialog}>
        <p>{message}</p>
        <div className={styles.dialogButtons}>
          <button onClick={onConfirm} className={styles.confirmButton}>
            Confirm
          </button>
          <button onClick={onCancel} className={styles.cancelButton}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}