import { useEffect, useState } from "react";
import { notificationsApi } from "../service/api";
import type { Notification } from "../types/types";

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    notificationsApi.list()
      .then((r) => setNotifications(r.data.data || []))
      .catch(() => setNotifications([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-white px-2 py-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">Notifications</h1>
      <div className="w-full max-w-2xl bg-purple-50 rounded-xl shadow p-4 mb-4">
        {loading ? (
          <div className="text-sm text-gray-500">Loading notifications...</div>
        ) : (
          <ul className="space-y-2">
            {notifications.length === 0 ? (
              <li className="text-sm text-gray-500">No notifications</li>
            ) : (
              notifications.map((n) => (
                <li key={n.id} className="bg-white rounded shadow p-3 flex flex-col border border-purple-100">
                  <span className="font-bold text-purple-700">{n.title}</span>
                  <span className="text-gray-700">{n.message}</span>
                  <span className="text-xs text-gray-400 mt-1">{new Date(n.timestamp).toLocaleString()}</span>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
      <div className="w-full text-center text-sm text-gray-500 mt-4">
        Powered by SmartGas Pro
      </div>
    </div>
  );
}
