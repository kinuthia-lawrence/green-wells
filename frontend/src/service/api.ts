import axios, { type AxiosInstance } from "axios";
import type { ApiResponse } from "../types/types";

// const API_BASE = 'http://localhost:8080/api'; // Local
const API_BASE = "https://smart-gas.onrender.com/api"; // Remote

export const api: AxiosInstance = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

api.interceptors.response.use(
  (resp) => resp.data,
  (err) => {
    const message =
      err?.response?.data?.message || err.message || "Network error";
    return Promise.reject(new Error(message));
  }
);

export const usersApi = {
  login: async (payload: { username: string; password: string }) =>
    (
      await api.post<ApiResponse<Record<string, unknown>>>(
        "/users/login",
        payload
      )
    ).data,
  list: async () => (await api.get<ApiResponse<any[]>>("/users")).data,
  logout: () => {
    localStorage.removeItem("user");
  },
};

export const alertsApi = {
  active: async () => (await api.get<ApiResponse<any[]>>("/alerts")).data,
  all: async () => (await api.get<ApiResponse<any[]>>("/alerts/all")).data,
};

export const devicesApi = {
  getDevice: async (deviceId: string) =>
    (
      await api.get<ApiResponse<any>>(
        `/devices/device?deviceId=${encodeURIComponent(deviceId)}`
      )
    ).data,
  list: async () => (await api.get<ApiResponse<any[]>>("/devices")).data,
};

export const analyticsApi = {
  summary: async () => (await api.get<ApiResponse<any>>("/analytics")).data,
};

export const sensorApi = {
  latest: async (deviceId?: string) =>
    (
      await api.get<ApiResponse<any>>(
        `/sensor/latest${
          deviceId ? "?deviceId=" + encodeURIComponent(deviceId) : ""
        }`
      )
    ).data,
  all: async () => (await api.get<ApiResponse<any[]>>("/sensor/all")).data,
  history: async (deviceId: string, limit?: number) =>
    (
      await api.get<ApiResponse<any[]>>(
        `/sensor/history?deviceId=${encodeURIComponent(deviceId)}${
          limit ? "&limit=" + limit : ""
        }`
      )
    ).data,
};

export const paymentApi = {
  summary: async () =>
    (await api.get<ApiResponse<any>>("/payment/summary")).data,
  initiate: async (payload: any) =>
    (await api.post<ApiResponse<any>>("/payment/initiate", payload)).data,
  status: async (transactionId: string) =>
    (
      await api.get<ApiResponse<any>>(
        `/payment/status/${encodeURIComponent(transactionId)}`
      )
    ).data,
};

export const notificationsApi = {
  list: async () => (await api.get<ApiResponse<any[]>>("/notifications")).data,
};

export const routesApi = {
  deviceRoute: async (deviceId: string) =>
    (
      await api.get<ApiResponse<any>>(
        `/routes/device?deviceId=${encodeURIComponent(deviceId)}`
      )
    ).data,
};
