import axios from "axios";

const ORS_API_KEY = process.env.ORS_API_KEY;

/**
 * 🗺️ Get route (GeoJSON) from OpenRouteService
 * @param {Object} params - { start: [lng, lat], end: [lng, lat], profile?: "driving-car" }
 */
export const getRouteGeoJSON = async ({ start, end, profile = "driving-car" }) => {
  try {
    if (!ORS_API_KEY) throw new Error("ORS_API_KEY is missing in .env");

    const response = await axios.post(
      `https://api.openrouteservice.org/v2/directions/${profile}/geojson`,
      { coordinates: [start, end] },
      {
        headers: {
          Authorization: ORS_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (err) {
    console.error("OpenRouteService error:", err.response?.data || err.message);
    throw new Error("Failed to get route from ORS");
  }
};
