"use Server";

import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const todos = await prisma.todo.findMany();
    return NextResponse.json(todos, { status: 200 });
  } catch (error) {
    console.error("Error fetching todos:", error);
    return NextResponse.json(
      { error: "Failed to fetch todos" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { whatToDo, whenToDo, note, status, userId } = body;

    const newTodo = await prisma.todo.create({
      data: {
        whatToDo,
        whenToDo: new Date(whenToDo),
        note,
        status: status || "pending",
        user: { connect: { id: userId } }
      }
    });

    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    console.error("Error adding todo:", error);
    return NextResponse.json(
      { error: "Failed to add todo" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(updatedTodo, { status: 200 });
  } catch (error) {
    console.error("Error updating todo:", error);
    return NextResponse.json(
      { error: "Failed to update todo" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Todo ID not provided" },
        { status: 400 }
      );
    }

    await prisma.todo.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Todo deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting todo:", error);
    return NextResponse.json(
      { error: "Failed to delete todo" },
      { status: 500 }
    );
  }
}
