
import { useEffect, useState } from 'react';
import DeviceCard from '../components/DeviceCard';
import { api } from '../service/api';
import type { DeviceSummary } from '../types/types';

export default function Dashboard() {
  const [devices, setDevices] = useState<DeviceSummary[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get<DeviceSummary[]>('/devices')
      .then(res => setDevices(res.data || []))
      .catch(() => setDevices([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </div>

      {loading ? (
        <div className="text-sm text-gray-500">Loading devices...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {devices.length === 0 ? (
            <div className="text-sm text-gray-500">No devices found</div>
          ) : (
            devices.map(d => <DeviceCard key={d.deviceId} device={d} />)
          )}
        </div>
      )}
    </div>
  );
}