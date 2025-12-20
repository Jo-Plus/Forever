import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App.jsx";
import { toast } from "react-toastify";

function List({ token }) {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const res = await axios.get(backendUrl + "/api/product/list");
      if (res.data.success) {
        setList(res.data.products);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

const removeProduct = async (id) => {
  try {
    const res = await axios.post( backendUrl + "/api/product/remove", { id }, { headers: { Authorization: `Bearer ${token}` } });
    if (res.data.success) {
      toast.success(res.data.message);
      await fetchList();
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    console.error(error);
    toast.error(error.response?.data?.message || error.message);
  }
};

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xl font-bold text-gray-800 mb-2">All Products List</p>

      <div className="flex flex-col gap-2">
        
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-3 px-4 border bg-gray-100 text-sm font-bold text-gray-700 rounded-lg">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span className="text-center">Action</span>
        </div>

        {list.length > 0 ? (
          list.map((item, index) => (
            <div  key={index}  className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-2 px-4 border border-gray-100 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-sm" >
              <img  className="w-16 h-16 object-cover rounded-md border"  src={item.images?.[0]}  alt={item.name}  />
              <p className="font-medium text-gray-800">{item.name}</p>
              <p className="hidden md:block text-gray-600">{item.category}</p>
              <p className="font-semibold text-black">
                {currency}{item.price}
              </p>
              <p  onClick={() => removeProduct(item._id)}  className="text-right md:text-center cursor-pointer text-red-500 hover:text-red-700 font-bold text-lg p-2" title="Delete Product" >
                X
              </p>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-gray-400">
            No products found.
          </div>
        )}
      </div>
    </div>
  );
}

export default List;