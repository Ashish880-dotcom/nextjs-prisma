"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  onSuccess: () => void;
  user?: any;
};

export default function UserDialog({ onSuccess, user }: Props) {
  const [form, setForm] = useState({
    username: user?.username || "",
    fullname: user?.fullname || "",
    email: user?.email || "",
    age: user?.age || "",
    profilepic: user?.profilepic || "",
  });

  const handleSubmit = async () => {
    const res = await fetch(
      user ? `/api/users/${user.id}` : "/api/users",
      {
        method: user ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );

    if (res.ok) onSuccess();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{user ? "Edit" : "Add User"}</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <Input placeholder="Username" onChange={e => setForm({ ...form, username: e.target.value })} />
          <Input placeholder="Full Name" onChange={e => setForm({ ...form, fullname: e.target.value })} />
          <Input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
          <Input placeholder="Age" type="number" onChange={e => setForm({ ...form, age: Number(e.target.value) })} />
          <Input placeholder="Profile Pic URL" onChange={e => setForm({ ...form, profilepic: e.target.value })} />

          <Button onClick={handleSubmit}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
