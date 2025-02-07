"use server";
import { Categories } from "@/models/categories";
import { User } from "@/models/users";
import { InitDB } from "@/providers/init-db";
import { userprofile } from "@/utils/types";

export async function saveCategories(
  userData: userprofile,
  categories: string[]
) {
  try {
    await InitDB();
    const email = userData.email;

    const getUser = await User.findOne({ email: email });
    const userId = getUser?._id;

    const data = {
      userId: userId,
      choices: categories,
    };
    await Categories.findOneAndUpdate(
      { userId },
      { $set: data },
      { upsert: true, new: true }
    );

    return { message: "Saved categories sucessfully" };
  } catch (error) {
    console.error(error);
    return { message: "Error in saving categories" };
  }
}

export async function GetCategories(userData: userprofile) {
  try {
    await InitDB();
    const email = userData?.email;
    const getUser = await User.findOne({ email: email });
    const userId = getUser?._id;
    const CategoriesData = await Categories.findOne({ userId });
    return CategoriesData?.choices ?? [];
  } catch (error) {
    console.error(error);
    return { message: "Error in getting categories" };
  }
}
