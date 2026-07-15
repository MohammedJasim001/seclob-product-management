import Category from "../models/categoryModel";
import SubCategory from "../models/subCategoryModel";

// add new category
export const createCategory = async (catgoryName: string) => {
  return await Category.create({
    name: catgoryName,
  });
};

//fetch all categories
export const fetchAllCategories = async () => {
  const categories = await Category.find();
  const subCategories = await SubCategory.find();

  const result = categories.map((category) => ({
    ...category.toObject(),
    subCategories: subCategories.filter(
      (sub) => sub.category?.toString() === category._id.toString(),
    ),
  }));

  return result;
};
