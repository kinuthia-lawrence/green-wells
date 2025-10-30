import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DeviceChart from "../components/DeviceChart";
import { sensorApi } from "../service/api";
import type { SensorReading } from "../types/types";

export default function DeviceDetails() {
  const { id } = useParams<{ id: string }>();
  const [readings, setReadings] = useState<SensorReading[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    sensorApi.history(id)
      .then((r) => setReadings(r.data.data || []))
      .catch(() => setReadings([]))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="min-h-screen bg-white px-2 py-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Device {id}</h1>
      <div className="w-full max-w-2xl bg-green-50 rounded-xl shadow p-4 mb-4">
        {loading ? (
          <div className="text-sm text-gray-500">Loading readings...</div>
        ) : (
          <>
            <div className="mb-4">
              <DeviceChart readings={readings} />
            </div>
            <div className="bg-white rounded border p-4">
              <h2 className="font-medium mb-2 text-green-700">Recent readings</h2>
              <ul className="space-y-2">
                {readings.slice(0, 10).map((r) => (
                  <li
                    key={r.id ?? r.timestamp}
                    className="text-sm flex justify-between"
                  >
                    <div>{new Date(r.timestamp).toLocaleString()}</div>
                    <div className="font-semibold text-purple-700">{r.gasValue.toFixed(2)}</div>
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
