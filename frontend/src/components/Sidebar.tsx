import { useRef, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaRobot } from "react-icons/fa";
import { navItems } from "../constants/dashboardNav";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar?: () => void;
}

const Sidebar = ({ isOpen, toggleSidebar = () => {} }: SidebarProps) => {
  const location = useLocation();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [userData, setUserData] = useState({ name: "Guest", role: "guest" });
  useEffect(() => {
    const stored = localStorage.getItem("tutornova_user");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUserData({
          name: parsed.name || parsed.email?.split("@")[0] || "User",
          role: parsed.role || "student",
        });
      } catch {
        // fallback to guest
      }
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (!sidebarRef.current || window.innerWidth >= 768) return;
      if (!sidebarRef.current.contains(event.target as Node)) {
        toggleSidebar();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, toggleSidebar]);

  const handleNavClick = () => {
    if (window.innerWidth < 768 && typeof toggleSidebar === "function") {
      toggleSidebar();
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-20 transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      />
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed md:relative h-full md:h-screen min-h-screen flex flex-col bg-white shadow-xl overflow-y-auto z-30
          transition-all duration-300 ease-in-out transform
          ${
            isOpen
              ? "translate-x-0 w-64"
              : "md:translate-x-0 md:w-20 -translate-x-full"
          }`}
      >
        {/* Logo area */}
        <div className="relative h-16 flex items-center justify-center border-b border-gray-200 bg-white overflow-hidden">
          <div className="absolute inset-x-0 bottom-0 h-px bg-blue-500" />
          {isOpen ? (
            <div className="flex items-center px-6">
              <FaRobot className="h-6 w-6 text-blue-500 mr-2" />
              <span className="text-xl font-semibold text-gray-800">
                TutorNova
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <FaRobot className="h-7 w-7 text-blue-500" />
            </div>
          )}
        </div>
        {/* Navigation links */}
        <nav className="flex-1 py-6 px-3 overflow-auto">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.label} className="relative">
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-r-full" />
                  )}
                  <NavLink
                    to={item.path}
                    onClick={handleNavClick}
                    className={({ isActive }) => `
                      flex items-center px-3 py-3 rounded-lg group relative overflow-hidden
                      ${
                        isActive
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }
                      transition-all duration-200
                    `}
                  >
                    <span className={`${isOpen ? "mr-3" : "mx-auto"} h-5 w-5`}>{item.icon}</span>
                    {isOpen && (
                      <span className="text-sm font-medium transition-colors">
                        {item.label}
                      </span>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
        {/* Footer area */}
        <div className="border-t border-gray-200 mt-auto">
          <div className={`p-4 ${isOpen ? "px-4" : "px-2"}`}>
            {isOpen ? (
              <div className="flex items-center p-2 bg-gray-100 rounded-lg">
                <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                  <span className="font-medium text-white text-sm">
                    {userData?.name ? userData.name.charAt(0).toUpperCase() : "U"}
                  </span>
                </div>
                <div className="ml-3">
                  <p className="font-medium text-gray-800 text-sm">
                    {userData.name}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {userData.role.toUpperCase()}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex justify-center">
                <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                  <span className="font-medium text-white text-sm">
                    {userData?.name ? userData.name.charAt(0).toUpperCase() : "U"}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
