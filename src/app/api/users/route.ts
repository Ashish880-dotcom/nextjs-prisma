import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
// ✅ GET all users
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

// ✅ POST create user
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, email, age, fullname, profilepic } = body;
    console.log(body);
    if (!username || !email || !fullname || !profilepic) {
      return NextResponse.json({ error: "Must specify all fields" });
    }

    const user = await prisma.user.create({
      data: { username, email, age, fullname, profilepic },
    });

    return NextResponse.json(
      { message: "User created successfully", data: user, success: true },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}

