import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected To DB ^_^');
  } catch (err) {
    console.error('Connection Failed To DB!', err);
    process.exit(1);
  }
};

export default connectDB;
