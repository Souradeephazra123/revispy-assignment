"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { Controller, useForm, useFormState } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";
import { UserLogin } from "@/app/login/action";
import { useRouter } from "next/navigation";

const Login = () => {
  const [isHidden, setIsHidden] = React.useState(true);
  const router = useRouter();
  const { handleSubmit, setValue, watch, control } = useForm({
    mode: "onChange",
  });
  const { pending } = useFormStatus();
  const { isDirty, isValid, errors } = useFormState({ control });

  const onSubmit = async (formData: FormData) => {
 
    const userCredential = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };
    try {
      const res = await UserLogin(userCredential);
      console.log(res);

      if (res.message === "Login successful") {
        toast.success("Login successful");
        router.push("/categories");
      }
      if (res.message === "User not found") {
        toast.error("User not found");
      }
      if (res.message === "Incorrect password") {
        toast.error("Incorrect password");
      }
      if (res.message === "Error in login") {
        toast.error("Error in login");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className=" flex flex-col gap-5 p-6 border-[1px] border-[#C1C1C1]  rounded-2xl">
        <p className=" text-3xl font-bold text-center">Login</p>
        <p className=" text-xl font-semibold text-center">
          Welcome back to ECOMMERCE
        </p>
        <p className=" text-sm text-center">
          The next gen business marketplace
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" flex flex-col gap-5"
        >
          <Controller
            name="email"
            control={control}
            defaultValue={""}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
              },
            }}
            render={({ field }) => (
              <div className=" flex flex-col gap-2">
                {" "}
                <label>
                  Email <span className=" text-red-600">*</span>
                </label>
                <input
                  {...field}
                  type="text"
                  placeholder="Enter Email ID"
                  className=" w-96 bg-Black rounded-lg p-2 placeholder:text-Grey-7 border-[1px] border-[#C1C1C1]"
                />
                {errors.email && (
                  <p className=" text-red-600">{typeof errors.email?.message === 'string' && errors.email.message}</p>
                )}
              </div>
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue={""}
            rules={{
              required: "password is required",
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                message:
                  "Minimum eight characters, at least one letter and one number",
              },
            }}
            render={({ field }) => (
              <div className=" flex flex-col gap-2">
                {" "}
                <label>
                  Password <span className=" text-red-600">*</span>
                </label>
                <div className="relative">
                  <input
                    {...field}
                    type="text"
                    placeholder="Enter password"
                    className=" w-96 bg-Black rounded-lg p-2 placeholder:text-Grey-7 border-[1px] border-[#C1C1C1]"
                  />
                  <button
                    type="button"
                    onClick={() => setIsHidden(!isHidden)}
                    className="absolute right-2 top-2 text-sm text-blue-500"
                  >
                    {isHidden ? "Hide" : "Show"}
                  </button>
                </div>
                {errors.password && (
                  <p className=" text-red-600">{typeof errors.password?.message === 'string' && errors.password.message}</p>
                )}
              </div>
            )}
          />
          <button
            disabled={!isValid}
            type="submit"
            className={` ${
              isValid ? "bg-black text-white" : " bg-gray-400 text-white"
            }  font-semibold  rounded-md py-2`}
          >
            Submit
          </button>
        </form>

        <p className=" text-sm text-center">
          Don't have an account? &nbsp;{" "}
          <Link href={"/signup"} className=" font-bold ">
            SIGNUP
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
