import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext.jsx'
import { assets } from '../assets/assets.js'
import Title from '../components/Title.jsx'
import ProductItem from '../components/ProductItem.jsx';

function Collection() {
  const {products, showSearch, search} = useContext(ShopContext);
  let [showFilter, setShowFilter] = useState(false);
  let [filterProducts, setFilterProducts] = useState([]);
  let [category, setCategory] = useState([]);
  let [subCategory, setSubCategory] = useState([]);
  let [sortType, setSortType] = useState('relavent');
  

  const toggleCategory = (e)=>{
    if(category.includes(e.target.value)){
      setCategory(prev=> prev.filter(item => item !== e.target.value));
    }else{
      setCategory(prev=> [...prev,e.target.value]);
    }
  }

  const toggleSubCategory = (e)=>{
    if(subCategory.includes(e.target.value)){
      setSubCategory(prev=> prev.filter(item => item !== e.target.value));
    }else{
      setSubCategory(prev=> [...prev,e.target.value]);
    }
  }

const applyFilter = () => {
  let productsCopy = [...products];
  if (search) {
    productsCopy = productsCopy.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }
  if (category.length > 0) {
    productsCopy = productsCopy.filter(item =>
      category.includes(item.category)
    );
  }
  if (subCategory.length > 0) {
    productsCopy = productsCopy.filter(item =>
      subCategory.includes(item.subCategory)
    );
  }
  setFilterProducts(productsCopy);
};

const sortProduct = () => {
  let fpCopy = [...filterProducts];
  if (sortType === "low-high") {
    setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
  } else if (sortType === "high-low") {
    setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
  }
};

useEffect(() => {
  applyFilter();
}, [products, category, subCategory, search, showSearch,products]);

  useEffect(()=>{
    sortProduct();
  },[sortType])

  return (
<div
  className={`flex flex-col lg:flex-row gap-1 sm:gap-10 pt-10 border-t border-gray-200 ${ showSearch ? "pt-[80px] mt-[70px]" : "mt-[70px]" }`}>
        {/* filter options */}
      <div className="min-w-60">
        <p onClick={()=>setShowFilter(!showFilter)} className="my-2 text-xl flex items-center cursor-pointer gap-2">FILTERS
          <img src={assets.dropdown_icon} alt="dropdown_icon" className={ `h-3 lg:hidden ${showFilter ? 'rotate-90' : ''} `} />
        </p>
        {/* category filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} lg:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className='w-3' id="Men" type="checkbox" value={'Men'} onChange={toggleCategory}/>
              <label htmlFor="Men" className="cursor-pointer">Men</label>
            </p>
            <p className="flex gap-2">
              <input className='w-3' id="Women" type="checkbox" value={'Women'} onChange={toggleCategory}/>
              <label htmlFor="Women" className="cursor-pointer">Women</label>
            </p>
            <p className="flex gap-2">
              <input className='w-3' id="kids" type="checkbox" value={'Kids'} onChange={toggleCategory}/>
              <label htmlFor="kids" className="cursor-pointer">kids</label>
            </p>
          </div>
        </div>
        {/* subCategory Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} lg:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className='w-3' id="Topwear" type="checkbox" value={'Topwear'} onChange={toggleSubCategory}/>
              <label htmlFor="Topwear" className="cursor-pointer">Topwear</label>
            </p>
            <p className="flex gap-2">
              <input className='w-3' id="Bottomwear" type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory}/>
              <label htmlFor="Bottomwear" className="cursor-pointer">Bottomwear</label>
            </p>
            <p className="flex gap-2">
              <input className='w-3' id="Winterwear" type="checkbox" value={'Winterwear'} onChange={toggleSubCategory}/>
              <label htmlFor="Winterwear" className="cursor-pointer">Winterwear</label>
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={'ALL'} text2={'COLLECTIONS'}/>
          <select onChange={(e)=>setSortType(e.target.value)} name="" id="" className='border-2 border-gray-300 text-sm px-2'>
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {filterProducts.map((item, index)=>(
            <ProductItem  id={item._id}  key={index}  image={item.images} name={item.name}  price={item.price}/>

          ))}
        </div>
      </div>
    </div>
  )
}

export default Collection