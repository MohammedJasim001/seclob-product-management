import { IProducts } from "../types/productTypes";
import Product from "../models/productModel";

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
