import axiosInstance from "./api";

export const getAllPlans = () => axiosInstance.get("/plans");
