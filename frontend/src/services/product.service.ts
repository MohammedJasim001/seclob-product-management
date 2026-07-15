import apiClient from "../lib/axios";

export const addProductApi = (formData: FormData) => {
  return apiClient.post("/product/create", formData);
};
