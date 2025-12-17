// import React, { useState, useContext } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import api from "../utils/api";
// import AuthCard from "../components/AuthCard";
// import { AuthContext } from "../context/AuthContext";

// const Login = () => {
//   const navigate = useNavigate();
//   const { login } = useContext(AuthContext);
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await api.post("/users/login", form);
//       const { token, user } = res.data;
//       if (!token) throw new Error("No token received");

      
//       localStorage.setItem("authToken", token);

      
//       await login(user, "user");

    
//       navigate("/dashboard");
//     } catch (err) {
//       alert(err.response?.data?.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white">
//       <AuthCard title="Welcome Back 👋" subtitle="Login to continue your journey">
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={handleChange}
//             className="w-full p-3 rounded-md bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-pink-400"
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//             className="w-full p-3 rounded-md bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-pink-400"
//           />
//           <motion.button
//             whileTap={{ scale: 0.95 }}
//             className="w-full py-3 bg-linear-to-r from-pink-500 to-purple-500 rounded-lg text-white font-semibold shadow-lg hover:shadow-pink-500/40 transition-all"
//             disabled={loading}
//           >
//             {loading ? "Logging in..." : "Login"}
//           </motion.button>
//         </form>

//         <p className="text-center mt-4 text-white/80">
//           Don’t have an account?{" "}
//           <Link
//             to="/signup"
//             className="text-pink-400 hover:underline font-medium"
//           >
//             Sign up
//           </Link>
//         </p>
//       </AuthCard>
//     </div>
//   );
// };

// export default Login;

import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../utils/api";
import AuthCard from "../components/AuthCard";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (forgotMode) {
        // 🔁 Forgot password mode
        const res = await api.post("/users/forgot-password", {
          email: form.email,
        });
        alert(res.data.message || "Reset link sent to your email");
        setForgotMode(false);
      } else {
        // 🔐 Login mode
        const res = await api.post("/users/login", form);
        const { token, user } = res.data;
        if (!token) throw new Error("No token received");

        localStorage.setItem("authToken", token);
        await login(user, "user");
        navigate("/dashboard");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white">
      <AuthCard
        title={forgotMode ? "Forgot Password 🔑" : "Welcome Back 👋"}
        subtitle={
          forgotMode
            ? "Enter your registered email to reset your password"
            : "Login to continue your journey"
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-md bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-pink-400"
          />

          {!forgotMode && (
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-pink-400"
            />
          )}

          {/* Forgot Password Link */}
          {!forgotMode && (
            <div className="text-right">
              <button
                type="button"
                onClick={() => setForgotMode(true)}
                className="text-sm text-pink-300 hover:text-pink-400 underline"
              >
                Forgot Password?
              </button>
            </div>
          )}

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 bg-linear-to-r from-pink-500 to-purple-500 rounded-lg text-white font-semibold shadow-lg hover:shadow-pink-500/40 transition-all"
            disabled={loading}
          >
            {loading
              ? forgotMode
                ? "Sending..."
                : "Logging in..."
              : forgotMode
              ? "Send Reset Link"
              : "Login"}
          </motion.button>
        </form>

        {!forgotMode && (
          <p className="text-center mt-4 text-white/80">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-pink-400 hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>
        )}

        {forgotMode && (
          <div className="text-center mt-4">
            <button
              onClick={() => setForgotMode(false)}
              className="text-pink-400 hover:underline text-sm"
            >
              ← Back to Login
            </button>
          </div>
        )}
      </AuthCard>
    </div>
  );
};

export default Login;
