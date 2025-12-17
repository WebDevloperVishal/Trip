import Destination from "../models/destination.model.js";
import Trip from "../models/trip.model.js";
import { getRouteGeoJSON } from "../utils/ors.service.js";
import { getNearbyPOIs } from "../utils/otm.service.js";
import { geocodeLocation } from "../utils/geocode.service.js";
import axios from "axios";


export const computeRoute = async (req, res) => {
  try {
    const { origin, destination, destinationId, profile = "driving-car" } = req.body;

    if (!origin?.lat || !origin?.lng) {
      if (origin?.name) {
        console.log("Geocoding origin:", origin.name);
        const originCoords = await geocodeLocation(origin.name);
        if (!originCoords)
          return res.status(400).json({ message: "Failed to geocode origin" });
        origin.lat = originCoords.lat;
        origin.lng = originCoords.lng;
        console.log("Origin geocoded:", origin);
      } else {
        return res
          .status(400)
          .json({ message: "Origin coordinates (lat/lng) required" });
      }
    }

    let destCoords;
    if (destinationId) {
      const dest = await Destination.findById(destinationId);
      if (!dest)
        return res.status(404).json({ message: "Destination not found" });
      if (!dest.coordinates?.lat || !dest.coordinates?.lng)
        return res
          .status(400)
          .json({ message: "Destination missing coordinates" });
      destCoords = [dest.coordinates.lng, dest.coordinates.lat];
    } else if (destination?.lat && destination?.lng) {
      destCoords = [destination.lng, destination.lat];
    } else if (destination?.name) {
      console.log("Geocoding destination:", destination.name);
      const destGeo = await geocodeLocation(destination.name);
      if (!destGeo)
        return res
          .status(400)
          .json({ message: "Failed to geocode destination" });
      destCoords = [destGeo.lng, destGeo.lat];
      console.log("Destination geocoded:", destCoords);
    } else {
      return res
        .status(400)
        .json({ message: "Destination data missing" });
    }

    const originCoords = [origin.lng, origin.lat];
    let feature = null;
    let summary = {};
    let steps = [];

    const ORS_KEY = process.env.ORS_API_KEY;
    if (ORS_KEY) {
      try {
        const routeGeo = await getRouteGeoJSON({
          start: originCoords,
          end: destCoords,
          profile,
        });
        feature = routeGeo?.features?.[0];
        summary = feature?.properties?.summary || {};
        const segments = feature?.properties?.segments || [];
        steps = segments?.[0]?.steps || [];
        console.log("Route computed using ORS");
      } catch (err) {
        console.warn("ORS route failed, falling back to OSRM:", err.message);
      }
    }

   //fallback to OSRM
    if (!feature) {
      try {
        const osrmRes = await axios.get(
          `https://router.project-osrm.org/route/v1/driving/${originCoords[0]},${originCoords[1]};${destCoords[0]},${destCoords[1]}?overview=full&geometries=geojson`
        );

        if (osrmRes.data.routes && osrmRes.data.routes.length > 0) {
          const osrmRoute = osrmRes.data.routes[0];
          feature = {
            type: "Feature",
            geometry: osrmRoute.geometry,
            properties: {
              summary: {
                distance: osrmRoute.distance,
                duration: osrmRoute.duration,
              },
            },
          };
          summary = feature.properties.summary;
          console.log("Route computed using OSRM fallback");
        }
      } catch (err) {
        console.warn("OSRM route failed:", err.message);
      }
    }

    
    if (!feature) {
      console.warn("Both ORS and OSRM failed — using direct line fallback.");
      feature = {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [originCoords, destCoords],
        },
        properties: {
          summary: { distance: 0, duration: 0 },
        },
      };
    }

    let pois = [];
    try {
      pois = await getNearbyPOIs({
        lat: destCoords[1],
        lon: destCoords[0],
        radius: 3000,
        kinds:
          "accommodations,restaurants,cultural,interesting_places,bus_stations,airports",
      });
    } catch (err) {
      console.warn("Failed to load POIs:", err.message);
    }

    res.json({
      success: true,
      route: {
        distance_meters: summary.distance || 0,
        duration_seconds: summary.duration || 0,
        geometry: feature.geometry,
        steps,
      },
      pois,
      summary,
    });
  } catch (err) {
    console.error("computeRoute error:", err);
    res.status(500).json({
      success: false,
      message: "Error computing route",
      error: err.message,
    });
  }
};

export const computeAndSaveRouteForTrip = async (req, res) => {
  try {
    const tripId = req.params.id;
    const { origin, profile = "driving-car" } = req.body;

    const trip = await Trip.findById(tripId);
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    let destCoords;
    if (trip.destinationCoords?.lat && trip.destinationCoords?.lng) {
      destCoords = [trip.destinationCoords.lng, trip.destinationCoords.lat];
    } else {
      const destDoc = await Destination.findOne({
        name: new RegExp(`^${trip.destination}$`, "i"),
      });
      if (!destDoc || !destDoc.coordinates?.lat)
        return res
          .status(400)
          .json({ message: "Destination missing coordinates" });
      destCoords = [destDoc.coordinates.lng, destDoc.coordinates.lat];
    }

    if (!origin?.lat || !origin?.lng) {
      return res.status(400).json({ message: "Origin coordinates required" });
    }

    const routeGeo = await getRouteGeoJSON({
      start: [origin.lng, origin.lat],
      end: destCoords,
      profile,
    });

    const feature = routeGeo?.features?.[0];
    const summary = feature?.properties?.summary || {};
    const segments = feature?.properties?.segments || [];
    const steps = segments?.[0]?.steps || [];

    trip.routeSummary = {
      distance_meters: summary.distance || 0,
      duration_seconds: summary.duration || 0,
      geometry: feature?.geometry || {},
      steps,
      createdAt: new Date(),
    };

    trip.originCoords = origin;
    trip.destinationCoords = { lat: destCoords[1], lng: destCoords[0] };

    await trip.save();

    res.json({
      success: true,
      message: "Route successfully computed and saved to trip",
      routeSummary: trip.routeSummary,
    });
  } catch (err) {
    console.error("computeAndSaveRouteForTrip error:", err);
    res.status(500).json({
      success: false,
      message: "Error saving route",
      error: err.message,
    });
  }
};
