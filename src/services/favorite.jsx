import axios from "axios";
import axiosInstance from "./api";

export const createFavorite = (bookId) =>
  axiosInstance.post("/favorites", { bookId });

export const deleteFavorite = (bookId) =>
  axiosInstance.delete(`/favorites`, { data: { bookId } });
