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
    <div>
      <h1 className="text-2xl font-semibold mb-4">Alerts</h1>
      <AlertList alerts={alerts} />
    </div>
  );
}
