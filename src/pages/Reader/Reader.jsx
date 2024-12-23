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
import Epub from "epubjs";
import FPTTextToSpeech from "../../components/FPTTextToSpeech/FPTTextToSpeech";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
export default function Reader() {
  const [currentReadingBook, setCurrentReadingBook] = useStore(
    "currentReadingBook",
    {}
  );
  const [readingProgress, setReadingProgress] = useState();
  const [iconPosition, setIconPosition] = useState({ top: 0, left: 0 });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [translatedText, setTranslatedText] = useState("");
  const [selectedText, setSelectedText] = useState("");
  const [showChild, setShowChild] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("vi");
  const handleCloseDialog = () => {
    setIsDialogOpen(false); // Đóng dialog
    setSelectedText(""); // Xóa văn bản bôi đen
  };
  const languages = [
    { code: "vi", name: "Vietnamese" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "ja", name: "Japanese" },
  ];

  const [title, setTitle] = useState("");
  const [totalPages, setTotalPages] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const translateText = async (textToTranslate, selectedLanguage) => {
    try {
      // Gọi API MyMemory
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
          textToTranslate
        )}&langpair=en|${selectedLanguage}`,
        {
          method: "GET", // MyMemory chủ yếu sử dụng GET
        }
      );

      const data = await response.json();
      console.log(data.responseData.translatedText);
      setTranslatedText(data.responseData.translatedText);
      // Lấy nội dung dịch từ phản hồi
      return data.responseData.translatedText || "Không thể dịch";
    } catch (error) {
      console.error("Error while translating:", error);
      return "Có lỗi xảy ra khi dịch.";
    }
  };

  const handleChange = (event) => {
    const newLanguage = event.target.value;
    setSelectedLanguage(newLanguage);
    translateText(selectedText, newLanguage);
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
        url={currentReadingBook.fileUrl}
        title={currentReadingBook.title}
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
          <p>Translate</p>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="language-select-label">Language</InputLabel>
            <Select
              labelId="language-select-label"
              id="language-select"
              value={selectedLanguage}
              onChange={handleChange}
            >
              {languages.map((lang) => (
                <MenuItem key={lang.code} value={lang.code}>
                  {lang.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Select a language to translate to</FormHelperText>
          </FormControl>
          <p>{translatedText}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
          {showChild && (
            <>
              <TextToSpeech text={selectedText} language="en-US" />
              <TextToSpeech text={translatedText} language="vi-VN" />
              <FPTTextToSpeech text={translatedText} />
            </>
          )}
        </DialogActions>
      </Dialog>
      <FPTTextToSpeech
        text={
          "Đảm bảo rằng trình duyệt của bạn cho phép phát âm thanh tự động mà không cần tương tác."
        }
      />
    </div>
  );
}
