import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext.jsx";
import { assets } from "../assets/assets.js";
import RelatedProducts from "../components/RelatedProducts.jsx";

function Product() {
  const { productId } = useParams();
  const { products, currency, addToCart, backendUrl } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setSelectedImage(product.images[0]);
    }
  }, [productId, products]);

  if (!productData) return <div className="opacity-0"></div>;

  const { name, images, price, description, sizes, category, subCategory } = productData;

  return (
    <div className="pt-8 md:pt-12 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[70px]">
      <div className="flex gap-8 lg:gap-16 flex-col lg:flex-row">
        
        {/* Images Section */}
        <div className="flex flex-1 flex-col-reverse gap-4 md:flex-row">
          <div className="flex flex-row md:flex-col overflow-x-auto md:overflow-y-hidden gap-3 md:w-24 w-full">
            {images.map((img, index) => {
              const imgUrl = img.startsWith("http")
                ? img
                : `${backendUrl}/images/${img}`;

              return (
                <img
                  key={index}
                  src={imgUrl}
                  onClick={() => setSelectedImage(imgUrl)}
                  alt={`Product ${index + 1}`}
                  className={`w-16 h-20 object-cover cursor-pointer transition-all duration-200 flex-shrink-0 ${
                    imgUrl === selectedImage
                      ? "border-2 border-black/80 shadow-md"
                      : "border border-gray-200"
                  }`}
                />
              );
            })}
          </div>

          <div className="flex-1 min-w-0">
            <img
              src={selectedImage}
              alt={name}
              className="w-full h-auto object-cover rounded-lg shadow-xl"
            />
          </div>
        </div>

        <div className="flex-1 lg:max-w-md">
          <h1 className="font-bold text-3xl md:text-4xl mt-2">{name}</h1>

          <div className="flex items-center gap-2 mt-3 text-sm text-gray-600">
            {[...Array(4)].map((_, i) => (
              <img key={i} src={assets.star_icon} className="w-4 h-4" />
            ))}
            <img src={assets.star_dull_icon} className="w-4 h-4" />
            <p className="pl-1">4.2 / 5</p>
            <p className="text-gray-400">(122 Reviews)</p>
          </div>

          <hr className="my-5" />

          <p className="text-4xl font-extrabold">
            {currency} {price}
          </p>

          <p className="mt-5 text-gray-600">{description}</p>

          <div className="flex flex-col gap-3 my-8">
            <p className="text-lg font-semibold">Select Size:</p>
            <div className="flex gap-3">
              {sizes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSize(item)}
                  className={`border py-2 px-5 rounded-full transition-all ${
                    item === selectedSize
                      ? "bg-black text-white"
                      : "hover:border-black"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => addToCart(productData._id, selectedSize)}
            className="w-full md:w-4/5 bg-black text-white px-8 py-4 rounded-full active:bg-gray-700 transition-all"
          >
            ADD TO CART
          </button>
        </div>
      </div>

      <RelatedProducts category={category} subCategory={subCategory} />
    </div>
  );
}

export default Product;