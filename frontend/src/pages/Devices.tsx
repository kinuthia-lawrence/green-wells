import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Devices() {
  const [devices, setDevices] = useState<any[]>([]);
  useEffect(() => {
    api.get('/devices')
      .then(r => setDevices(r.data))
      .catch(console.error);
  }, []);
  return (
    <div>
      <h1>Devices</h1>
      <ul>
        {devices.map(d => (
          <li key={d.deviceId}>
            <Link to={`/devices/${d.deviceId}`}>{d.deviceId} — {d.status}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}