import useChatStore from "@/store/useChatStore";

const exportChat = () => {
  const messages = useChatStore.getState().messages; // get messages from Zustand

  if (!messages || messages.length === 0) return;

  // Add heading with current date
  const now = new Date();
  const heading = `AI Sathi Chat Log - ${now.toLocaleDateString()} ${now.toLocaleTimeString()}\n====================\n\n`;

  // Prepare chat text with timestamps
  const chatText = heading + messages
    .map(msg => {
      const time = new Date(msg.id || Date.now()).toLocaleString(); // fallback if id used as timestamp
      return `[${time}] ${msg.role === 'user' ? 'You' : 'AI Sathi'}: ${msg.content}`;
    })
    .join('\n');

  // Create a Blob and trigger download
  const blob = new Blob([chatText], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'ai_sathi_chat.txt';
  a.click();

  URL.revokeObjectURL(url);
};

export default exportChat;
