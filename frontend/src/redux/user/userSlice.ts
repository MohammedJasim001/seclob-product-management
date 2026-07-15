import { createSlice } from "@reduxjs/toolkit";
import { fetchCurrentUserThunk, wishlistThunk } from "./userThunk";
import type { UserState } from "./userTypes";

const initialState: UserState = {
  loading: false,
  error: null,
  success: false,
  message: "",
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUserSlic: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch currentuser
      .addCase(fetchCurrentUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUserThunk.fulfilled, (state, action) => {
        console.log("first");
        state.loading = false;
        state.success = true;
        state.user = action.payload;
      })

      .addCase(fetchCurrentUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // user wishlist
      .addCase(wishlistThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(wishlistThunk.fulfilled, (state, action) => {
        console.log("first");
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
        if (state.user) {
          state.user.wishlist = action.payload.wishlist;
        }
      })

      .addCase(wishlistThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
export const { resetUserSlic } = userSlice.actions;
