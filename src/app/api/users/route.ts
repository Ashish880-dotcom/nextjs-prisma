import { NextResponse } from "next/server";
import  prisma  from "@/lib/prisma";

// GET all users
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(users);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

// CREATE user
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, fullname, email, age, profilepic } = body;

    if (!username || !fullname || !email) {
      return NextResponse.json(
        { error: "Required fields missing" },
        { status: 400 }
      );
    }

    const user = await prisma.user.create({
      data: {
        username,
        fullname,
        email,
        age: age ? Number(age) : null,
        profilepic,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create user" },
      { status: 500 }
    );
  }
}