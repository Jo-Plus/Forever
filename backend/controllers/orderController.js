import asyncHandler from "express-async-handler";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const currency = "inr";
const deliveryCharge = 10;

// ===============================
// Place Order
// ===============================
const placeOrder = asyncHandler(async (req, res) => {
  const { userId, items, amount, address } = req.body;

  if (!userId || !items || items.length === 0) {
    res.status(400);
    throw new Error("Invalid order data");
  }

  const orderData = {
    userId,
    items,
    amount,
    address,
    paymentMethod: "COD",
    payment: false,
    date: Date.now(),
  };

  const newOrder = await orderModel.create(orderData);

  await userModel.findByIdAndUpdate(userId, { cartData: {} });

  res.json({
    success: true,
    message: "Order Placed Successfully",
    order: newOrder,
  });
});

// ===============================
// Place Order using Stripe
// ===============================
const placeOrderStripe = asyncHandler(async (req, res) => {
  const { userId, items, amount, address } = req.body;
  const { origin } = req.headers;

  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(500).json({
      success: false,
      message: "Stripe configuration missing on server (Check .env)",
    });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const orderData = {
    userId,
    items,
    amount,
    address,
    paymentMethod: "Stripe",
    payment: false,
    date: Date.now(),
  };

  const newOrder = new orderModel(orderData);
  await newOrder.save();

  const line_items = items.map((item) => ({
    price_data: {
      currency: currency,
      product_data: {
        name: item.name,
      },
      unit_amount: item.price * 100,
    },
    quantity: item.quantity,
  }));

  line_items.push({
    price_data: {
      currency: currency,
      product_data: {
        name: "Delivery Charges",
      },
      unit_amount: deliveryCharge * 100,
    },
    quantity: 1,
  });

  const session = await stripe.checkout.sessions.create({
    success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
    cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
    line_items,
    mode: "payment",
  });

  res.json({ success: true, session_url: session.url });
});

const placeOrderRazorpay = async (req, res) => {};

// ===============================
// Place Order using Razorpay
// ===============================
const verifyStripe = asyncHandler(async (req, res) => {
  const { orderId, success, userId } = req.body;
  if (success === "true") {
    await orderModel.findByIdAndUpdate(orderId, { payment: true });
    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    res.json({ success: true });
  } else {
    await orderModel.findByIdAndDelete(orderId);
    res.json({ success: false });
  }
  res.json({ success: false, message: "Razorpay not implemented yet" });
});

// ===============================
// Get All Orders (Admin)
// ===============================
const allOrders = asyncHandler(async (req, res) => {
  const orders = await orderModel.find({});
  res.json({ success: true, orders });
});

// ===============================
// Get User Orders (Frontend)
// ===============================
const userOrders = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    res.status(400);
    throw new Error("User ID is required");
  }

  const orders = await orderModel.find({ userId });
  res.json({ success: true, orders });
});

// ===============================
// Update Order Status (Admin)
// ===============================
const updateStatus = asyncHandler(async (req, res) => {
  const { orderId, status } = req.body;

  if (!orderId || !status) {
    res.status(400);
    throw new Error("Order ID and status are required");
  }

  await orderModel.findByIdAndUpdate(orderId, { status });

  res.json({
    success: true,
    message: "Order Status Updated Successfully",
  });
});

export {
  placeOrder,
  verifyStripe,
  placeOrderStripe,
  allOrders,
  updateStatus,
  userOrders,
  placeOrderRazorpay,
};
