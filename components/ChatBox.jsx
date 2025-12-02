"use client";

import useChatStore from "@/store/useChatStore";
import React, { useEffect, useRef, useState } from "react";
import { speakText, pauseSpeech, resumeSpeech } from "@/utils/speech";

const ChatBox = () => {
  const { messages, isLoading } = useChatStore();
  const chatEndRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="max-w-[80vw] h-[79vh] mx-auto pt-[10vh] px-4 overflow-y-auto space-y-3 rounded-lg shadow-lg relative chatbox-scrollbar">
      <style jsx>{`
        .chatbox-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .chatbox-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {messages.map((msg) => (
        <div key={msg.id}>
          <div
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <span
              className={`max-w-[75%] px-4 py-2 rounded-2xl break-words ${
                msg.role === "user"
                  ? "bg-[#429ffb] text-white rounded-br-none"
                  : "bg-[#484848] text-white rounded-bl-none"
              }`}
            >
              {msg.role === "assistant" && msg.content.length === 0 && isLoading
                ? "Typing..."
                : msg.content}
            </span>
          </div>

          {/* Buttons only for assistant message */}
          {msg.role === "assistant" && msg.content && (
            <div className="flex gap-2 justify-start mt-1 ml-2">
              <button
                onClick={() => speakText(msg.content, setIsPaused)}
                className="text-sm px-3 py-1 bg-[#333] text-white rounded-lg hover:bg-[#555] transition"
              >
                🔊 Read (Nepali)
              </button>

              <button
                onClick={() => pauseSpeech(setIsPaused)}
                disabled={isPaused}
                className={`text-sm px-3 py-1 rounded-lg text-white transition ${
                  isPaused ? "bg-gray-500" : "bg-[#333] hover:bg-[#555]"
                }`}
              >
                ⏸ Pause
              </button>

              <button
                onClick={() => resumeSpeech(setIsPaused)}
                disabled={!isPaused}
                className={`text-sm px-3 py-1 rounded-lg text-white transition ${
                  !isPaused ? "bg-gray-500" : "bg-[#333] hover:bg-[#555]"
                }`}
              >
                ▶ Resume
              </button>
            </div>
          )}
        </div>
      ))}

      <div ref={chatEndRef} />
    </div>
  );
};

export default ChatBox;
