import axios from "axios";

export const geocodeLocation = async (location) => {
  try {
    const res = await axios.get(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`
    );

    if (!res.data || res.data.length === 0) throw new Error("Location not found");

    return {
      lat: parseFloat(res.data[0].lat),
      lng: parseFloat(res.data[0].lon),
    };
  } catch (err) {
    console.warn("Geocode failed for", location, ":", err.message);
    return null;
  }
};
