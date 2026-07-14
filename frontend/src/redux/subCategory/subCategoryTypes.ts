export interface SubCategoryPayload {
  categoryId: string;
  name: string;
}

export type SubCategoryState = {
  loading: boolean;
  error: string | null | undefined;
  success: boolean;
  message: string;
};
