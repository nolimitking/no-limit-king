import mongoose from "mongoose";

const connectDB = async (params) => {
  try {
    await mongoose.connect(process.env.CONNECT_DB);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default connectDB;
