import axios, { type AxiosInstance } from "axios";
import type {
  AlertItem,
  AnalyticsSummary,
  ApiResponse,
  Device,
  LoginResponse,
  Notification,
  PaymentReqest,
  PaymentResponse,
  PaymentSummary,
  Route,
  SensorReading,
  User,
} from "../types/types";

const API_BASE = "http://localhost:8080/api"; // Local
// const API_BASE = "https://smart-gas.onrender.com/api"; // Remote

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
  login: async (payload: { username: string; password: string }): Promise<ApiResponse<LoginResponse>> => {
    const res = await api.post<ApiResponse<LoginResponse>>("/users/login", payload)
    return res.data;
  },
  list: async () => api.get<ApiResponse<User[]>>("/users"),
  logout: () => {
    localStorage.removeItem("user");
  },
};

export const alertsApi = {
  active: async () => api.get<ApiResponse<AlertItem[]>>("/alerts"),
  all: async () => api.get<ApiResponse<AlertItem[]>>("/alerts/all"),
};

export const devicesApi = {
  getDevice: async (deviceId: string) =>
    api.get<ApiResponse<Device>>(
      `/devices/device?deviceId=${encodeURIComponent(deviceId)}`
    ),
  list: async () => api.get<ApiResponse<Device[]>>("/devices"),
};

export const analyticsApi = {
  summary: async () => api.get<ApiResponse<AnalyticsSummary>>("/analytics"),
};

export const sensorApi = {
  latest: async (deviceId?: string) =>
    api.get<ApiResponse<SensorReading>>(
      `/sensor/latest${
        deviceId ? "?deviceId=" + encodeURIComponent(deviceId) : ""
      }`
    ),
  all: async () => api.get<ApiResponse<SensorReading[]>>("/sensor/all"),
  history: async (deviceId: string, limit?: number) =>
    api.get<ApiResponse<SensorReading[]>>(
      `/sensor/history?deviceId=${encodeURIComponent(deviceId)}${
        limit ? "&limit=" + limit : ""
      }`
    ),
};

export const paymentApi = {
  summary: async () => api.get<ApiResponse<PaymentSummary>>("/payment/summary"),
  initiate: async (payload: PaymentReqest) =>
    api.post<ApiResponse<PaymentResponse>>("/payment/initiate", payload),
  status: async (transactionId: string) =>
    api.get<ApiResponse<PaymentResponse>>(
      `/payment/status/${encodeURIComponent(transactionId)}`
    ),
};

export const notificationsApi = {
  list: async () => api.get<ApiResponse<Notification[]>>("/notifications"),
};

export const routesApi = {
  deviceRoute: async (deviceId: string) =>
    api.get<ApiResponse<Route>>(
      `/routes/device?deviceId=${encodeURIComponent(deviceId)}`
    ),
};
