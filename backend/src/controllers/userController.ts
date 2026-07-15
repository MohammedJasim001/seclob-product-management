import catchAsync from "../utils/catchAsync";
import * as UserService from "../services/userService";

export const fetchCurrentUser = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const user = await UserService.fetchCurrentUser(userId);
  res.status(200).json(user);
});

//wishlist
export const toggleWishlist = catchAsync(async (req, res) => {
  const { productId } = req.params;

  const result = await UserService.toggleWishlist(req.user, productId);

  res.status(200).json(result);
});
