import express from "express";
import userAuth from "../middlewares/authMiddleware";
import { fetchCurrentUser, toggleWishlist } from "../controllers/userController";

const router = express.Router();

router.get("/", userAuth, fetchCurrentUser);
router.patch("/wishlist/:productId", userAuth, toggleWishlist);

export default router;
