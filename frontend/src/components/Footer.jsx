import React from 'react'
import {assets} from '../assets/assets.js'

function Footer() {
  return (
  <div>
    <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-10 text-sm'>
      <div>
        <img src={assets.logo} alt="logo" className='mb-5 w-32' />
        <p className='w-full md:w-2/3 text-gray-600'>Our brand is simply dedicated to providing you with the finest quality and timeless style. Since our beginning, we have been the benchmark for modern elegance and carefully curated collections in the fashion industry.</p>
      </div>
      <div>
        <p className='text-xl font-medium mb-5'>COMPANY</p>
        <ul className='flex flex-col gap-1 text-gray-600'>
          <li>Home</li>
          <li>About us</li>
          <li>Delivery</li>
          <li>Privacy policy</li>
        </ul>
      </div>
      <div>
        <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
        <ul className="flex flex-col gap-1 text-gray-600">
          <li>+20 010 102 832 62</li>
          <li>saeedyoussef219@gmail.com</li>
          <li><a href="https://www.linkedin.com/in/yousef-saeed30/" target="_blank" rel="noopener noreferrer" >Linkedin</a></li>
        </ul>
      </div>
    </div>
      <div>
        <hr className='text-gray-200'/>
        <p className="py-5 text-sm text-center">Copyright 2025@ greatstack.dev - All Right Reserved.</p>
      </div>
  </div>
  )
}

export default Footer