import catchAsync from "../utils/catchAsync";
import * as ProductService from "../services/productServices";

export const addProduct = catchAsync(async (req, res) => {
  const data = {
    ...req.body,
    variants: JSON.parse(req.body.variants),
  };
  const files = req.files as Express.Multer.File[];

  await ProductService.addProduct(data, files);
  res.status(200).json({ message: "New product added" });
});
