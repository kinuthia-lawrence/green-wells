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
    <div className="bg-white p-4 rounded border">
      <Line data={data} />
    </div>
  );
}
