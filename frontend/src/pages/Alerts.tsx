import { useEffect, useState } from "react";
import AlertList from "../components/AlertList";
import { alertsApi, devicesApi } from "../service/api";
import type { AlertItem, Device } from "../types/types";
import { FaExclamationTriangle, FaCheckCircle, FaFilter } from "react-icons/fa";

export default function Alerts() {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<"all" | "active">("active");
  const [selectedDevice, setSelectedDevice] = useState<string>("");

  // Fetch devices on mount
  useEffect(() => {
    devicesApi
      .list()
      .then((r) => setDevices(r.data.data || []))
      .catch(() => setDevices([]));
  }, []);

  // Fetch alerts based on filter and selected device
  useEffect(() => {
    setLoading(true);
    const apiCall =
      filter === "active"
        ? alertsApi.active(selectedDevice || undefined)
        : alertsApi.all();

    apiCall
      .then((r) => setAlerts(r.data.data || []))
      .catch(() => setAlerts([]))
      .finally(() => setLoading(false));
  }, [filter, selectedDevice]);

  const activeCount = alerts.filter((a) => a.active).length;
  const resolvedCount = alerts.filter((a) => !a.active).length;

  return (
    <div className="min-h-screen bg-white px-2 py-4 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-extrabold text-green-700 mb-6">Alerts</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-red-50 rounded-lg shadow p-4 flex flex-col items-center hover:shadow-lg transition">
            <FaExclamationTriangle className="text-red-700 text-2xl mb-2" />
            <div className="text-lg font-bold text-red-700">{activeCount}</div>
            <div className="text-xs text-red-800">Active Alerts</div>
          </div>
          <div className="bg-green-50 rounded-lg shadow p-4 flex flex-col items-center hover:shadow-lg transition">
            <FaCheckCircle className="text-green-700 text-2xl mb-2" />
            <div className="text-lg font-bold text-green-700">
              {resolvedCount}
            </div>
            <div className="text-xs text-green-800">Resolved</div>
          </div>
          <div className="bg-purple-50 rounded-lg shadow p-4 flex flex-col items-center hover:shadow-lg transition">
            <div className="text-2xl font-bold text-purple-700">
              {alerts.length}
            </div>
            <div className="text-xs text-purple-800">Total Alerts</div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow p-4 mb-6 space-y-4">
          {/* Filter Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("active")}
              className={`px-4 py-2 rounded font-semibold transition ${
                filter === "active"
                  ? "bg-green-700 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded font-semibold transition ${
                filter === "all"
                  ? "bg-green-700 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              All Alerts
            </button>
          </div>

          {/* Device Filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <FaFilter className="text-green-700" />
            <label className="text-sm font-semibold text-gray-700">
              Filter by Device:
            </label>
            <select
            title="Devices"
              value={selectedDevice}
              onChange={(e) => setSelectedDevice(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
            >
              <option value="">All Devices</option>
              {devices.map((device) => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.name || device.deviceId}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Alerts List */}
        <div className="bg-green-50 rounded-xl shadow p-4 mb-4">
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin">
                <FaExclamationTriangle className="text-green-700 text-2xl" />
              </div>
              <div className="text-sm text-gray-500 mt-2">
                Loading alerts...
              </div>
            </div>
          ) : (
            <AlertList alerts={alerts} />
          )}
        </div>
      </div>

      <div className="w-full text-center text-sm text-gray-500 mt-4">
        Powered by SmartGas Pro
      </div>
    </div>
  );
}
