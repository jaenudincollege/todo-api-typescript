import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "");
    console.log("Database connected");
  } catch (error) {
    console.log("Database failed to connect");
    process.exit(1);
  }
};

export default connectDatabase;
