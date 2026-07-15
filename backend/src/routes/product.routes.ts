import express from "express";
import userAuth from "../middlewares/authMiddleware";
import { addProduct } from "../controllers/productController";
import upload from "../middlewares/imageUploadMiddleware";

const router = express.Router();

router.post("/create", userAuth, upload.array("images", 5), addProduct);

export default router;
