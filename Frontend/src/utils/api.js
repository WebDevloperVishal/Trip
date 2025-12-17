import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const captainToken = localStorage.getItem("captainToken");
  const userToken =
    localStorage.getItem("authToken") ||
    localStorage.getItem("userToken") ||
    localStorage.getItem("token");

  const token = captainToken || userToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
