"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { signOut, useSession } from "next-auth/react";
import useChatStore from "@/store/useChatStore";
import HistorySidebar from "./HistorySidebar";

const Navbar = ({ setSessionId }) => {
  const { data: session, status } = useSession();
  const [sessions, setSessions] = useState([]);

  const clearMessages = useChatStore((state) => state.clearMessages);
  const fetchMessages = useChatStore((state) => state.fetchMessages);
  const fetchAllSessions = useChatStore((state) => state.fetchAllSessions);

  useEffect(() => {
    if (status !== "authenticated" || !session?.user?.id) return;

    const loadSessions = async () => {
      const allSessions = await fetchAllSessions(session.user.id);
      
      setSessions(allSessions);
    };

    loadSessions();
  }, [session, status]);

  const handleSelectSession = (chatId) => {
    setSessionId(chatId);
    fetchMessages(chatId);
  };

  return (
    <div className="w-[15%] fixed left-0 h-[100vh] bg-white text-black flex flex-col justify-between items-center py-8 shadow-md z-50">
      <h2 className="text-2xl font-bold pb-8">AI Sathi</h2>

      <Button
        onClick={clearMessages}
        className="mb-4 cursor-pointer hover:bg-black hover:text-white bg-black text-white w-12 h-12 rounded-full w-fit px-8"
      >
        New Chat
      </Button>

      <div className="w-full h-[30%]">
        <HistorySidebar
          sessions={sessions}
          setSessionId={handleSelectSession}
        />
      </div>

      <Button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="bg-black text-white rounded-full px-4 py-2 mt-4"
      >
        Logout
      </Button>
    </div>
  );
};

export default Navbar;
