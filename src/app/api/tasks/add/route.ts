import { PrismaClient } from "@prisma/client";
// import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { name, status, email } = reqBody;

    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (!user) {
      return NextResponse.json({ success: false }, { status: 404 })
    }

    const isTask = await prisma.todo.create({
      data: {
        name,
        status,
        userId: user?.id,
      },
    });

    if (!isTask) {
      return NextResponse.json({ success: false, message: "Failed to add task" }, { status: 400 });
    }

    // const path = req.nextUrl.searchParams.get('path') || '/dashboard'
    // revalidatePath(path)

    return NextResponse.json({ success: true, message: "Task added successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Internal Server error" }, { status: 500 });
  }
}