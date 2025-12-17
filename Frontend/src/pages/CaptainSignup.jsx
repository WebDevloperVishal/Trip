// import React, { useState, useContext } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import api from "../utils/api";
// import AuthCard from "../components/AuthCard";
// import { AuthContext } from "../context/AuthContext";

// const CaptainSignup = () => {
//   const navigate = useNavigate();
//   const { login } = useContext(AuthContext);
//   const [form, setForm] = useState({
//     firstname: "",
//     lastname: "",
//     email: "",
//     password: "",
//     accessKey: "",
//   });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await api.post("/captains/register", {
//         fullname: { firstname: form.firstname, lastname: form.lastname },
//         email: form.email,
//         password: form.password,
//         accessKey: form.accessKey,
//       });

//       const { token } = res.data;
//       if (!token) throw new Error("Signup failed");

//       localStorage.setItem("captainToken", token);
//       await login({ email: form.email, password: form.password }, "captain");
//       navigate("/");
//     } catch (err) {
//       alert(err.response?.data?.message || "Signup failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#003366] via-[#006666] to-[#00b4d8] text-white">
//       <AuthCard title="Captain Signup " subtitle="Register as an authorized Captain">
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="flex gap-2">
//             <input
//               type="text"
//               name="firstname"
//               placeholder="First Name"
//               value={form.firstname}
//               onChange={handleChange}
//               className="w-1/2 p-3 rounded-md bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-cyan-400"
//             />
//             <input
//               type="text"
//               name="lastname"
//               placeholder="Last Name"
//               value={form.lastname}
//               onChange={handleChange}
//               className="w-1/2 p-3 rounded-md bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-cyan-400"
//             />
//           </div>

//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={handleChange}
//             className="w-full p-3 rounded-md bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-cyan-400"
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//             className="w-full p-3 rounded-md bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-cyan-400"
//           />

//           <input
//             type="text"
//             name="accessKey"
//             placeholder="Access Key"
//             value={form.accessKey}
//             onChange={handleChange}
//             className="w-full p-3 rounded-md bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-cyan-400"
//           />

//           <motion.button
//             whileTap={{ scale: 0.95 }}
//             className="w-full py-3 bg-linear-to-r from-teal-400 to-cyan-500 rounded-lg text-white font-semibold shadow-lg hover:shadow-cyan-400/40 transition-all"
//             disabled={loading}
//           >
//             {loading ? "Creating account..." : "Sign Up"}
//           </motion.button>
//         </form>

//         <p className="text-center mt-4 text-white/80">
//           Already a Captain?{" "}
//           <Link to="/captain/login" className="text-cyan-300 hover:underline font-medium">
//             Login here
//           </Link>
//         </p>
//       </AuthCard>
//     </div>
//   );
// };

// export default CaptainSignup;
