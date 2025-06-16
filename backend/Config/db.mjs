import { log } from "console";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/watchstore");
    log("DB Connected");
  } catch (error) {
    log("MongoDB connection error:", error);
  }
};

export default connectDB;
