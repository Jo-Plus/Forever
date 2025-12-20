import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import { assets } from "../assets/assets.js";
import { useLocation } from "react-router-dom";

function SearchBar() {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const location = useLocation();
  const isCollectionPage = location.pathname === "/collection";
  if (!showSearch || !isCollectionPage) return null;

  return (
    <div className="fixed top-[80px] w-full sm:w-5/6 xl:w-full z-20 transition-all duration-300">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center bg-white rounded-xl shadow-2xl p-2 md:p-3 border border-gray-100">
          <img src={assets.search_icon} alt="search_icon" className="w-5 md:w-6 mx-3 opacity-70"/>
          <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search for products, categories, or brands..." className="flex-1 outline-none text-base md:text-lg text-gray-800 placeholder-gray-400" autoFocus/>
          <button onClick={() => setShowSearch(false)} className="p-2 ml-3 rounded-full hover:bg-gray-100 transition-colors"> 
          <img src={assets.cross_icon}   alt="close_icon"   className="w-4 md:w-5 cursor-pointer opacity-60 hover:opacity-100" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
