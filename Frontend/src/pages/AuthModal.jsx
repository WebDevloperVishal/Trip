// import React, { useState, useEffect, useContext } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import api from "../utils/api";
// import { AuthContext } from "../context/AuthContext";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// const AuthModal = ({ isOpen, onClose }) => {
//   const { login } = useContext(AuthContext);
//   const [isLogin, setIsLogin] = useState(true);
//   const [isCaptain, setIsCaptain] = useState(false);
//   const [isForgotPassword, setIsForgotPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [errors, setErrors] = useState({});
//   const [showPassword, setShowPassword] = useState(false);

//   const [form, setForm] = useState({
//     firstname: "",
//     lastname: "",
//     email: "",
//     password: "",
//     accessKey: "",
//   });

//   // last used
//   useEffect(() => {
//     const savedLoginMode = localStorage.getItem("auth_isLogin");
//     const savedRole = localStorage.getItem("auth_isCaptain");
//     if (savedLoginMode !== null) setIsLogin(savedLoginMode === "true");
//     if (savedRole !== null) setIsCaptain(savedRole === "true");
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("auth_isLogin", isLogin);
//     localStorage.setItem("auth_isCaptain", isCaptain);
//   }, [isLogin, isCaptain]);

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

  
//   const validate = () => {
//     const newErrors = {};
//     if (!isForgotPassword && !isLogin) {
//       if (!form.firstname.trim()) newErrors.firstname = "Please enter first name.";
//       if (!form.lastname.trim()) newErrors.lastname = "Please enter last name.";
//     }

//     if (!form.email.trim()) newErrors.email = "Please enter your email.";
//     else if (!/\S+@\S+\.\S+/.test(form.email))
//       newErrors.email = "Please enter a valid email address.";

//     if (!isForgotPassword) {
//       if (!form.password.trim()) newErrors.password = "Please enter your password.";
//       else if (form.password.length < 6)
//         newErrors.password = "Password must be at least 6 characters long.";
//     }

//     if (!isLogin && isCaptain && !form.accessKey.trim())
//       newErrors.accessKey = "Please enter your Captain Access Key.";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     if (!validate()) return;
//     setLoading(true);

//     try {

//       // Forgot Password 
//       if (isForgotPassword) {
//         const endpoint = isCaptain
//           ? "/captains/forgot-password"
//           : "/users/forgot-password";

//         try {
//           const res = await api.post(endpoint, { email: form.email });
//           setMessage(res.data.message || "Password reset link sent to your email!");
//         } catch (err) {
//           setMessage(err.response?.data?.message || "Failed to send reset link");
//         } finally {
//           setLoading(false);
//         }
//         return;
//       }

//       // Login or Signup
//       const endpoint = isCaptain
//         ? isLogin
//           ? "/captains/login"
//           : "/captains/register"
//         : isLogin
//         ? "/users/login"
//         : "/users/register";

//       const payload = isCaptain
//         ? isLogin
//           ? { email: form.email, password: form.password }
//           : {
//               fullname: { firstname: form.firstname, lastname: form.lastname },
//               email: form.email,
//               password: form.password,
//               accessKey: form.accessKey,
//             }
//         : isLogin
//         ? { email: form.email, password: form.password }
//         : {
//             fullname: { firstname: form.firstname, lastname: form.lastname },
//             email: form.email,
//             password: form.password,
//           };

//       const res = await api.post(endpoint, payload);
//       const { token, user, captain } = res.data;

//       if (!token) throw new Error("Authentication failed");

//       //it saved token in  storage
//       localStorage.setItem(isCaptain ? "captainToken" : "authToken", token);

//       // Call global login context
//       await login(
//         { email: form.email, password: form.password },
//         isCaptain ? "captain" : "user"
//       );
//       onClose();
//     } catch (err) {
//       alert(err.response?.data?.message || "Authentication failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           {/* Background Overlay */}
//           <motion.div
//             className="fixed inset-0 bg-black/60 z-100"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={onClose}
//           />

