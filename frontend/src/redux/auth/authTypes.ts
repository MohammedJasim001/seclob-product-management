export type AuthState = {
  loading: boolean;
  error: string | null | undefined;
  success: boolean;
  message: string;
  logoutSuccess?: boolean;
};

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
  success: boolean;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
  newPassword: string;
}
