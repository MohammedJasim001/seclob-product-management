import User from "../models/userModel";
import CustomError from "../utils/CustomError";
import { Types } from "mongoose";

//fetch current u
export const fetchCurrentUser = async (userId: string) => {
  return await User.findById(userId).populate("wishlist");
};

// whishlist
export const toggleWishlist = async (
  userId: Types.ObjectId,
  productId: string,
) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new CustomError("User not found", 404);
  }

  const exists = user.wishlist.some((id) => id.toString() === productId);

  let message = "";

  if (exists) {
    user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
    message = "Product removed from wishlist";
  } else {
    user.wishlist.push(new Types.ObjectId(productId));
    message = "Product added to wishlist";
  }

  await user.save();

  await user.populate("wishlist");

  return {
    message,
    wishlist: user.wishlist,
  };
};
