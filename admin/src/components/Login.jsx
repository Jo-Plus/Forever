import React, { useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App.jsx';
import { toast } from "react-toastify";

function Login({setToken}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        backendUrl + '/api/user/admin',
        { email, password }
      );
      if (response.data.success) {
        localStorage.setItem("adminToken", response.data.token);
        setToken(response.data.token);
        toast.success("Login successful");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='bg-white px-8 py-10 rounded-xl shadow-lg w-full max-w-[400px] border border-gray-100'>
        <h1 className='text-2xl font-bold mb-6 text-black'>Admin Panel</h1>
        <form onSubmit={onSubmitHandler} className='flex flex-col gap-5'>
          <div className='flex flex-col gap-1.5'>
            <label className='text-sm font-semibold text-gray-700'>Email Address</label>
            <input  onChange={(e)=> setEmail(e.target.value)} value={email} type="email"  className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-black outline-none transition-all placeholder:text-gray-400'  placeholder='admin@example.com'  required  />
          </div>
          <div className='flex flex-col gap-1.5'>
            <label className='text-sm font-semibold text-gray-700'>Password</label>
            <input  onChange={(e)=> setPassword(e.target.value)} value={password} type="password"  className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-black outline-none transition-all placeholder:text-gray-400'  placeholder='Enter your password'  required  />
          </div>
          <button  type="submit"  className='w-full bg-black text-white py-3 rounded-lg font-medium mt-2 hover:bg-gray-900 transition-colors shadow-sm active:scale-[0.98]' >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;