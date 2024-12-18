import React, { useState } from "react";
import { Button, useRecordContext, useNotify } from "react-admin";
import FavoriteIcon from "@mui/icons-material/Favorite";

export const AddToFavoritesButton = () => {
  const record = useRecordContext(); // Lấy thông tin sách
  const notify = useNotify(); // Hiển thị thông báo
  const [isFavorite, setIsFavorite] = useState(false); // Trạng thái yêu thích
  const handleAddToFavorites = () => {
    if (!record) {
      notify("Không tìm thấy thông tin sách", { type: "warning" });
      return;
    }

    // Gửi yêu cầu API để thêm sách vào mục yêu thích
    fetch("/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookId: record.id, title: record.title }),
    })
      .then((response) => {
        if (response.ok) {
          notify("Thêm vào mục yêu thích thành công!", { type: "info" });
        } else {
          notify("Không thể thêm vào mục yêu thích", { type: "error" });
        }
      })
      .catch((error) => {
        console.error(error);
        notify("Lỗi khi thêm vào mục yêu thích", { type: "error" });
      });
  };

  return (
    <Button
      label="Thêm vào mục yêu thích"
      onClick={handleAddToFavorites}
      startIcon={
        <FavoriteIcon
          style={{
            color: isFavorite ? "red" : "gray", // Đổi màu trái tim
            transition: "color 0.3s ease", // Hiệu ứng mượt
          }}
        />
      }
    />
  );
};
