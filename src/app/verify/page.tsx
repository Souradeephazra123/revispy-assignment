import Verify from "@/components/Verify";
import { InitDB } from "@/providers/init-db";
import { cookies } from "next/headers";
import React from "react";

const page =async () => {
  await InitDB();
  const cookieStore = await cookies();
  const userCookie = cookieStore && cookieStore?.get("userProfile");
  const userData: string | null = userCookie ? userCookie.value : null;
  const parsedData = userData ? JSON.parse(userData) : null;
  return (
    <div>
      <Verify email={parsedData?.email} />
    </div>
  );
};

export default page;
