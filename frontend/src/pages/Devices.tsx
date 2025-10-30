import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { devicesApi } from '../service/api';
import type { Device } from '../types/types';

export default function Devices() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    devicesApi.list()
      .then(r => setDevices(r.data.data || []))
      .catch(() => setDevices([]))
      .finally(() => setLoading(false));
  }, []);
  return (
    <div className="min-h-screen bg-white px-2 py-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Devices</h1>
      <div className="w-full max-w-4xl bg-green-50 rounded-xl shadow p-4 mb-4">
        {loading ? (
          <div className="text-sm text-gray-500">Loading devices...</div>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {devices.length === 0 ? (
              <li className="text-sm text-gray-500">No devices found</li>
            ) : (
              devices.map(d => (
                <li key={d.deviceId} className="bg-white rounded-lg shadow p-4 flex flex-col items-center border border-green-100">
                  <div className="font-bold text-green-700 mb-2">{d.name || d.deviceId}</div>
                  <div className="text-xs text-gray-500 mb-1">Model: {d.model || 'N/A'}</div>
                  <div className="text-xs text-gray-500 mb-1">Last Seen: {d.lastSeen ? new Date(d.lastSeen).toLocaleString() : 'N/A'}</div>
                  <Link to={`/devices/${d.deviceId}`} className="mt-2 px-3 py-1 bg-green-200 text-green-900 rounded hover:bg-green-300 text-sm font-semibold">View Details</Link>
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