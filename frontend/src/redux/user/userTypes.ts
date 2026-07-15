import type { User } from "../../types/userTypes";

export type UserState = {
  loading: boolean;
  error: string | null | undefined;
  success: boolean;
  message: string;
  user: User | null;
};
