import { createSlice } from "@reduxjs/toolkit";
import {
  addProductThunk,
  fetchAllProductsThunk,
  fetchProductsBySubCategoryThunk,
  fetchSingleProductsThunk,
} from "./productThunk";
import type { ProductState } from "./productType";

const initialState: ProductState = {
  loading: false,
  error: null,
  success: false,
  message: "",
  allProducts: [],
  subCategoryProducts: [],
  singleProduct: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetProductSlice: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // add new product
      .addCase(addProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.allProducts = [...state.allProducts, action.payload.newProduct];
        state.message = action.payload.message;
      })

      .addCase(addProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetch products
      .addCase(fetchAllProductsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.allProducts = action.payload.products;
      })

      .addCase(fetchAllProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetch products
      .addCase(fetchProductsBySubCategoryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsBySubCategoryThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.subCategoryProducts = action.payload.products;
      })

      .addCase(fetchProductsBySubCategoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetch single products
      .addCase(fetchSingleProductsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.singleProduct = action.payload.product;
      })

      .addCase(fetchSingleProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
export const { resetProductSlice } = productSlice.actions;
