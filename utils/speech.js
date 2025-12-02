// Speak text using browser TTS
export const speakText = (text, setIsPaused) => {
  if (!text) return;

  // Stop any current speech
  window.speechSynthesis.cancel();
  if (setIsPaused) setIsPaused(false);

  const utter = new SpeechSynthesisUtterance(text);

  const selectVoiceAndSpeak = () => {
    const preferredLangs = ["ne-NP", "ne", "hi-IN", "en-IN"];
    const voices = window.speechSynthesis.getVoices();

    // Pick first available preferred voice
    let selectedVoice =
      preferredLangs
        .map((lang) => voices.find((v) => v.lang === lang))
        .find((v) => v !== undefined) || voices[0];

    if (selectedVoice) {
      utter.voice = selectedVoice;
      utter.lang = selectedVoice.lang;
    } else {
      utter.lang = "ne-NP";
    }

    // Adjust clarity
    utter.rate = 0.9;
    utter.pitch = 1;

    window.speechSynthesis.speak(utter);
  };

  // If voices already loaded, speak immediately
  if (window.speechSynthesis.getVoices().length > 0) {
    selectVoiceAndSpeak();
  } else {
    // Wait for voices to load (first page load)
    window.speechSynthesis.onvoiceschanged = () => selectVoiceAndSpeak();
  }
};

// Pause current speech
export const pauseSpeech = (setIsPaused) => {
  if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
    window.speechSynthesis.pause();
    if (setIsPaused) setIsPaused(true);
  }
};

// Resume paused speech
export const resumeSpeech = (setIsPaused) => {
  if (window.speechSynthesis.paused) {
    window.speechSynthesis.resume();
    if (setIsPaused) setIsPaused(false);
  }
};
