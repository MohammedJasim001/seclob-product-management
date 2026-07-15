import { Types } from "mongoose";

export interface IVarients {
  ram: string;
  price: number;
  qty: number;
}

export interface IProducts {
  title: string;
  subCategory: Types.ObjectId;
  description: string;
  images: string[];
  variants: [IVarients];
}
