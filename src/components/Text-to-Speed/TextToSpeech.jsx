import React, { useState } from "react";
import { Button } from "react-admin";

const TextToSpeech = ({ text, language }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Hàm xử lý việc đọc văn bản
  const handleReadText = () => {
    if (!isSpeaking) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);

      // Thiết lập giọng nói (Voice)
      const voices = speechSynthesis.getVoices();
      utterance.voice = voices.find((voice) => voice.lang === language); // Chọn giọng nói tiếng Anh

      speechSynthesis.speak(utterance);
    } else {
      speechSynthesis.cancel(); // Dừng việc phát âm nếu đang nói
      setIsSpeaking(false);
    }
  };

  return (
    <div>
      <button onClick={handleReadText}>
        {isSpeaking ? <Button>Dừng đọc</Button> : <Button>Đọc văn bản</Button>}
      </button>
    </div>
  );
};

export default TextToSpeech;
