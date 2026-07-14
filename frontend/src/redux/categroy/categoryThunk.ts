import { createAsyncThunk } from "@reduxjs/toolkit";
import { addCategoryApi } from "../../services/category.service";
import type { AxiosError } from "axios";

export const addCategoryThunk = createAsyncThunk<
  { message: string },
  string,
  { rejectValue: string }
>("category/create", async (categoryName, { rejectWithValue }) => {
  try {
    const res = await addCategoryApi(categoryName);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Category add failed",
    );
  }
});
