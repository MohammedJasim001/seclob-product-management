import Category from "../models/categoryModel";

export const createCategory = async (catgoryName: string) => {
  await Category.create({
    name: catgoryName,
  });
};
