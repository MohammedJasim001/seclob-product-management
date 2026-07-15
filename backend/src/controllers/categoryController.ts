import catchAsync from "../utils/catchAsync";
import * as CategoryService from "../services/categoryServices";

// add new category
export const createCategory = catchAsync(async (req, res) => {
  const { categoryName } = req.body;
  const newCategory = await CategoryService.createCategory(categoryName);
  res.status(201).json({ message: "New Category created", newCategory });
});

//fetch catgory
export const fetchAllCategries = catchAsync(async (req, res) => {
  const result = await CategoryService.fetchAllCategories();
  res.status(200).json({ message: "All categories fetched", result });
});
