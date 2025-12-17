import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/api";
import { BASE_URL } from "../utils/config";
import {
  FaMapMarkedAlt,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaSignOutAlt,
  FaUserEdit,
} from "react-icons/fa";
import ProfileUpdateModal from "../pages/ProfileUpdateModal";

const UserDashboard = () => {
  const { user, setUser, logout } = useContext(AuthContext);
  const [profile, setProfile] = useState({});
  const [trips, setTrips] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, tripsRes] = await Promise.all([
          api.get("/users/profile"),
          api.get("/trips/my-trips"),
        ]);
        setProfile(profileRes.data.user || {});
        setTrips(tripsRes.data.trips || tripsRes.data || []);
      } catch (err) {
        console.error("Error loading user dashboard:", err);
      }
    };
    fetchData();
  }, []);

  const handleProfileUpdate = (updatedUser) => {
    setProfile(updatedUser);
    setUser(updatedUser);
  };

  const totalTrips = trips.length;
  const upcomingTrips = trips.filter((t) => new Date(t.tripDate) > new Date()).length;
  const totalSpent = trips.reduce((sum, t) => sum + (t.budget || 0), 0);

  const profileImageSrc = profile?.profileImage
    ? profile.profileImage.startsWith("http")
      ? profile.profileImage
      : `${BASE_URL}/${profile.profileImage.replace(/^\/+/, "")}`
    : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
    {/* https://www.cgg.gov.in/wp-content/uploads/2017/10/dummy-profile-pic-male1-300x300.jpg */}

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-teal-50 pt-24 pb-20 px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row items-center justify-between mb-10 max-w-6xl mx-auto"
      >
        <div className="flex items-center gap-4">
          <img
            src={profileImageSrc}
            alt="User Avatar"
            className="w-20 h-20 rounded-full object-cover border-4 border-orange-300 shadow-md"
          />

          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Hi, {profile.fullname?.firstname || user?.fullname?.firstname || "Traveler"} 👋
            </h1>
            <p className="text-gray-600">{profile.email || user?.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-4 md:mt-0">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-linear-to-r from-orange-500 to-teal-500 text-white px-5 py-2 rounded-full shadow hover:scale-105 transition"
          >
            <FaUserEdit /> Edit Profile
          </button>

          <button
            onClick={logout}
            className="flex items-center gap-2 bg-linear-to-r from-red-500 to-orange-500 text-white px-5 py-2 rounded-full shadow hover:scale-105 transition"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 max-w-6xl mx-auto">
        {[
          {
            title: "Total Trips",
            value: totalTrips,
            icon: <FaMapMarkedAlt />,
            color: "from-teal-400 to-cyan-400",
          },
          {
            title: "Upcoming Trips",
            value: upcomingTrips,
            icon: <FaCalendarAlt />,
            color: "from-purple-400 to-pink-400",
          },
          {
            title: "Total Spent",
            value: `₹${totalSpent}`,
            icon: <FaMoneyBillWave />,
            color: "from-green-400 to-emerald-400",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-6 bg-linear-to-br ${item.color} text-white rounded-3xl shadow-xl flex flex-col items-center justify-center hover:scale-105 transition-transform`}
          >
            <div className="text-4xl mb-2">{item.icon}</div>
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-2xl font-bold mt-1">{item.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Trip Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-6 overflow-x-auto border border-gray-100 max-w-6xl mx-auto"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6"> My Planned Trips</h2>

        {trips.length === 0 ? (
          <p className="text-center text-gray-500 py-10 text-lg">
            You haven’t planned any trips yet.
          </p>
        ) : (
          <table className="w-full text-left border-collapse text-gray-700">
            <thead>
              <tr className="bg-orange-100">
                <th className="p-3">Destination</th>
                <th className="p-3">Days</th>
                <th className="p-3">Travellers</th>
                <th className="p-3">Budget</th>
                <th className="p-3">Transport</th>
                <th className="p-3">Trip Date</th>
              </tr>
            </thead>
            <tbody>
              {trips.map((trip) => (
                <tr key={trip._id} className="border-b hover:bg-orange-50">
                  <td className="p-3 font-semibold text-gray-800">{trip.destination}</td>
                  <td className="p-3">{trip.days}</td>
                  <td className="p-3">{trip.travellers}</td>
                  <td className="p-3">₹{trip.budget || "—"}</td>
                  <td className="p-3 capitalize">{trip.transport}</td>
                  <td className="p-3">
                    {trip.tripDate ? new Date(trip.tripDate).toLocaleDateString() : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </motion.div>

      <ProfileUpdateModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        profile={profile}
        role="user"
        onUpdate={handleProfileUpdate}
      />
    </div>
  );
};

export default UserDashboard;
