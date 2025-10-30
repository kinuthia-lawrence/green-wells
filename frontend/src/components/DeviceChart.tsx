import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import "chartjs-adapter-date-fns";
import type { SensorReading } from "../types/types";

ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function DeviceChart({
  readings,
}: {
  readings: SensorReading[];
}) {
  const data = {
    datasets: [
      {
        label: "Gas Value",
        data: readings.map((r) => ({
          x: new Date(r.timestamp).toISOString(),
          y: r.gasValue,
        })),
        borderColor: "rgba(16,185,129,0.9)",
        backgroundColor: "rgba(16,185,129,0.2)",
        tension: 0.2,
      },
    ],
  };

  return (
    <div className="bg-green-50 p-4 rounded-xl border shadow w-full max-w-2xl mx-auto">
      <h2 className="text-green-700 font-bold mb-2 text-lg">Gas Usage Chart</h2>
      <Line data={data} />
    </div>
  );
}
