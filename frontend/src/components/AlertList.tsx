import { Link } from "react-router-dom";
import type { AlertItem } from "../types/types";
import {
  FaExclamationCircle,
  FaCheckCircle,
  FaInfoCircle,
  FaBell,
  FaTimesCircle,
  FaTools,
} from "react-icons/fa";

export default function AlertList({ alerts }: { alerts: AlertItem[] }) {
  const alertArray: AlertItem[] = Array.isArray(alerts) ? alerts : [];

  const getSeverityColor = (severity: string) => {
    switch (severity?.toUpperCase()) {
      case "CRITICAL":
        return "bg-red-100 border-l-red-600 text-red-900";
      case "HIGH":
        return "bg-orange-50 border-l-orange-600 text-orange-900";
      case "MEDIUM":
        return "bg-yellow-50 border-l-yellow-600 text-yellow-900";
      case "LOW":
        return "bg-blue-50 border-l-blue-600 text-blue-900";
      default:
        return "bg-gray-50 border-l-gray-400 text-gray-800";
    }
  };

  const getStatusIcon = (type: string) => {
    switch (type?.toUpperCase()) {
      case "GAS_LEAK":
        return <FaExclamationCircle className="text-red-700 text-lg animate-bounce" />;
      case "LOW_GAS":
        return <FaInfoCircle className="text-yellow-700 text-lg" />;
      case "OFFLINE":
        return <FaTimesCircle className="text-gray-700 text-lg" />;
      case "MAINTENAANCE":
        return <FaTools className="text-blue-700 text-lg" />;
      default:
        return <FaBell className="text-gray-700 text-lg" />;
    }
  };

  if (!alertArray || alertArray.length === 0) {
    return (
      <div className="text-center py-8">
        <FaCheckCircle className="text-green-700 text-4xl mx-auto mb-2" />
        <div className="text-sm text-gray-500">No alerts at the moment</div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {alertArray.map((alert: AlertItem) => (
        <div
          key={alert.id}
          className={`p-4 rounded-lg border-l-4 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 transition ${getSeverityColor(
            alert.severity
          )}`}
        >
          <div className="flex items-start gap-3 flex-1">
            <div className="mt-1">{getStatusIcon(alert.type)}</div>
            <div className="flex-1">
              <div className="font-semibold text-sm">
                {alert.type.replace(/_/g, " ")}
              </div>
              <div className="text-xs mt-1">{alert.message}</div>
              <div className="text-xs mt-2 opacity-75">
                Device ID:{" "}
                <span className="font-semibold">{alert.deviceId}</span>
              </div>
              {alert.userEmail && (
                <div className="text-xs mt-1 opacity-75">
                  User: <span className="font-semibold">{alert.userEmail}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-end gap-2 sm:gap-3">
            <div className="text-xs whitespace-nowrap">
              {new Date(alert.timestamp).toLocaleString()}
            </div>
            <div className="flex gap-2 flex-wrap justify-end">
              <span className="text-xs font-semibold px-2 py-1 bg-gray-800 text-white rounded">
                {alert.active ? "Active" : "Resolved"}
              </span>
            </div>

            {/* Emergency Button - Only for HIGH/CRITICAL alerts */}
            {alert.active &&
              (alert.severity?.toUpperCase() === "HIGH" ||
                alert.severity?.toUpperCase() === "CRITICAL") && (
                <Link
                  to={`/dashboard/devices/${alert.deviceId}/emergency`}
                  className="flex items-center gap-2 px-3 py-1 bg-red-600 text-white rounded text-xs font-bold hover:bg-red-700 transition animate-pulse"
                >
                  <FaBell className="text-xs" /> Emergency
                </Link>
              )}
          </div>
        </div>
      ))}
    </div>
  );
}
