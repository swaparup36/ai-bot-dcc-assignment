import { auth } from "@/lib/auth";
import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";

const client = new PrismaClient();

export async function POST(req: Request) {
  try {
    const user = await auth();

    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { message, title } = await req.json();

    const chat = await client.chat.findFirst({
        where: {
            title: title,
            userId: user.id
        }
    });

    if(!chat) return;

    const messages = await client.message.create({
        data: {
            chatId: chat.id,
            content: message.content,
            role: message.role,
        }
    });

    return NextResponse.json({ success: true });    
  } catch (error) {
    console.error("Chat error:", error);
    return new Response("Error processing your request", { status: 500 });
  }
}