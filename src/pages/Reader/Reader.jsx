import React, { useState, useEffect } from "react";
import { ReactReader } from "react-reader";
import ePub from "epubjs";
import TextToSpeech from "../../components/Text-to-Speed/TextToSpeech";
export default function Reader() {
  const [location, setLocation] = useState(
    localStorage.getItem("epub-location") || null
  );
  const [currentPage, setCurrentPage] = useState(0); // Số trang hiện tại
  const [totalPages, setTotalPages] = useState(0); // Tổng số trang
  const [coverUrl, setCoverUrl] = useState(0);
  const [chapters, setChapters] = useState([]);
  const [bookText, setBookText] = useState("");
  // Chuỗi nội dung chương
  const bookText1 =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
  useEffect(() => {
    const book = ePub("https://react-reader.metabits.no/files/alice.epub");

    // Lấy ảnh bìa
    book.loaded.cover.then((cover) => {
      if (cover) {
        book.archive.createUrl(cover).then((url) => {
          setCoverUrl(url); // Set URL của ảnh bìa
          console.log(url);
          book.loaded.navigation.then((toc) => {
            setChapters(toc.toc);
            console.log(chapters); // toc.toc chứa danh sách các chương
          });
        });
      }
    });
  }, []);
  return (
    <div style={{ height: "100vh" }}>
      <ReactReader
        url="https://react-reader.metabits.no/files/alice.epub"
        title={"Alice in wonderland"}
        location={location}
        locationChanged={(epubcfi) => setLocation(epubcfi)}
        // getRendition={handleRendition} // Gán hàm khi rendition sẵn sàng
      />
      {chapters.map((chapter, index) => (
        <li key={index}>
          <button onClick={() => loadChapter(chapter.href)}>
            {chapter.label}
          </button>
        </li>
      ))}
      <div>
        <h1>Tên sách: Đọc thử văn bản</h1>
        <p>{bookText1}</p>
        <TextToSpeech text={bookText1} /> {/* Component Đọc Văn Bản */}
      </div>
    </div>
  );
}
