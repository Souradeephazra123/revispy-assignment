'use server';
import Categories from "@/components/Categories";
import Login from "@/components/Login";
import SignUp from "@/components/SignUp";
import Verify from "@/components/Verify";
import Image from "next/image";
import { permanentRedirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore =await cookies();
  const userCookie = cookieStore?.get("userProfile");
  const userData = userCookie ? userCookie.value : null;
  if (userData) {
    return permanentRedirect("/categories"); // Redirect to the home page
  } else {
    return permanentRedirect("/login");
  }
}
