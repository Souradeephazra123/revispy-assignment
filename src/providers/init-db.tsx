import "@/models/users";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

async function dbConnect() {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined in the environment variables");
    }
    await mongoose.connect(mongoUri);
    console.log("You are connected to MongoDB sucessfully");
  } catch (err) {
    console.log("Failed to connect to MongoDB", err);
  }
}

export async function InitDB() {
  await dbConnect();

  return null;
}
