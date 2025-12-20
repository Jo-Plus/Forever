import React, { useContext, useEffect, useState } from 'react'
import {assets} from '../assets/assets.js'
import { NavLink, Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext.jsx';


function Navbar() {
  const [visible , setVisible] = useState(false);
  const [currentState , setCurrentState] = useState('Login');
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);
const logout = () => {
  setToken('');
  setCartItems({});
  localStorage.removeItem('token');
  toast.success("Logged out successfully");
  navigate('/login');
};

  return (
    <div className= 'fixed top-0 w-full z-10 bg-white flex items-center justify-between py-3 font-medium pl-5 pr-[50px] sm:pr-[85px] md:pr-[160px] lg:pr-[240px] xl:pr-[300px] 2xl:pr-[350px] pr-6xl pr-3xl pr-4xl pr-5xl'>
      <Link to={'/'}><img src={assets.logo} alt="logo" className='w-36' /></Link>
      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        <NavLink to='/' className='flex flex-col items-center gap-1'>
          <p>Home</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
        <NavLink to='/collection' className='flex flex-col items-center gap-1'>
          <p>Collection</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
        <NavLink to='/about' className='flex flex-col items-center gap-1'>
          <p>About</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
        <NavLink to='/contact' className='flex flex-col items-center gap-1'>
          <p>Contact</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
      </ul>
      <div className="flex items-center gap-6">
        <img onClick={() =>{ navigate("/collection"); setShowSearch(true);}} src={assets.search_icon} alt="search_icon" className='w-5 cursor-pointer' />
        <div className="group relative">
          <img onClick={()=> token ? null : navigate('/login')} src={assets.profile_icon} alt="profile_icon" className='w-5 cursor-pointer' />
        {token &&
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
              <p className='cursor-pointer hover:text-black'>my Profile</p>
              <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
              <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
            </div>
          </div>}
        </div>
        <Link to='/cart' className='relative'>
        <img src={assets.cart_icon} alt="cart_icon" className='w-5 min-w-5' />
        <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">{getCartCount()}</p>
        </Link>
        <img onClick={()=>setVisible(true)} src={assets.menu_icon} alt="menu_icon" className='w-5 cursor-pointer sm:hidden' />
      </div>

      {/* Sidebar Menu for small screen */}
      <div  className={`fixed top-0 right-0 bottom-0 z-50 overflow-hidden bg-white transition-all duration-300 ease-in-out ${visible ? 'w-full' : 'w-0'}`}>
        <div className="flex flex-col text-gray-600 h-full">
          <div  onClick={() => setVisible(false)} className="flex items-center gap-4 p-5 cursor-pointer border-b border-gray-100 hover:text-black transition-colors" >
            <div className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-50 group-hover:bg-gray-100">
              <img src={assets.dropdown_icon} alt="back" className='h-4 rotate-180 opacity-70' />
            </div>
            <p className="font-medium text-lg">Back</p>
          </div>

          <div className="flex flex-col mt-2">
            <NavLink  onClick={() => setVisible(false)}  className={({ isActive }) => `py-4 pl-6 border-b border-gray-50 text-lg transition-all duration-200 hover:pl-8 hover:text-black ${isActive ? 'bg-gray-50 text-black font-medium' : ''}`}  to='/' > Home
            </NavLink>
            <NavLink  onClick={() => setVisible(false)}  className={({ isActive }) => `py-4 pl-6 border-b border-gray-50 text-lg transition-all duration-200 hover:pl-8 hover:text-black ${isActive ? 'bg-gray-50 text-black font-medium' : ''}`}  to='/collection' > Collection
            </NavLink>
            <NavLink  onClick={() => setVisible(false)}  className={({ isActive }) => `py-4 pl-6 border-b border-gray-50 text-lg transition-all duration-200 hover:pl-8 hover:text-black ${isActive ? 'bg-gray-50 text-black font-medium' : ''}`}  to='/about' > About
            </NavLink>
            <NavLink  onClick={() => setVisible(false)}  className={({ isActive }) => `py-4 pl-6 border-b border-gray-50 text-lg transition-all duration-200 hover:pl-8 hover:text-black ${isActive ? 'bg-gray-50 text-black font-medium' : ''}`}  to='/contact' > Contact
            </NavLink>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Navbar