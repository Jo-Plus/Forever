import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import Title from "../components/Title.jsx";
import { assets } from "../assets/assets.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CartTotal from "../components/CartTotal.jsx";

function Cart() {
  const { products, currency, cartItems, updateQuantity, backendUrl } =
    useContext(ShopContext);
  const navigate = useNavigate();
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          if (cartItems[productId][size] > 0) {
            tempData.push({
              _id: productId,
              size,
              quantity: cartItems[productId][size],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  const handleRemoveItem = (id, size) => {
    updateQuantity(id, size, 0);
    toast.error("Item removed from cart!");
  };

  return (
    <div className="border-t border-gray-200 pt-14 mt-[70px] min-h-[50vh]">
      <div className="text-2xl mb-6 text-center">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      <div className="max-w-4xl mx-auto px-4">
        {cartData.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-lg">
            <p className="text-xl text-gray-500 mb-4">
              Your cart is currently empty.
            </p>
            <button
              onClick={() => navigate("/collection")}
              className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 hover:shadow-lg transition-all cursor-pointer"
            >
              BROWSE COLLECTION
            </button>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4">
              {cartData.map((item, index) => {
                const productData = products.find(
                  (product) => product._id === item._id
                );
                if (!productData) return null;

                const imageUrl = productData.images?.[0]
                  ? productData.images[0].startsWith("http")
                    ? productData.images[0]
                    : `${backendUrl}/images/${productData.images[0]}`
                  : "https://via.placeholder.com/150";

                return (
                  <div
                    key={index}
                    className="py-4 border-b border-gray-100 text-gray-700 grid grid-cols-[3fr_1fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4 hover:bg-gray-50 transition-colors p-2 rounded-lg"
                  >
                    <div className="flex items-start gap-4 sm:gap-6">
                      <img
                        className="w-16 sm:w-24 object-cover rounded-md shadow-sm"
                        src={imageUrl}
                        alt={productData.name}
                      />
                      <div className="flex flex-col gap-1">
                        <p className="text-sm sm:text-lg font-semibold text-gray-800">
                          {productData.name}
                        </p>
                        <div className="flex items-center gap-3 mt-1">
                          <p className="text-gray-500 font-medium">
                            {currency}
                            {productData.price}
                          </p>
                          <p className="px-2 py-0.5 border border-gray-200 bg-gray-100 text-xs rounded-md text-gray-600 uppercase">
                            {item.size}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-center">
                      <input
                        type="number"
                        min={1}
                        defaultValue={item.quantity}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          if (val > 0) updateQuantity(item._id, item.size, val);
                        }}
                        className="border max-w-[50px] sm:max-w-[70px] px-2 py-1 text-center rounded border-gray-300 outline-none focus:border-black"
                      />
                    </div>

                    <div className="flex justify-end">
                      <img
                        onClick={() => handleRemoveItem(item._id, item.size)}
                        src={assets.bin_icon}
                        alt="Remove"
                        className="w-5 cursor-pointer hover:scale-110 hover:opacity-70 transition-all duration-200"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        <div className="flex justify-center my-20">
          <div className="w-full sm:w-[450px]">
            <CartTotal />
            <button
              onClick={() => navigate("/place-order")}
              className="mt-5 cursor-pointer w-full bg-black text-white px-6 py-3 text-base uppercase font-medium rounded-md hover:bg-gray-800 transition-colors duration-200 shadow-md"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
