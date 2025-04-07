'use client';

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full border border-gray-200 dark:border-gray-700">
        <p className="mb-4 text-gray-800 dark:text-gray-200">{message}</p>
        <div className="flex justify-end gap-3">
          <button 
            onClick={onCancel} 
            className="button button-secondary"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm} 
            className="button button-danger"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}