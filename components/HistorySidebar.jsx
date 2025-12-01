"use client";

import React from "react";

const HistorySidebar = ({ sessions, setSessionId }) => {

  return (
    <div className="flex flex-col gap-2 overflow-y-auto h-full px-2 py-2 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 rounded">
      {sessions.length === 0 ? (
        <p className="text-gray-400 text-sm text-center">No previous chats</p>
      ) : (
        sessions.map((s) => (
          <button
            key={s.chatId}  
            onClick={() => setSessionId(s.chatId)}
            className="text-left p-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors duration-200"
          >
            {s.title.length > 30 ? s.title.slice(0, 30) + "..." : s.title}
          </button>
        ))
      )}
    </div>
  );
};

export default HistorySidebar;
