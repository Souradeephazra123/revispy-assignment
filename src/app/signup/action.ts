"use server";

import { User } from "@/models/users";
import { InitDB } from "@/providers/init-db";
import dotenv from "dotenv";
dotenv.config();

interface SignUpFormData {
  email: string;
  name: string;
  password: string;
}

export async function signUp(formData: SignUpFormData) {
  console.log("processing signup");
  console.log("base url", process.env.BASE_URL);
  const response = await fetch(`${process.env.BASE_URL}/api/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  return response.json();
}

export async function sendOTP(recipient: string) {
  console.log("sending otp");
  const generateOTP = Math.floor(10000000 + Math.random() * 90000000);
  // await User.updateOne({ email: recipient }, { otp: generateOTP });
  // const response = await fetch(`${process.env.BASE_URL}/signup/api`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ recipient, otp: generateOTP }),
  // });

  await InitDB();
  const updatePromise = User.updateOne(
    { email: recipient },
    { otp: generateOTP }
  );
  const apiRequestPromise = fetch(`${process.env.BASE_URL}/signup/api`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ recipient, otp: generateOTP }),
  });

  console.log("updatePromise and apiRequestPromise created");
  // Wait for both operations to complete
  const [updateResult, apiResponse] = await Promise.all([
    updatePromise,
    apiRequestPromise,
  ]);
  console.log("updateResult updated");

  // Check the API response
  const responseJson = await apiResponse.json();

  return responseJson;
}
