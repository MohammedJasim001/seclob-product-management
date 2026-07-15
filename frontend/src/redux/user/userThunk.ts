import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import type { User } from "../../types/userTypes";
import { fetchCurrentUserApi, wishlistApi } from "../../services/user.service";
import type { IProducts } from "../../types/productTypes";

//fetch current user
export const fetchCurrentUserThunk = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>("user/fetch", async (_, { rejectWithValue }) => {
  try {
    const res = await fetchCurrentUserApi();
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "failed to fetch user",
    );
  }
});

//user wishlist
export const wishlistThunk = createAsyncThunk<
  { message: string; wishlist: IProducts[] },
  string,
  { rejectValue: string }
>("subcategory/create", async (productId, { rejectWithValue }) => {
  try {
    const res = await wishlistApi(productId);
    console.log(res.data, "jjjjjj");
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "failed to fetch user",
    );
  }
});
