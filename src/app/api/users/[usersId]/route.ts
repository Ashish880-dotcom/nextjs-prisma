import { NextResponse } from "next/server";
import  prisma  from "@/lib/prisma";

// ✅ GET single user
export async function GET(
  req: Request,
  { params }: { params: { userid: string } }
) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: params.userid },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

// ✅ UPDATE user (PUT / PATCH)
export async function PUT(
  req: Request,
  { params }: { params: { userid: string } }
) {
  try {
    const body = await req.json();

    const user = await prisma.user.update({
      where: { id: params.userid },
      data: body,
    });

    return NextResponse.json(user);
  } catch {
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}


// ✅ DELETE user
export async function DELETE(
  req: Request,
  { params }: { params: { userid: string } }
) {
  try {
    await prisma.user.delete({
      where: { id: params.userid },
    });
    return NextResponse.json({ message: "User deleted successfully" });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
