import React, { useState } from 'react';
import Title from '../components/Title.jsx';
import CartTotal from '../components/CartTotal.jsx';
import { assets } from '../assets/assets.js';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext.jsx';
import { toast } from 'react-toastify';
import axios from 'axios';

function PlaceOrder() {
  const [method, setMethod] = useState('cod');
  const {
  backendUrl,
  token,
  cartItems,
  setCartItems,
  delivery_fee,
  products,
  getCartAmount
} = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];

      Object.keys(cartItems).forEach((itemId) => {
        Object.keys(cartItems[itemId]).forEach((size) => {
          if (cartItems[itemId][size] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === itemId));
            if (itemInfo) {
              itemInfo.size = size;
              itemInfo.quantity = cartItems[itemId][size];
              orderItems.push(itemInfo);
            }
          }
        });
      });
      console.log(formData);
      
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      };

      switch (method) {
        case 'cod':
          const response = await axios.post(`${backendUrl}/api/order/place`, orderData, { headers: { token } });
          if (response.data.success) {
            setCartItems({});
            navigate('/orders');
          } else {
            toast.error(response.data.message);
          }
          break;
          case 'stripe':
            const responseStripe = await axios.post(backendUrl+'/api/order/stripe',orderData,{headers:{token}})
            if(responseStripe.data.success){
              const {session_url} = responseStripe.data
              window.location.replace(session_url)
            }else{
              toast.error(responseStripe.data.message);
            }
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="border-t border-gray-200 pt-8 sm:pt-14 min-h-[80vh] bg-gray-50/30 mt-[70px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <form
          className="flex flex-col xl:flex-row justify-between gap-10 lg:gap-20 items-center xl:items-start"
          onSubmit={onSubmitHandler}
        >
          <div className="flex flex-col gap-6 w-full max-w-lg xl:max-w-[600px]">
            <div className="text-xl sm:text-2xl my-3 text-center">
              <Title text1={'DELIVERY'} text2={'INFORMATION'} />
            </div>

            <div className="flex gap-4">
              <input
                required
                onChange={onChangeHandler}
                name="firstName"
                value={formData.firstName}
                type="text"
                placeholder="First name"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
              />
              <input
                required
                onChange={onChangeHandler}
                name="lastName"
                value={formData.lastName}
                type="text"
                placeholder="Last name"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
              />
            </div>

            <input
              required
              onChange={onChangeHandler}
              name="email"
              value={formData.email}
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
            />
            <input
              required
              onChange={onChangeHandler}
              name="street"
              value={formData.street}
              type="text"
              placeholder="Street"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
            />

            <div className="flex gap-4">
              <input
                required
                onChange={onChangeHandler}
                name="city"
                value={formData.city}
                type="text"
                placeholder="City"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
              />
              <input
                required
                onChange={onChangeHandler}
                name="state"
                value={formData.state}
                type="text"
                placeholder="State"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
              />
            </div>

            <div className="flex gap-4">
              <input
                required
                onChange={onChangeHandler}
                name="zipcode"
                value={formData.zipcode}
                type="number"
                placeholder="Zipcode"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
              />
              <input
                required
                onChange={onChangeHandler}
                name="country"
                value={formData.country}
                type="text"
                placeholder="Country"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
              />
            </div>

            <input
              required
              onChange={onChangeHandler}
              name="phone"
              value={formData.phone}
              type="number"
              placeholder="Phone"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
            />
          </div>

          {/* --- Right Side --- */}
          <div className="mt-8 xl:mt-0 w-full max-w-lg xl:max-w-[500px]">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <CartTotal />
            </div>

            <div className="mt-10">
              <div className="mb-6 text-center">
                <Title text1={'PAYMENT'} text2={'METHOD'} />
              </div>

              <div className="flex flex-col gap-4">
                {['stripe', 'razorpay', 'cod'].map((pay) => (
                  <div
                    key={pay}
                    onClick={() => setMethod(pay)}
                    className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all hover:shadow-md ${
                      method === pay ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        method === pay ? 'border-green-500' : 'border-gray-300'
                      }`}
                    >
                      {method === pay && <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>}
                    </div>
                    {pay === 'cod' ? (
                      <p className="text-gray-700 font-medium text-sm md:text-base">CASH ON DELIVERY</p>
                    ) : (
                      <img
                        src={pay === 'stripe' ? assets.stripe_logo : assets.razorpay_logo}
                        alt={pay}
                        className="h-6 object-contain"
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="w-full text-end mt-8">
                <button
                  type="submit"
                  className="w-full bg-black text-white px-8 py-4 text-sm font-semibold tracking-widest rounded-lg hover:bg-gray-800 active:transform active:scale-[0.98] transition-all shadow-lg"
                >
                  PLACE ORDER
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PlaceOrder;
