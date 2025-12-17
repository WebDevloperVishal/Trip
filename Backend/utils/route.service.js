import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const ORS_BASE = "https://api.openrouteservice.org/v2/directions/driving-car";

/**
 * Get driving route between two coordinates
 * @param {object} from {lat, lng}
 * @param {object} to {lat, lng}
 */
export async function getRoute(from, to) {
  try {
    const body = {
      coordinates: [
        [from.lng, from.lat],
        [to.lng, to.lat],
      ],
    };

    const res = await fetch(ORS_BASE, {
      method: "POST",
      headers: {
        "Authorization": process.env.ORS_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error("Failed to fetch route");
    const data = await res.json();

    const summary = data.features[0].properties.summary;
    const geometry = data.features[0].geometry;

    return {
      distance_km: (summary.distance / 1000).toFixed(2),
      duration_hr: (summary.duration / 3600).toFixed(2),
      geometry,
    };
  } catch (err) {
    console.error("Route error:", err.message);
    return null;
  }
}
