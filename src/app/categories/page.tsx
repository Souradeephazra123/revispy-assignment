"use server";
import Categories from "@/components/Categories";
import { cookies } from "next/headers";
import { permanentRedirect } from "next/navigation";
import React from "react";
import { GetCategories } from "./action";
import { InitDB } from "@/providers/init-db";

const page = async () => {
  await InitDB();
  const cookieStore = await cookies();
  const userCookie = cookieStore && cookieStore?.get("userProfile");
  const userData: string | null = userCookie ? userCookie.value : null;
  const parsedData = userData ? JSON.parse(userData) : null;
  if (!parsedData || parsedData === null || parsedData === undefined) {
    permanentRedirect("/login");
  }

  const userCategories = await GetCategories(parsedData);
  const categories = Array.isArray(userCategories) ? userCategories : [];
  return (
    <div>
      <Categories user={parsedData} allcategories={categories} />
    </div>
  );
};

export default page;
