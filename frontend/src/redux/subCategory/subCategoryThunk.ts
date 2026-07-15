import { createAsyncThunk } from "@reduxjs/toolkit";
import { addSubCategoryApi } from "../../services/subCategory.service";
import type { SubCategoryPayload } from "./subCategoryTypes";
import type { AxiosError } from "axios";
import type { SubCategory } from "../../types/categoryTypes";

//add new sub category
export const addSubCategoryThunk = createAsyncThunk<
  { message: string; newSubCategory: SubCategory },
  SubCategoryPayload,
  { rejectValue: string }
>("subcategory/create", async (SubCategoryPayload, { rejectWithValue }) => {
  try {
    const res = await addSubCategoryApi(SubCategoryPayload);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Sub category add failed",
    );
  }
});
