import express from "express"
import userAuth from "../middlewares/authMiddleware"
import { createSubCategory } from "../controllers/subCategoryController"

const router = express.Router()

router.post("/create", userAuth, createSubCategory)

export default router