"use server";
import bcrypt from "bcryptjs";

import { User } from "@/models/users";

interface UserCredential {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
}

export async function UserLogin(userCredential: UserCredential): Promise<LoginResponse> {
  const { email, password } = userCredential;
  console.log(email, password);
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return { message: "User not found" };
    }
    console.log(user);

    if (!bcrypt.compare(password, user.password)) {
      return { message: "Incorrect password" };
    }
    return { message: "Login successful" };
  } catch (error) {
    console.error(error);
    return { message: "Error in login" };
  }
}
