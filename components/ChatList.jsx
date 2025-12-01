"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const ChatList = ({ onSelectChat, onNewChat }) => {
  const { data: session } = useSession();
  const [chats, setChats] = useState([]);

  // Fetch all user chats
  const fetchChats = async () => {
    const res = await fetch("/api/chats");
    const data = await res.json();
    setChats(data);
  };

  useEffect(() => {
    if (session) fetchChats();
  }, [session]);

  return (
    <div className="w-[250px] bg-gray-900 text-white flex flex-col h-full p-4">
      <button
        className="bg-blue-600 py-2 px-4 rounded mb-4 hover:bg-blue-700"
        onClick={onNewChat}
      >
        + New Chat
      </button>

      <div className="flex-1 overflow-y-auto space-y-2">
        {chats.map((chat) => (
          <div
            key={chat._id}
            className="bg-gray-800 p-3 rounded cursor-pointer hover:bg-gray-700"
            onClick={() => onSelectChat(chat._id)}
          >
            <p className="truncate">{chat.lastMessage}</p>
            <small className="text-gray-400">
              {new Date(chat.updatedAt).toLocaleString()}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
