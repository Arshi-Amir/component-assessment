'use client';
import { useState } from 'react';
import { UserListProps } from '../../types';

export default function UserList({
  users,
  onView,
  onAdd,
  onEdit,
  onDelete,
  isLoading,
  error,
}: UserListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const filteredUsers = users.filter(user => {
    // Search filter
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const matchesStatus = 
      statusFilter === 'all' || 
      (statusFilter === 'active' && user.isActive) || 
      (statusFilter === 'inactive' && !user.isActive);
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="user-management-container">
      <div className="header-section">
        <div className="search-filter-container">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <svg className="search-icon" viewBox="0 0 24 24">
              <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
            className="status-filter"
          >
            <option value="all">All Users</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive Only</option>
          </select>
        </div>
        <button onClick={onAdd} className="add-user-btn">
          Add User
        </button>
      </div>

      {isLoading && (
        <div className="loading-message">Loading users...</div>
      )}
      
      {error && (
        <div className="error-message">{error}</div>
      )}

      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.email}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <span className={`status-badge ${
                    user.isActive ? 'status-active' : 'status-inactive'
                  }`}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <button 
                    onClick={() => onView(user)} 
                    className="action-btn view-btn"
                  >
                    View
                  </button>
                  <button 
                    onClick={() => onEdit(user)} 
                    className="action-btn edit-btn"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => onDelete(user)} 
                    className="action-btn delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="no-results">
                No users found matching your criteria
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <style jsx>{`
        .search-filter-container {
          display: flex;
          gap: 1rem;
          align-items: center;
        }
        
        .search-box {
          position: relative;
          width: 250px;
        }
        
        .search-input {
          width: 100%;
          padding: 0.5rem 1rem 0.5rem 2.5rem;
          border: 1px solid var(--border-color);
          border-radius: 4px;
          background-color: var(--input-bg);
          color: var(--text-color);
        }
        
        .search-icon {
          position: absolute;
          left: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          width: 1rem;
          height: 1rem;
          fill: var(--text-secondary);
        }
        
        .status-filter {
          padding: 0.5rem;
          border: 1px solid var(--border-color);
          border-radius: 4px;
          background-color: var(--input-bg);
          color: var(--text-color);
          margin-left: 4rem;
    margin-bottom: 0.5rem;
        }
        
        .no-results {
          text-align: center;
          padding: 2rem;
          color: var(--text-secondary);
        }
      `}</style>
    </div>
  );
}


