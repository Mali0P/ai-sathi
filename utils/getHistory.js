// Fetch all chat history
export const getHistory = async () => {
  try {
    const res = await fetch("/api/history", { method: "POST" });
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    const data = await res.json();
    return data.history || [];
  } catch (err) {
    console.error("getHistory error:", err);
    return [];
  }
};

// Fetch full messages of a chat
export const getChatMessages = async (chatId) => {
  try {
    const res = await fetch("/api/chatMessages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chatId }),
    });
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    const data = await res.json();
    return data.messages || [];
  } catch (err) {
    console.error("getChatMessages error:", err);
    return [];
  }
};

// Delete a chat
export const deleteChat = async (chatId) => {
  try {
    const res = await fetch("/api/deleteChat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chatId }),
    });
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    const data = await res.json();
    return data.success;
  } catch (err) {
    console.error("deleteChat error:", err);
    return false;
  }
};
