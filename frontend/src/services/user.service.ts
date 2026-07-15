import apiClient from "../lib/axios";

export const fetchCurrentUserApi = () => {
  return apiClient.get("/user");
};

export const wishlistApi = (productId: string) => {
  return apiClient.patch(`/user/wishlist/${productId}`);
};
