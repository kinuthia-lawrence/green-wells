export type User = {
  id: number;
  username: string;
  email: string;
  // Add other user fields as needed
};

export type Device = {
  id: number;
  deviceId: string;
  name?: string;
  model?: string;
  createdAt: string; // ISO timestamp
  lastSeen?: string; // ISO timestamp
  user?: User;
};


export type SensorReading = {
  id?: number;
  deviceId: string;
  gasValue: number;
  timestamp: string;
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

export type LoginResponse = {
  message: string;
  user: User;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  error?: string;
};
export type PaymentSummary = {
  userId: number | null;
  totalRevenue: number;
  totalPayments: number;
  successfulPayments: number;
  failedPayments: number;
  pendingPayments: number;
};

export type PaymentReqest = {
  amount: number;
  phoneNumber: string;
  description?: string;
  deviceId?: string;
  userId?: number;
  method?: string;
};
export type PaymentResponse = {
  transactionId: string;
  status: string;
  amount: number;
  timestamp: string;
  phoneNumber: string;
  mpesaReceiptNumber?: string;
  resultDesc?: string;
  message?: string;
  userId: number;
};

export type Notification = {
  id: number | string;
  title: string;
  message: string;
  timestamp: string;
  read?: boolean;
};

export type Route = {
  deviceId: string;
  path: Array<{ latitude: number; longitude: number; timestamp: string }>;
};

 
export type AnalyticsSummary = {
  totalUsage: number;
  averageUsage: number;
  activeDevices: number;
  totalAlerts: number;
  totalRevenue: number;
  pendingPayments: number;
  failedPayments: number;
  lastUpdated: string; 
};
