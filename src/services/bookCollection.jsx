import axiosInstance from "./api";

export const createBookCollection = (bookId, collectionId) =>
  axiosInstance.post("/bookCollections", { bookId, collectionId });

export const deleteBookCollection = (bookId, collectionId) =>
  axiosInstance.delete(`/bookCollections`, { data: { bookId, collectionId } });
