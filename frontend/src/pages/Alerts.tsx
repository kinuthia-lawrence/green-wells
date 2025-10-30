import { useEffect, useState } from "react";
import AlertList from "../components/AlertList";
import { api } from "../service/api";
import type { AlertItem } from "../types/types";

export default function Alerts() {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);

  useEffect(() => {
    api
      .get<AlertItem[]>("/alerts")
      .then((r) => setAlerts(r.data || []))
      .catch(() => setAlerts([]));
  }, []);

  return (
    <div className="min-h-screen bg-white px-2 py-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Alerts</h1>
      <div className="w-full max-w-2xl bg-green-50 rounded-xl shadow p-4 mb-4">
        <AlertList alerts={alerts} />
      </div>
      <div className="w-full text-center text-sm text-gray-500 mt-4">
        Powered by SmartGas Pro
      </div>
    </div>
  );
}
