// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../utils/api";

// const UserResetPassword = () => {
//   const { token } = useParams();
//   const navigate = useNavigate();
//   const [password, setPassword] = useState("");
//   const [confirm, setConfirm] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleReset = async (e) => {
//     e.preventDefault();
//     if (password !== confirm) return setMessage("Passwords do not match");

//     setLoading(true);
//     try {
//       const res = await api.post(`/users/reset-password/${token}`, { password });
//       setMessage(res.data.message || "Password reset successful");

//       setTimeout(() => navigate("/"), 2000);
//     } catch (err) {
//       setMessage(err.response?.data?.message || "Error resetting password");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-purple-600 to-pink-500">
//       <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md text-center">
//         <h2 className="text-2xl font-bold mb-2 text-gray-800">Reset Password</h2>
//         <p className="text-gray-600 mb-6">
//           Enter your new password to continue your VitalTrip journey
//         </p>
//         <form onSubmit={handleReset} className="space-y-4">
//           <input
//             type="password"
//             placeholder="New Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
//           />
//           <input
//             type="password"
//             placeholder="Confirm New Password"
//             value={confirm}
//             onChange={(e) => setConfirm(e.target.value)}
//             className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
//           />
//           {message && (
//             <p
//               className={`text-sm ${
//                 message.includes("Success") ? "text-green-600" : "text-red-500"
//               }`}
//             >
//               {message}
//             </p>
//           )}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-all"
//           >
//             {loading ? "Resetting..." : "Reset Password"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UserResetPassword;

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../utils/api";

const UserResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    if (password !== confirm) return setMessage("Passwords do not match");

    setLoading(true);
    try {
      const res = await api.post(`/users/reset-password/${token}`, { password });
      setMessage(res.data.message || "Password reset successful");

      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error resetting password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-purple-600 to-pink-500">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">Reset Password</h2>
        <p className="text-gray-600 mb-6">
          Enter your new password to continue your VitalTrip journey
        </p>
        <form onSubmit={handleReset} className="space-y-4">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm New Password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-3 text-gray-500"
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {message && (
            <p
              className={`text-sm ${
                message.includes("Success") ? "text-green-600" : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-all"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserResetPassword;
