import React, { useState, useEffect } from "react";
import { ReactReader } from "react-reader";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { useStore } from "react-admin";
import GTranslateIcon from "@mui/icons-material/GTranslate";
import TextToSpeech from "../../components/Text-to-Speed/TextToSpeech";
export default function Reader() {
  const [location, setLocation] = useState(
    localStorage.getItem("epub-location") || null
  );
  const [fileUrl] = useStore("fileUrl");
  console.log("fileUrl", fileUrl);
  const [iconPosition, setIconPosition] = useState({ top: 0, left: 0 });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [translatedText, setTranslatedText] = useState("");
  const [selectedText, setSelectedText] = useState("");
  const [showChild, setShowChild] = useState(true);
  const handleCloseDialog = () => {
    setIsDialogOpen(false); // Đóng dialog
    setSelectedText(""); // Xóa văn bản bôi đen
  };

  const translateText = async (text) => {
    try {
      // Đây là ví dụ sử dụng một API giả
      const response = await fetch("https://api-free.deepl.com/v2/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `DeepL-Auth-Key 02098e9f-70ff-4758-a871-cb6922a66efe:fx`,
        },
        body: JSON.stringify({
          text,
          targetLanguage: "vi", // Mã ngôn ngữ đích (ví dụ: "vi" cho tiếng Việt)
        }),
      });

      const data = await response.json();
      return data.translatedText || "Không thể dịch";
    } catch (error) {
      console.error("Error while translating:", error);
      return "Có lỗi xảy ra khi dịch.";
    }
  };
  const handleButtonClick = () => {
    setShowChild(true); // Cập nhật trạng thái để hiển thị component
  };
  const handleRendition = (rendition) => {
    // Đăng ký sự kiện 'selected' để bắt văn bản được bôi đen
    rendition.on("selected", (cfiRange, contents) => {
      const selected = contents.window.getSelection(); // Lấy văn bản đã bôi đen
      const text = selected.toString();
      setSelectedText(text);
      // setIsDialogOpen(true); // Lưu văn bản đã chọn
      const range = selected.getRangeAt(0); // Lấy range của văn bản
      const rect = range.getBoundingClientRect(); // Lấy vị trí của văn bản bôi đen
      console.log(range, rect);
      // Cập nhật vị trí icon
      setIconPosition({
        top: rect.top + window.scrollY - 5, // Vị trí top của icon
        left: rect.left + window.scrollX + rect.width, // Vị trí left của icon (cộng thêm chiều rộng văn bản)
      });
      if (text) {
        translateText(text, "vi").then((translated) =>
          setTranslatedText(translated)
        );
      }
    });
  };
  return (
    <div style={{ height: "100vh" }}>
      <ReactReader
        url={fileUrl}
        title={"Alice in wonderland"}
        location={location}
        locationChanged={(epubcfi) => setLocation(epubcfi)}
        getRendition={handleRendition} // Gán hàm khi rendition sẵn sàng
      />
      {selectedText && (
        <div
          style={{
            position: "absolute",
            top: `${iconPosition.top}px`,
            left: `${iconPosition.left}px`, // Điều chỉnh khoảng cách từ văn bản
            zIndex: 1000,
            cursor: "pointer",
          }}
        >
          <button
            onClick={() => setIsDialogOpen(true)} // Mở dialog khi nhấn vào icon
            style={{
              background: "none",
              border: "none",
              padding: "5px",
              cursor: "pointer",
            }}
          >
            <GTranslateIcon sx={{ color: "blue" }} />
          </button>
        </div>
      )}
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Selected Text</DialogTitle>
        <DialogContent>
          <p>{selectedText}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
          {showChild && <TextToSpeech text={selectedText} />}
        </DialogActions>
      </Dialog>
    </div>
  );
}
