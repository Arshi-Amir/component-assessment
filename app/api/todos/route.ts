import { NextResponse } from 'next/server';

export async function GET() {
  // In a real app, you would fetch from a database
  const dummyTodos = [
    { id: '1', text: 'Learn Next.js', completed: false },
    { id: '2', text: 'Build a Todo App', completed: false },
  ];
  
  return NextResponse.json(dummyTodos);
}