import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext.jsx';
import Title from '../components/Title.jsx';
import { toast } from 'react-toastify';

function Orders() {
  const { currency, backendUrl, token } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const loadOrderData = async () => {
    try {
      if (!token) return;
      const response = await axios.post(`${backendUrl}/api/order/userorders`, {}, { headers: { token } });

      if (response.data.success) {
        setOrderData(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  if (loading) {
    return (
      <div className="pt-24 min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
        <p className="text-gray-500 font-medium">Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="border-t pt-16 mt-[70px] bg-gray-50/50 pb-20">
      <div className="max-w-5xl mx-auto px-4">
        
        <div className="text-3xl mb-10">
          <Title text1={'MY'} text2={'ORDERS'} />
        </div>

        <div className="space-y-6">
          {orderData.length > 0 ? (
            orderData.map((order) => (
              <div
                key={order._id}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="bg-gray-50 px-6 py-3 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4">
                  <div className="flex gap-6 text-xs uppercase tracking-wider font-semibold text-gray-500">
                    <div>
                      <p>Order Date</p>
                      <p className="text-gray-800 mt-1">{formatDate(order.date)}</p>
                    </div>
                    <div>
                      <p>Total Price</p>
                      <p className="text-gray-800 mt-1">{currency}{order.amount || '0'}</p>
                    </div>
                    <div>
                      <p>Payment</p>
                      <p className="text-gray-800 mt-1">{order.paymentMethod}</p>
                    </div>
                  </div>
                  <p className="text-xs font-mono text-gray-400">ID: #{order._id.slice(-8).toUpperCase()}</p>
                </div>

                <div className="p-6 divide-y divide-gray-100">
                  {order.items.map((item, index) => (
                    <div key={index} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row justify-between sm:items-center gap-6">
                      <div className="flex gap-4">
                        <img
                          src={item.images?.[0] || 'https://via.placeholder.com/150'}
                          className="w-20 h-24 object-cover rounded-lg bg-gray-100"
                          alt={item.name}
                        />
                        <div className="flex flex-col justify-center">
                          <p className="font-bold text-gray-900 text-lg mb-1">{item.name}</p>
                          <div className="flex items-center gap-3 text-sm font-medium">
                            <span className="text-gray-900">{currency}{item.price}</span>
                            <span className="text-gray-300">|</span>
                            <span className="text-gray-600">Qty: {item.quantity}</span>
                            <span className="px-2 py-0.5 bg-gray-100 rounded text-[10px] uppercase">{item.size}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-10">
                         <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${order.status === 'Delivered' ? 'bg-green-500' : 'bg-orange-400 animate-pulse'}`}></span>
                            <p className="text-sm font-semibold text-gray-700">{order.status || 'Order Placed'}</p>
                         </div>
                         <button 
                            onClick={loadOrderData}
                            className="text-xs font-bold border border-gray-300 px-5 py-2.5 rounded-full hover:bg-black hover:text-white hover:border-black transition-all duration-300"
                         >
                            Track Order
                         </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
              <div className="text-5xl mb-4">📦</div>
              <p className="text-xl font-medium text-gray-400">You haven't placed any orders yet.</p>
              <button className="mt-6 bg-black text-white px-8 py-3 rounded-full text-sm">Start Shopping</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Orders;