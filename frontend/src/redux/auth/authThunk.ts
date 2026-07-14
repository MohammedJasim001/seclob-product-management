import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import type {
  ForgotPasswordPayload,
  LoginPayload,
  RegisterPayload,
  RegisterResponse,
} from "./authTypes";
import {
  forgotPasswordApi,
  loginUserApi,
  registerUserApi,
} from "../../services/auth.service";

export const registerUserThunk = createAsyncThunk<
  RegisterResponse,
  RegisterPayload,
  { rejectValue: string }
>("auth/register", async (userData, { rejectWithValue }) => {
  try {
    const res = await registerUserApi(userData);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Registration Failed",
    );
  }
});

//login
export const loginUserThunk = createAsyncThunk<
  { message: string },
  LoginPayload,
  { rejectValue: string }
>("auth/login", async (data, { rejectWithValue }) => {
  try {
    const res = await loginUserApi(data);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(error?.response?.data?.message || "Login Failed");
  }
});

//forgot password
export const forgotPasswordThunk = createAsyncThunk<
  { message: string },
  ForgotPasswordPayload,
  { rejectValue: string }
>("auth/forgot-password", async (data, { rejectWithValue }) => {
  try {
    const res = await forgotPasswordApi(data);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Forgot password Failed",
    );
  }
});
