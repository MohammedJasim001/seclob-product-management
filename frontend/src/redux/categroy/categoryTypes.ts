import type { Category } from "../../types/categoryTypes";

export type CategoryState = {
  loading: boolean;
  error: string | null | undefined;
  success: boolean;
  message: string;
  categories: Category[];
};
