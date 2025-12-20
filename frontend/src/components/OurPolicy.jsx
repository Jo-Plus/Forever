import React from "react";
import { assets } from "../assets/assets.js";

const data = [
  {
    img: assets.exchange_icon,
    head: "Easy Exchange Policy",
    p: "We offer hassle free exchange policy",
  },
  {
    img: assets.quality_icon,
    head: "7 Days Return Policy",
    p: "We provide 7 days free return policy",
  },
  {
    img: assets.support_img,
    head: "Best customer support",
    p: "we provide 24/7 customer support",
  },
];

function OurPolicy() {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
      {data.map((item, index)=>(
      <div key={index}>
        <img src={item.img} alt="exchange_icon" className='w-12 m-auto mb-5' />
        <p className="font-semibold">{item.head}</p>
        <p className="text-gray-400">{item.p}</p>
      </div>
      ))}
    </div>
  )
}

export default OurPolicy;
