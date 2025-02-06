import "server-only";

import type { Model } from "mongoose";
import { model, models, Schema } from "mongoose";

import { DB_MODELS } from "@/utils/index";

export interface IUser {
  email: string;
  name: string;
  password: string;
  isVerified?: boolean;
  otp?: string;
  refreshToken?: string;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    otp: { type: String },
    refreshToken: { type: String },
  },
  { timestamps: true }
);

export const User =
  (models[DB_MODELS.USER] as Model<IUser>) ?? model(DB_MODELS.USER, userSchema);
