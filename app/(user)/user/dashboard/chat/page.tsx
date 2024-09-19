/* eslint-disable react/jsx-no-bind */

"use client";

import Message from "@/app/(user)/_components/messages";
import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";
import { useChat } from "ai/react";
import { Send } from "lucide-react";
import React, { useRef } from "react";

export default function Home() {
  const { messages, handleSubmit, input, handleInputChange } = useChat();
  const formRef = useRef<HTMLFormElement>(null);

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  }

  return (
    <main className="h-full w-full overflow-y-auto px-12 py-16">
      <div className="container flex h-full w-full flex-col py-8">
        <div className="flex-1 overflow-y-auto">
          {messages.map(message => (
            <Message key={message.id} message={message} />
          ))}
        </div>
        <form ref={formRef} onSubmit={handleSubmit} className="relative mt-auto">
          <Textarea
            className="w-full text-lg"
            placeholder="Say something"
            value={input}
            onChange={handleInputChange}
            onKeyDown={e => handleKeyDown(e as React.KeyboardEvent<HTMLTextAreaElement>)}
          />
          <Button
            type="submit"
            size="sm"
            disabled={!input}
            className="absolute right-4 top-1/2 -translate-y-1/2 transform cursor-pointer rounded-full"
          >
            <Send size={24} />
          </Button>
        </form>
      </div>
    </main>
  );
}
