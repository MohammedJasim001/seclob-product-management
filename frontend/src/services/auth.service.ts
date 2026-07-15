import apiClient from "../lib/axios";
import type {
  ForgotPasswordPayload,
  LoginPayload,
  RegisterPayload,
} from "../redux/auth/authTypes";

//register
export const registerUserApi = (userData: RegisterPayload) => {
  return apiClient.post("/auth/register", userData);
};

//login
export const loginUserApi = (userData: LoginPayload) => {
  return apiClient.post("/auth/login", userData);
};

//forgot password
export const forgotPasswordApi = (userData: ForgotPasswordPayload) => {
  return apiClient.patch("/auth/forgot-password", userData);
};

//logout
export const logoutApi = () => {
  return apiClient.post("/auth/logout");
};
