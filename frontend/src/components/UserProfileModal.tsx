import React from "react";
import { FaUserCircle } from "react-icons/fa";

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    name: string;
    email: string;
    role: string;
  };
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({ isOpen, onClose, user }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl font-bold focus:outline-none"
          onClick={onClose}
          aria-label="Close profile modal"
        >
          &times;
        </button>
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center mb-4">
            <FaUserCircle className="w-16 h-16 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-1">{user.name}</h2>
          <p className="text-gray-500 text-sm mb-2">{user.email}</p>
          <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-lg mb-4">
            {user.role.toUpperCase()}
          </span>
          <div className="w-full mt-2">
            {/* Add more profile details or actions here if needed */}
            <button
              className="w-full mt-4 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;
