import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DeviceChart from "../components/DeviceChart";
import { api } from "../service/api";
import type { SensorReading } from "../types/types";

export default function DeviceDetails() {
  const { id } = useParams<{ id: string }>();
  const [readings, setReadings] = useState<SensorReading[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    api
      .get<SensorReading[]>(
        `/sensor/history?deviceId=${encodeURIComponent(id)}`
      )
      .then((r) => setReadings(r.data || []))
      .catch(() => setReadings([]))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Device {id}</h1>

      {loading ? (
        <div className="text-sm text-gray-500">Loading readings...</div>
      ) : (
        <>
          <div className="mb-4">
            <DeviceChart readings={readings} />
          </div>

          <div className="bg-white rounded border p-4">
            <h2 className="font-medium mb-2">Recent readings</h2>
            <ul className="space-y-2">
              {readings.slice(0, 10).map((r) => (
                <li
                  key={r.id ?? r.timestamp}
                  className="text-sm flex justify-between"
                >
                  <div>{new Date(r.timestamp).toLocaleString()}</div>
                  <div className="font-semibold">{r.gasValue.toFixed(2)}</div>
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
  );
}
