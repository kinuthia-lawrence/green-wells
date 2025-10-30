import { useEffect, useState } from "react";
import DeviceCard from "../components/DeviceCard";
import { devicesApi } from "../service/api";
import type { Device } from "../types/types";

export default function Devices() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    devicesApi
      .list()
      .then((r) => {
        setDevices(r.data.data || []);
      })
      .catch(() => setDevices([]))
      .finally(() => setLoading(false));
  }, []);
  return (
    <div className="min-h-screen bg-white px-2 py-4 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-green-700 mb-2">
        Device List
      </h1>
      <div className="text-sm text-gray-700 mb-6">
        Total Devices:{" "}
        <span className="font-bold text-green-700">{devices.length}</span>
      </div>
      <div className="w-full max-w-6xl bg-green-50 rounded-xl shadow p-4 mb-4">
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
      <div className="w-full text-center text-sm text-gray-500 mt-4">
        Powered by SmartGas Pro
      </div>
    </div>
  );
}
