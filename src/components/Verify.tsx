"use client";
import React from "react";
import { toast, ToastContainer } from "react-toastify";
import OTPInput from "./OTP";
import { matchotp } from "@/app/verify/action";
import { useRouter } from "next/navigation";

const Verify = () => {
  const router = useRouter();
  const onOTPSubmit = async (otp) => {
    const res = await matchotp(otp);
    if (res) {
      router.push("/categories");
    } else {
      toast.error("Invalid OTP");
      console.error("Invalid otp");
    }
  };
  const resetOtpInput = () => {};
  return (
    <div className="flex justify-center  items-start mt-10 min-h-screen">
      <div className=" flex flex-col gap-5 p-6 border-[1px] border-[#C1C1C1]  rounded-2xl text-center">
        <p className=" text-3xl font-bold">Verify your email</p>
        <p className=" text-sm text-center">
          Enter the 8 digit code you have received on dev***@revispy.com
        </p>
        <p className=" text-left">Code</p>
        <OTPInput
          length={8}
          onOTPSubmit={onOTPSubmit}
          resetOtpInput={resetOtpInput}
        />
        <button
          type="submit"
          className=" bg-black text-white text-center rounded flex items-center justify-center px-3 py-1"
        >
          VERIFY
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Verify;
