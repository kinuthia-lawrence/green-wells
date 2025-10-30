import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import DeviceChart from "../components/DeviceChart";
import DeviceMap from "../components/DeviceMap";
import { devicesApi, sensorApi } from "../service/api";
import type { Device, SensorReading } from "../types/types";
import { FaArrowLeft, FaMapMarkerAlt, FaExternalLinkAlt, FaBell } from "react-icons/fa";
import { decimalToDMS, getGoogleMapsUrl } from "../utils/locationUtils";

export default function DeviceDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [device, setDevice] = useState<Device | null>(null);
  const [readings, setReadings] = useState<SensorReading[]>([]);
  const [infoLoading, setInfoLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    setInfoLoading(true);
    devicesApi
      .getDevice(id)
      .then((r) => setDevice(r.data.data))
      .catch(() => setDevice(null))
      .finally(() => setInfoLoading(false));

    sensorApi
      .history(id)
      .then((r) => setReadings(r.data.data || []))
      .catch(() => setReadings([]));
  }, [id]);

  const lastReading = readings[0];
  const latitude = lastReading?.latitude;
  const longitude = lastReading?.longitude;

  return (
    <div className="min-h-screen bg-white px-2 py-4 flex flex-col items-center">
          <div className="w-full max-w-2xl flex items-center justify-between gap-2 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-green-700 hover:text-green-800 font-semibold"
        >
          <FaArrowLeft /> Back
        </button>
        
        <Link
          to={`/dashboard/devices/${id}/emergency`}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold animate-pulse"
        >
          <FaBell /> Emergency
        </Link>
      </div>

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

            {/* Location Section */}
            {latitude && longitude && (
              <div className="mt-4 bg-white rounded-lg border-0.5 border-green-300 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <FaMapMarkerAlt className="text-green-700" />
                  <h2 className="font-bold text-green-700">Device Location</h2>
                </div>

                <div className="space-y-2 mb-4 text-sm">
                  <div>
                    <span className="text-gray-600">Decimal Coordinates:</span>
                    <div className="font-semibold text-gray-800">
                      {latitude.toFixed(6)}, {longitude.toFixed(6)}
                    </div>
                  </div>

                  <div>
                    <span className="text-gray-600">DMS Format:</span>
                    <div className="font-semibold text-gray-800">
                      {decimalToDMS(latitude, true)} {decimalToDMS(longitude, false)}
                    </div>
                  </div>

                  <a
                    href={getGoogleMapsUrl(latitude, longitude)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-2 px-3 py-1 bg-green-600 text-white rounded text-xs font-semibold hover:bg-green-700 transition"
                  >
                    Open in Google Maps
                    <FaExternalLinkAlt className="text-xs" />
                  </a>
                </div>

                {/* Map */}
                <DeviceMap
                  latitude={latitude}
                  longitude={longitude}
                  deviceName={device.name || device.deviceId}
                />
              </div>
            )}

            {/* Chart */}
            <div className="mt-4">
              <DeviceChart readings={readings} />
            </div>

            {/* Recent Readings */}
            <div className="bg-white rounded border-0.5 border-gray-300 p-4 mt-4">
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