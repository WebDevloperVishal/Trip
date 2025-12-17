import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const getRouteData = async (start, destination) => {
  try {
    const geocode = async (place) => {
      const res = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          place
        )}.json?access_token=${process.env.MAPBOX_TOKEN}`
      );
      const [lng, lat] = res.data.features[0].center;
      return { name: place, lat, lng };
    };

    const startCoords = await geocode(start);
    const endCoords = await geocode(destination);

    const routeRes = await axios.get(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${startCoords.lng},${startCoords.lat};${endCoords.lng},${endCoords.lat}?geometries=geojson&access_token=${process.env.MAPBOX_TOKEN}`
    );

    const data = routeRes.data.routes[0];
    const distanceKm = (data.distance / 1000).toFixed(1);
    const durationHr = (data.duration / 3600).toFixed(1);

    return {
      start: startCoords,
      end: endCoords,
      distance: `${distanceKm} km`,
      time: `${durationHr} hr`,
      path: data.geometry.coordinates.map(([lng, lat]) => [lat, lng]),
    };
  } catch (err) {
    console.error("❌ Mapbox route error:", err.message);
    // fallback route (for testing)
    return {
      start: { name: start, lat: 19.076, lng: 72.8777 },
      end: { name: destination, lat: 18.75, lng: 73.4 },
      distance: "84 km",
      time: "2.3 hr",
      path: [
        [19.076, 72.8777],
        [18.75, 73.4],
      ],
    };
  }
};
