import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const BASE_URL = "https://api.geoapify.com/v2/places";

/**
 * Get nearby points of interest using Geoapify Places API
 * @param {number} lat
 * @param {number} lon
 * @param {number} radius in meters
 */
export async function getNearbyPlaces(lat, lon, radius = 3000) {
  try {
    const categories = [
      "accommodation.hotel",
      "catering.cafe",
      "healthcare.hospital",
      "entertainment.cinema",
      "transport.bus_station",
    ].join(",");

    const url = `${BASE_URL}?categories=${categories}&filter=circle:${lon},${lat},${radius}&bias=proximity:${lon},${lat}&limit=5&apiKey=${process.env.GEOAPIFY_API_KEY}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch nearby places");

    const data = await res.json();

    return data.features.map((place) => ({
      name: place.properties.name || "Unnamed Place",
      category: place.properties.categories?.[0] || "Unknown",
      address: place.properties.address_line2 || "",
      distance_m: place.properties.distance || 0,
      lat: place.geometry.coordinates[1],
      lon: place.geometry.coordinates[0],
    }));
  } catch (err) {
    console.error(" Nearby error:", err.message);
    return [];
  }
}
