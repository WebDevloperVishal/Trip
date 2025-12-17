import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../utils/api";
import AuthCard from "../components/AuthCard";
import { AuthContext } from "../context/AuthContext";

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/users/register", {
        fullname: { firstname: form.firstname, lastname: form.lastname },
        email: form.email,
        password: form.password,
      });

      const { token } = res.data;
      if (!token) throw new Error("Signup failed");

      localStorage.setItem("authToken", token);
      await login({ email: form.email, password: form.password }, "user");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#3a0ca3] via-[#7209b7] to-[#f72585] text-white">
      <AuthCard title="Create Account" subtitle="Start your adventure with VitalTrip">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              value={form.firstname}
              onChange={handleChange}
              className="w-1/2 p-3 rounded-md bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-pink-400"
            />
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              value={form.lastname}
              onChange={handleChange}
              className="w-1/2 p-3 rounded-md bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-pink-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-pink-400"
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 bg-linear-to-r from-purple-500 to-pink-500 rounded-lg text-white font-semibold shadow-lg hover:shadow-pink-500/40 transition-all"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </motion.button>
        </form>
        <p className="text-center mt-4 text-white/80">
          Already have an account?{" "}
          <Link to="/login" className="text-pink-300 hover:underline font-medium">
            Login
          </Link>
        </p>
      </AuthCard>
    </div>
  );
};

export default Signup;
