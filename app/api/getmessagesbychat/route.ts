import { auth } from "@/lib/auth";
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from "next/server";

const client = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { chatId } = await req.json();
    const user = await auth();

    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const messages = await client.message.findMany({
        where: {
            chatId: chatId
        },
        orderBy: {
          createdAt: 'asc'
        }
    });

    return NextResponse.json({ messages: messages }, { status: 201 })
  } catch (error) {
    console.error("Chat error:", error);
    return new NextResponse("Error processing your request", { status: 500 });
  }
}