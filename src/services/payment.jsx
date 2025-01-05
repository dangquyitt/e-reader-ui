import axiosInstance from "./api";

export const getPaymentUrl = (planId) =>
  axiosInstance.get(`/payments/${planId}`);
