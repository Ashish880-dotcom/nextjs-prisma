"use client";

import UserList from "./components/UserList";
import UserDialog from "./components/UserDialog";
import { useState } from "react";

export default function UsersPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Users</h1>

      <UserDialog onSuccess={() => setRefreshKey(prev => prev + 1)} />

      <UserList refreshKey={refreshKey} />
    </div>
  );
}
