import React, { useState } from 'react'
import { assets } from '../assets/assets.js'
import axios from 'axios';
import { backendUrl } from '../App.jsx';
import { toast } from 'react-toastify';

function Add({ token }) {

  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestSeller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);
  
  const [loading, setLoading] = useState(false);

  const toggleSize = (size) => {
    setSizes(prev => 
      prev.includes(size) 
      ? prev.filter(item => item !== size)
      : [...prev, size]
    );
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    if (loading) return;

    try {
      setLoading(true);

      const formData = new FormData()
      formData.append('name', name)
      formData.append('description', description)
      formData.append('price', price)
      formData.append('category', category)
      formData.append('subCategory', subCategory)
      formData.append('bestSeller', bestSeller)
      formData.append('sizes', JSON.stringify(sizes))

      image1 && formData.append('image1', image1)
      image2 && formData.append('image2', image2)
      image3 && formData.append('image3', image3)
      image4 && formData.append('image4', image4)

      const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { Authorization: `Bearer ${token}` } });

      if (response.data.success) {
        toast.success(response.data.message);
        
        setName('')
        setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice('')
        setSizes([])
        setBestSeller(false)
        setCategory("Men")
        setSubCategory("Topwear")

      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      
      <div className='w-full'>
        <p className='mb-3 font-medium text-gray-700'>Upload Product Images</p>
        <div className="flex gap-3 flex-wrap">
          <label htmlFor="image1" className='cursor-pointer group'>
            <img className='w-24 h-24 object-cover border-2 border-dashed border-gray-300 rounded-lg group-hover:border-black transition-all' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
            <input onChange={(e) => setImage1(e.target.files[0])} type="file" id='image1' hidden />
          </label>
          <label htmlFor="image2" className='cursor-pointer group'>
            <img className='w-24 h-24 object-cover border-2 border-dashed border-gray-300 rounded-lg group-hover:border-black transition-all' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
            <input onChange={(e) => setImage2(e.target.files[0])} type="file" id='image2' hidden />
          </label>
          <label htmlFor="image3" className='cursor-pointer group'>
            <img className='w-24 h-24 object-cover border-2 border-dashed border-gray-300 rounded-lg group-hover:border-black transition-all' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
            <input onChange={(e) => setImage3(e.target.files[0])} type="file" id='image3' hidden />
          </label>
          <label htmlFor="image4" className='cursor-pointer group'>
            <img className='w-24 h-24 object-cover border-2 border-dashed border-gray-300 rounded-lg group-hover:border-black transition-all' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
            <input onChange={(e) => setImage4(e.target.files[0])} type="file" id='image4' hidden />
          </label>
        </div>
      </div>

      <div className='w-full max-w-[500px] mt-4'>
        <p className='mb-2 font-medium'>Product Name</p>
        <input onChange={(e) => setName(e.target.value)} value={name} className='w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-black' type="text" placeholder='Type here...' required />
      </div>

      <div className='w-full max-w-[500px]'>
        <p className='mb-2 font-medium'>Product Description</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='resize-none w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-black' placeholder='Write content here...' rows={4} required />
      </div>

      <div className='flex flex-col sm:flex-row gap-4 w-full sm:gap-8'>
        <div>
          <p className='mb-2 font-medium'>Product Category</p>
          <select onChange={(e) => setCategory(e.target.value)} value={category} className='w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-black bg-white'>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className='mb-2 font-medium'>Sub Category</p>
          <select onChange={(e) => setSubCategory(e.target.value)} value={subCategory} className='w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-black bg-white'>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className='mb-2 font-medium'>Product Price</p>
          <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-black sm:w-[120px]' type="number" placeholder='25' required />
        </div>
      </div>

      <div className='mt-4 w-full'>
        <p className='mb-2 font-medium'>Product Sizes</p>
        <div className='flex gap-3 flex-wrap'>
          {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
            <div key={size} onClick={() => toggleSize(size)}>
              <p className={`${sizes.includes(size) ? "bg-pink-100 border-pink-400" : "bg-gray-100 border-gray-200"} px-4 py-2 rounded-lg cursor-pointer hover:border-gray-400 border transition-all font-medium`}>
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className='flex items-center gap-2 mt-4 cursor-pointer'>
        <input onChange={() => setBestSeller(prev => !prev)} checked={bestSeller} type="checkbox" id='bestseller' className='w-4 h-4 accent-black cursor-pointer' />
        <label htmlFor="bestseller" className='cursor-pointer text-gray-700 font-medium'>Add to Bestseller</label>
      </div>

      <button  type='submit'  disabled={loading} className={`mt-8 w-full max-w-[200px] py-3 rounded-lg font-semibold text-white shadow-md transition-all 
          ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800 active:scale-95'} `}>
        {loading ? 'Adding...' : 'ADD PRODUCT'}
      </button>

    </form>
  )
}

export default Add