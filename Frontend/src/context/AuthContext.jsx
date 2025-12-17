import React, { createContext, useEffect, useState } from "react";
import api from "../utils/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [justLoggedIn, setJustLoggedIn] = useState(false);
  const navigate = useNavigate();

  
  useEffect(() => {
    if (justLoggedIn) return;

    const userToken = localStorage.getItem("userToken");
    const captainToken = localStorage.getItem("captainToken");
    const token = captainToken || userToken;

    if (!token) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {

        if (captainToken) {
          const res = await api.get("/captains/profile", {
            headers: { Authorization: `Bearer ${captainToken}` },
          });

          if (res.data?.captain) {
            setUser(res.data.captain);
            setRole("captain");
            setLoading(false);
            return;
          }
        }

        if (userToken) {
          const res = await api.get("/users/profile", {
            headers: { Authorization: `Bearer ${userToken}` },
          });

          if (res.data?.user) {
            setUser(res.data.user);
            setRole(res.data.user.role || "user");
          }
        }
      } catch (err) {
        console.warn("Invalid or expired token:", err.message);
        logout(false); 
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [justLoggedIn]);

 
  const login = async (credentials, roleType = "user") => {
    try {
      const endpoint =
        roleType === "captain" ? "/captains/login" : "/users/login";

      const res = await api.post(endpoint, credentials);
      const { token, user: userData, captain } = res.data;

      if (!token) throw new Error("Token missing from server response.");

      
      if (roleType === "captain") {
        localStorage.setItem("captainToken", token);
        localStorage.removeItem("userToken");
      } else {
        localStorage.setItem("userToken", token);
        localStorage.removeItem("captainToken");
      }

      const activeUser = userData || captain || null;
      setUser(activeUser);
      setRole(roleType);

      localStorage.setItem("user", JSON.stringify(activeUser));
      localStorage.setItem("role", roleType);

      toast.success(
        `Welcome back, ${
          activeUser?.fullname?.firstname || activeUser?.firstname || "User"
        }!`
      );

     
      window.dispatchEvent(new Event("auth-updated"));

      
      if (window.location.pathname !== "/") navigate("/");

 
      setJustLoggedIn(true);
      setTimeout(() => setJustLoggedIn(false), 2000);
    } catch (err) {
      console.error("Login failed:", err);
      toast.error(err.response?.data?.message || "Login failed!");
    }
  };

  
  const logout = async (notify = true) => {
    const captainToken = localStorage.getItem("captainToken");
    const userToken = localStorage.getItem("userToken");

    try {
      if (captainToken)
        await api.post(
          "/captains/logout",
          {},
          { headers: { Authorization: `Bearer ${captainToken}` } }
        );
      else if (userToken)
        await api.post(
          "/users/logout",
          {},
          { headers: { Authorization: `Bearer ${userToken}` } }
        );
    } catch {
      console.warn("Logout request failed — proceeding to clear session.");
    }

    
    localStorage.removeItem("userToken");
    localStorage.removeItem("captainToken");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    setUser(null);
    setRole(null);
    if (notify) toast.info("Logged out successfully!");

    window.dispatchEvent(new Event("auth-updated"));
    if (window.location.pathname !== "/") navigate("/");
  };

  
  const refreshUser = async () => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) return;

      const res = await api.get("/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data?.user) {
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }
    } catch (err) {
      console.error("Error refreshing user:", err);
    }
  };

  
  const refreshCaptain = async () => {
    try {
      const token = localStorage.getItem("captainToken");
      if (!token) return;

      const res = await api.get("/captains/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data?.captain) {
        setUser(res.data.captain);
        localStorage.setItem("user", JSON.stringify(res.data.captain));
      }
    } catch (err) {
      console.error("Error refreshing captain:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        loading,
        login,
        logout,
        refreshUser,
        refreshCaptain,
        setUser,
        setRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
