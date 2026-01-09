import { NextResponse } from "next/server";
import prisma  from "@/lib/prisma";

interface Params {
  params: { id: string };
}

// GET single user
export async function GET(_: Request, { params }: Params) {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}

// UPDATE user
export async function PUT(req: Request, { params }: Params) {
  try {
    const body = await req.json();
    
    const data: any = {};
    if (body.username !== undefined) data.username = body.username;
    if (body.fullname !== undefined) data.fullname = body.fullname;
    if (body.email !== undefined) data.email = body.email;
    if (body.age !== undefined) data.age = body.age ? Number(body.age) : null;
    if (body.profilepic !== undefined) data.profilepic = body.profilepic;

    if (Object.keys(data).length === 0) {
      return NextResponse.json(
        { error: "No fields to update" },
        { status: 400 }
      );
    }

 const user = await prisma.user.update({
  where: { id:(params.id) },
  data,
});


    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update user" },
      { status: 500 }
    );
  }
}

// DELETE user
export async function DELETE(_: Request, { params }: Params) {
  try {
    await prisma.user.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to delete user" },
      { status: 500 }
    );
  }
}