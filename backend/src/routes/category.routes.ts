import express from "express";
import userAuth from "../middlewares/authMiddleware";
import {
  createCategory,
  fetchAllCategries,
} from "../controllers/categoryController";

const router = express.Router();

router.post("/create", userAuth, createCategory);
router.get("/all", userAuth, fetchAllCategries);

export default router;
