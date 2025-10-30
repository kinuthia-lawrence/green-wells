export type Cylinder = {
  id: number;
  serialNumber: string;
  capacity: number;
  deviceId: string;
  status: string;
  owner: string;
};

export type Payment = {
  id: number;
  transactionId: string;
  amount: number;
  paymentTime: string;
  status: string;
  method: string;
  userId: number;
  user: string;
};

export type Alert = {
  id: number;
  message: string;
  type: string;
  severity: string;
  timestamp: string;
  resolvedAt: string;
  userId: number;
  deviceId: string;
  user: string;
  cylinder: Cylinder;
  active: boolean;
};

export type Notification = {
  id: number;
  message: string;
  read: boolean;
  timestamp: string;
  user: string;
  userId: number;
};

export type User = {
  id: number;
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: string;
  payments: Payment[];
  alerts: Alert[];
  notifications: Notification[];
  cylinders: Cylinder[];
};

export type Device = {
  id: number;
  deviceId: string;
  name: string;
  model: string;
  createdAt: string;
  lastSeen: string;
  userId?: number;
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
