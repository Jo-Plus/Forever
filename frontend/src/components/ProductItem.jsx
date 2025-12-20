import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext.jsx';
import { Link } from 'react-router-dom';

function ProductItem({ id, image, name, price }) {
  const { currency, backendUrl } = useContext(ShopContext);

  let imageUrl = 'https://via.placeholder.com/400';

  if (image) {
    if (Array.isArray(image) && image.length > 0) {
      imageUrl = image[0].startsWith('http')
        ? image[0]
        : `${backendUrl}/images/${image[0]}`;
    } else if (typeof image === 'string') {
      imageUrl = image.startsWith('http')
        ? image
        : `${backendUrl}/images/${image}`;
    }
  }

  return (
    <Link
      to={`/product/${id}`}
      className='group block bg-white rounded-xl border border-gray-100 p-3 transition-all duration-300 hover:shadow-xl hover:border-gray-200 cursor-pointer'
    >
      <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-[4/5] mb-4">
        <img
          src={imageUrl}
          alt={name}
          className='w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110'
        />
      </div>

      <div className="flex flex-col gap-1">
        <p className='text-sm font-medium text-gray-700 line-clamp-1 group-hover:text-black transition-colors'>
          {name}
        </p>
        <p className='text-sm font-bold text-gray-900'>
          {currency}{price}
        </p>
      </div>
    </Link>
  );
}

export default ProductItem;
