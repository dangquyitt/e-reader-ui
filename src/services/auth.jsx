import axiosInstance from "./api";

export const register = (email, password) =>
  axiosInstance.post("/auth/register", { email, password });

export const resetPassword = (email, password, token) =>
  axiosInstance.post("/auth/resetPassword", { email, password, token });

export const sendResertPassword = (email) =>
  axiosInstance.post("/auth/resetPassword/send", { email });

export const verifyEmail = (verificationCode) =>
  axiosInstance.get(`/auth/verifyEmail?verificationCode=${verificationCode}`);

export const sendVerifyEmail = (email) =>
  axiosInstance.post("/auth/verifyEmail/send", { email });
