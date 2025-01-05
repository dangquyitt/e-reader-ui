import axiosInstance from "./api";

export const getFileURL = (bookId) =>
  axiosInstance.get(`/books/${bookId}/fileURL`);
