import "server-only";

import type { Model,Types } from "mongoose";
import { model, models, Schema } from "mongoose";

import { DB_MODELS } from "@/utils/index";

export interface Iategories {
userId:Types.ObjectId;
choices:string[]
}

const categoriesSchema = new Schema<Iategories>(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    choices: { type: [String] },
  },
  { timestamps: true }
);

export const Categories =
  (models[DB_MODELS.Categories] as Model<Iategories>) ?? model(DB_MODELS.Categories, categoriesSchema);
