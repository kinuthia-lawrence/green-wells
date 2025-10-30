export const decimalToDMS = (decimal: number, isLatitude: boolean): string => {
  const absolute = Math.abs(decimal);
  const degrees = Math.floor(absolute);
  const minutesDecimal = (absolute - degrees) * 60;
  const minutes = Math.floor(minutesDecimal);
  const seconds = ((minutesDecimal - minutes) * 60).toFixed(1);

  const direction = isLatitude
    ? decimal >= 0
      ? "N"
      : "S"
    : decimal >= 0
    ? "E"
    : "W";

  return `${degrees}°${minutes}'${seconds}"${direction}`;
};

export const getGoogleMapsUrl = (
  latitude: number,
  longitude: number
): string => {
  return `https://www.google.com/maps/search/${latitude},${longitude}`;
};

export const calculateEmergencyRoute = async (
  deviceLat: number,
  deviceLng: number,
  userLat: number,
  userLng: number
) => {
  const response = await fetch(
    `https://api.openrouteservice.org/v2/directions/driving?api_key=YOUR_KEY&start=${userLng},${userLat}&end=${deviceLng},${deviceLat}`
  );
  return response.json();
};
