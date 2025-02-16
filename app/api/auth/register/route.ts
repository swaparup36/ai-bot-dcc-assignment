import { NextResponse } from "next/server"
import { hash } from "bcryptjs"
import { PrismaClient } from '@prisma/client'

const client = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();
    console.log(email);
    const hashedPassword = await hash(password, 10)
    console.log("user created");
    const response = await client.user.create({
      data: {
        email: email,
        name: name,
        password: hashedPassword,
      }
    })

    console.log("response: ", response);

    return NextResponse.json({ message: "User created successfully" }, { status: 201 })
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}

