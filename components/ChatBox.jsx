"use client";

import useChatStore from "@/store/useChatStore";
import React, { useEffect, useRef } from "react";

const ChatBox = () => {
  const { messages, isLoading } = useChatStore();
  const chatEndRef = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="max-w-[80vw] h-[79vh] mx-auto pt-[10vh] px-4 overflow-y-auto space-y-3 rounded-lg shadow-lg relative">
      {/* Hide scrollbar but keep scrollable */}
      <style jsx>{`
        .chatbox-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .chatbox-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>

      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
        >
          <span
            className={`max-w-[75%] px-4 py-2 rounded-2xl break-words ${
              msg.role === "user"
                ? "bg-[#429ffb] text-white rounded-br-none"
                : "bg-[#484848] text-white rounded-bl-none"
            }`}
          >
            {/* Show "Typing..." for assistant if content empty */}
            {msg.role === "assistant" && msg.content.length === 0 && isLoading
              ? "Typing..."
              : msg.content}
          </span>
        </div>
      ))}

      <div ref={chatEndRef} />
    </div>
  );
};

export default ChatBox;
