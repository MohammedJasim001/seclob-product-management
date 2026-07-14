import Category from "../models/categoryModel";

// add new category
export const createCategory = async (catgoryName: string) => {
  await Category.create({
    name: catgoryName,
  });
};

//fetch all categories
export const fetchAllCategories = async () => {
    const categories = await Category.find()
    return categories
}
