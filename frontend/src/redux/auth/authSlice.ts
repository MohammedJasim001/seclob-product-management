import { createSlice } from "@reduxjs/toolkit";
import {
  forgotPasswordThunk,
  loginUserThunk,
  logoutThunk,
  registerUserThunk,
} from "./authThunk";
import type { AuthState } from "./authTypes";

const initialState: AuthState = {
  loading: false,
  error: null,
  success: false,
  message: "",
  logoutSuccess: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthSlice: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.message = "";
      state.logoutSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      })

      .addCase(registerUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //login
      .addCase(loginUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.message = action.payload.message;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //login
      .addCase(forgotPasswordThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPasswordThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.message = action.payload.message;
      })
      .addCase(forgotPasswordThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //logout
      .addCase(logoutThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.logoutSuccess = false;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.logoutSuccess = true;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.logoutSuccess = false;
      });
  },
});

export default authSlice.reducer;
export const { resetAuthSlice } = authSlice.actions;
