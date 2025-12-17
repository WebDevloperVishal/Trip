import React from "react";
import { NavLink } from "react-router-dom";
import { FaUsers, FaGlobe, FaClipboardList, FaMoneyBill, FaBook } from "react-icons/fa";

const Sidebar = () => {
  const linkStyle =
    "flex items-center gap-3 py-3 px-5 text-white/80 hover:bg-white/10 hover:text-cyan-300 rounded-lg transition-all";
  const activeStyle = "bg-white/20 text-cyan-300";

  return (
    <div className="w-64 bg-[#001a2e] h-screen p-6 flex flex-col shadow-2xl border-r border-cyan-700/30">
      <h2 className="text-2xl font-bold text-cyan-400 mb-6 text-center">⚓ Captain</h2>
      <nav className="flex flex-col gap-2">
        <NavLink to="/captain/dashboard/users" className={({ isActive }) => (isActive ? `${linkStyle} ${activeStyle}` : linkStyle)}>
          <FaUsers /> Users
        </NavLink>
        <NavLink to="/captain/dashboard/trips" className={({ isActive }) => (isActive ? `${linkStyle} ${activeStyle}` : linkStyle)}>
          <FaGlobe /> Trips
        </NavLink>
        <NavLink to="/captain/dashboard/bookings" className={({ isActive }) => (isActive ? `${linkStyle} ${activeStyle}` : linkStyle)}>
          <FaClipboardList /> Bookings
        </NavLink>
        <NavLink to="/captain/dashboard/payments" className={({ isActive }) => (isActive ? `${linkStyle} ${activeStyle}` : linkStyle)}>
          <FaMoneyBill /> Payments
        </NavLink>
        <NavLink to="/captain/dashboard/blogs" className={({ isActive }) => (isActive ? `${linkStyle} ${activeStyle}` : linkStyle)}>
          <FaBook /> Blogs
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
