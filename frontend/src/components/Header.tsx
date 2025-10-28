import { useEffect, useState } from "react";
import { FaBars, FaBell, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import UserProfileModal from "./UserProfileModal";
import { usersApi } from "../service/api";

interface HeaderProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Header = ({ isOpen, toggleSidebar }: HeaderProps) => {
  const [userData, setUserData] = useState({
    name: "Guest",
    email: "",
    role: "guest",
  });

  useEffect(() => {
    const stored = localStorage.getItem("tutornova_user");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUserData({
          name: parsed.name || parsed.email?.split("@")[0] || "User",
          email: parsed.email || "",
          role: parsed.role || "student",
        });
      } catch {
        // fallback to guest
      }
    }
  }, []);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  return (
    <header className="bg-white h-16 px-4 flex items-center justify-between border-b border-gray-200 shadow-sm relative z-30">
      {/* Left: Sidebar toggle and brand */}
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600 p-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
        >
          <FaBars className="w-5 h-5" />
        </button>
        <div className="ml-4 flex items-center">
          <span className="text-sm sm:text-2xl font-extrabold text-blue-600">
            Tutor
          </span>
          <span className="text-sm sm:text-2xl font-extrabold text-gray-700">
            Nova
          </span>
          <span className="hidden lg:block ml-2 px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-md">
            Platform
          </span>
        </div>
      </div>
      {/* Right: User and role */}
      <div className="flex items-center space-x-3">
        {/* Role indicator */}
        <span className="hidden sm:flex items-center px-3 py-1 text-sm font-medium bg-blue-100 text-blue-700 rounded-lg border border-blue-200/50">
          <span className="mr-1.5 w-2 h-2 rounded-full bg-blue-400"></span>
          {userData.role.toUpperCase()}
        </span>
        {/* Notifications icon button */}
        <Link
          to="/dashboard/notifications"
          className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 hover:bg-blue-50 text-gray-600 hover:text-blue-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          title="Notifications"
          aria-label="Notifications"
        >
          <FaBell className="w-5 h-5" />
        </Link>
        {/* User profile menu */}
        <div className="relative group">
          <button
            className="flex items-center focus:outline-none bg-gray-100 p-1.5 rounded-lg hover:bg-blue-50 transition-all duration-200"
            onClick={() => setProfileMenuOpen((v) => !v)}
            aria-label="Open profile menu"
          >
            <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-medium">
              <FaUserCircle className="w-5 h-5" />
            </div>
          </button>
          {profileMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-1 z-50 border border-gray-100">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">
                  {userData.name}
                </p>
                <p className="text-xs text-gray-500 mt-1">{userData.email}</p>
              </div>
              <div className="p-2">
                <button
                  className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg"
                  onClick={() => {
                    setProfileMenuOpen(false);
                    setProfileModalOpen(true);
                  }}
                >
                  <FaUserCircle className="w-4 h-4 mr-3 text-blue-500" />
                  Your Profile
                </button>
              </div>
              <div className="border-t border-gray-100 p-2">
                <button
                  type="button"
                  className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg"
                  onClick={async () => {
                    setProfileMenuOpen(false);
                    usersApi.logout();
                    window.location.href = "/";
                  }}
                >
                  <span className="w-4 h-4 mr-3 text-red-500">⎋</span>
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* User Profile Modal */}
      <UserProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        user={userData}
      />
    </header>
  );
};

export default Header;
