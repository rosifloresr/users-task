'use client';
import { useEffect, useState } from 'react';

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  const loadTasks = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:3000/tasks', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setTasks(data);
  };

  const createTask = async () => {
    const token = localStorage.getItem('token');
    await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title }),
    });
    setTitle('');
    loadTasks();
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div>
      <h1>Tasks</h1>

      <input value={title} onChange={e => setTitle(e.target.value)} />
      <button onClick={createTask}>Add</button>

      <ul>
        {tasks.map((t: any) => (
          <li key={t.id}>
            {t.title} - user: {t.user?.username}
          </li>
        ))}
      </ul>
    </div>
  );
}
