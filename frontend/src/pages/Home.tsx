import React, { useState } from "react";
import {
  FaBars,
  FaChalkboardTeacher,
  FaChartLine,
  FaGasPump,
  FaLeaf,
  FaLock,
  FaMobileAlt,
  FaRobot,
  FaTimes,
  FaUserShield,
} from "react-icons/fa";
import { MdOutlineDashboard, MdOutlinePayment } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { usersApi } from "../service/api";
import type { ApiResponse, LoginRequest } from "../types/types";

const features = [
  {
    title: "Pay-As-You-Go Convenience",
    body: "Top up your gas from as little as KES 50 using mobile money. No more upfront cylinder costs.",
    color: "bg-green-100 text-green-900",
    icon: <MdOutlinePayment className="text-green-700 text-2xl mb-2" />,
  },
  {
    title: "Real-Time Usage & Safety Monitoring",
    body: "Track your gas consumption, receive instant leak alerts, and enjoy automatic safety shutoff.",
    color: "bg-green-50 text-green-900",
    icon: <FaLock className="text-green-700 text-2xl mb-2" />,
  },
  {
    title: "AI-Powered Dashboard",
    body: "Green Wells management gets predictive analytics, route optimization, and fleet intelligence.",
    color: "bg-green-200 text-green-900",
    icon: <MdOutlineDashboard className="text-green-700 text-2xl mb-2" />,
  },
  {
    title: "Eco-Friendly & Affordable",
    body: "Empowering families with clean energy, reducing pollution, and saving money every month.",
    color: "bg-green-50 text-green-900",
    icon: <FaLeaf className="text-green-700 text-2xl mb-2" />,
  },
  {
    title: "Mobile App Experience",
    body: "Monitor usage, top up, and get safety notifications right from your phone.",
    color: "bg-green-100 text-green-900",
    icon: <FaMobileAlt className="text-green-700 text-2xl mb-2" />,
  },
  {
    title: "Safety First",
    body: "Automatic leak detection, emergency shutoff, and instant alerts keep your family safe.",
    color: "bg-green-200 text-green-900",
    icon: <FaUserShield className="text-green-700 text-2xl mb-2" />,
  },
];
const Home: React.FC = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const user = localStorage.getItem("user");
    return !!user;
  });
  const [redirectPath, setRedirectPath] = useState<string | null>(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const handleCloseModal = () => setShowAuthModal(false);
  const handleOpenModal = (tab: "signin" | "signup", redirectTo?: string) => {
    setShowAuthModal(true);
    if (redirectTo) setRedirectPath(redirectTo);
  };
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Attempting login with:", {
        email: loginEmail,
        password: loginPassword,
      });
      const loginPayload: LoginRequest = {
        username: loginEmail,
        password: loginPassword,
      };
      const response: ApiResponse<any> = await usersApi.login(loginPayload);
      if (response.success) {
        setIsAuthenticated(true);
        setShowAuthModal(false);
        setLoginEmail("");
        setLoginPassword("");
        toast.success("Login successful!");
        if (redirectPath) {
          navigate(redirectPath);
          setRedirectPath(null);
        } else {
          navigate("/dashboard");
        }
      } else {
        toast.error(response.message);
      }
    } catch (err: unknown) {
      if (err && typeof err === "object" && "message" in err) {
        toast.error((err as { message: string }).message);
      } else {
        toast.error("Login failed");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <nav className="w-full border-b border-gray-200 px-4 py-2 flex flex-col md:flex-row md:items-center md:justify-between bg-white">
        {/* Start */}
        <div className="flex items-center justify-between md:w-1/3">
          <span className="flex items-center gap-2 font-bold text-xl text-green-700">
            <FaGasPump className="text-green-700 text-2xl" /> SmartGas Pro
          </span>
          <button
            className="md:hidden p-2 focus:outline-none"
            aria-label="Open menu"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            title={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <FaBars className="w-6 h-6" />
          </button>
        </div>
        {/* Center */}
        <div className="hidden md:flex md:w-1/3 justify-center gap-6">
          <a
            href="/"
            className={`font-medium px-1 transition ${
              location.pathname === "/"
                ? "text-green-700 border-b-2 border-green-500"
                : "text-black hover:text-green-700"
            }`}
          >
            Home
          </a>
          <a
            href="/dashboard"
            className={`font-medium px-1 transition ${
              location.pathname === "/dashboard"
                ? "text-green-700 border-b-2 border-green-500"
                : "text-black hover:text-green-700"
            }`}
            title="Go to Dashboard"
          >
            Dashboard
          </a>
        </div>
        {/* End: Sign In */}
        <div className="hidden md:flex md:w-1/3 justify-end gap-4">
          <button
            className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 font-semibold"
            onClick={() => handleOpenModal("signin")}
            title="Sign in to your account"
          >
            Login
          </button>
        </div>
        {/* Mobile nav buttons (none except Home/Dashboard) */}
        {mobileMenuOpen && (
          <div className="flex flex-col gap-2 mt-2 md:hidden bg-white shadow rounded-lg p-4 absolute top-14 left-4 right-4 z-40">
            <a
              href="/"
              className="text-black font-medium hover:text-blue-700"
              title="Go to Home"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="#"
              className="text-black font-medium hover:text-blue-700"
              title="Go to Dashboard"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                if (isAuthenticated) {
                  navigate("/dashboard");
                } else {
                  handleOpenModal("signin", "/dashboard");
                }
              }}
            >
              Dashboard
            </a>

            <button
              className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800 font-semibold"
              onClick={() => {
                setMobileMenuOpen(false);
                handleOpenModal("signin");
              }}
              title="Sign in to your account"
            >
              Sign In
            </button>
          </div>
        )}
      </nav>

      {/* Body */}
      <main className="flex-1 w-full px-4 py-2 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row gap-8 md:gap-4 items-center mb-8 md:mb-4 min-h-[60vh] md:min-h-[50vh]">
          <div className="flex-1 flex flex-col gap-4 md:gap-2 max-w-3xl">
            <div className="flex items-center gap-3 mb-2">
              <FaGasPump className="text-green-700 text-5xl drop-shadow" />
              <h1 className="text-4xl md:text-5xl font-extrabold text-green-700 leading-tight tracking-tight">
                SmartGas Pro
              </h1>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-green-800 mb-3">
              Pay for what you use, know what you consume, stay safe always
            </h2>
            <p className="text-lg text-gray-700 mb-4 max-w-2xl">
              <span className="font-bold text-green-700">
                Revolutionizing LPG access in Kenya
              </span>{" "}
              with IoT smart meters, mobile payments, and real-time safety
              monitoring.
              <br />
              <span className="text-green-800 font-semibold">
                Affordable, safe, and transparent energy for every family and
                business.
              </span>
            </p>
            <div className="bg-green-50 border-l-4 border-green-700 rounded-lg p-4 mb-4 shadow-sm">
              <ul className="list-none text-green-900 text-base grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8">
                <li className="flex items-center gap-2">
                  <FaMobileAlt className="text-green-600" />
                  Micro-payments from KES 50 — no upfront cylinder cost
                </li>
                <li className="flex items-center gap-2">
                  <MdOutlineDashboard className="text-green-600" />
                  Real-time usage tracking & spending analytics
                </li>
                <li className="flex items-center gap-2">
                  <FaLock className="text-green-600" />
                  Automatic leak detection & emergency shutoff
                </li>
                <li className="flex items-center gap-2">
                  <FaRobot className="text-green-600" />
                  Mobile app for top-ups, alerts, and family monitoring
                </li>
                <li className="flex items-center gap-2">
                  <FaLeaf className="text-green-600" />
                  Eco-friendly, safe, and scalable for all communities
                </li>
              </ul>
            </div>
            <div className="flex gap-4 mt-2">
              <button
                className="bg-green-700 text-white px-6 py-3 rounded font-bold shadow hover:bg-green-800 transition"
                onClick={() => handleOpenModal("signin")}
              >
                Login
              </button>
              <a
                href="/dashboard"
                className="bg-white border border-green-700 text-green-700 px-6 py-3 rounded font-bold shadow hover:bg-green-50 transition"
              >
                Go to Dashboard
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full font-semibold text-green-800 shadow">
                <FaUserShield className="text-green-700" /> Safety First
              </div>
              <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full font-semibold text-green-800 shadow">
                <FaChartLine className="text-green-700" /> Analytics & Insights
              </div>
              <div className="flex items-center gap-2 bg-green-200 px-4 py-2 rounded-full font-semibold text-green-800 shadow">
                <FaLeaf className="text-green-700" /> Eco-Friendly
              </div>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
            <div className="bg-green-100 rounded-lg shadow p-6 flex flex-col items-center border border-green-300">
              <FaGasPump className="text-green-700 text-4xl mb-2" />
              <div className="font-bold text-green-900 text-lg mb-1">
                Pay-As-You-Go
              </div>
              <div className="text-green-800 text-sm text-center">
                Top up gas from KES 50. No more full cylinder costs.
              </div>
            </div>
            <div className="bg-green-50 rounded-lg shadow p-6 flex flex-col items-center border border-green-200">
              <FaLock className="text-green-700 text-4xl mb-2" />
              <div className="font-bold text-green-900 text-lg mb-1">
                Safety Monitoring
              </div>
              <div className="text-green-800 text-sm text-center">
                Automatic leak detection, emergency shutoff, instant alerts.
              </div>
            </div>
            <div className="bg-green-200 rounded-lg shadow p-6 flex flex-col items-center border border-green-300">
              <MdOutlineDashboard className="text-green-700 text-4xl mb-2" />
              <div className="font-bold text-green-900 text-lg mb-1">
                AI Dashboard
              </div>
              <div className="text-green-800 text-sm text-center">
                Predictive analytics, fleet intelligence.
              </div>
            </div>
            <div className="bg-green-100 rounded-lg shadow p-6 flex flex-col items-center border border-green-200">
              <FaMobileAlt className="text-green-700 text-4xl mb-2" />
              <div className="font-bold text-green-900 text-lg mb-1">
                Mobile App
              </div>
              <div className="text-green-800 text-sm text-center">
                Monitor usage, top up, and get safety notifications.
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="mb-12 md:mb-4">
          <h2 className="text-2xl font-bold text-green-700 mb-6">
            Why SmartGas Pro?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-3">
            {features.map((f, i) => (
              <div
                key={i}
                className={`rounded-lg shadow p-6 flex flex-col items-center border ${f.color} hover:shadow-xl transition`}
              >
                {f.icon}
                <div className="font-bold text-green-900 text-lg mb-1">
                  {f.title}
                </div>
                <div className="text-green-800 text-sm text-center">
                  {f.body}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Auth Modal */}
        {showAuthModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative p-8 border-2 border-green-100">
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-green-700 transition"
                onClick={handleCloseModal}
                aria-label="Close"
                title="Close"
              >
                <FaTimes className="text-2xl" />
              </button>
              <div className="mb-6 text-center">
                <div className="font-extrabold text-2xl text-green-700 mb-1 tracking-tight flex items-center justify-center gap-2">
                  <FaRobot className="text-green-700 text-xl" /> Welcome to
                  SmartGas Pro
                </div>
                <div className="text-gray-600 text-base mb-4">
                  Sign in to continue.
                </div>
              </div>
              <form className="space-y-5" onSubmit={handleSignIn}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    title="Email"
                    className="w-full px-4 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-200 focus:outline-none transition"
                    placeholder="Enter your email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    title="Password"
                    className="w-full px-4 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-200 focus:outline-none transition"
                    placeholder="Enter your password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-700 text-white py-2 rounded-lg font-semibold hover:bg-green-800 shadow transition"
                >
                  Sign In
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Chat Support Section */}
        {showChat && (
          <div className="fixed bottom-24 right-4 z-50 w-full max-w-xs md:max-w-sm">
            <div className="bg-white rounded-2xl shadow-2xl border border-green-200 p-4 flex flex-col h-80">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 font-bold text-green-700">
                  <FaRobot className="text-xl" /> SmartGas Support
                </div>
                <button
                  className="text-gray-400 hover:text-green-700 transition"
                  onClick={() => setShowChat(false)}
                  aria-label="Close chat"
                  title="Close chat"
                >
                  <FaTimes className="text-lg" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto text-sm text-gray-700 px-1 py-2">
                <div className="mb-2 flex items-start gap-2">
                  <FaRobot className="text-green-400 mt-1" />
                  <div className="bg-green-50 border border-green-100 rounded-lg px-3 py-2">
                    Hi! I’m your SmartGas support assistant. How can I help you
                    today? <br />
                    <span className="text-green-700 font-semibold">
                      For urgent safety issues, please call our hotline:{" "}
                      <a href="tel:+254700000000" className="underline">
                        0700 000 000
                      </a>
                    </span>
                  </div>
                </div>
                {/* Placeholder for future chat messages */}
              </div>
              <form
                className="flex items-center gap-2 mt-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  // Placeholder for sending a message
                }}
              >
                <input
                  type="text"
                  className="flex-1 px-3 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-200 focus:outline-none text-sm"
                  placeholder="Type your message…"
                  disabled
                />
                <button
                  type="submit"
                  className="bg-green-700 text-white px-3 py-2 rounded-lg font-semibold hover:bg-green-800 transition disabled:opacity-60"
                  disabled
                  title="Send (coming soon)"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Floating AI Assistant Button */}
        <button
          className="fixed bottom-12 right-4 z-50 bg-purple-700 text-white p-2 rounded-full shadow-lg flex items-center gap-2 hover:bg-purple-800 focus:outline-none"
          aria-label="Open AI Assistant"
          title="Open AI Assistant"
          onClick={() => setShowChat(true)}
        >
          <FaRobot className="text-sm" /> SmartGas Support
        </button>
      </main>

      {/*  Pricing, FAQ Sections */}
      <section id="pricing" className="w-full px-4 py-12 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-green-700 mb-6">
          SmartGas Pro Pricing
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pay-As-You-Go */}
          <div className="rounded-lg shadow p-6 md:p-4 bg-green-50 flex flex-col items-center border border-green-200 hover:shadow-xl transition">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow mb-3">
              <FaGasPump className="text-green-700 text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-green-700 mb-2">
              Pay-As-You-Go
            </h3>
            <p className="text-gray-700 mb-2 text-center">
              <span className="font-bold">Pay for what you use.</span> Top up
              from as little as <span className="font-bold">KES 50</span> via
              mobile money. No upfront cylinder cost, no monthly fees.
            </p>
            <span className="text-3xl font-extrabold text-green-900 mb-1">
              KES 50
            </span>
            <span className="text-xs text-gray-500 mb-3">
              minimum per refill
            </span>
            <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold border border-green-200">
              Most Accessible
            </span>
          </div>
          {/* Safety & Business Features */}
          <div className="rounded-lg shadow p-6 md:p-4 bg-green-100 flex flex-col items-center border border-green-300 hover:shadow-xl transition">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow mb-3">
              <FaLock className="text-green-700 text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-green-700 mb-2">
              Safety & Business Features
            </h3>
            <p className="text-gray-700 mb-2 text-center">
              All users get leak detection, emergency shutoff, instant alerts,
              and access to analytics and route optimization. <br />
              <span className="font-bold text-green-900">
                No extra monthly fees.
              </span>{" "}
              Businesses can contact us for custom fleet solutions.
            </p>
            <span className="text-3xl font-extrabold text-green-900 mb-1">
              Included
            </span>
            <span className="text-xs text-gray-500 mb-3">for all users</span>
            <span className="inline-block px-3 py-1 bg-green-200 text-green-900 rounded-full text-xs font-semibold border border-green-300">
              Safety & Analytics
            </span>
          </div>
        </div>
        <div className="mt-8 text-center text-green-800 font-semibold">
          <FaMobileAlt className="inline mr-2 text-green-700" />
          <span>
            All payments are pay-as-you-go. You only pay for the gas you use.
          </span>
        </div>
      </section>

      <section id="faq" className="w-full px-4 py-12 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-green-700 mb-6 flex items-center gap-2">
          <FaRobot className="text-green-700 text-2xl" />
          Frequently Asked Questions
        </h2>
        <ul className="space-y-6">
          {[
            {
              question: "How does SmartGas Pro work?",
              answer:
                "SmartGas Pro uses IoT smart meters to monitor your LPG usage in real time. You pay for only what you use via mobile money, and receive instant safety alerts.",
            },
            {
              question: "What are the main advantages?",
              answer:
                "Financial inclusion (micro-payments), real-time usage tracking, automatic leak detection, emergency shutoff, and eco-friendly energy access.",
            },
            {
              question: "How do I top up my gas?",
              answer:
                "Simply use your mobile phone to pay via M-Pesa or other mobile money platforms. Your meter is credited instantly.",
            },
            {
              question: "Is SmartGas Pro safe?",
              answer:
                "Yes! Our system includes automatic leak detection, emergency shutoff, and instant alerts to keep your family safe.",
            },
            {
              question: "Can businesses use SmartGas Pro?",
              answer:
                "Absolutely. Businesses benefit from fleet analytics, route optimization, and scalable management tools.",
            },
            {
              question: "How do I get started?",
              answer:
                "Sign up, install a SmartGas meter, and start enjoying affordable, safe, and transparent LPG access.",
            },
          ].map((faq, idx) => (
            <li
              key={idx}
              className="rounded-lg border border-green-200 bg-green-50 p-5 shadow-sm hover:shadow-lg transition group"
            >
              <h3 className="text-lg font-bold text-green-700 mb-1 flex items-center gap-2 group-hover:underline">
                <FaRobot className="text-green-400 text-base" />
                {faq.question}
              </h3>
              <p className="text-gray-700">{faq.answer}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Sticky Footer */}
      <footer className="w-full border-t border-gray-200 px-4 py-4 flex flex-col md:flex-row md:items-center md:justify-between bg-white text-black sticky bottom-0 left-0 z-40">
        <div className="text-sm">&copy; 2025 SmartGas Pro, Clalix</div>
        <div className="hidden md:flex md:w-1/2 justify-end gap-6 mt-2 md:mt-0">
          <span className="text-green-700 font-regular text-sm">
            IoT • FinTech • Energy Access • Safety Monitoring
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Home;
