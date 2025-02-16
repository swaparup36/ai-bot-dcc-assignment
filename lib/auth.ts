"use server";

import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

export async function auth() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  
  if (!token) {
    console.log("token not found")
    return null;
  }

  try {
    const { payload } = await jwtVerify(token.value, new TextEncoder().encode(process.env.JWT_SECRET));

    const user = await client.user.findUnique({
      where: {
        id: payload.id as string,
      },
    });

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  } catch (error) {
    return null;
  }
}