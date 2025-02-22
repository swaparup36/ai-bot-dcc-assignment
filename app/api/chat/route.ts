import { fireworks } from '@ai-sdk/fireworks';
import { google } from '@ai-sdk/google';
import { streamText } from "ai";
import { auth } from "@/lib/auth";
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const client = new PrismaClient();

export async function POST(req: Request) {
  try {
    const user = await auth();

    if (!user) {
      return NextResponse.json({ success: false, message: "chat not found" })
    }

    const { messages: chatMessages, aimodel } = await req.json();

    const result = streamText({
      model: aimodel === 'gemini' ? google('gemini-1.5-pro-latest') : fireworks('accounts/fireworks/models/deepseek-r1'),
      messages: chatMessages,
      system: "You are a helpful AI assistant.",
    });

    if(chatMessages.length === 1) {
      console.log("length: 1");
      const chat = await client.chat.create({
        data: {
          userId: user.id,
          title: chatMessages[0].content.slice(0, 100),
        },
      });

      await client.message.createMany({
        data: chatMessages.map((msg: any) => ({
          chatId: chat.id,
          content: msg.content,
          role: msg.role,
        })),
      });
  
      return result.toDataStreamResponse();
    }else {
      console.log("length: more than 1");
      const chat = await client.chat.findFirst({
        where: {
          title: chatMessages[0].content.slice(0, 100),
          userId: user.id
        }
      });

      if(!chat) return NextResponse.json({ success: false, message: "chat not found" });

      const exisistingMessages = await client.message.findMany({
        where: {
          chatId: chat.id
        }
      })

      const messageToInsert = chatMessages.slice(exisistingMessages.length, chatMessages.length);
      console.log(messageToInsert);
      await client.message.createMany({
        data: messageToInsert.map((msg: any) => ({
          chatId: chat.id,
          content: msg.content,
          role: msg.role,
        })),
      });

      return result.toDataStreamResponse();
    }
  } catch (error) {
    console.error("Chat error:", error);
    return new Response("Error processing your request", { status: 500 });
  }
}