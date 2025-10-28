import type { AlertItem } from "../types/types";


export default function AlertList({ alerts }: { alerts: AlertItem[] }) {
  if (!alerts || alerts.length === 0) {
    return <div className="text-sm text-gray-500">No alerts</div>;
  }
  return (
    <ul className="space-y-3">
      {alerts.map(a => (
        <li key={a.id} className="p-3 bg-white rounded border flex justify-between items-start">
          <div>
            <div className="text-sm font-medium">{a.type}</div>
            <div className="text-xs text-gray-600">{a.message}</div>
          </div>
          <div className="text-xs text-gray-400">{new Date(a.timestamp).toLocaleString()}</div>
        </li>
      ))}
    </ul>
  );
}