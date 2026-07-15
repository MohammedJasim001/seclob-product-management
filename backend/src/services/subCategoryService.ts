import SubCategory from "../models/subCategoryModel";
export const createSubCategory = async (name: string, categoryId: string) => {
  return await SubCategory.create({
    name,
    category: categoryId,
  });
};
