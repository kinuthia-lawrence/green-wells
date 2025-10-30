import type { AlertItem } from "../types/types";


export default function AlertList({ alerts }: { alerts: AlertItem[] }) {
  const alertArray: AlertItem[] = Array.isArray(alerts) ? alerts : [];
  if (!alertArray || alertArray.length === 0) {
    return (
      <ul className="space-y-3">
        <li className="text-sm text-gray-500">No alerts</li>
      </ul>
    );
  }
  return (
    <ul className="space-y-3">
      {alertArray.map((alert: AlertItem) => (
        <li key={alert.id} className="p-3 bg-white rounded border flex justify-between items-start">
          <div>
            <div className="text-sm font-medium">{alert.type}</div>
            <div className="text-xs text-gray-600">{alert.message}</div>
          </div>
          <div className="text-xs text-gray-400">{new Date(alert.timestamp).toLocaleString()}</div>
        </li>
      ))}
    </ul>
  );
}