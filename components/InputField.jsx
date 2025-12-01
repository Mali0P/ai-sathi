"use client";

import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import { ArrowUpIcon, MicIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import useChatStore from "@/store/useChatStore";
import { startVoiceRecognition } from "@/app/utils/voiceCommands";

const InputField = () => {
  const { input, setInput, addMessage, messages, isLoading } = useChatStore();

  const inputRef = useRef(null);
  const [listening, setListening] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  useLayoutEffect(() => {
    if (!inputRef.current) return;
    gsap.to(inputRef.current, {
      bottom: messages.length ? "-10vh" : "20vh",
      duration: 0.2,
      ease: "power1.out",
    });
  }, [messages.length]);

  if (!isClient) return null;

  const handleVoice = () => {
    setListening(true);

    startVoiceRecognition(
      // Known command → do action, stop listening
      () => {
        setListening(false);
      },

      // Unknown command → insert text AND auto-send
      (unknownText) => {
        setInput(unknownText);
        setListening(false);

        // Wait for input to update, then auto-send
        setTimeout(() => {
          if (unknownText.trim() !== "") addMessage();
        }, 100);
      }
    );
  };

  const handleClick = () => {
    if (input.trim() !== "" && !isLoading) addMessage();
  };

  return (
    <div
      ref={inputRef}
      className="fixed bottom-[20vh] w-[50%] z-10 h-[4.5vw] flex items-center relative px-[1vw]"
    >
    <input
  type="text"
  value={input}
  onChange={(e) => setInput(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter" && input.trim() !== "" && !isLoading) {
      addMessage();
    }
  }}
  className="w-full h-full rounded-[100px] shadow-[0px_3px_8px_rgba(0,0,0,0.24)] text-[1.2vw] px-[3vw] text-white bg-white/30 backdrop-blur-md outline-none border-none"
  placeholder="Type your message..."
  disabled={isLoading}
/>


      {/* Voice Button */}
      <div className="absolute right-[6vw]">
        <Button
          onClick={handleVoice}
          size="icon"
          className={`rounded-full w-[60px] h-[60px] border-none
            ${listening ? "bg-red-500 text-white animate-pulse" : "bg-transparent text-white"}
          `}
          disabled={isLoading}
        >
          <MicIcon />
        </Button>
      </div>

      {/* Send Button */}
      <div className="absolute right-[2vw]">
        <Button
          onClick={handleClick}
          size="icon"
          className="rounded-full w-[60px] h-[60px] hover:bg-white hover:text-[#fa5d0d] text-white bg-transparent border-none"
          disabled={isLoading}
        >
          <ArrowUpIcon />
        </Button>
      </div>
    </div>
  );
};

export default InputField;
