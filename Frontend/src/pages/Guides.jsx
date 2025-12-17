import React from "react";
import { FaPhoneAlt, FaMapMarkerAlt, FaUserTie, FaWhatsapp } from "react-icons/fa";
import omkarimage from "../assets/omkarImage.jpg";
import dineshimage from "../assets/dineshImage.jpg";

const guides = [
  {
    id: 1,
    name: "Omkar Gupta",
    image: omkarimage,
    contact: "+919876543210",
    whatsapp: "919876543210",
    location: "Mumbai, Maharashtra",
    about:
      "Omkar is a passionate local guide with 5+ years of experience in Mumbai’s heritage and coastal tours. Known for his storytelling, he brings the city’s history and hidden gems to life for every traveler.",
  },
  {
    id: 2,
    name: "Dinesh Bishokarma",
    image: dineshimage,
    contact: "+919123456789",
    whatsapp: "919123456789",
    location: "Pune, Maharashtra",
    about:
      "Dinesh specializes in cultural and nature-based tours around Pune and Lonavala. His deep local insights and friendly approach make every journey authentic and memorable.",
  },
];

const Guides = () => {
  return (
    <section className="min-h-screen bg-linear-to-b from-white via-orange-50 to-white py-20 px-6 md:px-12 border-t-4 border-green-400">
      {/* Header */}
      <div className="text-center mb-7">
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-800 mb-3">
          Meet Our Expert Guides
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover Maharashtra with our trusted local experts passionate storytellers
          who make every destination come alive.
        </p>
      </div>

      {/* Guide Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {guides.map((guide) => (
          <div
            key={guide.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 hover:border-orange-400 p-8 flex flex-col items-center text-center"
          >
            <img
              src={guide.image}
              alt={guide.name}
              className="w-36 h-36 rounded-full object-cover border-4 border-orange-200 mb-5"
            />
            <h3 className="text-2xl font-bold text-gray-800 mb-1">
              {guide.name}
            </h3>
            <p className="text-orange-500 font-semibold flex items-center justify-center gap-2 mb-2">
              <FaUserTie /> Professional Tour Guide
            </p>
            <p className="flex items-center justify-center text-gray-700 gap-2 mb-1">
              <FaMapMarkerAlt className="text-orange-400" /> {guide.location}
            </p>
            <p className="text-gray-600 text-sm leading-relaxed max-w-md mx-auto mb-4">
              {guide.about}
            </p>

            {/* Contact Buttons */}
            <div className="flex gap-3 mt-3">
              <a
                href={`tel:${guide.contact}`}
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold transition"
              >
                <FaPhoneAlt /> Call
              </a>
              <a
                href={`https://wa.me/${guide.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition"
              >
                <FaWhatsapp /> WhatsApp
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Guides;
