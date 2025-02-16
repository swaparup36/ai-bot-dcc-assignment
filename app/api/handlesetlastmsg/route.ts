import { auth } from "@/lib/auth";
import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";

const client = new PrismaClient();

export async function POST(req: Request) {
  try {
    const user = await auth();

    if (!user) {
      return NextResponse.json({ success: false, message: "user not found" });
    }

    const { message, title, messagelength } = await req.json();
    console.log("chat title in set latest: ", title);
    const chat = await client.chat.findFirst({
        where: {
            title: title,
            userId: user.id
        }
    });

    if(!chat) return NextResponse.json({ success: false, message: "chat not found" })

    const exisistingMessages = await client.message.findMany({
      where: {
        chatId: chat.id
      }
    });

    console.log(messagelength, exisistingMessages.length);
    if(messagelength === exisistingMessages.length) return NextResponse.json({ success: true });

    console.log("setting latest msg...");
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