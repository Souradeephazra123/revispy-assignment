import "@/models/users";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

async function dbConnect() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("You are connected to MongoDB sucessfully");
  } catch (err) {
    console.log("Failed to connect to MongoDB", err);
  }
}

export async function InitDB() {
  await dbConnect();

  return null;
}
