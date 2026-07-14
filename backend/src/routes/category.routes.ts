import express from "express";
import userAuth from "../middlewares/authMiddleware";
import { createCategory } from "../controllers/categoryController";

const router = express.Router();

router.post("/create", userAuth, createCategory);

export default router;
