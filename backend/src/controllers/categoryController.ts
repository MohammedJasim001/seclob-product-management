import catchAsync from "../utils/catchAsync";
import * as CategoryService from "../services/categoryServices";

export const createCategory = catchAsync(async (req, res) => {
  const { categoryName } = req.body;
  await CategoryService.createCategory(categoryName);
  res.status(201).json({message:"New Category created"})
});
