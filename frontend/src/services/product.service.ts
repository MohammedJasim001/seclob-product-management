import apiClient from "../lib/axios";

// add new product
export const addProductApi = (formData: FormData) => {
  return apiClient.post("/product/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// fetch all products
export const fetchAllProductsApi = () => {
  return apiClient.get("/product/all");
};

// fetch products by sub category
export const fetchProductsBySubCategoryApi = (subCategoryId: string) => {
  return apiClient.get(`/product/sub-category/${subCategoryId}`);
};

// fetch single product 
export const fetchSingleProductApi = (productId:string) => {
    return apiClient.get(`/product/single/${productId}`)
}