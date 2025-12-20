import asyncHandler from 'express-async-handler';
import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

const addProduct = asyncHandler(async (req, res) => {
    const { name, description, price, category, subCategory, sizes, bestSeller } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

    if (images.length === 0) {
        return res.status(400).json({ success: false, message: "At least one image is required" });
    }

    let imagesUrl = await Promise.all(
        images.map(async (item) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { resource_type: 'image', folder: 'products' },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result.secure_url);
                    }
                );
                stream.end(item.buffer); 
            });
        })
    );

    const productData = {
        name,
        description,
        price: Number(price),
        category,
        subCategory,
        bestSeller: bestSeller === 'true' || bestSeller === true,
        sizes: JSON.parse(sizes),
        images: imagesUrl,
        date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();
    res.json({ success: true, message: "Product Added Successfully" });
});

const listProducts = asyncHandler(async (req, res) => {
    const products = await productModel.find({});
    res.json({ success: true, products });
});

const removeProducts = asyncHandler(async (req, res) => {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product Removed" });
});

const singleProduct = asyncHandler(async (req, res) => {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
});

export { listProducts, addProduct, removeProducts, singleProduct };
