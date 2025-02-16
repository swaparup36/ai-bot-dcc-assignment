import { auth } from "@/lib/auth";
import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";

const client = new PrismaClient();

export async function GET() {
  try {
    const user = await auth();

    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const chats = await client.chat.findMany({
        where: {
            userId: user.id,
        }
    });

    return NextResponse.json({ chats: chats }, { status: 201 })
  } catch (error) {
    console.error("Chat error:", error);
    return new NextResponse("Error processing your request", { status: 500 });
  }
}