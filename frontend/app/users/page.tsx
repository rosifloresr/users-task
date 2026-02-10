'use client';
import { useEffect, useState } from 'react';

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then(res => res.json())
      .then(setUsers);
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((u: any) => (
          <li key={u.id}>
            {u.username} - tareas: {u.tasks?.length}
          </li>
        ))}
      </ul>
    </div>
  );
}
