import axiosInstance from "./api";

export const createTag = (name) => axiosInstance.post("/tags", { name });
