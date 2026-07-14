import { createSlice } from "@reduxjs/toolkit";
import type { CategoryState } from "./categoryTypes";
import { addCategoryThunk } from "./categoryThunk";

const initialState: CategoryState = {
  loading: false,
  error: null,
  success: false,
  message: "",
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    resetCategorySlice: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCategoryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCategoryThunk.fulfilled, (state, action) => {
        console.log('first')
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      })

      .addCase(addCategoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
export const { resetCategorySlice } = categorySlice.actions;
