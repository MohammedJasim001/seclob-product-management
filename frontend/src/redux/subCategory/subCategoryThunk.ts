import { createAsyncThunk } from "@reduxjs/toolkit";
import { addSubCategoryApi } from "../../services/subCategory.service";
import type { SubCategoryPayload } from "./subCategoryTypes";
import type { AxiosError } from "axios";

//add new sub category
export const addSubCategoryThunk = createAsyncThunk<
  { message: string },
  SubCategoryPayload,
  { rejectValue: string }
>("category/create", async (SubCategoryPayload, { rejectWithValue }) => {
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