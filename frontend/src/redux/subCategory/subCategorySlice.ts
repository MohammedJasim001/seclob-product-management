import { createSlice } from "@reduxjs/toolkit";
import type { SubCategoryState } from "./subCategoryTypes";
import { addSubCategoryThunk } from "./subCategoryThunk";


const initialState: SubCategoryState = {
  loading: false,
  error: null,
  success: false,
  message: "",
};

const subCategorySlice = createSlice({
  name: "subCategory",
  initialState,
  reducers: {
    resetSubCategorySlice: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // add new categories
      .addCase(addSubCategoryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSubCategoryThunk.fulfilled, (state, action) => {
        console.log("first");
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      })

      .addCase(addSubCategoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

  },
});

export default subCategorySlice.reducer;
export const { resetSubCategorySlice } = subCategorySlice.actions;
