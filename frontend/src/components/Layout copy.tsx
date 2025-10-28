import { useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = () => {
  const [isOpen, setIsOpen] = useState(() => window.innerWidth >= 640);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - responsive */}
        <div
          className={`
            ${isOpen ? "w-64" : "w-20"} 
            transition-all duration-300 ease-in-out
            ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
            fixed md:relative z-30 h-screen 
            bg-white 
          `}
        >
          {/* Pass toggleSidebar function to Sidebar component */}
          <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
        </div>

        {/* Rest of your layout */}
        <div
          className={`
          flex flex-col flex-1 overflow-y-auto
          ${isOpen ? "md:ml-0" : "md:ml-0"}
          transition-all duration-300 ease-in-out
          w-full md:w-[calc(100%-${isOpen ? "16rem" : "5rem"})]
        `}
        >
          {/* Header - fixed at top */}
          <div className="sticky top-0 z-10">
            <Header isOpen={isOpen} toggleSidebar={toggleSidebar} />
          </div>
          {/* Main content - will grow to fill available space */}
          <div className="flex-1">
            <Outlet />
          </div>

          {/* Footer - stays at bottom */}
          <div className="mt-auto">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
