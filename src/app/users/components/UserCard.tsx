"use client";
import UserDialog from "./UserDialog";
import { Button } from "@/components/ui/button";

export default function UserCard({ user, refresh }: any) {
  const deleteUser = async () => {
    await fetch(`/api/users/${user.id}`, { method: "DELETE" });
    refresh();
  };

  return (
    <div className="border p-4 rounded">
      <div>
        <div className="flex gap-4 items-center">
          <img src={user.profilepic} className="w-16 h-16 rounded-full" />
          <div>
            <h3 className="font-bold">{user.fullname}</h3>
            <p>{user.username}</p>
            <p>{user.email}</p>
            <p>Age: {user.age}</p>
          </div>
        </div>

        <div className="mt-3 flex gap-2">
          <UserDialog user={user} onSuccess={refresh} />
          <Button variant="destructive" onClick={deleteUser}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
