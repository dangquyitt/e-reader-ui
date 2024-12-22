import axiosInstance from "./api";

export const changePassword = (oldPassword, newPassword) =>
  axiosInstance.post("/users/changePassword", { oldPassword, newPassword });
