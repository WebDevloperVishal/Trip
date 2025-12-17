import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import api from "../utils/api";

import fortsImg from "../assets/destinations/forts.png";
import beachesImg from "../assets/destinations/beaches.jpg";
import waterfallsImg from "../assets/destinations/waterfalls.jpg";
import templesImg from "../assets/destinations/temples.jpg";
import lakesImg from "../assets/destinations/lakes.jpg";
import gemsImg from "../assets/destinations/hiddengems.jpg";

const categories = [
  { title: "Historic Forts", count: "15+", image: fortsImg, tag: "fort" },
  { title: "Serene Beaches", count: "10+", image: beachesImg, tag: "beach" },
  { title: "Majestic Waterfalls", count: "10+", image: waterfallsImg, tag: "waterfall" },
  { title: "Sacred Temples", count: "10+", image: templesImg, tag: "temple" },
  { title: "Beautiful Lakes", count: "5+", image: lakesImg, tag: "lake" },
  { title: "Hidden Gems", count: "20+", image: gemsImg, tag: "gem" },
];

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const navigate = useNavigate();

 
  const getImageUrl = (imgName) => {
    try {
      return new URL(`../assets/destinations/${imgName}`, import.meta.url).href;
    } catch {
      return "https://via.placeholder.com/400x250";
    }
  };

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await api.get("/destinations");
        setDestinations(res.data.destinations || []);
      } catch (err) {
        console.error("Error fetching destinations:", err);
      }
    };
    fetchDestinations();
  }, []);

  const filterByCategory = (tag) => {
    setActiveCategory(tag);
    const filteredList = destinations.filter((d) =>
      d.category?.toLowerCase().includes(tag)
    );
    setFiltered(filteredList);
  };

  const resetCategories = () => {
    setActiveCategory(null);
    setFiltered([]);
  };

  return (
    <section
      id="destinations"
      className="min-h-screen bg-linear-to-b from-white to-gray-50 py-16 px-6 md:px-12 scroll-mt-20 border-t-4 border-orange-300"
    >      
      <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-3">
        Explore by Category
      </h1>
      <p className="text-center text-gray-500 mb-10">
        Choose from our curated collection of Maharashtra’s finest destinations
      </p>



      {!activeCategory && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((cat, i) => (
            <div
              key={i}
              onClick={() => filterByCategory(cat.tag)}
              className="relative rounded-2xl overflow-hidden cursor-pointer group shadow-lg hover:shadow-2xl transition-all transform hover:scale-[1.02]"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <span className="bg-white/30 text-xs px-2 py-1 rounded-full mb-1 inline-block backdrop-blur-md">
                  {cat.count} destinations
                </span>
                <h3 className="text-xl font-bold drop-shadow-md">{cat.title}</h3>
                <p className="mt-1 text-sm text-orange-400 font-semibold">
                  Explore →
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* When Category Selected */}
      {activeCategory && (
        <div>
         
          <div className="flex flex-col items-center mb-10">
            <button
              onClick={resetCategories}
              className="self-start sm:self-center text-orange-500 hover:text-orange-600 font-bold flex items-center gap-2 transition text-2xl mb-4 sm:mb-2"
            >
              ⬅ Back to Categories
            </button>

            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 capitalize text-center">
              {activeCategory} Destinations
            </h2>
          </div>

          {/* Destination Cards */}
          {filtered.length === 0 ? (
            <p className="text-gray-500 italic text-center mt-10">
              No destinations found for this category.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((dest) => (
                <div
                  key={dest._id}
                  className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-transform hover:scale-[1.01]"
                >
                  <div className="relative">
        
                    <img
                      src={
                        dest.image && !dest.image.startsWith("http")
                          ? getImageUrl(dest.image)
                          : dest.image ||
                            (dest.category?.toLowerCase().includes("fort")
                              ? fortsImg
                              : dest.category?.toLowerCase().includes("beach")
                              ? beachesImg
                              : dest.category?.toLowerCase().includes("waterfall")
                              ? waterfallsImg
                              : dest.category?.toLowerCase().includes("temple")
                              ? templesImg
                              : dest.category?.toLowerCase().includes("lake")
                              ? lakesImg
                              : gemsImg)
                      }
                      alt={dest.name}
                      className="w-full h-48 object-cover"
                    />
                    <span className="absolute top-3 right-3 bg-orange-100 text-orange-600 text-xs px-3 py-1 rounded-full capitalize shadow-sm">
                      {dest.category || "General"}
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-800">
                      {dest.name}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                      <FaMapMarkerAlt /> {dest.location || "Maharashtra"}
                    </p>

                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                     {
                        "A beautiful destination worth exploring in Maharashtra."}
                    </p>

                    

                    <div className="mt-5">
                      <button
                        onClick={() => {
                          console.log("Navigating to destination:", dest._id);
                          navigate(`/destinations/${dest._id}`);
                        }}
                        className="w-full bg-orange-500 text-white font-semibold py-2 rounded-lg hover:bg-orange-600 transition"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default Destinations;
