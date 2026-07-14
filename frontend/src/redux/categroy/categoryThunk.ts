import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addCategoryApi,
  fetchAllCategoriesApi,
} from "../../services/category.service";
import type { AxiosError } from "axios";
import type { Category } from "../../types/categoryTypes";

//add new category
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

//fetch all categories
export const fetchAllCategoriesThunk = createAsyncThunk<
  Category[],
  void,
  { rejectValue: string }
>("category/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const res = await fetchAllCategoriesApi();
    return res.data.categories;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Category add failed",
    );
  }
});
