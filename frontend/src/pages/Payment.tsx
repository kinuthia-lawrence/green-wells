import { useEffect, useState } from "react";
import {
  FaChartLine,
  FaCheckCircle,
  FaCreditCard,
  FaHourglassHalf,
  FaMoneyBillWave,
  FaTimesCircle,
} from "react-icons/fa";
import { paymentApi } from "../service/api";
import type { Payment } from "../types/types";

export default function Payment() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");

  useEffect(() => {
    setLoading(true);
    Promise.all([paymentApi.list().then((r) => setPayments(r.data.data || []))])
      .catch(() => {
        setPayments([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredPayments = payments.filter((p) => {
    if (filter === "completed") return p.status.toUpperCase() === "COMPLETED";
    if (filter === "pending") return p.status.toUpperCase() === "PENDING";
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status?.toUpperCase()) {
      case "COMPLETED":
        return "bg-green-100 border-green-300 text-green-800";
      case "PENDING":
        return "bg-yellow-100 border-yellow-300 text-yellow-800";
      case "FAILED":
        return "bg-red-100 border-red-300 text-red-800";
      default:
        return "bg-gray-100 border-gray-300 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status?.toUpperCase()) {
      case "COMPLETED":
        return <FaCheckCircle className="text-green-600 text-lg" />;
      case "PENDING":
        return (
          <FaHourglassHalf className="text-yellow-600 text-lg animate-spin" />
        );
      case "FAILED":
        return <FaTimesCircle className="text-red-600 text-lg" />;
      default:
        return <FaCreditCard className="text-gray-600 text-lg" />;
    }
  };

  const getMethodColor = (method: string) => {
    switch (method?.toUpperCase()) {
      case "MPESA":
        return "bg-green-500 text-white";
      case "CARD":
        return "bg-blue-500 text-white";
      case "BANK":
        return "bg-purple-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const totalAmount = filteredPayments.reduce((sum, p) => sum + p.amount, 0);
  const completedAmount = filteredPayments
    .filter((p) => p.status.toUpperCase() === "COMPLETED")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="min-h-screen bg-white px-2 py-4 flex flex-col items-center">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-green-700 mb-6">
          Payment Management
        </h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="relative overflow-hidden rounded-lg bg-linear-to-br from-green-600 to-emerald-700 p-6 shadow-lg text-white border-0.5 border-green-800">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16 blur-2xl" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium opacity-90">
                  Total Payments
                </span>
                <FaMoneyBillWave className="text-2xl opacity-80" />
              </div>
              <div className="text-3xl font-bold">
                KES {totalAmount.toLocaleString()}
              </div>
              <div className="text-xs opacity-75 mt-1">
                {filteredPayments.length} transaction
                {filteredPayments.length !== 1 ? "s" : ""}
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-lg bg-linear-to-br from-blue-600 to-cyan-700 p-6 shadow-lg text-white border-0.5 border-blue-800">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16 blur-2xl" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium opacity-90">
                  Completed
                </span>
                <FaCheckCircle className="text-2xl opacity-80" />
              </div>
              <div className="text-3xl font-bold">
                KES {completedAmount.toLocaleString()}
              </div>
              <div className="text-xs opacity-75 mt-1">
                {
                  filteredPayments.filter(
                    (p) => p.status.toUpperCase() === "COMPLETED"
                  ).length
                }{" "}
                successful
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-lg bg-linear-to-br from-purple-600 to-indigo-700 p-6 shadow-lg text-white border-0.5 border-purple-800">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16 blur-2xl" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium opacity-90">Summary</span>
                <FaChartLine className="text-2xl opacity-80" />
              </div>
              <div className="text-3xl font-bold">{payments.length}</div>
              <div className="text-xs opacity-75 mt-1">Total transactions</div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              filter === "all"
                ? "bg-green-700 text-white shadow-lg"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            All Payments
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              filter === "completed"
                ? "bg-green-700 text-white shadow-lg"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              filter === "pending"
                ? "bg-green-700 text-white shadow-lg"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            Pending
          </button>
        </div>

        {/* Payments Table/Cards */}
        <div className="bg-green-50 rounded-xl shadow-lg p-4 mb-6 border-0.5 border-green-300">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin mb-2">
                <FaCreditCard className="text-green-700 text-4xl" />
              </div>
              <div className="text-gray-500 font-medium">
                Loading payments...
              </div>
            </div>
          ) : filteredPayments.length === 0 ? (
            <div className="text-center py-12">
              <FaMoneyBillWave className="text-4xl text-gray-300 mx-auto mb-2" />
              <div className="text-gray-500 font-medium">No payments found</div>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredPayments.map((payment) => (
                <div
                  key={payment.id}
                  className="bg-white rounded-lg border-0.5 border-gray-300 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:shadow-md transition"
                >
                  <div className="flex items-start gap-3 flex-1">
                    <div className="mt-1">{getStatusIcon(payment.status)}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">
                        Transaction ID:{" "}
                        <span className="text-green-700">
                          {payment.transactionId}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        Date: {new Date(payment.paymentTime).toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        User ID: {payment.userId}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 sm:gap-3">
                    <div className="text-2xl font-bold text-green-700">
                      KES {payment.amount.toLocaleString()}
                    </div>

                    <div className="flex gap-2 flex-wrap justify-end">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border-0.5 ${getStatusColor(
                          payment.status
                        )}`}
                      >
                        {payment.status}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getMethodColor(
                          payment.method
                        )}`}
                      >
                        {payment.method}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="w-full text-center text-sm text-gray-500 mt-4">
        Powered by SmartGas Pro
      </div>
    </div>
  );
}
