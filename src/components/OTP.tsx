"use client";
import React, { useEffect, useRef, useState } from "react";

const OTPInput = ({ length = 6, onOTPSubmit, resetOtpInput }) => {
  const [otp, setotp] = useState(new Array(length).fill(""));

  const inputRefs = useRef([]);


  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, e) => {
    const value = e.target.value;

    if (isNaN(value)) return;

    const newOTP = [...otp];
    //alow only one input
    newOTP[index] = value.substring(value.length - 1);
    setotp(newOTP);

    //trigger submit
    const combineOTP = newOTP.join("");
    // console.log(combineOTP, newOTP);
    if (combineOTP.length === length) {
      onOTPSubmit(combineOTP);
      resetOtpInput();
    }

    //move to next inout field if this is filled

    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);

    //optional
    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      //moving focus to previous input field on backspace
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className=" flex gap-2 justify-center">
      {otp.map((value, index) => {
        return (
          <div key={index}>
            <input
              type="text"
              key={index}
              ref={(input) => {
                inputRefs.current[index] = input;
              }}
              value={value}
              onChange={(e) => handleChange(index, e)}
              onClick={() => handleClick(index)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className=" border-gray-400 w-7 h-7 gap-2 text-center border-[0.5px] rounded bg-transparent"
            />
          </div>
        );
      })}
    </div>
  );
};

export default OTPInput;
