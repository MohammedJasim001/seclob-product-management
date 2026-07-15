import mongoose from "mongoose";
import { IProducts, IVarients } from "../types/productTypes";

const variantSchema = new mongoose.Schema<IVarients>(
  {
    ram: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  { _id: false },
);

const productSchema = new mongoose.Schema<IProducts>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategories",
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    images: [
      {
        type: String,
      },
    ],

    variants: [variantSchema],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Product", productSchema);
