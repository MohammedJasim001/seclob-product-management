import { createSlice } from "@reduxjs/toolkit";
import type { CategoryState } from "./categoryTypes";
import { addCategoryThunk, fetchAllCategoriesThunk } from "./categoryThunk";

const initialState: CategoryState = {
  loading: false,
  error: null,
  success: false,
  message: "",
  categories:[]
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
      // add new categories
      .addCase(addCategoryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCategoryThunk.fulfilled, (state, action) => {
        console.log("first");
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      })

      .addCase(addCategoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //fetch all categories
      .addCase(fetchAllCategoriesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCategoriesThunk.fulfilled, (state, action) => {
        console.log("first");
        state.loading = false;
        state.success = true;
        state.categories = action.payload;
      })

      .addCase(fetchAllCategoriesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
export const { resetCategorySlice } = categorySlice.actions;
