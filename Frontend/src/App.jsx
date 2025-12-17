import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import Services from "./pages/Services";
import NearbyHospitals from "./pages/NearbyHospitals";
import Accommodation from "./pages/Accommodation";
import Guides from "./pages/Guides";
import Blogs from "./pages/Blogs";
import AllBlogs from "./pages/AllBlogs";
import BlogDetails from "./pages/BlogDetails";
import PlanTrip from "./pages/PlanTrip";
import Booking from "./pages/Booking";
import CaptainDashboard from "./pages/CaptainDashboard";
import UserDashboard from "./pages/UserDashboard";
import Footer from "./components/Footer";
import TripDetails from "./pages/TripDetails";
import UserResetPassword from "./pages/UserResetPassword";
import CaptainResetPassword from "./pages/CaptainResetPassword";


import CustomToastContainer from "./components/CustomToastContainer";

const App = () => {
  const location = useLocation();
  const hideNavbar = location.pathname.startsWith("/destination/");

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <Destinations />
              <Services />
              <Blogs />
              <Footer />
            </>
          }
        />
        <Route path="/destinations/:id" element={<TripDetails />} />
        <Route path="/plan-trip" element={<PlanTrip />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/captain/dashboard" element={<CaptainDashboard />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/blogs" element={<AllBlogs />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
        <Route path="/services" element={<Services />} />
        <Route path="/nearby-hospitals" element={<NearbyHospitals />} />
        <Route path="/accommodation" element={<Accommodation />} />
        <Route path="/guides" element={<Guides />} />
        <Route path="/reset-password/:token" element={<UserResetPassword />} />
        <Route
          path="/captain/reset-password/:token"
          element={<CaptainResetPassword />}
        />
      </Routes>
      <CustomToastContainer />
    </>
  );
};

export default App;
