'use client';
import { useCallback } from 'react';
import useForm from '../hooks/useForm';
import { User, UserFormData } from '../../types';
import LoadingSpinner from './LoadingSpinner';

interface UserFormProps {
  initialData?: UserFormData;
  onSubmit: (formData: User) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export default function UserForm({ 
  initialData, 
  onSubmit, 
  onCancel,
  isSubmitting = false
}: UserFormProps) {
  const validate = useCallback((values: UserFormData) => {
    const errors: Record<string, string> = {};
    if (!values.name.trim()) errors.name = 'Name is required';
    if (!values.email.trim()) errors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(values.email)) errors.email = 'Email is invalid';
    if (!values.role) errors.role = 'Role is required';
    if (!values.department) errors.department = 'Department is required';
    if (!values.location) errors.location = 'Location is required';
    if (!values.joinDate) errors.joinDate = 'Join date is required';
    return errors;
  }, []);

  const getInitialValues = (): UserFormData => {
    return initialData || {
      name: '',
      email: '',
      role: 'Viewer',
      isActive: true,
      department: '',
      location: '',
      joinDate: new Date().toISOString().split('T')[0]
    };
  };

  const { 
    values, 
    errors, 
    touched, 
    handleChange, 
    handleBlur,
    handleSubmit: formHandleSubmit,
    setFieldValue,
    resetForm,
    isSubmitting: formIsSubmitting
  } = useForm<UserFormData>({
    initialValues: getInitialValues(),
    validate
  });

  const handleFormSubmit = useCallback(async (formValues: UserFormData) => {
    const userToSave: User = {
      id: formValues.id || Date.now(),
      avatar: formValues.avatar || `https://randomuser.me/api/portraits/lego/${Math.floor(Math.random() * 10)}.jpg`,
      ...formValues
    };
    await onSubmit(userToSave);
  }, [onSubmit]);

  const getInputClassName = (fieldName: keyof typeof errors) => {
    const baseClasses = "form-input";
    const errorClasses = touched[fieldName] && errors[fieldName] ? "border-red-500" : "";
    return `${baseClasses} ${errorClasses}`;
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h1 className="text-xl font-bold mb-1">
          {initialData ? 'Edit User' : 'Add New User'}
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {initialData ? 'Update user information' : 'Fill in the user details below'}
        </p>
      </div>

      <form onSubmit={formHandleSubmit(handleFormSubmit)}>
        <div className="form-grid">
          {/* Name Field */}
          <div className="form-group">
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={getInputClassName('name')}
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              placeholder="John Doe"
            />
            {touched.name && errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={getInputClassName('email')}
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              placeholder="john@example.com"
            />
            {touched.email && errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Role Field */}
          <div className="form-group">
            <label htmlFor="role" className="block text-sm font-medium mb-1">
              Role *
            </label>
            <select
              id="role"
              name="role"
              className={getInputClassName('role')}
              value={values.role}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
            >
              <option value="Admin">Admin</option>
              <option value="Editor">Editor</option>
              <option value="Viewer">Viewer</option>
            </select>
            {touched.role && errors.role && (
              <p className="mt-1 text-sm text-red-600">{errors.role}</p>
            )}
          </div>

          {/* Department Field */}
          <div className="form-group">
            <label htmlFor="department" className="block text-sm font-medium mb-1">
              Department *
            </label>
            <input
              type="text"
              id="department"
              name="department"
              className={getInputClassName('department')}
              value={values.department}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              placeholder="Engineering"
            />
            {touched.department && errors.department && (
              <p className="mt-1 text-sm text-red-600">{errors.department}</p>
            )}
          </div>

          {/* Location Field */}
          <div className="form-group">
            <label htmlFor="location" className="block text-sm font-medium mb-1">
              Location *
            </label>
            <input
              type="text"
              id="location"
              name="location"
              className={getInputClassName('location')}
              value={values.location}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              placeholder="New York, USA"
            />
            {touched.location && errors.location && (
              <p className="mt-1 text-sm text-red-600">{errors.location}</p>
            )}
          </div>

          {/* Join Date Field */}
          <div className="form-group">
            <label htmlFor="joinDate" className="block text-sm font-medium mb-1">
              Join Date *
            </label>
            <input
              type="date"
              id="joinDate"
              name="joinDate"
              className={getInputClassName('joinDate')}
              value={values.joinDate}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
            />
            {touched.joinDate && errors.joinDate && (
              <p className="mt-1 text-sm text-red-600">{errors.joinDate}</p>
            )}
          </div>
        </div>

        {/* Active Status Checkbox - Now properly aligned */}
        <div className="form-checkbox">
          <input
            type="checkbox"
            id="isActive"
            name="isActive"
            checked={values.isActive}
            onChange={(e) => setFieldValue('isActive', e.target.checked)}
            onBlur={handleBlur}
            disabled={isSubmitting}
            className="h-4 w-4"
          />
          <label htmlFor="isActive" className="text-sm">
            Active User
          </label>
        </div>

        {/* Form Actions */}
        {/* Form Actions */}
        <div className="form-actions">
  <button
    type="button"
    onClick={() => {
      resetForm();
      onCancel();
    }}
    className="button button-secondary"
    disabled={isSubmitting}
  >
    Cancel
  </button>
  <button
    type="submit"
    className="button button-primary"
    disabled={isSubmitting || formIsSubmitting}
  >
    {isSubmitting || formIsSubmitting ? (
      <>
        <LoadingSpinner size="sm" />
        {initialData ? 'Saving...' : 'Creating...'}
      </>
    ) : initialData ? 'Save Changes' : 'Create User'}
  </button>
</div>
      </form>
    </div>
  );
}