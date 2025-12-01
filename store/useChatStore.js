import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { sendMessage } from "@/services/chatService";

const useChatStore = create((set, get) => ({
  input: "",
  messages: [],
  chatId: uuidv4(),
  isLoading: false,

  setInput: (newInput) => set({ input: newInput }),

  clearMessages: () =>
    set({
      messages: [],
      input: "",
      chatId: uuidv4(),
    }),

  addMessage: async () => {
    const { input, chatId } = get();
    if (!input.trim()) return;

    const loadingMessage = { id: Date.now(), role: "assistant", content: "" };

    set((state) => ({
      messages: [
        ...state.messages,
        { id: Date.now() + 1, role: "user", content: input },
        loadingMessage,
      ],
      input: "",
      isLoading: true,
    }));

    try {
      const reply = await sendMessage(input, chatId);

      // Save user message
      await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ content: input, role: "user", chatId }),
      });

      // Save assistant reply
      await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ content: reply, role: "assistant", chatId }),
      });

      set((state) => ({
        messages: state.messages.map((msg) =>
          msg.id === loadingMessage.id ? { ...msg, content: reply } : msg
        ),
        isLoading: false,
      }));
    } catch (err) {
      console.error(err);
      set((state) => ({
        messages: state.messages.map((msg) =>
          msg.id === loadingMessage.id
            ? { ...msg, content: "Error: could not get response" }
            : msg
        ),
        isLoading: false,
      }));
    }
  },

  fetchMessages: async (chatId) => {
    if (!chatId) return;

    try {
      const res = await fetch(`/api/messages?chatId=${chatId}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch messages");
      const data = await res.json();
      set({ messages: data || [], chatId });
    } catch (err) {
      console.error("fetchMessages error:", err);
    }
  },

  fetchAllSessions: async (userId) => {
    if (!userId) return [];

    try {
      const res = await fetch(`/api/sessions?userId=${userId}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error(`Failed to fetch sessions: ${res.status}`);
      console.log("This is fetchAllSessions",res.json)
      const data = await res.json();
      return data.sessions || [];
    } catch (err) {
      console.error("fetchAllSessions error:", err);
      return [];
    }
  },
}));

export default useChatStore;
