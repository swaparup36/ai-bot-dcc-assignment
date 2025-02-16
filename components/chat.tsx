"use client"

import * as React from "react";
import { useChat } from "@ai-sdk/react";
import { Bot, Send, Image, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import axios from "axios";
import { marked } from "marked";

interface chatInterface {
  id: string;
  userId: string;
  title: string;
  createdAt: string;
}

interface Message {
  id: string;
  role: 'system' | 'user' | 'assistant' | 'data';
  content: string;
}

export default function Chat() {
  const [selectedAimodel, setSelectedAimodel] = React.useState<string>("gemini")
  const { messages, setMessages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    body: {
      aimodel: selectedAimodel
    },
    api: "/api/chat",
  });

  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const [allChats, setAllChats] = React.useState<chatInterface[] | null>(null);

  const getAllChats = async () => {
    try {
      const chats = await axios.get('/api/getallchats');
      console.log(chats.data);
      setAllChats(chats.data.chats);
    } catch (error) {
      console.log("can't fetch all chats: ", error);
    }
  };

  const handleSetChat = async (chatId: string) => {
    console.log(chatId)
    try {
      if(messages.length>0){
        const response = await axios.post('/api/handlesetlastmsg', {message: messages[messages.length-1], title: messages[0].content.slice(0, 100), messagelength: messages.length});
        console.log(response.data);
        if(!response.data.success) return;
      }
      
      const msgs = await axios.post('/api/getmessagesbychat', {chatId});
      console.log(msgs.data);
      const chatMsgs = msgs.data.messages.map((msg: Message)=>{
        return (
          {
            id: msg.id,
            content: msg.content,
            role: msg.role,
          }
        )
      })
      setMessages(chatMsgs);
      getAllChats();
    } catch (error) {
      console.log("can't fetch all messages of this chats: ", error);
    }
  }

  const handleCreateNewChat = async () => {
    try {
      if(messages.length<0) return;
      const response = await axios.post('/api/handlesetlastmsg', {message: messages[messages.length-1], title: messages[0].content.slice(0, 100), messagelength: messages.length});
      console.log(response.data);
      if(!response.data.success) return;
      setMessages([]);
      getAllChats();
    } catch (error) {
      console.log("can't fetch all messages of this chats: ", error);
    }
  }

  React.useEffect(() => {
    getAllChats();
  }, []);

  return (
    <div className="w-full flex justify-between">
      <div className="h-[100svh] w-[20%] shadow-lg border-r-2 border-gray-400 flex flex-col">
        <div className="flex flex-col justify-start items-center w-full py-10 px-3">
          <h2 className="text-2xl text-gray-600 font-semibold">All chats</h2>
          <ScrollArea className="flex flex-col w-full py-5">
            {
              allChats?.map((chat, index) => (
                <div key={index} className="flex w-full justify-between cursor-pointer items-center py-3 px-5 mb-3 bg-gray-100 rounded-lg" onClick={async()=>await handleSetChat(chat.id)}>
                  {chat.title}
                </div>
              ))
            }
          </ScrollArea>
        </div>
      </div>
      <div className="flex flex-col w-[80%] h-screen bg-background">
        <div className="flex-1 overflow-hidden">
          <div className="flex justify-start items-center py-5 px-5">
            <button className="bg-gray-100 flex justify-between items-center p-2 rounded-lg" onClick={handleCreateNewChat}>
              New Chat
              <Plus className="w-5 h-5 ml-2" />
            </button>
            <select name="model-selection" id="model-selection" value={selectedAimodel} onChange={(e)=>setSelectedAimodel(e.target.value)} className="bg-gray-100 flex justify-between items-center py-2 px-4 rounded-lg ml-4">
              <option value="gemini">Gemini 1.5 Pro</option>
              <option value="deepseek">Deepseek R1</option>
            </select>
          </div>
          <ScrollArea ref={scrollRef} className="h-[75svh] px-12 pt-5 pb-5">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full">
                <h1 className="text-4xl font-bold text-foreground mb-8">What can I help with?</h1>
              </div>
            ) : (
              <div className="space-y-6 pt-2 pb-8">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.role === "assistant" && (
                      <Avatar>
                        <Bot className="h-5 w-5" />
                      </Avatar>
                    )}
                    <div
                      className={`rounded-lg px-4 py-2 max-w-[80%] ${
                        message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                      dangerouslySetInnerHTML={{ __html: marked(message.content) }}
                    />
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
        <div className="bg-background p-4 flex justify-center items-center">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-[80%]">
            <div className="relative">
              <Input
                placeholder="Message AI..."
                value={input}
                onChange={handleInputChange}
                className="pr-20 py-6 bg-muted"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                {/* <Button size="icon" variant="ghost" type="button">
                  <Image className="h-5 w-5" />
                </Button> */}
                <Button size="icon" type="submit" disabled={isLoading}>
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}