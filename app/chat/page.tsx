import Chat from "@/components/chat"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function ChatPage() {
  const user = await auth();

  if (!user) {
    redirect("/login")
  }

  return <Chat />
}

