import { HeaderOptions, navItems } from "@/utils/store";
import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <>
      <div className=" flex flex-col gap-3 px-10">
        <div className=" flex gap-2 justify-end items-center end-0">
          {HeaderOptions.map((item, idx) => {
            return (
              <div key={idx} className="text-sm text-gray-500">
                {item.name}
              </div>
            );
          })}
        </div>
        <div className=" flex justify-between">
          <h1 className=" text-3xl font-bold">ECOMMERCE</h1>
          <div className="  flex gap-4  items-center">
            {navItems.map((item, idx) => {
              return (
                <div key={idx} className=" font-semibold">
                  {item.name}
                </div>
              );
            })}
          </div>
          <div className=" flex gap-5">
            <Image src="/Search.svg" width={30} height={30} alt="search" />
            <Image src="/Cart.svg" width={30} height={30} alt="cart" />
          </div>
        </div>
      </div>
      <div className=" flex gap-2 items-center justify-center bg-[#F4F4F4] w-full mt-3 py-1">
        <Image src={"/arrow.svg"} width={16} height={16} alt="arrow" />
        <p className=" font-medium text-sm">Get 10% off on business sign up</p>
        <Image
          src={"/arrow.svg"}
          width={16}
          height={16}
          alt="arrow"
          className=" rotate-180"
        />
      </div>
    </>
  );
};

export default Header;
