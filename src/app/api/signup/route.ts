import { User } from "@/models/users";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (req: NextRequest) => {
  try {
    const { email, name, password } = await req.json();

    if (!email || !name || !password) {
      return NextResponse.json("Missing required fields", { status: 400 });
    }

    const isUseExists = await User.exists({ email });

    if (isUseExists) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      email,
      name,
      isVerified: false,
      password: hashedPassword,
    });
    await user.save();

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
