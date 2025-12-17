import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";

const TripDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const res = await api.get(`/destinations/${id}`);
        setDestination(res.data);
      } catch (err) {
        console.error("Error fetching destination:", err);
      }
    };
    if (id) fetchDestination();
  }, [id]);

  if (!destination)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600 text-lg">
        Loading destination details...
      </div>
    );

  
  const getImageUrl = (imgName) => {
    try {
      return new URL(`../assets/destinations/${imgName}`, import.meta.url).href;
    } catch {
      return destination.image || "https://source.unsplash.com/1600x900/?travel";
    }
  };

  const imageUrl = getImageUrl(
    destination.image ||
      `${destination.name.replace(/\s+/g, "").toLowerCase()}.jpg`
  );

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-gray-50">
      
      {/* Hero Section */}
      <div className="relative h-[75vh] bg-gray-200 overflow-hidden flex flex-col items-center justify-center text-center">
        <img
          src={imageUrl}
          alt={destination.name}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/40 to-transparent"></div>

        <div className="relative z-10 px-6 flex flex-col items-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-2xl">
            {destination.name}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mt-2">
            {destination.location}
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-5 text-gray-800 border-b-4 border-orange-400 inline-block pb-1">
            About
          </h2>

          <article
            className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: destination.description
                .replace(/\*\*(.*?)\*\*/g, "<strong class='text-orange-600'>$1</strong>")
                .replace(/\n/g, "<br />")
                .replace(
                  /<strong class='text-orange-600'>(.*?)<\/strong>/g,
                  "<br><br><strong class='text-orange-600 text-xl'>$1</strong><br>"
                ),
            }}
          />
        </section>

        {/* Back Button */}
        <div className="flex justify-center mt-12 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="bg-linear-to-r from-orange-500 to-teal-500 text-white font-semibold px-8 py-3 rounded-full shadow-md hover:scale-105 transition-transform duration-200"
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripDetails;
