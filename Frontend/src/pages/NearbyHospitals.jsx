import React, { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const NearbyHospitals = () => {
  const [destination, setDestination] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(false);

  const handleHospitalSearch = (e) => {
    e.preventDefault();
    if (!destination.trim()) return;
    const encoded = encodeURIComponent(destination);
    window.open(
      `https://www.google.com/maps/search/hospitals+near+${encoded}/`,
      "_blank"
    );
    setDestination("");
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported by your browser.");
      return;
    }
    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        window.open(
          `https://www.google.com/maps/search/hospitals+near+${latitude},${longitude}/`,
          "_blank"
        );
        setLoadingLocation(false);
      },
      () => {
        alert("Unable to fetch location.");
        setLoadingLocation(false);
      }
    );
  };

  const quickCities = ["Mumbai", "Pune", "Nashik", "Nagpur", "Lonavala", "Kolhapur"];

  return (
    <div className="min-h-screen bg-linear-to-br from-white via-orange-50 to-white flex flex-col items-center justify-center p-6">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">
          Find Nearby Hospitals
        </h1>

        <form onSubmit={handleHospitalSearch}>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Enter city or area"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold mb-3"
          >
            Search Hospitals
          </button>
        </form>

        <button
          onClick={handleUseCurrentLocation}
          disabled={loadingLocation}
          className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center justify-center gap-2"
        >
          <FaMapMarkerAlt />
          {loadingLocation ? "Fetching location..." : "Use My Current Location"}
        </button>

        <div className="mt-5 text-center">
          <p className="text-gray-700 text-sm font-semibold mb-2">
            Quick Destinations:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {quickCities.map((city) => (
              <button
                key={city}
                onClick={() =>
                  window.open(
                    `https://www.google.com/maps/search/hospitals+near+${city}/`,
                    "_blank"
                  )
                }
                className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold hover:bg-orange-200 transition"
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NearbyHospitals;
