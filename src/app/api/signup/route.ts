import { User } from "@/models/users";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { InitDB } from "@/providers/init-db";

export const POST = async (req: NextRequest) => {
  try {
    console.log("Received request");
    const { email, name, password } = await req.json();
    console.log("Parsed request body");
    if (!email || !name || !password) {
      return NextResponse.json("Missing required fields", { status: 400 });
    }

    // Initialize database connection
    await InitDB();
    
    console.log("Checking if user exists");
    const isUseExists = await User.exists({ email });

    if (isUseExists) {
      console.log("User already exists");
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }
    console.log("Generating salt");
    const salt = await bcrypt.genSalt(10);
    console.log("Hashing password");
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log("Creating new user");
    const user = new User({
      email,
      name,
      isVerified: false,
      password: hashedPassword,
    });
    await user.save();
    console.log("User created successfully");

    return NextResponse.json(
      {
        message: "User created successfully",
      },
      {
        status: 201,
        statusText: "Created User",
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json("An error occurred", { status: 500 });
  }
};
