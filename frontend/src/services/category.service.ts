import apiClient from "../lib/axios";

//add new category
export const addCategoryApi = (categoryName: string) => {
  return apiClient.post("/category/create", { categoryName });
};

//fetch all categories
export const fetchAllCategoriesApi = () => {
    return apiClient.get("/category/all")
}