import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DeviceChart from "../components/DeviceChart";
import { devicesApi, sensorApi } from "../service/api";
import type { Device, SensorReading } from "../types/types";

export default function DeviceDetails() {
  const { id } = useParams<{ id: string }>();
  const [device, setDevice] = useState<Device | null>(null);
  const [readings, setReadings] = useState<SensorReading[]>([]);
  const [infoLoading, setInfoLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    setInfoLoading(true);
    devicesApi
      .getDevice(id)
      .then((r) => {
        console.log("Device", r.data.data);
        setDevice(r.data.data);
      })
      .catch(() => setDevice(null))
      .finally(() => setInfoLoading(false));

    sensorApi
      .history(id)
      .then((r) => {
        console.log("Readings", r.data.data[0]);
        setReadings(r.data.data || []);
      })
      .catch(() => setReadings([]));
  }, [id]);

  return (
    <div className="min-h-screen bg-white px-2 py-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Device Details</h1>
      <div className="w-full max-w-2xl bg-green-50 rounded-xl shadow p-4 mb-4">
        {infoLoading || !device ? (
          <div className="text-sm text-gray-500">Loading device info...</div>
        ) : (
          <>
            <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="font-bold text-green-700 text-lg mb-1">
                  {device.name || device.deviceId}
                </div>
                <div className="text-xs text-gray-500">
                  Model: <span className="font-semibold">{device.model}</span>
                </div>
                <div className="text-xs text-gray-500">
                  Created: {new Date(device.createdAt).toLocaleDateString()}
                </div>
                <div className="text-xs text-gray-500">
                  Last Seen:{" "}
                  {device.lastSeen
                    ? new Date(device.lastSeen).toLocaleString()
                    : "Never"}
                </div>
                <div className="text-xs text-gray-500">
                  Owner User ID:{" "}
                  <span className="font-semibold">
                    {device.userId ?? "N/A"}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <DeviceChart readings={readings} />
            </div>
            <div className="bg-white rounded border p-4 mt-4">
              <h2 className="font-medium mb-2 text-green-700">
                Recent readings
              </h2>
              <ul className="space-y-2">
                {readings.slice(0, 10).map((r) => (
                  <li
                    key={r.id ?? r.timestamp}
                    className="text-sm flex justify-between"
                  >
                    <div>{new Date(r.timestamp).toLocaleString()}</div>
                    <div className="font-semibold text-purple-700">
                      {r.gasValue.toFixed(2)}
                    </div>
                  </li>
                ))}
                {readings.length === 0 && (
                  <li className="text-sm text-gray-500">No readings</li>
                )}
              </ul>
            </div>
          </>
        )}
      </div>
      <div className="w-full text-center text-sm text-gray-500 mt-4">
        Powered by SmartGas Pro
      </div>
    </div>
  );
}
