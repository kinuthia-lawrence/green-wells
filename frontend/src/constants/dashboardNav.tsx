import {
  FaTachometerAlt,
  FaMicrochip,
  FaBell,
  FaMoneyBillWave,
} from "react-icons/fa";

export const navItems = [
  { label: "Dashboard", icon: <FaTachometerAlt />, path: "/dashboard" },
  { label: "Devices", icon: <FaMicrochip />, path: "/dashboard/devices" },
  { label: "Alerts", icon: <FaBell />, path: "/dashboard/alerts" },
  { label: "Payments", icon: <FaMoneyBillWave />, path: "/dashboard/payments" },
];
