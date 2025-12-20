import asyncHandler from "express-async-handler";
import userModel from "../models/userModel.js";

const addToCart = asyncHandler(async (req, res) => {
  const { userId, itemId, size } = req.body;
  const userData = await userModel.findById(userId);
  const cartData = await userData.cartData;
  if (cartData[itemId]) {
    if (cartData[itemId][size]) {
      cartData[itemId][size] += 1;
    } else {
      cartData[itemId][size] = 1;
    }
  }else{
    cartData[itemId] = {};
    cartData[itemId][size] = 1;
  }
  await userModel.findByIdAndUpdate(userId,{cartData})
  res.json({success:true , message:"Added To Cart"});
});

const updateCart = asyncHandler(async (req, res) => {
  const { userId, itemId, size, quantity } = req.body;
  const userData = await userModel.findById(userId);
  const cartData = await userData.cartData;
  cartData[itemId][size] = quantity;
  await userModel.findByIdAndUpdate(userId,{cartData})
  res.json({success:true , message:"Cart Updated"});
});

const getUserCart = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const userData = await userModel.findById(userId);
  const cartData = await userData.cartData;
  res.json({success:true, cartData});
});

export { addToCart, updateCart, getUserCart };
