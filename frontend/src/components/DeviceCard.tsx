import { Link } from "react-router-dom";
import type { DeviceSummary } from "../types/types";

export default function DeviceCard({ device }: { device: DeviceSummary }) {
  return (
    <div className="border rounded-lg p-4 w-60 bg-white shadow-sm">
      <h3 className="font-medium text-gray-800">{device.deviceId}</h3>
      <div className="text-sm text-gray-600 mt-2">
        Status: <span className="font-semibold">{device.status}</span>
      </div>
      <div className="text-xs text-gray-500 mt-1">
        {device.lastReading
          ? new Date(device.lastReading).toLocaleString()
          : "No reading"}
      </div>
      <div className="mt-3">
        <Link
          to={`/devices/${encodeURIComponent(device.deviceId)}`}
          className="text-sm text-green-600 hover:underline"
        >
          View details
        </Link>
      </div>
    </div>
  );
}
