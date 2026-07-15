import { IProducts } from "../types/productTypes";
import Product from "../models/productModel";

export const addProduct = async (
  data: IProducts,
  files: Express.Multer.File[],
) => {
  const { description, subCategory, title, variants } = data;
  const imageUrls = files.map((file: any) => file.path);
  await Product.create({
    title,
    description,
    subCategory,
    variants,
    images: imageUrls,
  });
};