//           {/* Modal Content */}
//           <motion.div
//             className="fixed inset-0 flex items-center justify-center z-101 p-4"
//             initial={{ opacity: 0, scale: 0.9, y: 40 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.9, y: 40 }}
//             transition={{ duration: 0.3 }}
//           >
//             <div className="relative bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
              
//               <button
//                 onClick={onClose}
//                 className="absolute top-4 right-4 text-blue-800 hover:text-black text-2xl font-bold"
//               >
//                  ✖
//               </button>

           
//               <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
//                 {isForgotPassword
//                   ? "Forgot Password?"
//                   : isCaptain
//                   ? "Admin Portal "
//                   : "Welcome Back!"}
//               </h2>
//               <p className="text-gray-600 text-center mb-6">
//                 {isForgotPassword
//                   ? "We’ll send you a reset link"
//                   : isCaptain
//                   ? "Manage Users destinations and trips"
//                   : "Start your journey with VitalTrip"}
//               </p>

//               {!isForgotPassword && (
//                 <div className="flex justify-center mb-4 bg-gray-200 rounded-lg overflow-hidden">
//                   <button
//                     onClick={() => setIsLogin(true)}
//                     className={`w-1/2 py-2 font-semibold ${
//                       isLogin
//                         ? "bg-purple-600 text-white"
//                         : "text-gray-600 hover:bg-gray-100"
//                     }`}
//                   >
//                     Login
//                   </button>
//                   <button
//                     onClick={() => setIsLogin(false)}
//                     className={`w-1/2 py-2 font-semibold ${
//                       !isLogin
//                         ? "bg-purple-600 text-white"
//                         : "text-gray-600 hover:bg-gray-100"
//                     }`}
//                   >
//                     Signup
//                   </button>
//                 </div>
//               )}

              
//               {!isForgotPassword && (
//                 <div className="flex justify-center mb-5">
//                   <button
//                     onClick={() => setIsCaptain(!isCaptain)}
//                     className="text-sm text-purple-600 font-medium hover:underline"
//                   >
//                     {isCaptain ? "Switch to User Mode" : "Admin Access"}
//                   </button>
//                 </div>
//               )}

