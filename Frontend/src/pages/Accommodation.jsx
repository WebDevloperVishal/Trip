import React, { useState } from "react";
import { FaHotel, FaUmbrellaBeach, FaHome } from "react-icons/fa";

const Accommodation = () => {
  const [destination, setDestination] = useState("");
  const [stayType, setStayType] = useState("hotel");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!destination.trim()) return;
    const encoded = encodeURIComponent(destination);
    window.open(
      `https://www.google.com/maps/search/${stayType}+in+${encoded}/`,
      "_blank"
    );
    setDestination("");
  };

  const quickCities = ["Mumbai", "Pune", "Nashik", "Lonavala", "Mahabaleshwar"];

  return (
    <div className="min-h-screen bg-linear-to-br from-white via-orange-50 to-white flex flex-col items-center justify-center p-6">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">
          Find Accommodation
        </h1>

        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Enter destination (e.g., Lonavala)"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {[
              { id: "hotel", label: "Hotel", icon: <FaHotel /> },
              { id: "resort", label: "Resort", icon: <FaUmbrellaBeach /> },
              { id: "homestay", label: "Homestay", icon: <FaHome /> },
            ].map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => setStayType(type.id)}
                className={`px-3 py-2 flex items-center gap-2 rounded-lg font-semibold border ${
                  stayType === type.id
                    ? "bg-orange-500 text-white border-orange-500"
                    : "bg-orange-100 text-orange-600 border-orange-200 hover:bg-orange-200"
                }`}
              >
                {type.icon} {type.label}
              </button>
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold"
          >
            Search {stayType.charAt(0).toUpperCase() + stayType.slice(1)}s
          </button>
        </form>

        <div className="mt-5 text-center">
          <p className="text-gray-700 text-sm font-semibold mb-2">
            Popular Destinations:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {quickCities.map((city) => (
              <button
                key={city}
                onClick={() =>
                  window.open(
                    `https://www.google.com/maps/search/${stayType}+in+${city}/`,
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

export default Accommodation;
