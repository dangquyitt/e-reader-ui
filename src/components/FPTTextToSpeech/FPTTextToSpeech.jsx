import React, { useState } from "react";

const FPTTextToSpeech = ({ text }) => {
  const [audioUrl, setAudioUrl] = useState("");

  const fetchAudio = async () => {
    try {
      const response = await fetch("https://api.fpt.ai/hmi/tts/v5", {
        method: "POST",
        headers: {
          "api-key": "E7FUiPQNmzXEiqziSP01KD6eqtOvchvG", // API Key của bạn
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `text=${text}`,
      });

      if (response.ok) {
        const audio = await response.json();
        console.log(audio);
        console.log("Audio URL:", audio.async); // Kiểm tra URL trả về
        setAudioUrl(audio.async);
      } else {
        alert("Không thể tạo audio, vui lòng kiểm tra API Key hoặc văn bản.");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  return (
    <div>
      <button onClick={fetchAudio}>Đọc bản dịch</button>
      {audioUrl && (
        <div style={{ display: "none" }}>
          <audio controls autoPlay>
            <source src={audioUrl} type="audio/mp3" />
            Trình duyệt của bạn không hỗ trợ phát âm thanh.
          </audio>
        </div>
      )}
    </div>
  );
};

export default FPTTextToSpeech;
