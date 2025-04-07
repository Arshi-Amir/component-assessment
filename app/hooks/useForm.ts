// app/hooks/useForm.ts
'use client';

import { useState, useEffect, useCallback } from 'react';

export default function useForm<T extends Record<string, any>>({
  initialValues,
  validate,
}: {
  initialValues: T;
  validate?: (values: T) => Record<string, string>;
}) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Memoized validation
  const validateForm = useCallback(() => {
    if (validate) {
      const validationErrors = validate(values);
      setErrors(validationErrors);
      return validationErrors;
    }
    return {};
  }, [validate, values]);

  useEffect(() => {
    validateForm();
  }, [validateForm]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setValues(prev => ({
      ...prev,
      [name]: checked !== undefined ? checked : value
    }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  };

  const handleSubmit = (onSubmit: (values: T) => Promise<void>) => {
    return async (e?: React.FormEvent) => {
      e?.preventDefault();
      setIsSubmitting(true);

      // Validate all fields
      const allTouched = Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: true }), {});
      setTouched(allTouched);

      const errors = validateForm();
      if (Object.keys(errors).length > 0) {
        setIsSubmitting(false);
        return;
      }

      try {
        await onSubmit(values);
      } finally {
        setIsSubmitting(false);
      }
    };
  };

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue: <K extends keyof T>(name: K, value: T[K]) => {
      setValues(prev => ({ ...prev, [name]: value }));
    },
    resetForm: () => {
      setValues(initialValues);
      setErrors({});
      setTouched({});
    }
  };
}