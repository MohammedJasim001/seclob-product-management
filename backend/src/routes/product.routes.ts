import express from "express";
import userAuth from "../middlewares/authMiddleware";
import {
  addProduct,
  fetchAllProducts,
  fetchProductsBySubCategory,
  fetchSingleProduct,
} from "../controllers/productController";
import upload from "../middlewares/imageUploadMiddleware";

const router = express.Router();

router.post("/create", userAuth, upload.array("images", 5), addProduct);
router.get("/all", userAuth, fetchAllProducts);
router.get(
  "/sub-category/:subCategoryId",
  userAuth,
  fetchProductsBySubCategory,
);
router.get("/single/:productId", userAuth, fetchSingleProduct);

export default router;
