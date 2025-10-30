import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { devicesApi, sensorApi } from "../service/api";
import DeviceMap from "../components/DeviceMap";
import { calculateEmergencyRoute, decimalToDMS } from "../utils/locationUtils";
import type { Device, EmergencyRoute, SensorReading } from "../types/types";
import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaClock,
  FaRoad,
  FaSpinner,
} from "react-icons/fa";

export default function EmergencyResponse() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [device, setDevice] = useState<Device | null>(null);
  const [readings, setReadings] = useState<SensorReading[]>([]);
  const [route, setRoute] = useState<EmergencyRoute | null>(null);
  const [loading, setLoading] = useState(false);
  const [routeLoading, setRouteLoading] = useState(false);

  // User location (in real app, get from user profile or geolocation)
  const userLocation = { lat: -1.2863, lng: 36.8172 }; // Nairobi center

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    devicesApi
      .getDevice(id)
      .then((r) => setDevice(r.data.data))
      .catch(() => setDevice(null))
      .finally(() => setLoading(false));

    sensorApi
      .history(id)
      .then((r) => setReadings(r.data.data || []))
      .catch(() => setReadings([]));
  }, [id]);

  const lastReading = readings[0];
  const latitude = lastReading?.latitude;
  const longitude = lastReading?.longitude;

  const handleCalculateRoute = async () => {
    if (!latitude || !longitude) return;

    setRouteLoading(true);
    try {
      const routeData = await calculateEmergencyRoute(
        latitude,
        longitude,
        userLocation.lat,
        userLocation.lng
      );
      setRoute(routeData);
    } catch (error) {
      console.error("Error calculating route:", error);
    } finally {
      setRouteLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <FaSpinner className="text-4xl text-green-700 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-2 py-4 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-green-700 hover:text-green-800 font-semibold mb-6"
        >
          <FaArrowLeft /> Back
        </button>

        {/* Emergency Alert Header */}
        <div className="bg-red-50 border-l-4 border-red-600 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-red-600 rounded-full animate-pulse" />
            <div>
              <h1 className="text-2xl font-bold text-red-700">
                Emergency Response
              </h1>
              <p className="text-sm text-red-600">
                {device?.name || device?.deviceId} - Gas Leak Detected
              </p>
            </div>
          </div>
        </div>

        {/* Device Info Card */}
        {device && (
          <div className="bg-green-50 rounded-lg shadow p-6 mb-6 border-0.5 border-green-300">
            <h2 className="text-xl font-bold text-green-700 mb-4">
              Device Information
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <div className="text-xs text-gray-600">Device Name</div>
                <div className="font-semibold text-gray-800">
                  {device.name || device.deviceId}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-600">Model</div>
                <div className="font-semibold text-gray-800">
                  {device.model}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-600">Status</div>
                <div className="font-semibold text-red-700">ALERT</div>
              </div>
            </div>
          </div>
        )}

        {/* Location Section */}
        {latitude && longitude && (
          <div className="bg-white rounded-lg shadow p-6 mb-6 border-0.5 border-gray-300">
            <div className="flex items-center gap-2 mb-4">
              <FaMapMarkerAlt className="text-green-700 text-lg" />
              <h2 className="text-xl font-bold text-green-700">
                Device Location
              </h2>
            </div>

            <div className="space-y-3 mb-6">
              <div>
                <span className="text-xs text-gray-600">Coordinates:</span>
                <div className="font-mono text-sm font-semibold text-gray-800">
                  {latitude.toFixed(6)}, {longitude.toFixed(6)}
                </div>
              </div>

              <div>
                <span className="text-xs text-gray-600">
                  Navigation Format:
                </span>
                <div className="font-mono text-sm font-semibold text-gray-800">
                  {decimalToDMS(latitude, true)}{" "}
                  {decimalToDMS(longitude, false)}
                </div>
              </div>
            </div>

            {/* Map */}
            <DeviceMap
              latitude={latitude}
              longitude={longitude}
              deviceName={device?.name || "Emergency Location"}
            />
          </div>
        )}

        {/* Route Calculation Section */}
        {latitude && longitude && (
          <div className="bg-purple-50 rounded-lg shadow p-6 mb-6 border-0.5 border-purple-300">
            <div className="flex items-center gap-2 mb-4">
              <FaRoad className="text-purple-700 text-lg" />
              <h2 className="text-xl font-bold text-purple-700">
                Shortest Route
              </h2>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              Calculate the fastest route to the emergency location for
              emergency response team.
            </p>

            <button
              onClick={handleCalculateRoute}
              disabled={routeLoading}
              className="w-full px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition disabled:bg-gray-400 flex items-center justify-center gap-2"
            >
              {routeLoading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Calculating...
                </>
              ) : (
                <>
                  <FaRoad />
                  Calculate Shortest Route
                </>
              )}
            </button>

            {/* Route Results */}
            {route && route.features && route.features.length > 0 && (
              <div className="mt-6 bg-white rounded-lg p-4 border-0.5 border-purple-300">
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">Distance:</span>
                    <div className="font-bold text-lg text-gray-800">
                      {(
                        route.features[0].properties.segments[0].distance / 1000
                      ).toFixed(2)}{" "}
                      km
                    </div>
                  </div>

                  <div>
                    <span className="text-sm text-gray-600">
                      Estimated Time:
                    </span>
                    <div className="font-bold text-lg text-gray-800 flex items-center gap-2">
                      <FaClock className="text-orange-600" />
                      {Math.round(
                        route.features[0].properties.segments[0].duration / 60
                      )}{" "}
                      minutes
                    </div>
                  </div>

                  <div>
                    <span className="text-sm text-gray-600">
                      Route Summary:
                    </span>
                    <div className="mt-2 text-sm text-gray-700 bg-gray-50 p-3 rounded">
                      {route.features[0].properties.summary?.description ||
                        "Optimal route calculated"}
                    </div>
                  </div>

                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full text-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold mt-4"
                  >
                    Open in Navigation App
                  </a>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Contact Support */}
        <div className="bg-yellow-50 rounded-lg shadow p-6 border-0.5 border-yellow-300">
          <h3 className="font-bold text-yellow-800 mb-2">
            Emergency Support Contacts
          </h3>
          <div className="space-y-2 text-sm text-yellow-900">
            <div>
              📞 <strong>Emergency:</strong> 999 / 112
            </div>
            <div>
              📧 <strong>Support Team:</strong> emergency@smartgaspro.com
            </div>
            <div>
              📍 <strong>Dispatch Center:</strong> +254 XXX XXX XXX
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
