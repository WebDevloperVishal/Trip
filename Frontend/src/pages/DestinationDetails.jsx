// // ✅ src/pages/DestinationDetails.jsx
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../utils/api";

// const DestinationDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [destination, setDestination] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchDestination = async () => {
//       try {
//         console.log("🧭 Fetching destination by ID:", id);
//         const res = await api.get(`/destinations/${id}`);
//         setDestination(res.data.destination);
//       } catch (err) {
//         console.error("❌ Error fetching destination:", err);
//         setError("Destination not found or server error.");
//       }
//     };
//     if (id) fetchDestination();
//   }, [id]);

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-screen text-red-500 font-semibold">
//         {error}
//       </div>
//     );
//   }

//   if (!destination)
//     return (
//       <div className="flex items-center justify-center min-h-screen text-gray-600">
//         Loading destination details...
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-white">
//       {/* ✅ Hero Section */}
//       <div
//         className="relative h-[60vh] bg-cover bg-center"
//         style={{ backgroundImage: `url(${destination.image})` }}
//       >
//         <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent"></div>
//         <button
//           onClick={() => navigate(-1)}
//           className="absolute top-6 left-6 bg-white/80 hover:bg-white text-gray-700 px-4 py-2 rounded-full shadow"
//         >
//           ← Back
//         </button>
//         <div className="absolute bottom-10 left-10 text-white">
//           <h1 className="text-4xl font-extrabold drop-shadow-md">
//             {destination.name}
//           </h1>
//           <p className="text-lg text-gray-200 mt-1">{destination.location}</p>
//         </div>
//       </div>

//       {/* ✅ Details Section */}
//       <div className="max-w-4xl mx-auto p-8">
//         <p className="text-gray-700 leading-relaxed mb-6">
//           {destination.description ||
//             "This destination is known for its scenic beauty, historical significance, and cultural charm."}
//         </p>

//         <div className="flex flex-wrap justify-between text-gray-800 mb-8">
//           <p>
//             <strong>Best Time to Visit:</strong>{" "}
//             {destination.bestTimeToVisit || "All year round"}
//           </p>
//           <p>
//             <strong>Average Budget:</strong>{" "}
//             {destination.budget || "₹500 - ₹1500"}
//           </p>
//         </div>

//         {/* ✅ Footer Buttons */}
//         <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
//           <button
//             onClick={() => navigate("/")}
//             className="bg-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-300 transition-all"
//           >
//             ← Back to Categories
//           </button>
//           <button
//             onClick={() =>
//               navigate("/booking", {
//                 state: { tripId: destination._id, amount: 1000 },
//               })
//             }
//             className="bg-gradient-to-r from-orange-500 to-teal-500 text-white font-semibold px-6 py-3 rounded-full shadow hover:scale-105 transition-transform"
//           >
//             Book This Trip
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DestinationDetails;
