import { Link, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "./components/Layout copy";
import ProtectedRoute from "./components/ProtectedRoute";
import Alerts from "./pages/Alerts";
import Dashboard from "./pages/Dashboard";
import DeviceDetails from "./pages/DeviceDetails";
import Devices from "./pages/Devices";
import Home from "./pages/Home";
import Payment from "./pages/Payment";
import EmergencyResponse from "./pages/EmergencyResponse";

export default function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        aria-label="Notification"
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="devices" element={<Devices />} />
            <Route path="devices/:id" element={<DeviceDetails />} />
            <Route path="alerts" element={<Alerts />} />
            <Route path="payments" element={<Payment />} />
            <Route
              path="/dashboard/devices/:id/emergency"
              element={<EmergencyResponse />}
            />
            <Route
              path="*"
              element={
                <div>
                  Not Found — <Link to="/">Go home</Link>
                </div>
              }
            />
          </Route>
        </Route>
      </Routes>
    </>
  );
}
