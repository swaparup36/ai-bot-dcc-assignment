import { NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { PrismaClient } from '@prisma/client'

const client = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()
    console.log(email);
    const user = await client.user.findFirst({
      where: {
        email: email
      }
    })

    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }

    const isPasswordValid = await compare(password, user.password)

    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }

    const token = sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: "7d" })

    const response = NextResponse.json({ message: "Logged in successfully" }, { status: 200 })

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}

