import React, { createContext, useContext, useState } from "react";

// Tạo context để lưu trữ fileUrl
const FileUrlContext = createContext();

// Component Provider để cung cấp giá trị fileUrl cho các component con
export const FileUrlProvider = ({ children }) => {
  const [fileUrl, setFileUrl] = useState(null);

  return (
    <FileUrlContext.Provider value={{ fileUrl, setFileUrl }}>
      {children}
    </FileUrlContext.Provider>
  );
};

// Custom hook để sử dụng context
export const useFileUrl = () => {
  return useContext(FileUrlContext);
};
