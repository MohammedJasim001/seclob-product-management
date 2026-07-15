import { Types } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  wishlist: Types.ObjectId[];
}
