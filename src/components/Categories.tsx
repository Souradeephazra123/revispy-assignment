"use client";
import { interests } from "@/utils/store";
import React from "react";
import { useFormStatus } from "react-dom";
import { Controller, useForm, useFormState } from "react-hook-form";
import { Pagination } from "./ui/pagination";
import { useSetSearchParams } from "@/hooks/use-set-search-params";
import { toast, ToastContainer } from "react-toastify";
import { saveCategories } from "@/app/categories/action";

interface userprofile {
  name: string;
  email: string;
  password: string;
}

const Categories = ({
  user,
  allcategories,
}: {
  user: userprofile;
  allcategories: string[];
}) => {
  const getAllCategories = allcategories;
  console.log(" initially all categories", getAllCategories);
  const { handleSubmit, setValue, watch, control } = useForm({
    mode: "onChange",
  });

  const { pending } = useFormStatus();
  const { isDirty, isValid, errors } = useFormState({ control });

  const { searchParams, setSearchParam } = useSetSearchParams();
  const totalPage = interests.length / 5;
  const page = searchParams.get("page") || 1;
  const pageItems = interests.slice((+page - 1) * 5, +page * 5);

  const checkedItems: string[] = [];
  allcategories?.forEach((element) => {
    if (pageItems.map((i) => i.name).includes(element)) {
      checkedItems.push(element);
    }
  });

  const onSubmit = async (formData: FormData) => {
    const selectedCategories = Object.keys(formData).filter(
      (key) => formData[key] === true
    );
    console.log("selected items", selectedCategories);

    const unCheckedCategories = Object.keys(formData).filter(
      (key) => formData[key] === false || undefined
    );
    console.log("unchecked items", unCheckedCategories);

    getAllCategories?.filter((item) => !unCheckedCategories.includes(item));

    //remove unchecked items , previously checked items
    unCheckedCategories?.forEach((item) => {
      const index = getAllCategories?.indexOf(item);
      if (index > -1) {
        getAllCategories.splice(index, 1);
      }
    });

    //add newly checked items
    selectedCategories?.forEach((item) => {
      if (!getAllCategories?.includes(item)) {
        getAllCategories?.push(item);
      }
    });

    console.log("results items", getAllCategories);

    try {
      const res = await saveCategories(user, getAllCategories);
      if (res.message === "Saved categories sucessfully") {
        toast.success("Categories saved successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to submit form");
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen mt-10">
        <div className=" flex flex-col gap-5 p-6 border-[1px] border-[#C1C1C1]  rounded-2xl">
          <p className=" text-3xl font-bold">Please mark your interests!</p>
          <p className=" text-sm">We will keep you notified</p>

          <p>My saved interests!</p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" flex flex-col gap-5"
          >
            <div className=" flex flex-col gap-4">
              {pageItems.map((item, idx) => {
                return (
                  <div key={idx} className="flex items-center gap-2">
                    <Controller
                      name={`${item.name}`}
                      control={control}
                      render={({ field }) => (
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            id={item.name}
                            defaultChecked={checkedItems?.includes(item.name)}
                            className="hidden"
                            {...field}
                            checked={field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                          />
                          <span className="w-4 h-4 border border-gray-400 rounded-sm flex items-center justify-center transition-colors">
                            <svg
                              className="w-3 h-3 text-white fill-current hidden"
                              viewBox="0 0 18 18"
                            >
                              <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                            </svg>
                          </span>
                          <span className="ml-2">{item.name}</span>
                        </label>
                      )}
                    />
                  </div>
                );
              })}
            </div>
            <button
              disabled={!isValid}
              type="submit"
              className={` ${
                isValid ? "bg-black text-white" : " bg-gray-400 text-white"
              }  font-semibold  rounded-md py-2 min-w-full`}
            >
              Save
            </button>
          </form>
          <Pagination page={+page} total={totalPage} />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Categories;
