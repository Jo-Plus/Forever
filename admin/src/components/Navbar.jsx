import React from "react";
import { assets } from "../assets/assets.js";

function Navbar({ setToken }) {
  const logoutHandler = () => {
    localStorage.removeItem("adminToken");
    setToken("");
  };

  return (
    <div className="flex items-center py-3 px-[4%] justify-between bg-white sticky top-0 z-50 shadow-sm">
      <img src={assets.logo} alt="logo" className="w-32 sm:w-40" />
      <button onClick={logoutHandler} className="bg-black text-white px-6 py-2 sm:px-10 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium hover:bg-gray-800 transition-all active:scale-95 shadow-md">
        Logout
      </button>
    </div>
  );
}

export default Navbar;
