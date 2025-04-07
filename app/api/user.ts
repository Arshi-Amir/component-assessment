// pages/api/users.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '../../types';

const users: User[] = [
  // You can use the same mock data or connect to a real database
  {
    id: 1,
    name: 'API User',
    email: 'api@example.com',
    avatar: 'https://i.pravatar.cc/150?u=api@example.com',
    role: 'Admin',
    department: 'Development',
    location: 'San Francisco',
    joinDate: '2023-01-01',
    isActive: true,
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Simulate network delay
    setTimeout(() => {
      res.status(200).json(users);
    }, 500);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}