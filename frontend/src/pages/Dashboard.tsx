import { useEffect, useState } from "react";
import {
  FaBell,
  FaChartBar,
  FaCogs,
  FaMoneyBillWave,
  FaUsers,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import DeviceCard from "../components/DeviceCard";
import { analyticsApi, devicesApi, usersApi } from "../service/api";
import type { AnalyticsSummary, Device, User } from "../types/types";

export default function Dashboard() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(false);
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [summaryLoading, setSummaryLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    devicesApi
      .list()
      .then((res) => setDevices(res.data.data || []))
      .catch(() => setDevices([]))
      .finally(() => setLoading(false));

    setSummaryLoading(true);
    Promise.all([
      analyticsApi.summary().then((res) => {
        setAnalytics(res.data.data);
      }),
      usersApi.list().then((res) => setUsers(res.data.data || [])),
    ]).finally(() => setSummaryLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-white px-2 py-4 flex flex-col items-center">
      {/* Header Section */}
      <div className="w-full max-w-7xl mb-8">
        <div className="relative overflow-hidden rounded-lg bg-linear-to-r from-green-700 via-green-600 to-emerald-700 p-4 md:p-6 shadow-lg border-0.5 border-green-800">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-5 rounded-full -mr-24 -mt-24 blur-2xl" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white opacity-5 rounded-full -ml-20 -mb-20 blur-2xl" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            {/* Title Section */}
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-1 drop-shadow-lg">
                SmartGas Pro
              </h1>
              <p className="text-green-100 text-sm font-medium">
                Gas Management Dashboard
              </p>
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <Link
                to="/dashboard/devices"
                className="group relative overflow-hidden px-4 py-2 rounded-lg bg-white text-green-700 font-semibold shadow transition duration-300 flex items-center justify-center gap-2 transform hover:scale-105 text-sm border-0.5 border-green-200"
              >
                <div className="absolute inset-0 bg-linear-to-r from-green-100 to-emerald-100 opacity-0 group-hover:opacity-100 transition" />
                <FaCogs className="relative text-sm" />
                <span className="relative">Devices</span>
              </Link>

              <Link
                to="/dashboard/alerts"
                className="group relative overflow-hidden px-4 py-2 rounded-lg bg-purple-500 text-white font-semibold shadow transition duration-300 flex items-center justify-center gap-2 transform hover:scale-105 text-sm border-0.5 border-purple-600"
              >
                <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-purple-700 opacity-0 group-hover:opacity-100 transition" />
                <FaBell className="relative text-sm animate-pulse" />
                <span className="relative">Alerts</span>
              </Link>

              <Link
                to="/dashboard/payments"
                className="group relative overflow-hidden px-4 py-2 rounded-lg bg-emerald-500 text-white font-semibold shadow transition duration-300 flex items-center justify-center gap-2 transform hover:scale-105 text-sm border-0.5 border-emerald-600"
              >
                <div className="absolute inset-0 bg-linear-to-r from-emerald-600 to-green-700 opacity-0 group-hover:opacity-100 transition" />
                <FaMoneyBillWave className="relative text-sm" />
                <span className="relative">Payments</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 w-full max-w-7xl">
        <div className="bg-green-50 rounded-lg shadow p-4 flex flex-col items-center border-0.5 border-green-300 w-full">
          <FaUsers className="text-green-700 text-2xl mb-1" />
          <div className="text-xl font-bold">
            {summaryLoading ? "..." : users.length}
          </div>
          <div className="text-xs text-green-800 font-medium text-center">
            Total Users
          </div>
        </div>
        <div className="bg-purple-50 rounded-lg shadow p-4 flex flex-col items-center border-0.5 border-purple-300 w-full">
          <FaCogs className="text-purple-700 text-2xl mb-1" />
          <div className="text-xl font-bold">
            {summaryLoading ? "..." : devices.length}
          </div>
          <div className="text-xs text-purple-800 font-medium text-center">
            Total Devices
          </div>
        </div>
        <div className="bg-green-100 rounded-lg shadow p-4 flex flex-col items-center border-0.5 border-green-400 w-full">
          <FaChartBar className="text-green-700 text-2xl mb-1" />
          <div className="text-xl font-bold">
            {summaryLoading ? "..." : analytics?.totalUsage ?? "--"}
          </div>
          <div className="text-xs text-green-800 font-medium text-center">
            Total Usage
          </div>
        </div>
        <div className="bg-purple-100 rounded-lg shadow p-4 flex flex-col items-center border-0.5 border-purple-400 w-full">
          <FaBell className="text-purple-700 text-2xl mb-1" />
          <div className="text-xl font-bold">
            {summaryLoading ? "..." : analytics?.totalAlerts ?? "--"}
          </div>
          <div className="text-xs text-purple-800 font-medium text-center">
            Total Alerts
          </div>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="mb-8 w-full max-w-7xl">
        <h2 className="text-xl font-bold mb-3 text-green-700">
          Analytics Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow p-4 border-0.5 border-green-200">
            <div className="font-bold text-sm text-green-700">Avg Usage</div>
            <div className="text-2xl font-bold mt-1">
              {analytics?.averageUsage ?? "--"}
            </div>
            <div className="text-xs text-gray-500">kg/month</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border-0.5 border-purple-200">
            <div className="font-bold text-sm text-purple-700">
              Pending Payments
            </div>
            <div className="text-2xl font-bold mt-1">
              {analytics?.pendingPayments ?? "--"}
            </div>
            <div className="text-xs text-gray-500">Current</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border-0.5 border-green-200">
            <div className="font-bold text-sm text-green-700">
              Total Revenue
            </div>
            <div className="text-2xl font-bold mt-1">
              {analytics?.totalRevenue ?? "--"}
            </div>
            <div className="text-xs text-gray-500">KES</div>
          </div>
        </div>
      </div>

      {/* Device List */}
      <div className="w-full max-w-7xl">
        <h2 className="text-xl font-bold mb-4 text-green-700">Your Devices</h2>
        {loading ? (
          <div className="text-sm text-gray-500">Loading devices...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {devices.length === 0 ? (
              <div className="text-sm text-gray-500">No devices found</div>
            ) : (
              devices.map((d) => <DeviceCard key={d.deviceId} device={d} />)
            )}
          </div>
        )}
      </div>

      <div className="w-full text-center text-xs text-gray-500 mt-8">
        Powered by SmartGas Pro
      </div>
    </div>
  );
}
