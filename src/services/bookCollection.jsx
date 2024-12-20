import axiosInstance from "./api";

export const createBookCollection = (bookId, collectionId) =>
  axiosInstance.post("/bookCollections", { bookId, collectionId });
