import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addCategoryApi,
  fetchAllCategoriesApi,
} from "../../services/category.service";
import type { AxiosError } from "axios";
import type { Category } from "../../types/categoryTypes";

//add new category
export const addCategoryThunk = createAsyncThunk<
  { message: string; newCategory: Category },
  string,
  { rejectValue: string }
>("category/create", async (categoryName, { rejectWithValue }) => {
  try {
    const res = await addCategoryApi(categoryName);
    console.log(res.data,'aaaa')
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
    return res.data.result;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Category add failed",
    );
  }
});
