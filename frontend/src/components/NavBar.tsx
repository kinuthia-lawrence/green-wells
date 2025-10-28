import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-xl font-semibold text-green-600">SmartGasPro</Link>
          <nav className="hidden md:flex space-x-3 text-sm">
            <Link to="/devices" className="text-gray-600 hover:text-gray-900">Devices</Link>
            <Link to="/alerts" className="text-gray-600 hover:text-gray-900">Alerts</Link>
            <Link to="/payments" className="text-gray-600 hover:text-gray-900">Payments</Link>
          </nav>
        </div>
        <div className="text-sm text-gray-500">Green Wells</div>
      </div>
    </header>
  );
}