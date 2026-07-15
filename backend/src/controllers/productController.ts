import catchAsync from "../utils/catchAsync";
import * as ProductService from "../services/productServices";

//add products
export const addProduct = catchAsync(async (req, res) => {
  const data = {
    ...req.body,
    variants: JSON.parse(req.body.variants),
  };
  const files = req.files as Express.Multer.File[];

  const newProduct = await ProductService.addProduct(data, files);
  res.status(200).json({ message: "New product added", newProduct });
});

//fetch products
export const fetchAllProducts = catchAsync(async (req, res) => {
  const products = await ProductService.fetchAllProducts();
  res.status(200).json({ message: "All products fetched", products });
});

//fetch products by category
export const fetchProductsBySubCategory = catchAsync(async (req, res) => {
  const { subCategoroyId } = req.params;
  const products =
    await ProductService.fetchProductsBySubCategory(subCategoroyId);
  res.status(200).json({ message: "Fetched products", products });
});

//fetchSingleProduct
export const fetchSingleProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const product = await ProductService.fetchSingleProduct(productId);
  res.status(200).json({ message: "single product fetched", product });
});
