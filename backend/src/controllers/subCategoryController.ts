import catchAsync from "../utils/catchAsync";
import * as SubCategoryService from "../services/subCategoryService";

export const createSubCategory = catchAsync(async (req, res) => {
  const { name, categoryId } = req.body;
  const newSubCategory = await SubCategoryService.createSubCategory(
    name,
    categoryId,
  );
  res.status(201).json({ message: "New Sub category added", newSubCategory });
});
