export type DeviceSummary = {
  deviceId: string;
  status: string;
  lastReading?: string; // ISO timestamp
  latitude?: number;
  longitude?: number;
};

export type SensorReading = {
  id?: number;
  deviceId: string;
  gasValue: number;
  timestamp: string; // ISO
  status?: string;
  leakDetected?: boolean;
  latitude?: number;
  longitude?: number;
};

export type AlertItem = {
  id: number | string;
  type: string;
  message: string;
  timestamp: string; // ISO
};

export type LoginRequest = {
  username: string;
  password: string;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  error?: string;
};
