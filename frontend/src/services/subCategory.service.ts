import apiClient from "../lib/axios";
import type { SubCategoryPayload } from "../redux/subCategory/subCategoryTypes";

export const addSubCategoryApi = (data: SubCategoryPayload) => {
  return apiClient.post("/sub-category/create", data);
};
