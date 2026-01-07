import UserList from "./users/components/UserList";
import UserDialog from "./users/components/UserDialog";

export default function UsersPage() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Users</h1>
      <UserDialog onSuccess={() => location.reload()} />
      <UserList />
    </div>
  );
}