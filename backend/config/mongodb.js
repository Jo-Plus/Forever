import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "forever",
    });

    isConnected = db.connections[0].readyState;
    console.log("Connected To DB ^_^");
  } catch (err) {
    console.error("Connection Failed To DB!", err);
    throw err;
  }
};

export default connectDB;
