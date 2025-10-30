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
import type { AnalyticsSummary, Device,  User } from "../types/types";

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
      analyticsApi.summary().then((res) => setAnalytics(res.data.data)),
      usersApi.list().then((res) => setUsers(res.data.data || [])),
    ]).finally(() => setSummaryLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-white px-2 py-4 flex flex-col items-center">
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl mb-8 gap-4">
        <h1 className="text-4xl font-extrabold text-green-700 drop-shadow-lg">🌱 Green Wells Dashboard</h1>
        <div className="flex gap-3">
          <Link to="/devices" className="bg-green-200 text-green-900 px-4 py-2 rounded-lg shadow hover:bg-green-300 transition flex items-center gap-2 font-semibold">
            <FaCogs /> Devices
          </Link>
          <Link to="/alerts" className="bg-purple-200 text-purple-900 px-4 py-2 rounded-lg shadow hover:bg-purple-300 transition flex items-center gap-2 font-semibold">
            <FaBell /> Alerts
          </Link>
          <Link to="/payments" className="bg-green-100 text-green-900 px-4 py-2 rounded-lg shadow hover:bg-green-200 transition flex items-center gap-2 font-semibold">
            <FaMoneyBillWave /> Payments
          </Link>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 w-full max-w-7xl">
        <div className="bg-green-50 rounded-xl shadow-lg p-6 flex flex-col items-center border-2 border-green-200 w-full">
          <FaUsers className="text-green-700 text-3xl mb-2" />
          <div className="text-2xl font-extrabold animate-pulse">
            {summaryLoading ? "..." : users.length}
          </div>
          <div className="text-base text-green-800 font-medium">Total Users</div>
        </div>
        <div className="bg-purple-50 rounded-xl shadow-lg p-6 flex flex-col items-center border-2 border-purple-200 w-full">
          <FaCogs className="text-purple-700 text-3xl mb-2" />
          <div className="text-2xl font-extrabold animate-pulse">
            {summaryLoading ? "..." : devices.length}
          </div>
          <div className="text-base text-purple-800 font-medium">Total Devices</div>
        </div>
        <div className="bg-green-100 rounded-xl shadow-lg p-6 flex flex-col items-center border-2 border-green-200 w-full">
          <FaChartBar className="text-green-700 text-3xl mb-2" />
          <div className="text-2xl font-extrabold animate-pulse">
            {summaryLoading ? "..." : analytics?.totalUsage ?? "--"}
          </div>
          <div className="text-base text-green-800 font-medium">Total Usage</div>
        </div>
        <div className="bg-purple-100 rounded-xl shadow-lg p-6 flex flex-col items-center border-2 border-purple-200 w-full">
          <FaBell className="text-purple-700 text-3xl mb-2" />
          <div className="text-2xl font-extrabold animate-pulse">
            {summaryLoading ? "..." : analytics?.totalAlerts ?? "--"}
          </div>
          <div className="text-base text-purple-800 font-medium">Total Alerts</div>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="mb-10 w-full max-w-7xl">
        <h2 className="text-2xl font-bold mb-4 text-green-700">Analytics Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow p-6 border border-green-100">
            <div className="font-bold text-lg text-green-700">Avg Usage</div>
            <div className="text-3xl font-extrabold">{analytics?.averageUsage ?? "--"}</div>
            <div className="text-sm text-gray-500">kg/month</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 border border-purple-100">
            <div className="font-bold text-lg text-purple-700">Pending Payments</div>
            <div className="text-3xl font-extrabold">{analytics?.pendingPayments ?? "--"}</div>
            <div className="text-sm text-gray-500">Current</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 border border-green-100">
            <div className="font-bold text-lg text-green-700">Total Revenue</div>
            <div className="text-3xl font-extrabold">{analytics?.totalRevenue ?? "--"}</div>
            <div className="text-sm text-gray-500">KES</div>
          </div>
        </div>
      </div>

      {/* Device List */}
      <div className="w-full max-w-7xl">
        <h2 className="text-2xl font-bold mb-4 text-green-700">Your Devices</h2>
        {loading ? (
          <div className="text-sm text-gray-500">Loading devices...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {devices.length === 0 ? (
              <div className="text-sm text-gray-500">No devices found</div>
            ) : (
              devices.map((d) => <DeviceCard key={d.deviceId} device={d} />)
            )}
          </div>
        )}
      </div>

      <div className="w-full text-center text-sm text-gray-500 mt-8">
        Powered by SmartGas Pro
      </div>
    </div>
  );
}
