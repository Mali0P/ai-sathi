"use client";

import React, { useEffect, useState } from "react";
import { getHistory, deleteChat } from "@/utils/getHistory";
import useChatStore from "@/store/useChatStore";
import { Trash2 } from "lucide-react"; // import the trash icon

const History = () => {
  const [history, setHistory] = useState([]);
  const fetchMessages = useChatStore((state) => state.fetchMessages);

  useEffect(() => {
    const fetchHistoryData = async () => {
      const data = await getHistory();
      setHistory(data);
    };
    fetchHistoryData();
  }, []);

  const openChat = async (chatId) => {
    await fetchMessages(chatId);
  };

  const handleDelete = async (chatId) => {
    const success = await deleteChat(chatId);
    if (success) {
      setHistory((prev) => prev.filter((chat) => chat._id !== chatId));
    }
  };

  return (
    <div className="max-w-3xl pr-4 z-10 h-[80%] text-start">
      <h1 className="text-md font-bold mb-6 text-gray-800">Your chats</h1>

      {history.length === 0 ? (
        <p className="text-gray-500">No chats found.</p>
      ) : (
        <div className="space-y-4">
          {history.map((chat) => (
            <div
              key={chat._id}
              className="flex justify-between items-center bg-white shadow-md rounded-lg p-4 hover:bg-gray-50 transition"
            >
              <p
                className="font-medium text-gray-900 truncate cursor-pointer"
                onClick={() => openChat(chat._id)}
              >
                {chat.firstUserMessage}
              </p>

              {/* Trash Icon */}
              <button
                onClick={() => handleDelete(chat._id)}
                className="ml-4 p-1 rounded hover:bg-red-100 transition"
                title="Delete chat"
              >
                <Trash2 className="h-5 w-5 text-red-500 hover:text-red-700" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
