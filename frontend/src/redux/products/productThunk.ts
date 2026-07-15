import { createAsyncThunk } from "@reduxjs/toolkit";
import { addProductApi } from "../../services/product.service";
import type { AxiosError } from "axios";

//add new category
export const addProductThunk = createAsyncThunk<
  { message: string },
  FormData,
  { rejectValue: string }
>("product/create", async (formData, { rejectWithValue }) => {
  try {
    console.log(formData,'fommmmmm')
    const res = await addProductApi(formData);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error.response?.data?.message || "Product add failed",
    );
  }
});
