// components/TodoApp.tsx
'use client';

import { useState } from 'react';
import useLocalStorage from '@/app/hooks/useLocalStorage';
import useFetch from '@/app/hooks/useFetch';
import useForm from '@/app/hooks/useForm';
import { useTheme } from '@/app/context/ThemeContext';
import { useAuth } from '@/app/context/AuthContext';
import styles from '../styles/Home.module.css';

type Todo = {
  id: string;
  text: string;
  completed: boolean;
  userId?: string;
};

const API_URL = '/api/todos';

export const TodoApp = () => {
  const [showTodoForm, setShowTodoForm] = useState(false);
  const { theme } = useTheme();
  const { user, isAuthenticated } = useAuth();
  const { data: apiTodos, loading, error, refetch } = useFetch<Todo[]>(API_URL);
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const { 
    values, 
    handleChange, 
    handleSubmit: formSubmitHandler,
    resetForm
  } = useForm({
    initialValues: { text: '' },
  });

  const toggleTodoForm = () => {
    setShowTodoForm(!showTodoForm);
  };

  const handleSubmit = formSubmitHandler(async () => {
    if (!values.text.trim() || !isAuthenticated) return;
    
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: values.text,
      completed: false,
      userId: user?.id
    };
    
    setTodos(prevTodos => [...(prevTodos || []), newTodo]);
    resetForm();
  });

  const toggleTodo = (id: string) => {
    setTodos(prevTodos => 
      (prevTodos || []).map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    if (!isAuthenticated) return;
    setTodos(prevTodos => (prevTodos || []).filter(todo => todo.id !== id));
  };

  const userTodos = todos?.filter(todo => todo.userId === user?.id) || [];

  if (loading) return <div>Loading todos...</div>;
  if (error) return <div>Error loading todos: {error.message}</div>;

  return (
    <div className={`${styles.todoContainer} ${theme === 'dark' ? styles.dark : ''}`}>
      <div className={styles.todoHeader}>
        <h2>Todo App</h2>
        <button 
          onClick={toggleTodoForm}
          className={`${styles.toggleButton} ${showTodoForm ? styles.active : ''}`}
        >
          {showTodoForm ? 'Hide Todos' : 'Show Todos'}
        </button>
      </div>

      {showTodoForm && (
        <div className={styles.todoContent}>
          {isAuthenticated ? (
            <>
              <form onSubmit={handleSubmit} className={styles.todoForm}>
                <input
                  type="text"
                  name="text"
                  value={values.text}
                  onChange={handleChange}
                  placeholder="What needs to be done?"
                  className={styles.todoInput}
                  required
                />
                <button
                  type="submit"
                  className={styles.addButton}
                >
                  Add Todo
                </button>
              </form>

              {userTodos.length === 0 ? (
                <p className={styles.emptyMessage}>No todos yet. Add one above!</p>
              ) : (
                <ul className={styles.todoList}>
                  {userTodos.map((todo) => (
                    <li key={todo.id} className={styles.todoItem}>
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo.id)}
                        className={styles.todoCheckbox}
                      />
                      <span className={`${styles.todoText} ${todo.completed ? styles.completed : ''}`}>
                        {todo.text}
                      </span>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className={styles.deleteButton}
                        aria-label="Delete todo"
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </>
          ) : (
            <div className={styles.authMessage}>
              Please log in to manage your todos
            </div>
          )}
        </div>
      )}
    </div>
  );
};