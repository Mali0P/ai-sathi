"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Aurora from "@/components/animations/Aurora";
import ChatBox from "@/components/ChatBox";
import HeroSection from "@/components/HeroSection";
import InputField from "@/components/InputField";
import Navbar from "@/components/Navbar";

import { speakText } from "@/utils/speech";
import useChatStore from "@/store/useChatStore";
import History from "@/components/History";

const Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const { messages, autoVoice, lastReadId, setLastReadId, setAutoVoice } =
    useChatStore();

  // Redirect if unauthenticated
  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  // Auto-read new assistant messages
  useEffect(() => {
    if (!autoVoice || messages.length === 0) return;

    // Find the last assistant message
    const lastAssistantMsg = [...messages]
      .reverse()
      .find((msg) => msg.role === "assistant" && msg.content);

    if (!lastAssistantMsg) return;

    // Only speak if it’s a new message
    if (lastAssistantMsg.id !== lastReadId) {
      speakText(lastAssistantMsg.content);
      setLastReadId(lastAssistantMsg.id); // mark as read
    }
  }, [messages, autoVoice, lastReadId, setLastReadId]);

  if (!session || status === "loading") return null;

  return (
    <div className="w-[100vw] h-[100vh] bg-black text-white relative flex gap-4 justify-end items-center overflow-hidden">
      <div className="absolute w-full h-full">
        <Aurora
          colorStops={["#7dff67", "#b19ef0", "#5226ff"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>
    

      <Navbar />

      <div className="relative z-20 text-white w-[85%] h-full flex flex-col justify-center items-center">
        <div className="px-8 py-8 w-full h-[5%] flex justify-between items-center">
          <h1 className="text-md mt-8 font-bold text-gray-300">
            "Your Smart Companion"
          </h1>

          {/* Auto Voice Toggle */}
          <button
            onClick={() => setAutoVoice(!autoVoice)}
            className={`ml-4 px-3 py-1 rounded-lg text-sm font-medium transition ${
              autoVoice ? "bg-green-500" : "bg-gray-700"
            }`}
          >
            {autoVoice ? "Auto Voice ON" : "Auto Voice OFF"}
          </button>
        </div>

        <div className="w-full h-[95%] flex flex-col justify-center items-center rounded-[50px] relative">
          <HeroSection />
          <div className="w-[80%] h-full absolute">
            <ChatBox />
          </div>
          <InputField />
        </div>
      </div>
    </div>
  );
};

export default Page;
