'use client';
import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext.jsx';
import Title from './Title.jsx';

function CartTotal() {
  const { current, getCartAmount, delivery_fee } = useContext(ShopContext);

  const shippingFee = Number(delivery_fee) || 0;
  const subtotal = getCartAmount();
  const totalAmount = subtotal === 0 ? 0 : subtotal + shippingFee;

  return (
    <div className='w-full p-6 sm:p-8 bg-white border border-gray-100 rounded-lg shadow-lg'>
      <div className="text-2xl mb-6 text-center">
        <Title text1={'Cart'} text2={'Summary'} /> 
      </div>
      <div className="flex flex-col gap-4 text-gray-700 text-base">
        <div className="flex justify-between pb-3 border-b border-gray-100">
          <p className='font-normal'>Subtotal</p>
          <p className='font-medium'>{current}{subtotal.toFixed(2)}</p>
        </div>
        <div className="flex justify-between pb-3 border-b border-gray-100">
          <p className='font-normal'>Shipping Fee</p>
          <p className='font-medium'>{current}{shippingFee.toFixed(2)}</p>
        </div>
        <div className="flex justify-between pt-4 text-xl text-black font-semibold">
          <b>Order Total</b>
          <b>{current}{totalAmount.toFixed(2)}</b>
        </div>
      </div>
    </div>
  );
}

export default CartTotal;