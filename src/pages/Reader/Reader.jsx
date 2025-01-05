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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getFileURL } from "../../services/book";
import { useNavigate } from "react-router-dom";

export default function Reader() {
  const [currentReadingBook, setCurrentReadingBook] = useStore(
    "currentReadingBook",
    {}
  );
  const navigate = useNavigate();
  const [fileURL, setFileURL] = useState("");
  const [isOpenPaymentDialog, setIsOpenPaymentDialog] = useState(false);

  const fetchFileURL = async () => {
    try {
      const response = await getFileURL(currentReadingBook.id);
      setFileURL(response.data);
    } catch (error) {
      if (error.status === 402) {
        setIsOpenPaymentDialog(true);
      }
    }
  };
  useEffect(() => {
    fetchFileURL();
  }, []);

  const handleClosePaymentDialog = () => {
    setIsOpenPaymentDialog(false);
    navigate("/pricing");
  };

  const [location, setLocation] = useState(
    currentReadingBook.currentLocation || 0
  );
  const [iconPosition, setIconPosition] = useState({ top: 0, left: 0 });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [translatedText, setTranslatedText] = useState("");
  const [selectedText, setSelectedText] = useState("");
  const [showChild, setShowChild] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("vi");
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedText("");
  };
  const languages = [
    { code: "vi", name: "Vietnamese" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "ja", name: "Japanese" },
  ];
  const translateText = async (textToTranslate, selectedLanguage) => {
    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
          textToTranslate
        )}&langpair=en|${selectedLanguage}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      console.log(data.responseData.translatedText);
      setTranslatedText(data.responseData.translatedText);
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
    rendition.on("selected", (cfiRange, contents) => {
      const selected = contents.window.getSelection();
      const text = selected.toString();
      setSelectedText(text);
      const range = selected.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setIconPosition({
        top: rect.top + window.scrollY - 5,
        left: rect.left + window.scrollX + rect.width,
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
        url={fileURL}
        title={currentReadingBook.title}
        location={location}
        locationChanged={(epubcfi) => {
          currentReadingBook.currentLocation = epubcfi;
          setCurrentReadingBook(currentReadingBook);
          setLocation(epubcfi);
        }}
        getRendition={handleRendition}
      />
      {selectedText && (
        <div
          style={{
            position: "absolute",
            top: `${iconPosition.top}px`,
            left: `${iconPosition.left}px`,
            zIndex: 1000,
            cursor: "pointer",
          }}
        >
          <button
            onClick={() => setIsDialogOpen(true)}
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
            </>
          )}
        </DialogActions>
      </Dialog>
      <Dialog open={isOpenPaymentDialog} onClose={handleClosePaymentDialog}>
        <DialogTitle>Subscription Required</DialogTitle>
        <DialogContent>
          <p>You need a subscription to access this book. </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePaymentDialog} color="primary">
            Close and View Pricing
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
