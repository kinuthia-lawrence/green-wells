import { Link } from "react-router-dom";
import type { Device } from "../types/types";

export default function DeviceCard({ device }: { device: Device }) {
  return (
    <div className="border rounded-xl p-4 w-full max-w-xs bg-white shadow-lg flex flex-col gap-2">
      <h3 className="font-bold text-green-700 text-lg mb-1">{device.name || device.deviceId}</h3>
      <div className="text-xs text-gray-500">Model: <span className="font-semibold">{device.model}</span></div>
      <div className="text-xs text-gray-500">Created: {new Date(device.createdAt).toLocaleDateString()}</div>
      <div className="text-xs text-gray-500">Last Seen: {device.lastSeen ? new Date(device.lastSeen).toLocaleString() : "Never"}</div>
      <div className="text-xs text-gray-500">Owner: <span className="font-semibold">{device.user?.username}</span></div>
      <div className="text-xs text-gray-500">Cylinders: <span className="font-semibold">{device.user?.cylinders?.length ?? 0}</span></div>
      <div className="mt-2 flex gap-2">
        <Link
          to={`./${encodeURIComponent(device.deviceId)}`}
          className="px-3 py-1 bg-green-200 text-green-900 rounded hover:bg-green-300 text-xs font-semibold"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
