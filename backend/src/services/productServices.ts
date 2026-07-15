import { IProducts } from "../types/productTypes";
import Product from "../models/productModel";
import CustomError from "../utils/CustomError";

// add products
export const addProduct = async (
  data: IProducts,
  files: Express.Multer.File[],
) => {
  const { description, subCategory, title, variants } = data;
  const imageUrls = files.map((file: any) => file.path);
  return await Product.create({
    title,
    description,
    subCategory,
    variants,
    images: imageUrls,
  });
};

// fetch products
export const fetchAllProducts = async () => {
  const products = await Product.find();
  return products;
};

// fetch products by category
export const fetchProductsBySubCategory = async (subCategoryId: string) => {
  const products = await Product.find({ subCategory: subCategoryId });
  return products;
};

//fetch singel product
export const fetchSingleProduct = async (productId: string) => {
  const product = await Product.findById(productId);
  return product;
};

//edit product
export const editProduct = async (
  productId: string,
  data: any,
  files: Express.Multer.File[],
) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new CustomError("Product not found", 404);
  }

  product.title = data.title;
  product.description = data.description;
  product.subCategory = data.subCategory;
  product.variants = data.variants;

  const uploadedImages = files.map((file) => file.path);

  product.images = [...data.existingImages, ...uploadedImages];

  await product.save();

  return product;
};
