'use server';
import { User } from "@/models/users";
import { InitDB } from "@/providers/init-db";
import { cookies } from "next/headers";

export async function matchotp(otp:string) {

    await InitDB();
    const cookieStore =await cookies();
    const userCookie = cookieStore?.get("userProfile");
    const userData = userCookie ? userCookie.value : null;
    const parsedData = userData ? JSON.parse(userData) : null;
    const email=parsedData.email;

    const getUser=await User.findOne({email:email});
    const otps = getUser?.otp;
    const matchedOTP = otps !== undefined && +otps === +otp;
    return matchedOTP;
}