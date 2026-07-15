import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addProductApi,
  fetchAllProductsApi,
  fetchProductsBySubCategoryApi,
  fetchSingleProductApi,
} from "../../services/product.service";
import type { AxiosError } from "axios";
import type { IProducts } from "../../types/productTypes";

//add new category
export const addProductThunk = createAsyncThunk<
  { message: string; newProduct: IProducts },
  FormData,
  { rejectValue: string }
>("product/create", async (formData, { rejectWithValue }) => {
  try {
    const res = await addProductApi(formData);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error.response?.data?.message || "Product add failed",
    );
  }
});

//fetch all products
export const fetchAllProductsThunk = createAsyncThunk<
  { message: string; products: IProducts[] },
  void,
  { rejectValue: string }
>("product/fetch-sub", async (_, { rejectWithValue }) => {
  try {
    const res = await fetchAllProductsApi();
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error.response?.data?.message || "Product fetch failed",
    );
  }
});

//fetch products by sub category
export const fetchProductsBySubCategoryThunk = createAsyncThunk<
  { message: string; products: IProducts[] },
  string,
  { rejectValue: string }
>("product/fetch", async (subCategoryId, { rejectWithValue }) => {
  try {
    const res = await fetchProductsBySubCategoryApi(subCategoryId);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error.response?.data?.message || "Product fetch failed",
    );
  }
});

//fetch single products
export const fetchSingleProductsThunk = createAsyncThunk<
  { message: string; product: IProducts },
  string,
  { rejectValue: string }
>("product/fetch-single", async (productId, { rejectWithValue }) => {
  try {
    const res = await fetchSingleProductApi(productId);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error.response?.data?.message || "Product fetch failed",
    );
  }
});
