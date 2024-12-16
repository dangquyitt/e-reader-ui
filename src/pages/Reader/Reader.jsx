import React, { useState, useEffect } from "react";
import { ReactReader } from "react-reader";
import ePub from "epubjs";
export default function Reader() {
  const [location, setLocation] = useState(
    localStorage.getItem("epub-location") || null
  );
  const [currentPage, setCurrentPage] = useState(0); // Số trang hiện tại
  const [totalPages, setTotalPages] = useState(0); // Tổng số trang
  const [coverUrl, setCoverUrl] = useState(0);
  useEffect(() => {
    const book = ePub("https://react-reader.metabits.no/files/alice.epub");

    // Lấy ảnh bìa
    book.loaded.cover.then((cover) => {
      if (cover) {
        book.archive.createUrl(cover).then((url) => {
          setCoverUrl(url); // Set URL của ảnh bìa
          console.log(url);
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
    </div>
  );
}
