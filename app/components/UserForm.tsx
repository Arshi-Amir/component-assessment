'use client';

import { useState } from 'react';
import { User, UserFormData } from '../../types';
import styles from '../styles/Home.module.css';

interface UserFormProps {
  initialData?: UserFormData;
  onSubmit: (formData: UserFormData) => void;
  onCancel: () => void;
}

export default function UserForm({ initialData, onSubmit, onCancel }: UserFormProps) {
  const [formData, setFormData] = useState<UserFormData>(initialData || {
    name: '',
    email: '',
    role: 'Viewer',
    isActive: true,
    department: '',
    location: '',
    joinDate: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const validate = (): Record<string, string> => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.role) newErrors.role = 'Role is required';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.userForm}>
      <div className={styles.formGroup}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? styles.errorInput : ''}
        />
        {errors.name && <span className={styles.error}>{errors.name}</span>}
      </div>
      
      <div className={styles.formGroup}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? styles.errorInput : ''}
        />
        {errors.email && <span className={styles.error}>{errors.email}</span>}
      </div>
      
      <div className={styles.formGroup}>
        <label>Role:</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className={errors.role ? styles.errorInput : ''}
        >
          <option value="Admin">Admin</option>
          <option value="Editor">Editor</option>
          <option value="Viewer">Viewer</option>
        </select>
        {errors.role && <span className={styles.error}>{errors.role}</span>}
      </div>
      
      <div className={styles.formGroup}>
        <label>Department:</label>
        <input
          type="text"
          name="department"
          value={formData.department}
          onChange={handleChange}
        />
      </div>
      
      <div className={styles.formGroup}>
        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
      </div>
      
      <div className={styles.formGroup}>
        <label>Join Date:</label>
        <input
          type="date"
          name="joinDate"
          value={formData.joinDate}
          onChange={handleChange}
        />
      </div>
      
      <div className={styles.formGroup}>
        <label>
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
          />
          Active User
        </label>
      </div>
      
      <div className={styles.formButtons}>
        <button type="button" onClick={onCancel} className={styles.cancelButton}>
          Cancel
        </button>
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </div>
    </form>
  );
}