//               {/* Form */}
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 {isForgotPassword ? (
//                   <>
//                     <input
//                       type="email"
//                       name="email"
//                       placeholder="Enter your registered email"
//                       value={form.email}
//                       onChange={handleChange}
//                       className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
//                     />
//                     {errors.email && (
//                       <p className="text-red-500 text-sm">{errors.email}</p>
//                     )}
//                     {message && (
//                       <p className="text-green-600 text-sm text-center">{message}</p>
//                     )}
//                     <motion.button
//                       whileTap={{ scale: 0.97 }}
//                       disabled={loading}
//                       className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-all"
//                     >
//                       {loading ? "Sending..." : "Send Reset Link"}
//                     </motion.button>
//                     <button
//                       type="button"
//                       onClick={() => setIsForgotPassword(false)}
//                       className="block w-full text-center text-sm text-gray-600 hover:underline mt-3"
//                     >
//                       ← Back to Login
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     {!isLogin && (
//                       <div className="flex gap-2">
//                         <input
//                           type="text"
//                           name="firstname"
//                           placeholder="First Name"
//                           value={form.firstname}
//                           onChange={handleChange}
//                           className="w-1/2 p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
//                         />
//                         <input
//                           type="text"
//                           name="lastname"
//                           placeholder="Last Name"
//                           value={form.lastname}
//                           onChange={handleChange}
//                           className="w-1/2 p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
//                         />
//                       </div>
//                     )}

//                     <input
//                       type="email"
//                       name="email"
//                       placeholder="Email"
//                       value={form.email}
//                       onChange={handleChange}
//                       className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
//                     />

//                     {/* eye */}
//                     <div className="relative">
//                       <input
//                         type={showPassword ? "text" : "password"}
//                         name="password"
//                         placeholder="Password"
//                         value={form.password}
//                         onChange={handleChange}
//                         className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none pr-10"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setShowPassword(!showPassword)}
//                         className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
//                       >
//                         {showPassword ? <FaEyeSlash /> : <FaEye />}
//                       </button>
//                     </div>

//                     {!isLogin && isCaptain && (
//                       <input
//                         type="text"
//                         name="accessKey"
//                         placeholder="Captain Access Key"
//                         value={form.accessKey}
//                         onChange={handleChange}
//                         className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
//                       />
//                     )}

//                     <motion.button
//                       whileTap={{ scale: 0.97 }}
//                       disabled={loading}
//                       className="w-full py-3 bg-linear-to-r from-purple-600 to-pink-500 rounded-lg text-white font-semibold shadow-md hover:shadow-lg transition-all"
//                     >
//                       {loading
//                         ? isLogin
//                           ? "Logging in..."
//                           : "Creating account..."
//                         : isLogin
//                         ? "Login"
//                         : "Sign Up"}
//                     </motion.button>

//                     {isLogin && (
//                       <button
//                         type="button"
//                         onClick={() => setIsForgotPassword(true)}
//                         className="block w-full text-center text-sm text-gray-600 hover:underline mt-3"
//                       >
//                         Forgot Password?
//                       </button>
//                     )}
//                   </>
//                 )}
//               </form>
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// };

// export default AuthModal;


import React, { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const AuthModal = ({ isOpen, onClose }) => {
  const { login } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [isCaptain, setIsCaptain] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    accessKey: "",
  });

  useEffect(() => {
    const savedLoginMode = localStorage.getItem("auth_isLogin");
    const savedRole = localStorage.getItem("auth_isCaptain");
    if (savedLoginMode !== null) setIsLogin(savedLoginMode === "true");
    if (savedRole !== null) setIsCaptain(savedRole === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("auth_isLogin", isLogin);
    localStorage.setItem("auth_isCaptain", isCaptain);
  }, [isLogin, isCaptain]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const newErrors = {};
    if (!isForgotPassword && !isLogin) {
      if (!form.firstname.trim()) newErrors.firstname = "Please enter first name.";
      if (!form.lastname.trim()) newErrors.lastname = "Please enter last name.";
    }

    if (!form.email.trim()) newErrors.email = "Please enter your email.";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Please enter a valid email address.";

    if (!isForgotPassword) {
      if (!form.password.trim()) newErrors.password = "Please enter your password.";
      else if (form.password.length < 6)
        newErrors.password = "Password must be at least 6 characters long.";
    }

    if (!isLogin && isCaptain && !form.accessKey.trim())
      newErrors.accessKey = "Please enter your Captain Access Key.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!validate()) {
      return;
    }
    setLoading(true);

    try {
      if (isForgotPassword) {
        const endpoint = isCaptain
          ? "/captains/forgot-password"
          : "/users/forgot-password";
        try {
          const res = await api.post(endpoint, { email: form.email });
          setMessage(res.data.message || "Password reset link sent to your email!");
        } catch (err) {
          setMessage(err.response?.data?.message || "Failed to send reset link");
        } finally {
          setLoading(false);
        }
        return;
      }

      const endpoint = isCaptain
        ? isLogin
          ? "/captains/login"
          : "/captains/register"
        : isLogin
        ? "/users/login"
        : "/users/register";

      const payload = isCaptain
        ? isLogin
          ? { email: form.email, password: form.password }
          : {
              fullname: { firstname: form.firstname, lastname: form.lastname },
              email: form.email,
              password: form.password,
              accessKey: form.accessKey,
            }
        : isLogin
        ? { email: form.email, password: form.password }
        : {
            fullname: { firstname: form.firstname, lastname: form.lastname },
            email: form.email,
            password: form.password,
          };

      const res = await api.post(endpoint, payload);
      const { token } = res.data;

      if (!token) throw new Error("Authentication failed");

      localStorage.setItem(isCaptain ? "captainToken" : "authToken", token);

      await login(
        { email: form.email, password: form.password },
        isCaptain ? "captain" : "user"
      );
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 z-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-0 flex items-center justify-center z-101 p-4"
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-blue-800 hover:text-black text-2xl font-bold"
              >
                ✖
              </button>

              <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
                {isForgotPassword
                  ? "Forgot Password?"
                  : isCaptain
                  ? "Admin Portal "
                  : "Welcome Back!"}
              </h2>
              <p className="text-gray-600 text-center mb-6">
                {isForgotPassword
                  ? "We’ll send you a reset link"
                  : isCaptain
                  ? "Manage Users destinations and trips"
                  : "Start your journey with VitalTrip"}
              </p>

              {!isForgotPassword && (
                <div className="flex justify-center mb-4 bg-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setIsLogin(true)}
                    className={`w-1/2 py-2 font-semibold ${
                      isLogin
                        ? "bg-purple-600 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setIsLogin(false)}
                    className={`w-1/2 py-2 font-semibold ${
                      !isLogin
                        ? "bg-purple-600 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    Signup
                  </button>
                </div>
              )}

              {!isForgotPassword && (
                <div className="flex justify-center mb-5">
                  <button
                    onClick={() => setIsCaptain(!isCaptain)}
                    className="text-sm text-purple-600 font-medium hover:underline"
                  >
                    {isCaptain ? "Switch to User Mode" : "Admin Access"}
                  </button>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {isForgotPassword ? (
                  <>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your registered email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                    {message && (
                      <p className="text-green-600 text-sm text-center">{message}</p>
                    )}
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      disabled={loading}
                      className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-all"
                    >
                      {loading ? "Sending..." : "Send Reset Link"}
                    </motion.button>
                    <button
                      type="button"
                      onClick={() => setIsForgotPassword(false)}
                      className="block w-full text-center text-sm text-gray-600 hover:underline mt-3"
                    >
                      ← Back to Login
                    </button>
                  </>
                ) : (
                  <>
                    {!isLogin && (
                      <div className="flex gap-2">
                        <div className="w-1/2">
                          <input
                            type="text"
                            name="firstname"
                            placeholder="First Name"
                            value={form.firstname}
                            onChange={handleChange}
                            className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
                          />
                          {errors.firstname && (
                            <p className="text-red-500 text-sm">{errors.firstname}</p>
                          )}
                        </div>
                        <div className="w-1/2">
                          <input
                            type="text"
                            name="lastname"
                            placeholder="Last Name"
                            value={form.lastname}
                            onChange={handleChange}
                            className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
                          />
                          {errors.lastname && (
                            <p className="text-red-500 text-sm">{errors.lastname}</p>
                          )}
                        </div>
                      </div>
                    )}

                    <div>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email}</p>
                      )}
                    </div>

                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                      {errors.password && (
                        <p className="text-red-500 text-sm">{errors.password}</p>
                      )}
                    </div>

                    {!isLogin && isCaptain && (
                      <div>
                        <input
                          type="text"
                          name="accessKey"
                          placeholder="Admin Access Key"
                          value={form.accessKey}
                          onChange={handleChange}
                          className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
                        />
                        {errors.accessKey && (
                          <p className="text-red-500 text-sm">{errors.accessKey}</p>
                        )}
                      </div>
                    )}

                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      disabled={loading}
                      className="w-full py-3 bg-linear-to-r from-purple-600 to-pink-500 rounded-lg text-white font-semibold shadow-md hover:shadow-lg transition-all"
                    >
                      {loading
                        ? isLogin
                          ? "Logging in..."
                          : "Creating account..."
                        : isLogin
                        ? "Login"
                        : "Sign Up"}
                    </motion.button>

                    {isLogin && (
                      <button
                        type="button"
                        onClick={() => setIsForgotPassword(true)}
                        className="block w-full text-center text-sm text-gray-600 hover:underline mt-3"
                      >
                        Forgot Password?
                      </button>
                    )}
                  </>
                )}
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
