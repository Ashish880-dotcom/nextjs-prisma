"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

interface User {
  id: string;
  username: string;
  fullname: string;
  email: string;
  age?: number;
  profilepic: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState<any>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    const res = await fetch("/api/users"); //  axios implemnt
    setUsers(await res.json());
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const submit = async () => {
    const url = editingId ? `/api/users/${editingId}` : "/api/users";
    const method = editingId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({});
    setEditingId(null);
    setDialogOpen(false);
    fetchUsers();
  };

  const edit = (user: User) => {
    try {
    } catch (error) {}
    console.log("Editing user:", user);
    setEditingId(user.id);
    setForm(user); //
    setDialogOpen(true);
  };

  const remove = async (id: string) => {
    await fetch(`/api/users/${id}`, { method: "DELETE" });
    fetchUsers();
  };

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      {/* CREATE USER DIALOG */}
      <div className="mb-6">
        <Dialog
          open={editingId === null && dialogOpen}
          onOpenChange={(open) => {
            if (!open) {
              setForm({});
              setEditingId(null);
            }
            setDialogOpen(open);
          }}
        >
          <DialogTrigger asChild>
            <Button>Create User</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-106.25">
            <DialogHeader>
              <DialogTitle>Create New User</DialogTitle>
              <DialogDescription>
                Add a new user to the system. Fill in all the details below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Username"
                  value={form.username || ""}
                  onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="fullname">Full Name</Label>
                <Input
                  id="fullname"
                  placeholder="Full Name"
                  value={form.fullname || ""}
                  onChange={(e) =>
                    setForm({ ...form, fullname: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Email"
                  type="email"
                  value={form.email || ""}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  placeholder="Age"
                  type="number"
                  value={form.age || ""}
                  onChange={(e) => setForm({ ...form, age: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="profilepic">Profile Picture URL</Label>
                <Input
                  id="profilepic"
                  placeholder="Profile Pic URL"
                  value={form.profilepic || ""}
                  onChange={(e) =>
                    setForm({ ...form, profilepic: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={submit}>Create User</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="min-w-225 w-full border">
          <thead className="text-black sticky top-0 z-10">
            <tr>
              <th className="border p-2">Profile</th>
              <th className="border p-2">Username</th>
              <th className="border p-2">Full Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Age</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td className="border p-2">
                  <Image
                    width={32}
                    height={32}
                    src="/images/ed1216a5f0f062da0cb32c5c9cc68540.gif"
                    alt=""
                    className=" rounded-full object-fill"
                  />
                </td>
                <td className="border p-2 flex justify-center align-center">{u.username}</td>
                <td className="border p-2">{u.fullname}</td>
                <td className="border p-2 break-all">{u.email}</td>
                <td className="border p-2">{u.age ?? "-"}</td>
                <td className="border p-2 space-x-2">
                  <Dialog
                    open={editingId === u.id && dialogOpen}
                    onOpenChange={(open) => {
                      if (!open) {
                        setForm({});
                        setEditingId(null);
                      }
                      setDialogOpen(open);
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button variant="outline" onClick={() => edit(u)}>
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-106.25">
                      <DialogHeader>
                        <DialogTitle>Edit User</DialogTitle>
                        <DialogDescription>
                          Make changes to the user details below.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="edit-username">Username</Label>
                          <Input
                            id="edit-username"
                            placeholder="Username"
                            value={form.username || ""}
                            onChange={(e) =>
                              setForm({ ...form, username: e.target.value })
                            }
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="edit-fullname">Full Name</Label>
                          <Input
                            id="edit-fullname"
                            placeholder="Full Name"
                            value={form.fullname || ""}
                            onChange={(e) =>
                              setForm({ ...form, fullname: e.target.value })
                            }
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="edit-email">Email</Label>
                          <Input
                            id="edit-email"
                            placeholder="Email"
                            type="email"
                            value={form.email || ""}
                            onChange={(e) =>
                              setForm({ ...form, email: e.target.value })
                            }
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="edit-age">Age</Label>
                          <Input
                            id="edit-age"
                            placeholder="Age"
                            type="number"
                            value={form.age || ""}
                            onChange={(e) =>
                              setForm({ ...form, age: e.target.value })
                            }
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="edit-profilepic">
                            Profile Picture URL
                          </Label>
                          <Input
                            id="edit-profilepic"
                            placeholder="Profile Pic URL"
                            value={form.profilepic || ""}
                            onChange={(e) =>
                              setForm({ ...form, profilepic: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button onClick={submit}>Save Changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button variant="destructive" onClick={() => remove(u.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
