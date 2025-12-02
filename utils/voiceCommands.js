//utils/voiceCommands.js

export const startVoiceRecognition = (onKnownCommand, onUnknownCommand) => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Your browser does not support speech recognition.");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = false;

  // ⭐ Set Nepali language
  recognition.lang = "ne-NP";

  recognition.start();

  recognition.onresult = (event) => {
    const speechText = event.results[0][0].transcript;
    console.log("🎤 Voice Input:", speechText);

    const lower = speechText.toLowerCase();
    let matched = false;

    // --------------------------------------
    // 🔥 VOICE COMMANDS (Nepali + English)
    // --------------------------------------

    // YOUTUBE
    if (
      lower.includes("youtube khola") ||
      lower.includes("open youtube") ||
      lower.includes("youtube खोल") ||
      lower.includes("youtube खोलिदे")
    ) {
      window.open("https://youtube.com", "_blank");
      matched = true;
    }

    // GOOGLE
    if (
      lower.includes("google khola") ||
      lower.includes("open google") ||
      lower.includes("google खोल")
    ) {
      window.open("https://google.com", "_blank");
      matched = true;
    }

    // FACEBOOK
    if (
      lower.includes("facebook khola") ||
      lower.includes("open facebook") ||
      lower.includes("facebook खोल")
    ) {
      window.open("https://facebook.com", "_blank");
      matched = true;
    }

    // INSTAGRAM
    if (
      lower.includes("instagram khola") ||
      lower.includes("open instagram") ||
      lower.includes("instagram खोल")
    ) {
      window.open("https://instagram.com", "_blank");
      matched = true;
    }

    // --------------------------------------
    // ❌ Unknown command → send text automatically
    // --------------------------------------
    if (!matched) {
      onUnknownCommand(speechText);
      return;
    }

    // ✔ Known command
    onKnownCommand(speechText);
  };

  recognition.onerror = () => console.log("❌ Voice recognition error");
  recognition.onend = () => console.log("🟦 Voice recognition ended");

  return recognition;
};
