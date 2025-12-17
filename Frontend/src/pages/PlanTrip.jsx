import React, { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import {
  FaRoute,
  FaSave,
  FaTimes,
  FaMapMarkerAlt,
  FaChevronDown,
} from "react-icons/fa";
import api from "../utils/api";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const PlanTrip = () => {
  const { user } = useContext(AuthContext);
  const { state } = useLocation();

  const [tripData, setTripData] = useState({
    destination: state?.name || "",
    startLocation: "",
    days: "",
    travellers: "",
    budget: "",
    transport: "",
    accommodation: "",
    preferences: "",
  });

  const [routeData, setRouteData] = useState(null);
  const [aiItinerary, setAiItinerary] = useState("");
  const [parsedItinerary, setParsedItinerary] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [openDay, setOpenDay] = useState(null);

  const handleChange = (e) => {
    setTripData({ ...tripData, [e.target.name]: e.target.value });
  };

  const formatItinerary = (text) => {
    const days = text
      .split(/(?=Day\s\d+)/i)
      .filter((d) => d.trim())
      .map((d) => d.trim());
    setParsedItinerary(days);
  };

  const handleAIGenerate = async (e) => {
    e.preventDefault();

    if (
      !tripData.startLocation ||
      !tripData.destination ||
      !tripData.days ||
      !tripData.travellers ||
      !tripData.budget ||
      !tripData.transport ||
      !tripData.accommodation
    ) {
      alert("Please filled allfields for accurate itinerary generation!");
      return;
    }

    try {
      setLoading(true);
      const prompt = `
        Generate a detailed ${
          tripData.days
        }-day itinerary for a trip in Maharashtra.
        Starting point: ${tripData.startLocation}.
        Destination: ${tripData.destination}.
        Number of travellers: ${tripData.travellers}.
        Budget: ₹${tripData.budget}.
        Transport mode: ${tripData.transport}.
        Accommodation type: ${tripData.accommodation}.
        Interests: ${tripData.preferences || "general sightseeing"}.
        Include:
        - Day-wise itinerary with activity names and timings.
        - Recommended attractions and restaurants.
        - Nearby hospitals, hotels, and police stations (with approx distance).
        - Route distance and travel time summary.
        Format output neatly, no symbols like * or +.
      `;

      const res = await api.post("/ai/itinerary", { prompt });
      const text = res.data.itinerary || "No itinerary generated.";
      setAiItinerary(text);
      formatItinerary(text);

      const getCoords = async (place) => {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            place
          )}`
        );
        const data = await res.json();
        if (!data.length) throw new Error(`Could not find location: ${place}`);
        return {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
        };
      };

      try {
        const startCoords = await getCoords(tripData.startLocation);
        const endCoords = await getCoords(tripData.destination);

        setRouteData({
          start: { ...startCoords, name: tripData.startLocation },
          end: { ...endCoords, name: tripData.destination },
          path: [
            [startCoords.lat, startCoords.lng],
            [endCoords.lat, endCoords.lng],
          ],
        });
      } catch (err) {
        console.error("Error getting map coordinates:", err);
      }
    } catch (err) {
      console.error("AI itinerary error:", err);
      alert("AI itinerary generation failed. Try again later!");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTrip = async () => {
    if (!user) {
      alert("Please log in or register first!");
      return;
    }

    const captainToken = localStorage.getItem("captainToken");
    if (captainToken) {
      alert("Admin don’t have permission to save trips.");
      return;
    }

    try {
      setSaving(true);

      const token =
        localStorage.getItem("userToken") || localStorage.getItem("authToken");

      if (!token) {
        alert("You must be logged in as a user to save a trip!");
        return;
      }

      await api.post(
        "/trips/create",
        { ...tripData, itinerary: aiItinerary },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Your trip has been saved successfully!");

      setTripData({
        destination: "",
        startLocation: "",
        days: "",
        travellers: "",
        budget: "",
        transport: "",
        accommodation: "",
        preferences: "",
      });
      setAiItinerary("");
      setParsedItinerary([]);
      setRouteData(null);
    } catch (err) {
      console.error("Error saving trip:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleCancelTrip = () => {
    setTripData({
      destination: "",
      startLocation: "",
      days: "",
      travellers: "",
      budget: "",
      transport: "",
      accommodation: "",
      preferences: "",
    });
    setAiItinerary("");
    setParsedItinerary([]);
    setRouteData(null);
    alert("Trip plan reset successfully.");
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-orange-50 pt-32 pb-20 px-4 sm:px-6 lg:px-10">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-3xl p-6 sm:p-8 border border-gray-200">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 mb-3">
          Plan Your Trip
        </h1>
        <p className="text-center text-gray-500 mb-10 text-sm sm:text-base">
          Fill in your travel details and let AI design your perfect itinerary.
        </p>

        <div className="flex flex-col lg:flex-row gap-10 relative">
          {/* Form Section */}
          <form
            onSubmit={handleAIGenerate}
            className="flex-1 space-y-5 lg:pr-6 order-2 lg:order-1"
          >
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                Starting Point
              </label>
              <input
                type="text"
                name="startLocation"
                placeholder="e.g., Thane, Mumbai"
                value={tripData.startLocation}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-400 text-sm sm:text-base"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                Destination
              </label>
              <input
                type="text"
                name="destination"
                placeholder="e.g., Lonavla"
                value={tripData.destination}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-400 text-sm sm:text-base"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/2">
                <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                  Days
                </label>
                <input
                  type="number"
                  name="days"
                  placeholder="Days"
                  value={tripData.days}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-400 text-sm sm:text-base"
                />
              </div>
              <div className="w-full sm:w-1/2">
                <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                  Travellers
                </label>
                <input
                  type="number"
                  name="travellers"
                  placeholder="Travellers"
                  value={tripData.travellers}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-400 text-sm sm:text-base"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                Budget (₹)
              </label>
              <input
                type="number"
                name="budget"
                placeholder="Enter total budget"
                value={tripData.budget}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-400 text-sm sm:text-base"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/2">
                <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                  Transport
                </label>
                <select
                  name="transport"
                  value={tripData.transport}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-400 text-sm sm:text-base"
                >
                  <option value="">Select</option>
                  <option value="car">Car</option>
                  <option value="bus">Bus</option>
                  <option value="train">Train</option>
                </select>
              </div>
              <div className="w-full sm:w-1/2">
                <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                  Accommodation
                </label>
                <select
                  name="accommodation"
                  value={tripData.accommodation}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-400 text-sm sm:text-base"
                >
                  <option value="">Select</option>
                  <option value="hotel">Hotel</option>
                  <option value="resort">Resort</option>
                  <option value="homestay">Homestay</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                Travel Preferences
              </label>
              <textarea
                name="preferences"
                placeholder="e.g., nature, trekking, local food"
                value={tripData.preferences}
                onChange={handleChange}
                rows="2"
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-400 text-sm sm:text-base"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-linear-to-r from-orange-500 to-teal-500 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:scale-105 transition-transform text-sm sm:text-base"
            >
              {loading ? "Generating Itinerary..." : "Create Trip Plan"}
            </button>
          </form>

          {/* Map Section */}
          <div className="w-full lg:w-[50%] h-[350px] sm:h-[450px] lg:h-[630px] mt-4 lg:mt-6 rounded-2xl border border-gray-300 shadow-xl overflow-hidden bg-white z-10 order-1 lg:order-2">
            {routeData ? (
              <MapContainer
                center={[routeData.start.lat, routeData.start.lng]}
                zoom={8}
                scrollWheelZoom={false}
                className="h-full w-full rounded-2xl"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />
                <Marker position={[routeData.start.lat, routeData.start.lng]}>
                  <Popup>Start: {routeData.start.name}</Popup>
                </Marker>
                <Marker position={[routeData.end.lat, routeData.end.lng]}>
                  <Popup>Destination: {routeData.end.name}</Popup>
                </Marker>
                <Polyline
                  positions={routeData.path}
                  color="orange"
                  weight={4}
                />
                <MapViewFitBounds path={routeData.path} />
              </MapContainer>
            ) : (
              <div className="flex flex-col justify-center items-center h-full bg-gray-50 text-gray-500">
                <FaRoute size={42} className="mb-3 text-orange-400" />
                <p className="text-center text-gray-600 text-sm md:text-base px-4">
                  Route will appear here after planning your trip!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* AI Itinerary */}
        {parsedItinerary.length > 0 && (
          <div className="mt-12 bg-orange-50 border border-orange-200 rounded-2xl p-6 shadow-inner">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaMapMarkerAlt className="text-orange-500" /> Your AI-Generated
              Itinerary
            </h2>

            <div className="space-y-4">
              {parsedItinerary.map((day, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl shadow p-5 border border-gray-200 cursor-pointer transition-all hover:shadow-lg"
                  onClick={() => setOpenDay(openDay === i ? null : i)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                      {day.split("\n")[0]}
                    </h3>
                    <FaChevronDown
                      className={`transition-transform ${
                        openDay === i ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  {openDay === i && (
                   
                    <p
                      className="mt-3 text-gray-700 whitespace-pre-wrap text-sm leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: day
                          .replace(day.split("\n")[0], "")
                          .trim()
                          // Convert **bold** markdown to real <strong> HTML tags
                          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                          // Convert newlines into <br> for proper spacing
                          .replace(/\n/g, "<br>"),
                      }}
                    ></p>
                  )}
                </div>
              ))}
            </div>

            {/* Save & Cancel */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <button
                onClick={handleSaveTrip}
                disabled={saving}
                className="bg-green-500 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-green-600 transition-all flex items-center gap-2 text-sm sm:text-base"
              >
                <FaSave /> {saving ? "Saving..." : "Save Trip"}
              </button>
              <button
                onClick={handleCancelTrip}
                className="bg-red-500 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-red-600 transition-all flex items-center gap-2 text-sm sm:text-base"
              >
                <FaTimes /> Cancel Trip
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const MapViewFitBounds = ({ path }) => {
  const map = useMap();
  useEffect(() => {
    if (path && path.length > 0) {
      const bounds = L.latLngBounds(path);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, path]);
  return null;
};

export default PlanTrip;
