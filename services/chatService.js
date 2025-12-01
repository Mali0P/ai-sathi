export const sendMessage = async (message) => {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    if (!res.ok) {
      throw new Error(`Failed to send message: ${res.statusText}`);
    }

    const data = await res.json();
    return data.reply;
  } catch (error) {
    console.error("ChatService Error:", error);
    return "Error: could not get response";
  }
};
