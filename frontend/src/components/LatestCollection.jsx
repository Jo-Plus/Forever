import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import Title from "./Title.jsx";
import ProductItem from "./ProductItem.jsx";

function LatestCollection() {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(()=>{
    setLatestProducts(products.slice(0,10));
  },[products])

  return <div className="my-10">
    <div className="text-center py-8 text-3xl">
      <Title text1={'LATEST'} text2={'COLLECTIONS'}/>
      <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
      New Arrivals are simply stunning pieces of the modern and elegant season. Our collection has been the favorite.
      </p>
    </div>
    {/* Rendering Products */}
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
      {
        latestProducts.map((item,index)=>(
          <ProductItem  id={item._id}  key={index}  image={item.images} name={item.name}  price={item.price}/>
        ))
      }
    </div>
  </div>;
}

export default LatestCollection;
