import type { IProducts } from "../../types/productTypes";

export type ProductState = {
  loading: boolean;
  error: string | null | undefined;
  success: boolean;
  message: string;
  allProducts: IProducts[];
  subCategoryProducts: IProducts[];
  singleProduct: IProducts | null;
};
