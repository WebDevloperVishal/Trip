import React, { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaUpload, FaSave } from "react-icons/fa";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const ProfileUpdateModal = ({
  isOpen,
  onClose,
  profile,
  role = "user",
  onUpdate,
}) => {
  const { refreshUser, refreshCaptain } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    firstname: profile?.fullname?.firstname || "",
    lastname: profile?.fullname?.lastname || "",
    email: profile?.email || "",
    bio: profile?.bio || "",
    profileImage: profile?.profileImage || "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) =>
        setFormData((prev) => ({ ...prev, profileImage: event.target.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = new FormData();
      form.append("fullname.firstname", formData.firstname);
      form.append("fullname.lastname", formData.lastname);
      form.append("email", formData.email);
      form.append("bio", formData.bio);
      if (imageFile) form.append("profileImage", imageFile);

      const endpoint =
        role === "captain"
          ? "/captains/update-profile"
          : "/users/update-profile";

      const token =
  localStorage.getItem("captainToken") ||
  localStorage.getItem("userToken");

const res = await api.put(endpoint, form, {
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  },
});


      if (res.data.success || res.data.user || res.data.captain) {
        const updated = res.data.user || res.data.captain;
        onUpdate?.(updated);

        if (role === "captain") await refreshCaptain();
        else await refreshUser();

        toast.success("Profile updated successfully!");
        onClose();
      }
    } catch (err) {
      console.error("Profile update error:", err);
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6 relative"
          >

            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
            >
              <FaTimes size={20} />
            </button>

            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Edit {role === "captain" ? "Captain" : "User"} Profile
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
          
              <div className="flex flex-col items-center gap-3">
                <label htmlFor="profileImage" className="cursor-pointer group">
                  <div className="relative w-28 h-28 rounded-full border-4 border-orange-400 overflow-hidden shadow-lg hover:scale-105 transition-transform">
                    <img
                      src={
                        formData.profileImage ||
                        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                      }
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                      <FaUpload className="text-white text-xl" />
                    </div>
                  </div>
                </label>
                <input
                  id="profileImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  name="firstname"
                  placeholder="First Name"
                  value={formData.firstname}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-400"
                />
                <input
                  type="text"
                  name="lastname"
                  placeholder="Last Name"
                  value={formData.lastname}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-400"
                />
              </div>

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-400"
              />

              <textarea
                name="bio"
                placeholder="Write something about yourself..."
                value={formData.bio}
                onChange={handleChange}
                rows="3"
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-400"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-linear-to-r from-orange-500 to-teal-500 text-white font-semibold py-3 rounded-lg shadow-md hover:scale-105 transition-transform flex justify-center items-center gap-2"
              >
                <FaSave />
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProfileUpdateModal;
