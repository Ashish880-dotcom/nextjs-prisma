"use client";

import { useEffect, useState } from "react";
import UserCard from "./UserCard";

export default function UserList({ refreshKey }: { refreshKey: number }) {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    setUsers(await res.json());
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [refreshKey]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {users.map((u: any) => (
        <UserCard key={u.id} user={u} refresh={fetchUsers} />
      ))}
    </div>
  );
}
