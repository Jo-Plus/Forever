import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets.js";

function Sidebar() {
  return (
    <div className="w-[18%] min-h-screen border-r-2 border-gray-100 bg-white">
      <div className="flex flex-col gap-4 pt-8 pl-[15%] text-[15px]">
        {[
          { to: "/add", icon: assets.add_icon, label: "Add Items" },
          { to: "/list", icon: assets.order_icon, label: "List Items" },
          { to: "/orders", icon: assets.order_icon, label: "Orders" },
        ].map((item, index) => (
          <NavLink
            key={index}
            to={item.to}
            className={({ isActive }) => `
              flex items-center gap-3 border border-gray-300 border-r-0 px-4 py-2.5 rounded-l-xl transition-all duration-200
              ${
                isActive
                  ? "bg-[#FFF5F5] border-orange-400 text-black font-semibold"
                  : "hover:bg-gray-50 text-gray-600"
              }
            `}
          >
            <img
              src={item.icon}
              alt="icon"
              className="w-5 h-5 grayscale-[0.5]"
            />
            <p className="hidden md:block">{item.label}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
