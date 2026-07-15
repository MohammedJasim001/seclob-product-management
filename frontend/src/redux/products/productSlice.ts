import { createSlice } from "@reduxjs/toolkit";
import { addProductThunk } from "./productThunk";
import type { ProductState } from "./productType";

const initialState: ProductState = {
  loading: false,
  error: null,
  success: false,
  message: "",
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
        state.message = action.payload.message;
      })

      .addCase(addProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
export const { resetProductSlice } = productSlice.actions;
