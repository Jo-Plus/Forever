import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App.jsx";
import { toast } from "react-toastify";
import { assets } from "../assets/assets.js";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllOrders = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      }
    } catch (error) {
      toast.error("Error fetching orders");
    } finally {
      setLoading(false);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status: event.target.value },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        toast.success("Status Updated");
        await fetchAllOrders();
      }
    } catch (error) {
      toast.error("Update failed");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  if (loading) return <div className="flex justify-center items-center min-h-screen text-gray-500">Loading Admin Panel...</div>;

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <img src={assets.parcel_icon} alt="" className="w-8" />
        Order Management
      </h3>

      <div className="flex flex-col gap-5">
        {orders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-400 text-lg">No orders available at the moment.</p>
          </div>
        ) : (
          orders.map((order, index) => (
            <div
              key={order._id || index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="grid grid-cols-1 lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-6 items-start">
                
                <div className="hidden lg:flex justify-center">
                  <div className="bg-blue-50 p-4 rounded-full">
                    <img className="w-10" src={assets.parcel_icon} alt="Order" />
                  </div>
                </div>

                <div>
                  <div className="mb-4">
                    <p className="text-sm font-bold text-gray-900 mb-2">Order Items:</p>
                    <div className="space-y-1">
                      {order.items.map((item, idx) => (
                        <p key={idx} className="text-sm text-gray-600 bg-gray-50 p-2 rounded border-l-4 border-blue-400">
                          {item.name} <span className="text-blue-600 font-bold">x {item.quantity}</span> 
                          {item.size && <span className="ml-2 px-1 bg-white border text-[10px] rounded uppercase">{item.size}</span>}
                        </p>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <p className="font-bold text-gray-800">{order.address?.firstName} {order.address?.lastName}</p>
                    <p className="text-xs text-gray-500 mt-1">{order.address?.street}, {order.address?.city}</p>
                    <p className="text-xs text-gray-500">{order.address?.phone}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Method</span>
                    <span className="text-sm font-medium">{order.paymentMethod}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Payment</span>
                    <span className={`text-sm font-bold ${order.payment ? 'text-green-600' : 'text-red-500'}`}>
                      {order.payment ? "✓ Paid" : "⚠ Pending"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Date</span>
                    <span className="text-sm text-gray-600">{new Date(order.date).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex flex-col justify-center items-center lg:items-start h-full">
                   <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Amount</p>
                   <p className="text-2xl font-black text-gray-900 leading-none mt-1">
                     {currency}{order.amount}
                   </p>
                   <p className="text-[10px] text-gray-400 mt-1">{order.items.length} Items Total</p>
                </div>

                <div className="flex items-center h-full">
                  <select
                    value={order.status || "Order Placed"}
                    onChange={(event) => statusHandler(event, order._id)}
                    className={`w-full p-3 rounded-lg border font-semibold text-sm transition-colors cursor-pointer outline-none
                      ${order.status === 'Delivered' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-gray-50 border-gray-300 text-gray-700 focus:border-blue-500'}`}
                  >
                    <option value="Order Placed">📦 Order Placed</option>
                    <option value="Packing">🛠 Packing</option>
                    <option value="Shipped">🚚 Shipped</option>
                    <option value="Out for delivery">📍 Out for delivery</option>
                    <option value="Delivered">✅ Delivered</option>
                  </select>
                </div>

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;